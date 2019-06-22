import React from 'react';
import './_Summary.scss';
import './OrderBurger/OrderBurger';
import TotalIngredients from './TotalIngredients/TotalIngredients'
const Summary = (props) => {
    const ingList = () => {
        const ings = Object.keys(props.ingredients);
        const ingsQty = Object.values(props.ingredients);
        let ingredients =  ings.map((cur, idx)=>{
            if (ingsQty[idx] !== 0){
                return <li key={`summary-${cur}-${idx}`}><span>({ingsQty[idx]}) </span>{props.switchIngs(cur)}</li>  
            }
        })
        return ingredients;
    }
    const topList = ()=>{
        const tops = Object.keys(props.toppings);
        const topsQty = Object.values(props.toppings);
        let toppings =  tops.map((cur, idx)=>{
            if (topsQty[idx] !== 0){
                return <li key={`summary-${cur}-${idx}`}><span>({topsQty[idx]}) </span>{props.switchIngs(cur)}</li>  
            }
        });
        return toppings;
    }
    return (
        <div className="Summary stroke-light">
            <div className="desktopContent" >
                <TotalIngredients ingTotal={props.ingTotal}/>
            </div>
            {props.children}
            <div className="Summary-ing-body">
                <ul>
                    {ingList()}
                    {topList()}
                </ul>
            </div>
            {/* <OrderBurger
            totalPrice={props.totalPrice.toFixed(2)}
            /> */}
            {/* {props.children} */}
    
        </div>
    );
};

export default Summary;