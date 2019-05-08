import React, { Component } from 'react';
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import Aux from '../components/_MsLib/Hoc/Aux';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import Burger from '../components/Builder/Burger/Burger';
import Controls from '../components/Builder/Controls/Controls'
import './_BurgerBuilder.scss';

// const ingredients = [
// 'Angus Patty',
// 'Buffalo Patty',
// 'Turkey Patty',
// 'Barbeque Ham',
// 'Bacon',
// 'Cheddar Cheese',
// 'American Cheese',
// 'Swiss Cheese',
// 'Fried Egg',
// 'Lettuce',
// 'Jalepano Peppers',
// 'Tomatoes',
// 'Red Onions',
// 'Ketchup',
// 'Avacado Aeoli',
// 'Mayo',
// 'Thousand Island'
// ]

class BugerBuilder extends Component {
    state = {
        ingredients: {
            angus: 0,
            buffalo: 0,
            turkey: 0,
            ham: 0,
            bacon: 0,
            cheddar: 0,
            american: 0,
            swiss: 0,
            egg: 0,
            lettuce: 0,
            peppers: 0,
            tomatoes: 0,
            onions: 0,
            ketchup: 0,
            avacado: 0,
            mayo: 0,
            chipotle: 0,
            cheese: 0
        },
        toppings: {
            ketchup: 0,
            mustard: 0,
            mayo: 0,
            avacado: 0,
        },
        ingredientPrices: {
            angus: 2.00,
            buffalo: 2.75,
            turkey: 2.50,
            ham: 2.00,
            bacon: 1.50,
            cheddar: .50,
            american: .50,
            swiss: .50,
            egg: 1.00,
            lettuce: .50,
            peppers: .50,
            tomatoes: .75,
            onions: .50,
            avacado: 1.00,
            ketchup: 0,
            mayo: 0,
            chipotle: 0,
            cheese: 0
        }, 
        totalPrice: null
      
    }
    sumIngredients=()=>{
        let ingredients = Object.values(this.state.ingredients);
        let ingredientPrices = Object.values(this.state.ingredientPrices);
        let totalPrices = ingredients.map((cur, idx) => {
          return cur * ingredientPrices[idx];
        });
        let totalPrice = totalPrices.reduce((acc, cur) => {
          return acc + cur;
        });
        this.setState({
          totalPrice: totalPrice
        });
        console.log(this.state.totalPrice)
    }
    addIngredientHandler = (e, el) =>{
        let target = document.getElementById(e.target.id);
        let ingredientQty = this.state.ingredients[el];
        let transformIngredientQty = (ingredientQty += 1);
        this.setState(
            prevState => ({
              ingredients: {
                ...prevState.ingredients,
                [el]: transformIngredientQty
              }
            }),
        );
        let decButton = target.closest(".ingredient__actions").childNodes[1];
        decButton.removeAttribute("disabled");
        decButton.setAttribute("enabled", "");
        this.sumIngredients()
    }
    removeIngredientHandler = (e, el) =>{
        let target = document.getElementById(e.target.id);
        let ingredientQty = this.state.ingredients[el];
        if (ingredientQty > 0){
            ingredientQty = ingredientQty - 1;
            this.setState(
                prevState => ({
                  ingredients: {
                    ...prevState.ingredients,
                    [el]: ingredientQty
                  }
                }),
            );
        }
        if (ingredientQty === 0) {
            target.setAttribute("disabled", "");
            target.removeAttribute("enabled");
            return;
        }
        this.sumIngredients()

    }
    switchIngredientName=(ing)=>{
        switch(ing){
            case 'angus':
            return 'Angus Patty';
            break;

            
            case 'buffalo':
            return 'Buffalo Patty'
            break;
            case 'turkey':
            return 'Turkey Patty'
            break;
            case  'ham':
            return 'Ham Patty'
            break;
            case 'cheese':
            return 'Cheese'
            break;
 
            default: 
            return 'XXX'
        }
        return;
    }
    componentDidMount(){
        this.sumIngredients();
        console.log(this.state.ingredients)
    }
    render() {
        const ingsKeys = Object.keys(this.state.ingredients);
        const ingsValues = this.state.ingredients
        
        return (
            <Aux>
                <Header>
                     <Logo/> 
                </Header>
                <ContentCon style="BurgerBuilder">
                    <div className="BurgerBuilder__col">
                        <div className="BurgerBuilder__col__con BurgerBuilder__col__con--left">
                            <ul>
                                <li>Ingredients</li>
                                <li>Prices</li>
                                <li>Actions</li>
                            </ul>
                        </div>
                        <div className="BurgerBuilder__col__con">
                        {
                            ingsKeys.map((cur, idx)=>{
                                return (
                                    <div className="ingredient" id={`${cur}-${idx}`} key={`ingredient${idx}`}>
                                        <div className="ingredient__con">
                                        <div className="ingredient__name">
                                        {this.switchIngredientName(cur)}
                                        </div>
                                        <div className="ingredient__price">
                                            {this.state.ingredientPrices[cur].toFixed(2)}
                                        </div>
                                        <div className="ingredient__actions">
                                            <Controls current={cur} add={(e)=>this.addIngredientHandler(e, cur)} remove={(e)=>this.removeIngredientHandler(e,cur)}/>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    {/* LEFT */}
                    <div className="BurgerBuilder__col">
                        <div className="BurgerBuilder__col__con BurgerBuilder__col__con--right">
                        <Logo/> 
                        </div>
                        <div className="BurgerBuilder__col__con">
                        <Burger ingredients={ingsKeys} ingredientQty={ingsValues}></Burger>
                        </div>
                   </div>
                    {/* Right */}
                </ContentCon>
            </Aux>
        );
    }
}
export default BugerBuilder;