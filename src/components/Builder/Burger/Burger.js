import React from 'react';
import Ingredient from './Ingredients/Ingredient'
import './Burger.scss';
const Burger = (props) => {
    return (
        <div className="Burger">
        <div className="Ingredient bread bread--top"></div>
        {props.children}
        <div className="Ingredient bread bread--bottom"></div>
    </div>
    );
};

export default Burger;