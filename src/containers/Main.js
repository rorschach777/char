import React, { Component } from 'react';
import Background from '../components/Background/Background';
import Intro from './Intro/Intro';
import BurgerBuilder from './BurgerBuilder';
import {Form} from './Form/Form';
import Menu from './Menu/Menu';
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import Footer from '../components/Footer/Footer';
import Cart from '../containers/Cart/Cart';
import {withRouter, Route, NavLink} from 'react-router-dom';
import cartIcon from '../assets/images/icons/cart-icon-2.svg';
import axios from 'axios';

class Main extends Component {
    state = {
        introTitle: false, 
        menuCollapsed: false,
        formSubmitted: false, 
        burgerArr:[],
        formObj: {},
        grandTotal: 0,
        burgerQty: 0,
    }
    reset=()=>{
        this.setState(prevState=>({
            formSubmitted: false, 
            burgerArr: []
        }))
    }
    toggleMenu=()=>{
        this.setState(prevState=>({
            menuCollapsed: !prevState.menuCollapsed
        }))
    }
    assignBugerId=()=>{
        let int = this.state.burgerQty += 1;
        return `burger-${int}`;
    }
    sayHi=()=>{
        console.log('hi');
    }
    showState=()=>{
        console.log(this.state)
    }
    formInfo=(e, formObj)=>{
        e.preventDefault();
        let updatedFormObj = formObj
        this.setState(prevState=>({
            formObj: updatedFormObj,
            formSubmitted: true
        }), this.sendOrder
        )
    }
    grandTotal=()=>{
        let burgers = this.state.burgerArr
        let prices = []
        burgers.forEach((cur, idx)=>{
            prices.push(cur.totalPrice)
        })
    
        let grandTotal = prices.reduce((prev, cur)=>{
            return prev + cur
        });
  
        console.log(`Grand Total: ${grandTotal}`)
        this.setState(prevState=>({
            grandTotal: grandTotal
        }), this.showState
     
        );
    }
    sendOrder=()=>{
    
        let orderData = {
            burgers: {
                builtBurgers: this.state.burgerArr, 
                menuBurgers: []
            }, 
            contactInfo: this.state.formObj, 
        }
        axios.post('https://char-93c7a.firebaseio.com/orders.json', orderData); 
    }
    removeBurger=(burgerId)=>{
        let burgers = this.state.burgerArr
        const removeElement = (idx) => {
            burgers.splice(idx, 1);
            this.setState(prevState=>({
                burgerArr: burgers
            }), burgers.length > 0 ? this.grandTotal : this.setState(prevState=>({grandTotal: 0})))
        }
        // The event click passes the burger id on the closest parent el... 
        burgers.forEach((cur, idx)=>{
            if (cur.id === burgerId){
                return removeElement(idx)
            }
        });
        console.log(burgers)
    }
    ////// THIS FUNCTION 1 IS REDUNDANT --- SEE IF YOU CAN COMBINE THESE> 
    burgerInfo=(e, builtBurger)=>{
        console.log(this.state)
        
        e.preventDefault();

        this.setState(prevState=>({
            burgerArr: prevState.burgerArr.concat(builtBurger)
        }), this.showState
        )
        console.log(builtBurger);
        setTimeout(()=>{this.props.history.push('/cart')}, 1000)
 
    }
    ////// THIS FUNCTION 2 IS REDUNDANT  --- SEE IF YOU CAN COMBINE THESE> 
    pushBurger=(builtBurger)=>{
        console.log(builtBurger)
        this.setState(prevState=>({
            burgerArr: prevState.burgerArr.concat(builtBurger)
        }), this.grandTotal
        )
     
    }
    letsEat=()=>{
        this.setState({
            introTitle: false
        })
    }
    componentDidMount(){
        window.addEventListener('resize', ()=>{
            if(window.outerWidth > 768){
                this.setState(prevState=>({
                    menuCollapsed: false
                }))
            }
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
                    menuItems={[<NavLink to="/Menu">Menu</NavLink>, <NavLink to='build'>Builder</NavLink>,  <NavLink to='/cart' styles='Header__menu__con__cart'><img className="cart" src={cartIcon} />{this.state.burgerArr.length}</NavLink>] }
                    >
                    <Logo/> 
                    </Header>

                    <Route exact path='/build' render={()=>
                    <BurgerBuilder 
                    pushBurger={this.pushBurger}
                    burgerId={this.assignBugerId}
                    burgerInfo={this.burgerInfo}/>}
                    />

                    <Route exact path="/cart" render={()=>
                    <Cart 
                    removeBurger={this.removeBurger}
                    cartItems={this.state.burgerArr} 
                    grandTotal={this.state.grandTotal}
                    />
                    }/>

                    <Route exact path="/checkout" render={()=>
                    <Form 
                    resetForm={this.reset}
                    deliveryType={this.state.deliveryType} 
                    formInfo={this.formInfo} 
                    formSubmitted={this.state.formSubmitted}
                    />}/>

                    <Route exact path='/menu' render={()=><Menu pushBurger={this.pushBurger} burgerId={this.assignBugerId}/>}/>
                    <Route exact path='/' render={()=><Intro test={this.sayHi}/>}/>
                </Background>
                <Footer/>
            </div>
        );
    }

}


export default withRouter(Main);