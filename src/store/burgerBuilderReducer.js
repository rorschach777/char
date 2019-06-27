import * as actionTypes from '../store/actionTypes'

// burgerTotal, ingTotal

const initialState = {
    ingredients: {
        american: 0,
        angus: 0, 
        bacon: 0, 
        buffalo: 1, 
        cheddar: 0, 
        egg: 0, 
        swiss: 0, 
        turkey: 0
    },

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
        avacado: 0, 
        ketchup: 0, 
        lettuce: 0, 
        mayo: 0, 
        pickles: 0, 
        tomatoes: 0
    },
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
const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        /////////////////////////////////////
        case actionTypes.INGTOTAL:
            console.log()
            const ings = Object.values(state.ingredients);
            const total = ings.reduce((prev, cur) => {
                return prev + cur
            })
            return {
                ...state,
                totalIngredients: total
            }
        /////////////////////////////////////
        case actionTypes.BURGERTOTAL:
            const ingQty = Object.values(state.ingredients);
            const ingPrice = Object.values(state.ingredientPrices);
            const topQty = Object.values(state.toppings);
            const topPrice = Object.values(state.toppingsPrices);
            const amounts = (elQty, elPrice) => {
                let arr = [...Array(elQty.length)].map((cur, idx) => {
                    let int = elQty[idx] * elPrice[idx];
                    return int;
                });
                return arr;
            }
            let ingAmount = amounts(ingQty, ingPrice);
            let toppingAmount = amounts(topQty, topPrice);
            let totalAmounts = [...ingAmount, ...toppingAmount]
            let totalPrice = totalAmounts.reduce((prevInt, cur) => {
                return prevInt + cur;
            })
            return {
                ...state,
                totalPrice: totalPrice
            }

        /// WHAT'S THIS:
        // this.burgerIngQtyTotal
        case actionTypes.CHECKINGLENGTH: 
  
        let checkLengthIngs, tops, burgerContent, checkLengthIngQty, checkLengthTopQty
        checkLengthIngs = Object.values(state.ingredients)
        tops = Object.values(state.toppings)

        let reduceArr =(arr)=>{
            let amount = arr.reduce((prev, cur)=>{
                return prev + cur
            })
            return amount
        }
        let checkVars = ()=> {
            checkLengthIngQty = reduceArr(checkLengthIngs);
            checkLengthTopQty = reduceArr(tops);

            burgerContent = checkLengthIngQty + checkLengthTopQty
            if(burgerContent >= 12){
                this.setState(prevState=>({
                    showError: !prevState.showError
                }))
                return false;
            }
            return true
        }
                    
        return checkVars()
        case actionTypes.ENABLELESSBUTTONS:
            let lessTarget = action.payload.event
            if (transformIngredientQty === 1 && lessTarget.id.includes('inc')) {
                let decButton = lessTarget.closest(".ingredient__actions").childNodes[2];
                decButton.disabled = false;
            }
        /////////////////////////////////////
        case actionTypes.ADDINGHANDLER:
            /// PASS EVENT, ELEMENT, & TYPE
            console.log(`----- PROBLEM: -----`)
            console.log(`type: ${action.payload.type}`)
            console.log(`element: ${action.payload.el}`)
            console.log(`----- PROBLEM: -----`)
            action.payload.e.preventDefault();
            // let addTarget = document.getElementById(action.payload.e.addTarget.id);
            let ingredientQty = state[action.payload.type][action.payload.el];
            console.log(`--- ingQty:  ${ingredientQty} ---`)
            let transformIngredientQty = (ingredientQty += 1);
            // let allowIngs = this.checkIngLength()
            console.log(state)
            // if (allowIngs === true) {
                // return {
                //     ...state,
                //     [action.payload.type]: {
                //         ...state[action.payload.type],
                //         [action.payload.el]: transformIngredientQty
                //     }
                // }
        
                // what's this. 
                // this.burgerTotal
            // }
            /////////////////////////////////////
            case actionTypes.REMOVEINGHANDLER:
    
                    // if (removeAllowIngs === true) {
                    //     return {
                    //         ...state,
                    //         [action.payload.type]: {
                    //             ...state[action.payload.type],
                    //             [action.payload.el]: removeTransformIngredientQty
                    //         }
                    //     }
                    //     // what's this. 
                    //     // this.burgerTotal
                    // }
                  /////////////////////////////////////               
            case actionTypes.ORDERBURGER:
            // we have to receive the burger ID from the payload... 

        // Z-index & Animation functionality of Burger UI
        let burgerIngs = document.querySelectorAll('.Ingredient-Con');
        let int = 2;
        for (let i = 0; i < burgerIngs.length; i++){
            let el = burgerIngs[i]
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
            ...state.ingredients
        }
        let totalToppings = {
            ...state.toppings
        }
        let burgerTotalPrice = state.totalPrice
        // what's this doing: 
        // this.props.assignBurgerId()

        let burger = {
            id: action.payload.id,
            title: 'Char Custom Burger',
            totalIngredients,
            totalToppings, 
            burgerTotalPrice,
            type: 'build', 
        }
        console.log(burger)
        return burger

    }
    return state
}
export default burgerBuilderReducer


// disableLessButtons = () => {
//     let arr = document.querySelectorAll('.ingredient__actions--less');
//     arr.forEach((cur, idx)=>{
//         cur.disabled = true
//     })
// }

// toggleDialog = (stateTarget) => {
//     this.setState(prevState => ({
//         [stateTarget]: !prevState[stateTarget]
//     }))
// }