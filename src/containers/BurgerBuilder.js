import React, { Component } from 'react';
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import Aux from '../components/_MsLib/Hoc/Aux';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import Builder from '../components/Builder/Builder';
import Burger from '../components/Builder/Burger/Burger';
import Controls from '../components/Builder/Controls/Controls'
import './_BurgerBuilder.scss';
import { thisTypeAnnotation } from '@babel/types';

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
            tomatoes: 0,
            ketchup: 0,
            avacado: 0,
            mayo: 0,
            onions: 0,
            pickles: 0,
            lettuce: 0,
            cheddar: 0,
            american: 0,
            egg: 0,
            swiss: 0,
            bacon: 0,
            turkey: 0,
            angus: 0,
            buffalo: 0,
      
        },
        toppings: {
            ketchup: 0,
            mustard: 0,
            mayo: 0,
            avacado: 0,
        },
        ingredientPrices: {
            tomatoes: .75,
            ketchup: 0,
            avacado: 1.00,
            mayo: 0,
            onions: .50,
            pickles: .50,
            lettuce: .50,
            cheddar: .50,
            american: .50,
            egg: 1.25,
            swiss: .75,
            bacon: 1.50,
            turkey: 2.50,
            angus: 2.00,
            buffalo: 2.75,
       
        }, 

        totalPrice: 0
      
    }
    burgerIngQtyTotal=()=>{
        const ings = Object.values(this.state.ingredients);
        const total = ings.reduce((prev, cur)=>{
            return prev + cur
        })
        return total;
    }
    burgerTotal=()=>{
        const ingredientQty = Object.values(this.state.ingredients);
        const ingredientPrice = Object.values(this.state.ingredientPrices);
        const totalPrices = [...Array(ingredientQty.length)].map((cur, idx)=>{
            let int = ingredientQty[idx] * ingredientPrice[idx];
            console.log(int)
            return int;
        });
        let totalPrice = totalPrices.reduce((prevInt, cur)=>{
            return prevInt + cur;
        })
        this.setState((prevState, props)=>({
            totalPrice: totalPrice
        }));
        return this.state.totalPrice
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
            }), this.burgerTotal
        );
        let decButton = target.closest(".ingredient__actions").childNodes[1];
        decButton.removeAttribute("disabled");
        decButton.setAttribute("enabled", "");
     
        // this.sumIngredients();

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
                }), this.burgerTotal
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
            case  'bacon':
            return 'Bacon'
            break;
            case 'cheddar':
            return 'Cheddar Cheese'
            break;
            case 'american':
            return 'American Cheese'
            break;
            case 'swiss':
            return 'Swiss Cheese'
            break;
            case 'egg':
            return 'Fried Egg'
            break;
            case 'lettuce':
            return 'Lettuce'
            break;
            case 'tomatoes':
            return 'Tomatoes'
            break;
            case 'onions':
            return 'Onions'
            break;
            case 'ketchup':
            return 'Ketchup'
            break;
            case 'avacado':
            return 'Avacado Aeoli'
            break;
            case 'mayo':
            return 'Mayo'
            break;
            default: 
            return 'XXX'

        }
        return;
    }

    componentDidMount(){
        this.sumIngredients();
        this.burgerTotal()
        console.log(this.state.ingredients);
    }
    componentDidUpdate(){
        
    }
    render() {

        return (
            <Aux>
                <Header>
                     <Logo/> 
                </Header>
                <ContentCon style="BurgerBuilder">
                    <Builder 
                    ingredients={this.state.ingredients}
                    ingTotal={this.burgerIngQtyTotal()}
                    switchIngs={(ing)=>this.switchIngredientName(ing)}
                    addIngs={(e, el)=>this.addIngredientHandler(e, el)}
                    removeIngs={(e, el)=>this.removeIngredientHandler(e, el)}
                    prices={this.state.ingredientPrices}
                    totalPrice={this.state.totalPrice}
                    />
                </ContentCon>
            </Aux>
        );
    }
}
export default BugerBuilder;