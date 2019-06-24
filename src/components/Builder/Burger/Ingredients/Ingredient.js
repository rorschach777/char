import React from 'react';
import './_Ingredient.scss';


const Ingredient = (props) => {
    const getZindex=()=>{
        props.ingZIndex()
    }
    const ingSize=(ing)=>{
        let baseClassName = 'Ingredient'
        if (ing === 'angus' || ing === 'buffalo' || ing === 'turkey' || ing === 'bacon' ){
            return `${baseClassName}--lg`
        }
        else {
            return `${baseClassName}--sm`
        }
    }
    return (
    
    <div className="Ingredient-Con">
        <div id={props.id} style={{zIndex: props.ingZIndex }} className={`Ingredient ${ingSize(props.type)} ${props.type} `}></div>
    </div>
    )
};

export default Ingredient;