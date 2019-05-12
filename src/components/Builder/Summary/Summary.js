import React from 'react';
import './_Summary.scss';
import './OrderBurger/OrderBurger';
import OrderBurger from './OrderBurger/OrderBurger';

const Summary = (props) => {
    const ingList = () => {
        const ings = Object.keys(props.ingredients)
        const ingsQty = Object.values(props.ingredients)
        const arr = [...Array(ings.length)]
        let x =  ings.map((cur, idx)=>{
            if (ingsQty[idx] === 0){
              
            }
            else {
                return <li><span>({ingsQty[idx]})</span>{props.switchIngs(cur)}</li>  
            }
           
        })
        return x;

        
    }
    return (
        <div className="Summary">
            <div className="Summary-ing-heading">
                <span>{props.ingTotal}</span> <h6>Ingredients Added!</h6>
            </div>
            <div className="Summary-ing-body">
                <ul>
                    {ingList()}
                    {/* <li><span>(2)</span>Ingredient Name</li>
                    <li><span>(2)</span>Ingredient Name</li>
                    <li><span>(2)</span>Ingredient Name</li>
                    <li><span>(2)</span>Ingredient Name</li>
                    <li><span>(2)</span>Ingredient Name</li>
                    <li><span>(2)</span>Ingredient Name</li>
                    <li><span>(2)</span>Ingredient Name</li> */}
                </ul>
            </div>
            <OrderBurger
            totalPrice={props.totalPrice.toFixed(2)}
            />
    
        </div>
    );
};

export default Summary;