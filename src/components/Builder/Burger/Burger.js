import React from 'react';
import Ingredient from './Ingredients/Ingredient'
import './_Burger.scss';
import BreadTop from '../../../assets/images/ingredient-bread-top.png';
const Burger = (props) => {

let idx = 999
const zIndex =()=>{
    idx = idx - 1 ;
    return idx;
}

    return (
        <div className="Burger">
        <Ingredient type="bread--top"/>
           
 
        {/* BURGER INGREDIENTS */}
        {props.ingredients.map((cur, idx)=>{
            let quantity = [...Array(props.ingredientQty[cur])];
            let ingredients = quantity.map((_, idx2)=>{
                return <Ingredient key={`${cur}-${idx}`} ingZIndex={zIndex()} type={cur}/>
            });
            return ingredients
        })}
        {/* BURGER INGREDIENTS */}
        <Ingredient type="bread--bottom"/>
    </div>
    );
};

export default Burger;