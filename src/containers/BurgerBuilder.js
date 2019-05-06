import React, { Component } from 'react';
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import Aux from '../components/_MsLib/Hoc/Aux';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import Burger from '../components/Builder/Burger/Burger';
import Ingredient from '../components/Builder/Burger/Ingredients/Ingredient';
import './BurgerBuilder.scss';


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
            cheese: 0
        },
        toppings: {
            ketchup: 0,
            mustard: 0,
            mayo: 0,
            avacado: 0,
        },
        ingredientPrices: {
            angus: 2.50,
            buffalo: 2.50,
            turkey: 3.75,
            ham: 1.25,
            cheese: 1.25
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
        this.sumIngredients()
    }
    render() {
        const stateIngs = Object.keys(this.state.ingredients);
       
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
                            stateIngs.map((cur, idx)=>{
                                return (
                                    <div className="ingredient" id={`${cur}-${idx}`} key={`ingredient${idx}`}>
                                        <div className="ingredient__con">
                                        <div className="ingredient__name">
                                        {this.switchIngredientName(cur)}
                                        </div>
                                        <div className="ingredient__price">
                                        $2.50
                                        </div>
                                        <div className="ingredient__actions">
                                        <button id={`${cur}-more`}  className="ingredient__actions--more" onClick={(e)=>this.addIngredientHandler(e, cur)}>More</button>
                                        <button id={`${cur}-less`} className="ingredient__actions--less"  onClick={(e)=>this.removeIngredientHandler(e, cur)}>Less</button>
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
                        <Burger>
                            {stateIngs.map((cur, idx)=>{
                                let quantity = [...Array(this.state.ingredients[cur])];
                                let ingredients = quantity.map((_, idx)=>{
                                    return <Ingredient type={cur}/>
                                });
                                return ingredients
                            })}
                        </Burger>
                        </div>
                   </div>
                    {/* Right */}
                </ContentCon>
            </Aux>
        );
    }
}
export default BugerBuilder;