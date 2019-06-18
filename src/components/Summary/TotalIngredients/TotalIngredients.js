import React from 'react';
import './_TotalIngredients.scss';
const TotalIngredients = (props) => {
    return (
        <div className={`TotalIngredients ${props.styles}`}>
            <span>{props.ingTotal}</span> <h6 className={props.headlineStyles}>Ingredients Added!</h6>
        </div>
    );
};

export default TotalIngredients;