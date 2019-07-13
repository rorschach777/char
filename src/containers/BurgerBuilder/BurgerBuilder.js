import React, { Component } from 'react';
import Aux from '../../components/_MsLib/Hoc/Aux';
import ContentCon from '../../components/_MsLib/Con/ContentCon/ContentCon';
import Builder from '../../components/Builder/Builder';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes'
import * as rdxActions from '../../store/actions/index'
// import * as switchUtil from '../utils/switchUtil';
import axios from '../../axios/axios'; 
class BugerBuilder extends Component {
    state = {
        ingredients: {
            
        },
        // ingredients: {
        //     cheddar: 0,
        //     american: 0,
        //     swiss: 0,
        //     egg: 0,
        //     bacon: 0,
        //     turkey: 0,
        //     angus: 0,
        //     buffalo: 0,
        // },
 
        ingredientPrices: {
            cheddar: 1.00,
            american: 1.00,
            swiss: 1.25,
            egg: 2.25,
            bacon: 2.25,
            turkey: 3.50,
            angus: 2.75,
            buffalo: 3.75,
        }, 
        toppings: {

        },
        // toppings: {
        //     ketchup: 0,
        //     avacado: 0,
        //     mayo: 0,
        //     onions: 0,
        //     pickles: 0,
        //     lettuce: 0,
        //     tomatoes: 0,
  
        // },
        toppingsPrices: {
            ketchup: 0,
            avacado: 1.00,
            mayo: 0,
            onions: .50,
            pickles: .50,
            lettuce: .50,
            tomatoes: .75,
        },
        totalPrice: 0,
        totalIngredients: 0, 
        showError: false, 
        orderBurgerDialog: false
      
    }
    burgerIngQtyTotal=()=>{
        const ings = Object.values(this.state.ingredients);
        const total = ings.reduce((prev, cur)=>{
            return prev + cur
        })
        this.setState(prevState=>({
            totalIngredients: total
        }))
    }
    burgerTotal=()=>{
        const ingQty = Object.values(this.state.ingredients);
        const ingPrice = Object.values(this.state.ingredientPrices);
        const topQty = Object.values(this.state.toppings);
        const topPrice = Object.values(this.state.toppingsPrices);
        const amounts = (elQty, elPrice)=>{
            let arr = [...Array(elQty.length)].map((cur, idx)=>{
                let int = elQty[idx] * elPrice[idx];
                return int;
            });
            return arr;
        }
        let ingAmount = amounts(ingQty, ingPrice);
        let toppingAmount = amounts(topQty, topPrice);
        let totalAmounts = [...ingAmount, ...toppingAmount]       
        let totalPrice = totalAmounts.reduce((prevInt, cur)=>{
            return prevInt + cur;
        })
        this.setState((prevState, props)=>({
            totalPrice: totalPrice
        }),
        this.burgerIngQtyTotal
        );
    }
    sumIngredients=()=>{
        let ingredients = Object.values(this.state.ingredients);
        let ingredientPrices = Object.values(this.state.ingredientPrices);
        // let totalPrices = ingredients.map((cur, idx) => {
        //   return cur * ingredientPrices[idx];
        // });
        // let totalPrice = totalPrices.reduce((acc, cur) => {
        //   return acc + cur;
        // });
    }
    checkIngLength=()=>{
        let ings, tops, burgerContent, ingQty, topQty
        ings = Object.values(this.state.ingredients)
        tops = Object.values(this.state.toppings)

        let reduceArr =(arr)=>{
            let amount = arr.reduce((prev, cur)=>{
                return prev + cur
            })
            return amount
        }
        let checkVars = ()=> {
            ingQty = reduceArr(ings);
            topQty = reduceArr(tops);
  
            burgerContent = ingQty + topQty
            if(burgerContent >= 12){
                this.setState(prevState=>({
                    showError: !prevState.showError
                }))
                return false;
            }
            return true
        }
        return checkVars()
    }
    // addIngredientHandler = (e, el, type) => {
    //     console.log(`----- PROBLEM: -----`)
    //     console.log(`type: ${type}`)
    //     console.log(`element: ${el}`)
    //     console.log(`----- PROBLEM: -----`)
    //     let target = document.getElementById(e.target.id);
    //     let ingredientQty = this.state[type][el];
    //     console.log(`--- ingQty:  ${ingredientQty} ---`)
    //     let transformIngredientQty = (ingredientQty += 1);
    //     let allowIngs = this.checkIngLength()
    //     if (allowIngs === true){
    //         this.setState(
    //             prevState => ({
    //                 [type]: {
    //                 ...prevState[type],
    //                 [el]: transformIngredientQty
    //                 }
    //             }), this.burgerTotal
    //         );
    //         if (transformIngredientQty === 1 && target.id.includes('inc')) {
    //             let decButton = target.closest(".ingredient__actions").childNodes[2];
    //             decButton.disabled = false;
    //         }
    //         else {
    //             return;
    //         }
    //     }
    //     // this.setState(
    //     //     prevState => ({
    //     //         [type]: {
    //     //         ...prevState[type],
    //     //         [el]: transformIngredientQty
    //     //         }
    //     //     }), this.burgerTotal
    //     // );
    
    //     // if (transformIngredientQty === 1 && target.id.includes('inc')) {
    //     //     let decButton = target.closest(".ingredient__actions").childNodes[2];
    //     //     console.log('Dec Button: ')
    //     //     console.log(decButton)
    //     //     decButton.disabled = false;
    //     // }
    //     // else {
    //     //     return;
    //     // }
       
    // }
    // removeIngredientHandler = (e, el, type) =>{
    //     let target = document.getElementById(e.target.id);
    //     let ingredientQty = this.state[type][el];
    //     let transformIngredientQty = (ingredientQty -= 1);
    //         if (transformIngredientQty === -1){
    //             return;
    //         }
    //         else if (transformIngredientQty === 0 ){
    //             if (target.id.includes('inc')){
    //                 let decButton = target.closest(".ingredient__actions").childNodes[2];
    //                 console.log(decButton)
    //                 decButton.disabled = true;
    //             }
    //             this.setState(
    //                 prevState => ({
    //                     [type]: {
    //                     ...prevState[type],
    //                     [el]: transformIngredientQty
    //                     }
    //                 }), this.burgerTotal
    //             );
    //         }
    //         else {
    //             this.setState(
    //                 prevState => ({
    //                     [type]: {
    //                     ...prevState[type],
    //                     [el]: transformIngredientQty
    //                     }
    //                 }), this.burgerTotal
    //             );
    //         }
    //     // this.sumIngredients()
    // }
    disableLessButtons = () => {
        let arr = document.querySelectorAll('.ingredient__actions--less');
        arr.forEach((cur, idx)=>{
            cur.disabled = true
        })
    }
    switchIngredientName=(ing)=>{
      // let ingStr = switchUtil.ingName(ing)
        // return ingStr
        let ingStr = this.props.ingName(ing)
        return ingStr
    }
    // orderBurger=()=>{
    //     // Z-index & Animation functionality of Burger UI
    //     let burgerIngs = document.querySelectorAll('.Ingredient-Con');
    //     let int = 2;
    //     for (let i = 0; i < burgerIngs.length; i++){
    //         let el = burgerIngs[i]
    //         el.style.minHeight = '1rem'
    //         if (burgerIngs[i].classList.contains('Ingredient--sm')){
    //             el.style.zIndex= 999
    //         }
    //     }
    //     let top = document.querySelector('#bread-top')
    //     let bottom = document.querySelector('#bread-bottom')
    //     top.style.zIndex = 1005
    //     // Setting the Order object. 
    //     // ings, toppings, price

    //     let totalIngredients = {
    //         ...this.state.ingredients
    //     }
    //     let totalToppings = {
    //         ...this.state.toppings
    //     }
    //     let totalPrice = this.state.totalPrice

    //     let burger = {
    //         id: 'X',
    //         title: 'Char Custom Burger',
    //         totalIngredients,
    //         totalToppings, 
    //         totalPrice,
    //         type: 'build', 
    
    //     }
    //     this.setState(prevState=>({
    //         orderBurgerDialog: !prevState.orderBurgerDialog
    //     }))
    //     return burger
    // }
    toggleDialog = (stateTarget) => {
        this.setState(prevState => ({
            [stateTarget]: !prevState[stateTarget]
        }))
    }
    componentWillMount(){

    }
    componentDidMount(){
        // axios.get('https://char-93c7a.firebaseio.com/ingredients.json').then(response=>{
        //     this.setState({ingredients: response.data})
        // });
        ///////// THIS WAS THE ORIGINAL AJAX CALL
        // axios.get('/ingredients.json').then(response=>{
        //     this.setState({ingredients: response.data})
        // }).then(response=>{
        //     axios.get('/toppings.json').then(response=>{
        //         this.setState({toppings: response.data})
        //     }).then(response=>{
        //         this.sumIngredients();
        //         this.burgerTotal();
        //         this.disableLessButtons();
        //         this.burgerIngQtyTotal();
        //     })
           
        
        // });

        this.props.rdxGetIngredients();
    }
    shouldComponentUpdate(nextProps, nextState){
    if (this.props.burger != nextProps.burger || this.props.burgerLoaded != nextProps.burgerLoaded){
          return true
    }
    if (this.props.showError != nextProps.showError || this.props.orderBurgerDialog != nextProps.orderBurgerDialog){
        return true
    }
    return false
 
   
    //   return false

   
    }

    componentDidUpdate(){
                    this.props.rdxBurgerLoaded();
        // if (this.props.burgerLoaded === false){
        //     setTimeout(()=>{
        //         this.props.rdxBurgerLoaded();
        //     },500)
        //     this.props.rdxShowState();
        // }
    }
    render() {


            let builder 

                if (this.props.burgerLoaded) {
              
                builder = 
                <Builder 
                // showError={this.state.showError}
                // orderBurgerDialog={this.state.orderBurgerDialog}
                // toggleDialog={this.toggleDialog}
                // ingredients={this.state.ingredients}
                // ingPrices={this.state.ingredientPrices}
                // toppings={this.state.toppings}
                // topPrices={this.state.toppingsPrices}
                // ingTotal={this.burgerIngQtyTotal()}
                // ingTotal={this.state.totalIngredients}
                switchIngs={(ing)=>this.switchIngredientName(ing)}
                // addIngs={(e, el, type)=>this.addIngredientHandler(e, el, type)}
                // removeIngs={(e, el, type)=>this.removeIngredientHandler(e, el, type)}
                // totalPrice={this.state.totalPrice}
                // orderBurger={(e)=>this.props.burgerInfo(e, this.orderBurger())}
                // orderBurger={this.orderBurger}
                // pushBurger={this.props.pushBurger}
        
                ///// RDX 
                showError={this.props.showError}
                burger={this.props.burger}
                burgerId={this.props.burgerId}
                ingredients={this.props.burger.ingredients}
                ingPrices={this.props.burger.ingredientPrices}
                toppings={this.props.burger.toppings}
                topPrices={this.props.burger.toppingsPrices}
                totalPrice={this.props.totalPrice}
                ingTotal={this.props.totalIngredients}
                click={this.props.rdxShowState}
                burgerArr={this.props.burgerArr}
                loaded={this.props.burgerLoaded}
                burgerId={this.props.burgerId}
                //RDX ACTIONS
                incId={this.props.rdxIncId}
                addIngs={this.props.rdxAddIngredient}
                removeIngs={this.props.rdxRemoveIngredient}
                toggleDialog={this.props.rdxToggleDialog}
                orderBurger={this.props.rdxOrderBurger}
                pushBurger={this.props.pushBurger}
                getGrandTotal={this.props.getGrandTotal}
                orderBurgerDialog={this.props.orderBurgerDialog}
                
        
                />
                 }
                else{
                    builder = null
                }
       
 
       
        
        return (
            <Aux>
          
                <ContentCon styles="BurgerBuilder">
                {builder}
            
                </ContentCon>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        burgerId: state.main.burgerId,
        burgerArr: state.main.burgerArr,
        burgerId: state.main.burgerId, 
        burger: state.burgerBuilder.burger,
        totalPrice: state.burgerBuilder.totalPrice,
        totalIngredients: state.burgerBuilder.totalIngredients,
        showError: state.burgerBuilder.showError, 
        burgerLoaded: state.burgerBuilder.burgerLoaded, 
        orderBurgerDialog: state.burgerBuilder.orderBurgerDialog
      
    }

}
const mapDispatchToProps = dispatch => {
    return {
        // Get Ingredients
        rdxIncId:()=>dispatch(rdxActions.burgerId()),
        rdxBurgerTotal: (burger)=>dispatch(rdxActions.burgerTotal(burger)),
        rdxGetIngredients: ()=>{
            dispatch(rdxActions.getIngredients());
            dispatch(rdxActions.showState());
         
        },
        rdxBurgerLoaded: ()=>{
            dispatch(rdxActions.burgerLoaded());
        },
        // Add An Ingredient
        rdxAddIngredient: (e, el, ingOrTop, burger, totalIngs)=>{
      
            dispatch(rdxActions.addIngredientHandler(e, el, ingOrTop, burger, totalIngs));
            dispatch(rdxActions.burgerIngQtyTotal(burger));
            dispatch(rdxActions.burgerTotal(burger));
            dispatch({type: 'SHOWSTATE'})
    
        },
        // Remove An Ingredient
        rdxRemoveIngredient: (e, el, ingOrTop, burger)=>{
            dispatch(rdxActions.removeIngredientHandler(e, el, ingOrTop, burger));
            dispatch(rdxActions.burgerIngQtyTotal(burger));
            dispatch(rdxActions.burgerTotal(burger))
        },
        // Order The Burger Once Built
        rdxOrderBurger: (e, burger, total, buildType, burgerId)=>dispatch(rdxActions.orderBurger(e, burger, total, buildType, burgerId)),
            // dispatch(rdxActions.burgerId());
          
   
        // Show 12 Ingredient Limit Dialog. 
        rdxToggleDialog: (dialogTarget)=>{dispatch(rdxActions.toggleDialog(dialogTarget)); dispatch(rdxActions.showState())},
        rdxShowState: ()=>dispatch(rdxActions.showState()),
    }
  


}
export default connect(mapStateToProps, mapDispatchToProps)(BugerBuilder);