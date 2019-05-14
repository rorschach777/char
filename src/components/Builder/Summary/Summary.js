import React from 'react';
import './_Summary.scss';
import './OrderBurger/OrderBurger';
import OrderBurger from './OrderBurger/OrderBurger';

const Summary = (props) => {
    const ingList = () => {
        const ings = Object.keys(props.ingredients);
        const ingsQty = Object.values(props.ingredients);
        const arr = [...Array(ings.length)]

        let ingredients =  ings.map((cur, idx)=>{
            if (ingsQty[idx] !== 0){
                return <li><span>({ingsQty[idx]})</span>{props.switchIngs(cur)}</li>  
            }
       
        })
        return ingredients;

        
    }
    const topList = ()=>{
        const tops = Object.keys(props.toppings);
        const topsQty = Object.values(props.toppings);
        let toppings =  tops.map((cur, idx)=>{
            if (topsQty[idx] !== 0){
                return <li><span>({topsQty[idx]})</span>{props.switchIngs(cur)}</li>  
            }
        });
        return toppings;
    }
    return (
        <div className="Summary">
            <div className="Summary-ing-heading">
                <span>{props.ingTotal}</span> <h6>Ingredients Added!</h6>
            </div>
            <div className="Summary-ing-body">
                <ul>
                    {
                        ingList()
                      
                    }
                    {  topList()}
                </ul>
            </div>
            <OrderBurger
            totalPrice={props.totalPrice.toFixed(2)}
            />
    
        </div>
    );
};

export default Summary;