import React, { Component } from 'react';
import Background from '../components/Background/Background';
import Intro from './Intro/Intro';
import BurgerBuilder from './BurgerBuilder';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import {Form} from './Form/Form'
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import posed from 'react-pose';
import {Route} from 'react-router-dom';
import BugerBuilder from './BurgerBuilder';
class Main extends Component {
    state = {
        introTitle: false, 
        menuCollapsed: false,
        orderInfo: null

    }
    toggleMenu=()=>{
        this.setState(prevState=>({
            menuCollapsed: !prevState.menuCollapsed
        }))
    }
    orderInfo=(obj)=>{
        let orderInfo = {
            
        };
    
        let formFields = document.querySelectorAll('.Form__input-group');
        console.log(formFields)
        formFields.forEach((cur, idx)=>{
            // // orderInfo[cur.childNodes[0]] = cur.childNodes[1].value
            // orderInfo[`${cur}`] = 'x'
            orderInfo[cur[0].innerHTML] = 'X'
         
        })
        console.log(orderInfo)

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
                    <Route exact path='/build' component={BugerBuilder} />
                    <Route exact path="/checkout" render={()=><Form deliveryType={this.state.deliveryType} orderInfo={(obj)=>this.orderInfo(obj)}/>}/>
                    <Route exact path='/' component={Intro}/>
                </Background>
            </div>
        );
    }
}

export default Main;