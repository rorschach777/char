import React, {Component} from 'react';
import "./_Builder.scss";
import Logo from '../_MsLib/UI/Logo/Logo';
import ButtonMedium from '../_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';
import Controls from './Controls/Controls';
import CheckControl from './Controls/CheckControl/CheckControl';
import OrderBurger from '../Builder/Summary/OrderBurger/OrderBurger';
import TotalIngredients from './Summary/TotalIngredients/TotalIngredients'
import Burger from './Burger/Burger';
import MobileCon from '../_MsLib/Con/MobileCon/MobileCon';
import DesktopCon from '../_MsLib/Con/DesktopCon/DesktopCon';
import Aux from '../_MsLib/Hoc/Aux';
import posed from 'react-pose';
import Summary from './Summary/Summary';


const BuilderSection = posed.div({
    show:{
        x: '0%',
        applyAtStart: {display: 'block'},
        delay: 500
    }, 
    hide: {
        x: '-120%', 
        applyAtEnd: {display: 'none'}
    }
})


class Builder extends Component {
    state = {
        burgerPreview: false
    }
    burgerPreviewHandler = ()=>{
        this.setState((prevState)=>({
            burgerPreview: !prevState.burgerPreview
        }));

    }
    orderBurger=()=>{
        let burgerIngs = document.querySelectorAll('.Ingredient-Con');
        let int = 2;
        for (let i = 0; i < burgerIngs.length; i++){
            let el = burgerIngs[i]
            console.log(burgerIngs)
            el.style.minHeight = '1rem'
            if (burgerIngs[i].classList.contains('Ingredient--sm')){
                el.style.zIndex= 999
            }
      
        }
        let top = document.querySelector('#bread-top')
        let bottom = document.querySelector('#bread-bottom')
        top.style.zIndex = 1005
   
    }
    render(){
    const ingsKeys = Object.keys(this.props.ingredients);
    const ingsValues = this.props.ingredients;
    const toppingsKeys = Object.keys(this.props.toppings);
    const toppingsValues = this.props.toppings;
    const ingsMap = 
    ingsKeys.map((cur, idx)=>{
        return (
            <div className="ingredient" id={`${cur}-${idx}`} key={`ingredient${idx}`}>
                <div className="ingredient__con">
                    <div className="ingredient__name">
                        {this.props.switchIngs(cur)}
                    </div>
                    <div className="ingredient__price">
                        {this.props.ingPrices[cur].toFixed(2)}
                    </div>
                    <div className="ingredient__actions">
                        <Controls current={cur} type="ingredients" disabled={true} add={this.props.addIngs} remove={this.props.removeIngs} />
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
                        {this.props.switchIngs(cur)}
                    </div>
                    <div className="ingredient__price">
                        {this.props.topPrices[cur].toFixed(2)}
                    </div>
                    <div className="ingredient__actions">
                        <CheckControl current={cur} type="toppings" add={this.props.addIngs} remove={this.props.removeIngs} />
                    </div>
                </div>
            </div>
        )
    });
    const ingControls = ingsMap.reverse();
    const topControls = topMap.reverse();
   return (
        <div className="Builder">
            {/* ADD INGS */}
            <BuilderSection pose={this.state.burgerPreview ? 'hide' : 'show'}>
                <div className="BurgerBuilder__col">
                    <div className="BurgerBuilder__col__con BurgerBuilder__col__con--left">
                        <ul className="builder-titles">
                            <li>Ingredients</li>
                            <li>Prices</li>
                            <li>Actions</li>
                        </ul>
                    </div>
        
                    <div className="BurgerBuilder__col__con">
                        {ingControls}
                        {topControls}
                    </div>
                    <div className="BurgerBuilder__col__mobile-controls">
                        <TotalIngredients ingTotal={this.props.ingTotal}/>
                        <ButtonMedium click={this.burgerPreviewHandler} styles={'review'} text='Review' />
                    </div>
                </div>
            </BuilderSection>
       
            {/* BURDER PREVIEW */}
            <DesktopCon>
                <div className="BurgerBuilder__col ">
                    <div className="BurgerBuilder__col__con ">
                        <div className="logo-row">
                            <Logo />
                        </div>
                        <div className="half-col">
                            <Summary
                                toppings={this.props.toppings}
                                ingredients={this.props.ingredients}
                                switchIngs={(ing) => this.props.switchIngs(ing)}

                                ingTotal={this.props.ingTotal}
                            >
                            </Summary>
                            <OrderBurger 
                            totalPrice={this.props.totalPrice.toFixed(2)} 
                            click={this.orderBurger}
                            />
                        </div>
                        <div className="half-col">
                            <Burger
                                totalPrice={this.props.totalPrice}
                                toppings={toppingsKeys}
                                toppingsQty={toppingsValues}
                                ingredients={ingsKeys}
                                ingredientQty={ingsValues}
                            />
                        </div>
                    </div>
                </div>
                </DesktopCon>
            <MobileCon>
           <BuilderSection pose={this.state.burgerPreview ? 'show' : 'hide'}>
                   <div className="BurgerBuilder-mobile">
                       <div className="BurgerBuilder-mobile--left ">
                           <Logo styles={'logo-mobile'} />
                           <Summary
                               toppings={this.props.toppings}
                               ingredients={this.props.ingredients}
                               switchIngs={(ing) => this.props.switchIngs(ing)}
                               ingTotal={this.props.ingTotal}
                           >
                               <h5 className="ingredients-title-mobile">Ingredients</h5>
                           </Summary>
                           <div >
                               <div>
                                   <OrderBurger
                                      
                                    edit={this.burgerPreviewHandler}
                                    totalPrice={this.props.totalPrice.toFixed(2)}
                                   />
                               </div>
                           </div>
                       </div>
                       <div className="BurgerBuilder-mobile--right ">
                           <Burger
                            totalPrice={this.props.totalPrice}
                               toppings={toppingsKeys}
                               toppingsQty={toppingsValues}
                               ingredients={ingsKeys}
                               ingredientQty={ingsValues}
                           />
                       </div>
                       <div className="BurgerBuilder-mobile--bottom ">
                           <ButtonMedium styles="edit mobile-btn" click={this.burgerPreviewHandler} text="Edit"/>
                           <ButtonMedium  click={this.orderBurger} styles="order mobile-btn" text="Order Now"/>
                        </div>
                   </div>
                   
               
           </BuilderSection>
           </MobileCon>
        </div>
    );
    }
    
};
export default Builder;