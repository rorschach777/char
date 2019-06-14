import React from 'react';
import './_TotalIngredients.scss';
const TotalIngredients = (props) => {
    return (
        <div className="TotalIngredients">
            <span>{props.ingTotal}</span> <h6>Ingredients Added!</h6>
        </div>
    );
};

export default TotalIngredients;