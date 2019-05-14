import React from 'react';
import "./_Builder.scss";
import Logo from '../_MsLib/UI/Logo/Logo';
import Controls from './Controls/Controls';
import CheckControl from './Controls/CheckControl/CheckControl';
import Burger from './Burger/Burger';
import Summary from './Summary/Summary';
const Builder = (props) => {
    
    const ingsKeys = Object.keys(props.ingredients);
    const ingsValues = props.ingredients;
    const toppingsKeys = Object.keys(props.toppings);
    const toppingsValues = props.toppings;
    const ingsMap = 
    ingsKeys.map((cur, idx)=>{
        return (
            <div className="ingredient" id={`${cur}-${idx}`} key={`ingredient${idx}`}>
                <div className="ingredient__con">
                <div className="ingredient__name">
                {props.switchIngs(cur)}
            </div>
            <div className="ingredient__price">
                {props.ingPrices[cur].toFixed(2)}
            </div>
            <div className="ingredient__actions">
                <Controls current={cur} type="ingredients" add={props.addIngs} remove={props.removeIngs}/>
            </div>
            </div>
            </div>
        )
    });
    const topMap = 
    toppingsKeys.map((cur, idx)=>{
        return (
            <div className="ingredient" id={`${cur}-${idx}`} key={`ingredient${idx}`}>
                <div className="ingredient__con">
                <div className="ingredient__name">
                {props.switchIngs(cur)}
            </div>
            <div className="ingredient__price">
                {props.topPrices[cur].toFixed(2)}
            </div>
            <div className="ingredient__actions">
                <CheckControl current={cur} type="toppings" add={props.addIngs} remove={props.removeIngs}/>
            </div>
            </div>
            </div>
        )
    });


    const ingControls = ingsMap.reverse();
    const topControls = topMap.reverse();
    return (
        <div className="Builder">
            <div className="BurgerBuilder__col">
                <div className="BurgerBuilder__col__con BurgerBuilder__col__con--left">
                    <ul className="builder-titles">
                        <li>Ingredients</li>
                        <li>Prices</li>
                        <li>Actions</li>
                    </ul>
                 </div>
                <div className="BurgerBuilder__col__con">
             
                    {
                        ingControls
                    }
                    {
                        topControls
                    }
               
                </div>
            </div>
            <div className="BurgerBuilder__col">
                <div className="BurgerBuilder__col__con ">
                <div className="logo-row">
                    <Logo/>
                </div>
           
                <div className="half-col">
                    <Summary
                    toppings={props.toppings} 
                    ingredients={props.ingredients}
                    switchIngs={(ing)=>props.switchIngs(ing)}
                    totalPrice={props.totalPrice}
                    ingTotal={props.ingTotal}
                    />
                </div>
                <div className="half-col">
                    <Burger 
                    toppings={toppingsKeys} 
                    toppingsQty={toppingsValues} 
                    ingredients={ingsKeys} 
                    ingredientQty={ingsValues} 
           
                    />
                    
                </div>
                </div>
            </div>
        </div>
    );
};
export default Builder;