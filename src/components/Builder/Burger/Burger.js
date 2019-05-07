import React from 'react';
import Ingredient from './Ingredients/Ingredient'

const Burger = (props) => {
    return (
        <div className="Burger">
        <div className="Ingredient bread bread--top"></div>
        {props.ingredients.map((cur, idx)=>{
                                let quantity = [...Array(props.ingredientQty[cur])];
                                let ingredients = quantity.map((_, idx)=>{
                                    return <Ingredient type={cur}/>
                                });
                                return ingredients
                            })}
        <div className="Ingredient bread bread--bottom"></div>
    </div>
    );
};

export default Burger;