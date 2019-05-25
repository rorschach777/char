import React, { Component } from 'react';
import Background from '../components/Background/Background';
import Intro from './Intro/Intro';
import BurgerBuilder from './BurgerBuilder';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import {Form} from './Form/Form'
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import posed from 'react-pose';
import {withRouter, Route, Redirect} from 'react-router-dom';
import BugerBuilder from './BurgerBuilder';
class Main extends Component {
    state = {
        introTitle: false, 
        menuCollapsed: false,
        burgerObj:{},
        formObj: {}
    }
    toggleMenu=()=>{
        this.setState(prevState=>({
            menuCollapsed: !prevState.menuCollapsed
        }))
    }
    showState=()=>{
        console.log(this.state)
    }
    formInfo=(e, formObj)=>{
        e.preventDefault();
        let updatedFormObj = formObj
        this.setState(prevState=>({
            formObj: updatedFormObj
        }), this.showState
        )

    }
    burgerInfo=(e, builtBurger)=>{
        console.log('BURGER INFO')
        e.preventDefault();

        this.setState(prevState=>({
            burgerObj: builtBurger
        }), this.showState
        )
        console.log(builtBurger);
        setTimeout(()=>{this.props.history.push('/checkout')}, 1000)
 
    }
    letsEat=()=>{
        this.setState({
            introTitle: false
        })
    }
    render() {
        return (
            <div>
                <Background>
                    {/* LOBBY */}
                    <Header 
                    toggleMenu={this.toggleMenu}
                    menuCollapsed={this.state.menuCollapsed}
                    menuItems={['Menu', 'Builder', 'Orders']}
                    >
                    <Logo/> 
                    </Header>
                    <Route exact path='/build' render={()=><BurgerBuilder 
                    burgerInfo={this.burgerInfo}/>}
                    
                    />
                    <Route exact path="/checkout" render={()=><Form deliveryType={this.state.deliveryType} formInfo={this.formInfo} />}/>
                    <Route exact path='/' component={Intro}/>
                </Background>
            </div>
        );
    }
}

export default withRouter(Main);