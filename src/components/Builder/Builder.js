import React, { Component } from 'react';

import "./_Builder.scss";
import Logo from '../_MsLib/UI/Logo/Logo';
import ButtonMedium from '../_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';
import Controls from './Controls/Controls';
import CheckControl from './Controls/CheckControl/CheckControl';
import OrderBurger from '../Summary/OrderBurger/OrderBurger';
import TotalIngredients from '../Summary/TotalIngredients/TotalIngredients';
import {Redirect} from 'react-router'
import Burger from './Burger/Burger';
import CharDialog from '../UI/CharDialog/CharDialog'

import posed from 'react-pose';
import Summary from '../Summary/Summary';
import { NavLink } from 'react-router-dom';
const BuilderSection = posed.div({
    show: {
        x: '0%',
        applyAtStart: { display: 'block' },
        delay: 500
    },
    hide: {
        x: '-120%',
        applyAtEnd: { display: 'none' }
    }
})
class Builder extends Component {
    state = {
        burgerPreview: false,
        redirect: false, 
        ingIdx:  0

    }

    burgerPreviewHandler = () => {
        this.setState((prevState) => ({
            burgerPreview: !prevState.burgerPreview
        }));

    }
    redirectToCart = ()=>{
        this.setState(prevState=>({
            redirect: !prevState.redirect
        }))

    }
    incIngIdx = () => {
        this.setState(prevState=>({
            ingIdx: prevState.ingIdx += 1
        }))
    }
    componentDidMount(){
        if (this.state.redirect === true) {
            this.setState({
                redirect: false
            })
        }
    }
    render() {
        if (this.state.redirect){
            return <Redirect to="/cart" />
        }
        const ingsKeys = Object.keys(this.props.ingredients);
        const ingsValues = this.props.ingredients;
        const toppingsKeys = Object.keys(this.props.toppings);
        const toppingsValues = this.props.toppings;
        const ingsMap =
            ingsKeys.map((cur, idx) => {
                return (
                    <div className="ingredient" id={`ingredient-${cur}-${idx}`} key={`ingredients-${idx}`}>
                        <div className="ingredient__con">
                            <div className="ingredient__name">
                                {this.props.switchIngs(cur)}
                            </div>
                            <div className="ingredient__price">
                                {this.props.ingPrices[cur].toFixed(2)}
                            </div>
                            <div className="ingredient__actions">
                                <TotalIngredients styles={'phone'} ingTotal={ingsValues[cur]} headlineStyles='u-hide'></TotalIngredients>
                                <Controls current={cur} type="ingredients" 
                                disabled={true} 
                                add={this.props.addIngs} 
                                incIngIdx={this.incIngIdx} 
                                remove={this.props.removeIngs} 
                                burger={this.props.burger}
                                ingTotal={this.props.ingTotal}

                                />
                            </div>
                        </div>
                    </div>
                )
            });
        const topMap =
            toppingsKeys.map((cur, idx) => {
                return (
                    <div className="ingredient" id={`topping-${cur}-${idx}`} key={`toppings-${idx}`}>
                        <div className="ingredient__con">
                            <div className="ingredient__name">
                                {this.props.switchIngs(cur)}
                            </div>
                            <div className="ingredient__price">
                                {this.props.topPrices[cur].toFixed(2)}
                            </div>
                            <div className="ingredient__actions">
                                <CheckControl 
                                current={cur} 
                                type="toppings" 
                                add={this.props.addIngs} 
                                remove={this.props.removeIngs}
                                burger={this.props.burger}
                                ingTotal={this.props.ingTotal}
                                />
                            </div>
                        </div>
                    </div>
                )
            });
        const ingControls = ingsMap.reverse();
        const topControls = topMap.reverse();
        return (
            <div className="Builder">
                <CharDialog
                    show={this.props.showError}
                    message={'You have 12 ingredients on your burger... Unfortunately that\'s all we can fit on a burger.' }
                    buttonText={'All Good'}
                    click={()=>this.props.toggleDialog('showError')}
                />
                <CharDialog
                    show={this.props.orderBurgerDialog}
                    message={'A custom burger has been added to your order!'  }
                    buttonText={'Nice!'}
                    click={()=>{this.props.toggleDialog('orderBurgerDialog'); setTimeout(this.redirectToCart, 1000)}}
                />
                <BuilderSection className="col-md-12-gutterless col-lg-6-gutterless" pose={this.state.burgerPreview ? 'hide' : 'show'}>
                    <div className="BurgerBuilder__col">
                        <div className="BurgerBuilder__col__con BurgerBuilder__col__con--left">
                            <ul className="builder-titles">
                                <li>Ingredients</li>
                                <li>Prices</li>
                                <li>Actions</li>
                            </ul>
                        </div>

                        <div className="BurgerBuilder__col__con u-buffer">
                            {ingControls}
                            {topControls}
                        </div>
                        <div className="BurgerBuilder__col__mobile-controls col-md-hide col-lg-hide">
                            <TotalIngredients ingTotal={this.props.ingTotal} />
                            <ButtonMedium click={this.burgerPreviewHandler} styles={'review'} text='Review' />
                        </div>
                    </div>
                </BuilderSection>
                {/* BURGER PREVIEW */}
                <div className="BurgerBuilder__col col-lg-6-gutterless col-md-12-gutterless col-sm-hide">
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
                                totalPrice={this.props.totalPrice}
                            // click={(e)=>{let x = orderBurger(e); this.props.pushBurger(x)}}
                            // click={this.props.orderBurger}
                            // click={(e)=>{let x = this.props.orderBurger(e, this.props.burger, this.props.totalPrice); this.props.pushBurger(x)}}
                            >
                         
                                    <ButtonMedium
                                        click={
                                            (e) => { 
                                            let response = this.props.orderBurger(e, this.props.burger, this.props.totalPrice, 'build', this.props.burgerId); 
                                            let builtBurger = response.payload.burger;
                                            this.props.pushBurger(e, builtBurger);
                                            this.props.incId();
                                                
                                            // this.props.getGrandTotal(this.props.burgerArr)
                                       
                                       
                                            }
                                        }
                                        styles={'order'}
                                        text="Order Now"
                                    />
                   
                            </OrderBurger>
                        </div>
                        <div className="half-col">
                            <Burger
                                ingIdx = {this.state.ingIdx}
                                totalPrice={this.props.totalPrice}
                                toppings={toppingsKeys}
                                toppingsQty={toppingsValues}
                                ingredients={ingsKeys}
                                ingredientQty={ingsValues}

                            />
                        </div>
                    </div>
                </div>
                {/* BURGER PREVIEW */}
                <BuilderSection className="col-md-hide col-lg-hide" pose={this.state.burgerPreview ? 'show' : 'hide'}>
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
                                        totalPrice={this.props.totalPrice}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="BurgerBuilder-mobile--right ">
                            <Burger
                                ingIdx = {this.state.ingIdx}
                                totalPrice={this.props.totalPrice}
                                toppings={toppingsKeys}
                                toppingsQty={toppingsValues}
                                ingredients={ingsKeys}
                                ingredientQty={ingsValues}
                            />
                        </div>
                        <div className="BurgerBuilder-mobile--bottom ">
                          
                            <ButtonMedium click={this.burgerPreviewHandler} styles="edit mobile-btn" text="Edit" />
                      
                            <NavLink to='/cart'> 
                                    <ButtonMedium
                                        // Show State
                                        click={
                                            (e) => { 
                                            let response = this.props.orderBurger(e, this.props.burger, this.props.totalPrice, 'build', this.props.burgerId); 
                                            let builtBurger = response.payload.burger;
                                            this.props.pushBurger(e, builtBurger);
                                            this.props.incId();
                                                
                                            // this.props.getGrandTotal(this.props.burgerArr)
                                       
                                       
                                            }
                                        }

                                        styles={'order mobile-btn'}
                                        text="Order Now"

                                        // 
                                     
                                    />
                            </NavLink>
                            {/* <ButtonMedium click={this.props.orderBurger} styles="order mobile-btn" text="Order Now" /> */}
                        </div>
                    </div>
                </BuilderSection>

            </div>
        );
    }

};
export default Builder;