import React, { Component } from 'react';
import Background from '../components/Background/Background';
import Intro from './Intro/Intro';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import {Form} from './Form/Form';
import Menu from './Menu/Menu';
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import Footer from '../components/Footer/Footer';
import Cart from '../containers/Cart/Cart';
import {withRouter, Route, NavLink} from 'react-router-dom';
import cartIcon from '../assets/images/icons/cart-icon-2.svg';
import axios from 'axios';
import * as actionTypes from '../store/actionTypes';
import {connect} from 'react-redux'

class Main extends Component {
    state = {
        // introTitle: false, 
        // menuCollapsed: false,
        formSubmitted: false
        // burgerArr:[],
        // formObj: {},
        // grandTotal: 0,
        // burgerQty: 1,
    }
    // reset=()=>{
    //     this.setState(prevState=>({
    //         formSubmitted: false, 
    //         burgerArr: []
    //     }))
    // }
    // toggleMenu=()=>{
    //     this.setState(prevState=>({
    //         menuCollapsed: !prevState.menuCollapsed
    //     }))
    // }
    // assignBurgerId=()=>{
    //     /// THIS IS HOW THIS WAS... 

    //     // let int = this.state.burgerQty += 1;
    //     // return `burger-${int}`;
    //     this.setState(prevState=>({
    //         burgerQty: prevState.burgerQty += 1
    //     }))
    //     return `burger-${this.state.burgerQty}`;
    // }

    // showState=()=>{
    //     console.log(this.state)
    // }
    formInfo=(e, formObj)=>{
        e.preventDefault();
        let updatedFormObj = formObj
        this.setState(prevState=>({
            formObj: updatedFormObj,
            formSubmitted: true
        }), this.sendOrder
        )
    }
    // add up the grand total. 
    // grandTotal=()=>{
    //     let burgers = this.state.burgerArr
    //     let prices = []
    //     burgers.forEach((cur, idx)=>{
    //         prices.push(cur.totalPrice)
    //     })
    
    //     let grandTotal = prices.reduce((prev, cur)=>{
    //         return prev + cur
    //     });
  

    //     this.setState(prevState=>({
    //         grandTotal: grandTotal
    //     })
     
    //     );
    // }
    // this sends the order to the state

    ///////////////////// REDUX ASYNC /////////////////////////
    sendOrder=()=>{
        let buildBurgers, menuBurgers, allBurgers
        buildBurgers = []
        menuBurgers = []
        allBurgers = this.state.burgerArr

        allBurgers.map((cur, idx)=>{
            if (cur.type === 'build'){
                buildBurgers.push(cur)
            }
            else {
                menuBurgers.push(cur)
            }
        })
     
        let orderData = {
            burgers: {
                builtBurgers: buildBurgers, 
                menuBurgers: menuBurgers
            }, 
            contactInfo: this.state.formObj, 
        }
        console.log('--------- ORDER DATA -----------')
        console.log(orderData)
        axios.post('https://char-93c7a.firebaseio.com/orders.json', orderData); 
    }
    
    // removes the burger from the burger state obj. 
    // removeBurger=(burgerId)=>{
    //     let burgers = this.state.burgerArr
    //     const removeElement = (idx) => {
    //         burgers.splice(idx, 1);
    //         this.setState(prevState=>({
    //             burgerArr: burgers
    //         }), burgers.length > 0 ? this.grandTotal : this.setState(prevState=>({grandTotal: 0})))
    //     }
    //     // The event click passes the burger id on the closest parent el... 
    //     burgers.forEach((cur, idx)=>{
    //         if (cur.id === burgerId){
    //             return removeElement(idx)
    //         }
    //     });
    //     console.log(burgers)
    // }
    ////// THIS FUNCTION 1 IS REDUNDANT --- THIS ONE IS NOT NEEDED... PUSH BURGER IS WHAT'S BEING USED. 
    // burgerInfo=(e, builtBurger)=>{
    //     console.log(this.state)
        
    //     e.preventDefault();

    //     this.setState(prevState=>({
    //         burgerArr: prevState.burgerArr.concat(builtBurger)
    //     }), this.showState
    //     )
    //     console.log(builtBurger);
    //     setTimeout(()=>{this.props.history.push('/cart')}, 1000)
 
    // }
    ////// PUSH BURGER WAS REDUNDANT, BUT IS NOW EDITED, WAS BEING USED PRIMARILY BEFORE REDUX> 
    // pushBurger=(builtBurger)=>{
    //     this.setState(prevState=>({
    //         burgerArr: prevState.burgerArr.concat(builtBurger)
    //     }), this.grandTotal
    //     )
     
    // }



    /// Formats the ingredient name to a string that's displayed on the UI. 
    ingName = (ing) => {
        let strArr = Array.from(ing)
        strArr.forEach((cur, idx)=>{
            // If there's a CamelCased Letter, we Need to insert a space before it. 
            if (cur === cur.toUpperCase()){
                let spaceIdx = idx
                strArr.splice(spaceIdx, 0, ' ')
            }
        })
        // Capitalize the first letter of every ingredient, plus the rest of the string, then join the array back to a str. 
        let transString = strArr[0].toUpperCase() + strArr.slice(1).join('')
        // return the result. 
        return transString
    }
    // letsEat=()=>{
    //     this.setState({
    //         introTitle: false
    //     })
    // }
    /// If the window is greater than tablet always show the menu, despite the menu collapsed state. 
    componentDidMount(){
        window.addEventListener('resize', ()=>{
            if(window.outerWidth > 480){
                // this.setState(prevState=>({
                //     menuCollapsed: false
                // }))
                this.props.showMenu()
            }
        })
    }
    render() {
        return (
            <div>
                <Background>
                    {/* LOBBY */}
                    <Header 
                    toggleMenu={this.props.toggleMenu}
                    menuCollapsed={this.props.menuCollapsed}
                    menuItems={[<NavLink to="/Menu">Menu</NavLink>, <NavLink to='build'>Builder</NavLink>,  <NavLink to='/cart' styles='Header__menu__con__cart'><img className="cart" alt="Cart" src={cartIcon} />{this.props.burgerArr.length}</NavLink>] }
                    >
               
                    <Logo/> 
           
                    </Header>
        
                    <Route exact path='/build' render={()=>
                    <BurgerBuilder 
                    ingName={this.ingName}
                    pushBurger={this.props.pushBurger}
                    getGrandTotal={this.props.getGrandTotal}
                    burgerId={this.props.burgerId}
                    assignBurgerId={this.props.assignBurgerId}
                    burgerInfo={this.burgerInfo}/>}

                    // ingredients={this.props.ingredients}
                    // toppings={this.props.toppings}
                    // totalPrice={this.props.totalPrice}
                    // totalIngredients={this.props.totalIngredients}
    
                    

                    />

                    <Route exact path="/cart" render={()=>
                    <Cart 
                    ingName={this.ingName}
                    removeBurger={this.props.removeBurger}
                    showState={this.props.showState}
                    cartItems={this.props.burgerArr} 
                    grandTotal={this.props.grandTotal}
                    getGrandTotal={this.props.getGrandTotal}
                    />
                    }/>

                    <Route exact path="/checkout" render={()=>
                    <Form 
                    resetForm={this.props.reset}
                    deliveryType={this.state.deliveryType} 
                    formInfo={this.formInfo} 
                    formSubmitted={this.state.formSubmitted}
                    />}/>

                    <Route exact path='/menu' render={()=><Menu pushBurger={this.props.pushBurger} showState={this.props.showState} getGrandTotal={this.props.getGrandTotal} burgerId={this.props.burgerId} assignBurgerId={this.props.assignBurgerId}/>}/>
                    <Route exact path='/' render={()=><Intro reduxTest={()=>{console.log('Entry')}} test={this.sayHi}/>}/>
                </Background>
                <Footer>
                <p>{this.props.testingID}</p>
                </Footer>
            </div>
        );
    }

}
// REDUX
const mapStateToProps = (state) =>{
    return {
        /// MAIN
        introTitle: state.main.introTitle,
        burgerId: state.main.burgerId,
        menuCollapsed: state.main.menuCollapsed,
        burgerQty: state.main.burgerQty,
        formSubmitted: state.main.formSubmitted,
        burgerArr: state.main.burgerArr,
        formObj: state.main.formObj,
        grandTotal: state.main.grandTotal, 
        /// BUILDER
        ingredients: state.builder.ingredients,
        toppings: state.builder.toppings,
        totalPrice: state.builder.totalPrice,
        totalIngredients: state.builder.totalIngredients
   

    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        reduxTest: ()=>dispatch({type: actionTypes.REDUXTEST}),
        mainTest:()=>dispatch({type: actionTypes.MAINREDUCERTEST}),
        assignBurgerId: ()=>dispatch({type:actionTypes.ASSIGNBURGERID}),
        toggleMenu: ()=>dispatch({type:actionTypes.TOGGLEMENU}),
        showMenu: ()=>dispatch({type:actionTypes.SHOWMENU}),
        reset: ()=>dispatch({type:actionTypes.RESET}),
        pushBurger: (burger)=>dispatch({type: actionTypes.PUSHBURGER, payload: {burger: burger}}),
        getGrandTotal: ()=>dispatch({type: actionTypes.GRANDTOTAL}),
        letsEat:()=>dispatch({type: actionTypes.LETSEAT}),
        removeBurger:(id)=>dispatch({type: actionTypes.REMOVEBURGER, payload: {id: id}}),
        showState: ()=>dispatch({type:actionTypes.SHOWSTATE}),
        
        

        burgerIngQtyTotal: ()=>dispatch({type:actionTypes.INGTOTAL}),
        burgerTotal: ()=>dispatch({type:actionTypes.BURGERTOTAL}),
        enableLessButtons: ()=>dispatch({type:actionTypes.ENABLELESSBUTTONS}),
        addIngHandler: ()=>dispatch({type:actionTypes.ADDINGHANDLER}),
        removeIngHandler: ()=>dispatch({type:actionTypes.REMOVEINGHANDLER}),
  

    
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));