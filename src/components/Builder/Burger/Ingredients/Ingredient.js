import React from 'react';
import './Ingredient.scss';
const Ingredient = (props) => {
    return <div className={`Ingredient ${props.type}`}></div>
};

export default Ingredient;