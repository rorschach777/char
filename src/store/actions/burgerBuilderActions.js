import * as actionTypes from './actionTypes'
import axios from '../../axios/axios';
export const getIngredients = () => {
    return dispatch => {
    axios.get('/ingredients.json')
        .then(ingredients=>{
         axios.get('/toppings.json')
            .then(toppings=>{
                console.log(toppings.data)
                console.log(ingredients.data);
                dispatch({
                    type: actionTypes.GETINGREDIENTS,
                    payload: {
                        ingredients: ingredients.data,
                        toppings: toppings.data
                    }
                })
            });
        })
    }
}
export const burgerLoaded = () => {
    return {
        type: actionTypes.BURGERLOADED,
   
    }
}

export const toggleDialog = (dialogTarget) => {
    console.log(dialogTarget)
    return {
        type: actionTypes.TOGGLEDIALOG,
        payload: {
            target: dialogTarget, 
            targetValue: false
        }
    }
     
}
export const checkIngLength=(totalIngs)=>{
        if(totalIngs >= 12){
           return true
        }
        return false
}
export const addIngredientHandler = (e, el, ingOrTop, burger, totalIngs) => {
    console.log('Burger Builder Actions: Add Ing')
    let target, ingredientQty, transformIngredientQty, showError       
    target = document.getElementById(e.target.id);
    ingredientQty =  parseInt(burger[ingOrTop][el])
    transformIngredientQty = (ingredientQty += 1);


    // Check if ingredients exceed 12... Don't let burger exceed 12 total ings. 
    showError = checkIngLength(totalIngs)
    console.log('------ SHOW ERROR STATUS -------')
    console.log(showError)
    // LESS BUTTON - Check if you should Enable the Less Button
    if (transformIngredientQty === 1 && target.id.includes('inc')) {
        let decButton = target.closest(".ingredient__actions").childNodes[2];
        decButton.disabled = false;
    }
    return {
        type: 'ADDINGREDIENTS', 
        payload: {
            ingOrTop: ingOrTop,
            ingName: el,
            ingQty: transformIngredientQty,
            showError: showError,
            totalIngredients: totalIngs,
        }
    }
}

export const removeIngredientHandler = (e, el, ingOrTop, burger) =>{
    let target, ingredientQty, transformIngredientQty, showError       
    target = document.getElementById(e.target.id);
    ingredientQty =  parseInt(burger[ingOrTop][el])
    transformIngredientQty = (ingredientQty -= 1);
    // Check if ingredients exceed 12... Don't let burger exceed 12 total ings. 
    // showError = checkIngLength(burger)

    // LESS BUTTON - Check if you should Disable the Less Button 
    if (transformIngredientQty === -1){
        return {
            type: actionTypes.REMOVEINGREDIENTS,
            payload: {}
        }
    }
    else if (transformIngredientQty === 0) {
        let decButton = target.closest(".ingredient__actions").childNodes[2];
        console.log(decButton)
        // decButton.disabled = true;
    }
    return {
            type: actionTypes.REMOVEINGREDIENTS, 
            payload: {
                ingOrTop: ingOrTop,
                ingName: el,
                // ingQty: 6
                ingQty: transformIngredientQty,
            }
       
        }
}
// This Runs through Ings added, 
// Then Calculates the Price of the Burger. 
export const burgerTotal=(burger)=>{

    const ingQty = Object.values(burger.ingredients);
    const ingPrice = Object.values(burger.ingredientPrices);
    const topQty = Object.values(burger.toppings);
    const topPrice = Object.values(burger.toppingsPrices);

    const amounts = (ingQty, ingPrice)=>{
        let arr = [...Array(ingQty.length)].map((cur, idx)=>{
            let int = ingQty[idx] * ingPrice[idx];
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

    return {
        type: 'BURGERTOTAL',
        payload: {totalPrice : totalPrice}
    }
}

export const burgerIngQtyTotal=(burger)=>{
    console.log('HI From Burger ING QTY TOTAL')
    const ings = Object.values(burger.ingredients);
    const tops = Object.values(burger.toppings);
    console.log('----- BURGER ING QTY ------ ')
    console.log(ings)
    console.log(tops)

    const arrSubtotal = (arr) => {
        let total = arr.reduce((prev, cur)=>{
            return prev + cur
        })
        return total
    }

    let ingTotal = arrSubtotal(ings)
    let topsTotal = arrSubtotal(tops)
    let total = ingTotal + topsTotal
    console.log(total);
   return {
       type: actionTypes.BURGERINGTOTAL,
       payload: {
        totalIngredients: total
       }
   } 
}
export const assignBurgerId=()=>{
    // this is a global function that can be re-used. 
    // get burger cart length
    // add one to the length
    // use this integer to add to the burger id in order burger. 
}

// export const orderBurger=(e, burger, total)=>{
//     // Z-index & Animation functionality of Burger UI

//     e.preventDefault();
//     let burgerIngs = document.querySelectorAll('.Ingredient-Con');

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
//         ...burger.ingredients
//     }
//     let totalToppings = {
//         ...burger.toppings
//     }
//     let totalPrice = total
//     console.log('Burger Actions: Order Buger')
//     let builtBurger = {
//         id: 'XXX',
//         title: 'Char Custom Burger',
//         totalIngredients,
//         totalToppings, 
//         totalPrice,
//         type: 'build', 

//     }
//     return {
//         type: actionTypes.ORDERBURGER, 
//         payload: {
//             burger: builtBurger
//         }
//     }

// }