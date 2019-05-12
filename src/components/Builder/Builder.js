import React from 'react';
import "./_Builder.scss";
import Logo from '../_MsLib/UI/Logo/Logo';
import Controls from './Controls/Controls';
import Burger from './Burger/Burger';
import Summary from './Summary/Summary';
const Builder = (props) => {
    const ingsKeys = Object.keys(props.ingredients);
    const ingsValues = props.ingredients
    const controlsMap = 
    ingsKeys.map((cur, idx)=>{
        return (
            <div className="ingredient" id={`${cur}-${idx}`} key={`ingredient${idx}`}>
                <div className="ingredient__con">
                <div className="ingredient__name">
                {props.switchIngs(cur)}
            </div>
            <div className="ingredient__price">
                {props.prices[cur].toFixed(2)}
            </div>
            <div className="ingredient__actions">
                <Controls current={cur} add={(e)=>props.addIngs(e, cur)} remove={(e)=>props.removeIngs(e,cur)}/>
            </div>
            </div>
            </div>
                )
            })
    const controls = controlsMap.reverse();
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
                        controls
                        
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
                    ingredients={props.ingredients}
                    switchIngs={(ing)=>props.switchIngs(ing)}
                    totalPrice={props.totalPrice}
                    ingTotal={props.ingTotal}
                    />
                </div>
                <div className="half-col">
                    <Burger ingredients={ingsKeys} ingredientQty={ingsValues}></Burger>
                </div>
                </div>
            </div>
        </div>
    );
};
export default Builder;