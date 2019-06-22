import React, { Component } from 'react';
import Aux from '../components/_MsLib/Hoc/Aux';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import Builder from '../components/Builder/Builder';
import * as switchUtil from '../utils/switchUtil';



import axios from '../axios/axios'; 
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
            console.log('HI from Check Vars')
            ingQty = reduceArr(ings);
            topQty = reduceArr(tops);
            console.log(ingQty)
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
    addIngredientHandler = (e, el, type) => {
        let target = document.getElementById(e.target.id);
        let ingredientQty = this.state[type][el];
        let transformIngredientQty = (ingredientQty += 1);
        let allowIngs = this.checkIngLength()
        if (allowIngs === true){
            this.setState(
                prevState => ({
                    [type]: {
                    ...prevState[type],
                    [el]: transformIngredientQty
                    }
                }), this.burgerTotal
            );
        
            if (transformIngredientQty === 1 && target.id.includes('inc')) {
                let decButton = target.closest(".ingredient__actions").childNodes[2];
                decButton.disabled = false;
            }
            else {
                return;
            }
        }
        // this.setState(
        //     prevState => ({
        //         [type]: {
        //         ...prevState[type],
        //         [el]: transformIngredientQty
        //         }
        //     }), this.burgerTotal
        // );
    
        // if (transformIngredientQty === 1 && target.id.includes('inc')) {
        //     let decButton = target.closest(".ingredient__actions").childNodes[2];
        //     console.log('Dec Button: ')
        //     console.log(decButton)
        //     decButton.disabled = false;
        // }
        // else {
        //     return;
        // }
       
    }
    removeIngredientHandler = (e, el, type) =>{
        let target = document.getElementById(e.target.id);
        let ingredientQty = this.state[type][el];
        let transformIngredientQty = (ingredientQty -= 1);
            if (transformIngredientQty === -1){
                return;
            }
            else if (transformIngredientQty === 0 ){
                if (target.id.includes('inc')){
                    let decButton = target.closest(".ingredient__actions").childNodes[2];
                    console.log(decButton)
                    decButton.disabled = true;
                }
                this.setState(
                    prevState => ({
                        [type]: {
                        ...prevState[type],
                        [el]: transformIngredientQty
                        }
                    }), this.burgerTotal
                );
            }
            else {
                this.setState(
                    prevState => ({
                        [type]: {
                        ...prevState[type],
                        [el]: transformIngredientQty
                        }
                    }), this.burgerTotal
                );
            }
        // this.sumIngredients()
    }
    disableLessButtons = () => {
        let arr = document.querySelectorAll('.ingredient__actions--less');
        arr.forEach((cur, idx)=>{
            cur.disabled = true
        })
    }
    switchIngredientName=(ing)=>{
        let ingStr = switchUtil.ingName(ing)
        return ingStr
    }
    orderBurger=()=>{
        // Z-index & Animation functionality of Burger UI
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
        // Setting the Order object. 
        // ings, toppings, price

        let totalIngredients = {
            ...this.state.ingredients
        }
        let totalToppings = {
            ...this.state.toppings
        }
        let totalPrice = this.state.totalPrice

        let burger = {
            id: this.props.burgerId(),
            title: 'Char Custom Burger',
            totalIngredients,
            totalToppings, 
            totalPrice,
            type: 'build', 
    
        }
        this.setState(prevState=>({
            orderBurgerDialog: !prevState.orderBurgerDialog
        }))
        return burger
    }
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
        axios.get('/ingredients.json').then(response=>{
            this.setState({ingredients: response.data})
        }).then(response=>{
            axios.get('/toppings.json').then(response=>{
                this.setState({toppings: response.data})
            }).then(response=>{
                this.sumIngredients();
                this.burgerTotal();
                this.disableLessButtons();
                this.burgerIngQtyTotal();
            })
           
        
        });
    }
   
    componentDidUpdate(){
        
    }
    render() {

        return (
            <Aux>
          
                <ContentCon style="BurgerBuilder">
                    <Builder 
                    showError={this.state.showError}
                    orderBurgerDialog={this.state.orderBurgerDialog}
                    toggleDialog={this.toggleDialog}
                    ingredients={this.state.ingredients}
                    ingPrices={this.state.ingredientPrices}
                    toppings={this.state.toppings}
                    topPrices={this.state.toppingsPrices}
                    // ingTotal={this.burgerIngQtyTotal()}
                    ingTotal={this.state.totalIngredients}
                    switchIngs={(ing)=>this.switchIngredientName(ing)}
                    addIngs={(e, el, type)=>this.addIngredientHandler(e, el, type)}
                    removeIngs={(e, el, type)=>this.removeIngredientHandler(e, el, type)}
                    totalPrice={this.state.totalPrice}
                    // orderBurger={(e)=>this.props.burgerInfo(e, this.orderBurger())}
                    orderBurger={this.orderBurger}
                    pushBurger={this.props.pushBurger}
                    />
                </ContentCon>
            </Aux>
        );
    }
}
export default BugerBuilder;