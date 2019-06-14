import React from 'react';
import Ingredient from './Ingredients/Ingredient'
import './_Burger.scss';



const Burger = (props) => {

    let idx = 999
    const zIndex =()=>{
        idx = idx - 1 ;
        return idx;
    }
    let toppings = props.toppings.map((cur, idx)=>{
        let quantity = [...Array(props.toppingsQty[cur])];
        let tops = quantity.map((_, idx2)=>{
            return <Ingredient key={`${cur}-${idx}`} ingZIndex={zIndex()} type={cur}/>
        });
        return tops
    });
    let ingredients = props.ingredients.map((cur, idx)=>{
        let quantity = [...Array(props.ingredientQty[cur])];
        let ings = quantity.map((_, idx2)=>{
                return <Ingredient key={`${cur}-${idx}`} ingZIndex={zIndex()} type={cur}/>
            });
        return ings
    })
    let burgerContents = (ings, toppings)=>{
        let burger = <div><div>{toppings}</div><div>{ings}</div></div>
        if (props.totalPrice === 0){
           return (<div className="empty "><p>Your burger is currently empty. </p></div>)
        }
        else {
            return (
          
                burger
                
            )
        }
    }
    return (
        <div className="Burger">
            <Ingredient id="bread-top" type="bread--top" />
            {burgerContents(ingredients, toppings)}
            <Ingredient id="bread-bottom" type="bread--bottom" />
        </div>
    );
};

export default Burger;