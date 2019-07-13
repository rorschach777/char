import * as actionTypes from '../actions/actionTypes'
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { consoleLog } from '../actions/testing';

// burgerTotal, ingTotal

const initialState = {
    
    burger: {

        ingredientPrices: {
            american: 1.00,
            angus: 2.75,
            bacon: 2.25,
            buffalo: 3.75,
            cheddar: 1.00,
            egg: 2.25,
            swiss: 1.25,
            turkey: 3.50,
        
   
        }, 

        toppingsPrices: {
            ketchup: 0,
            avacado: 1.00,
            mayo: 0,
            onions: .50,
            pickles: .50,
            lettuce: .50,
            tomatoes: .75,
        }
    },
    burgerLoaded: false,
    totalPrice: 0,
    totalIngredients: 0, 
    showError: false, 
    orderBurgerDialog: false
}
const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOWSTATE : 
        console.log(state)
        return {
            ...state
        }
        case actionTypes.GETINGREDIENTS:
                console.log('Burger Builder Reducer: Get Ingredients')

              
                return {
                    ...state,
                   
                    burger: {
                        ...state.burger,
                        ingredients: action.payload.ingredients,
                        toppings :  action.payload.toppings,
           
                   
                    },
             
                  
                }
        case actionTypes.BURGERLOADED:
            return {
                ...state,
                burgerLoaded : true
            }  
        case actionTypes.ADDINGREDIENTS: 
        console.log('Burger Builder Reducer: Add Ingredients')

        if (action.payload.totalIngredients >= 12) {

            console.log(typeof(action.payload.showError))
            return {
                ...state, 
                showError: action.payload.showError
            }
        }
        else {
            return {
                ...state,
                burger: {
                    ...state.burger,
                    ...state.burger[action.payload.ingOrTop],
                    ...state.burger[action.payload.ingOrTop] = {
                      ...state.burger[action.payload.ingOrTop],
                       [action.payload.ingName]: action.payload.ingQty
                    }
                },

            }
        }

        case actionTypes.REMOVEINGREDIENTS:

            return {
                ...state,
                
                burger: {
                    ...state.burger,
                    ...state.burger[action.payload.ingOrTop],
                    ...state.burger[action.payload.ingOrTop] = {
                        ...state.burger[action.payload.ingOrTop],
                        [action.payload.ingName]: action.payload.ingQty
                    }
                },
                showError: action.payload.showError

                // state,
                // [action.payload.ingType] : {
                //     ...state[action.payload.ingType],
                //     [action.payload.ingName]:[action.payload.ingQty]
                // }
        }
        case actionTypes.BURGERINGTOTAL:
            console.log('---- BURGER ING totalIngs----')

            return {
                ...state,
                totalIngredients: action.payload.totalIngredients
        }
        case actionTypes.TOGGLEDIALOG: 
        console.log('Burger Builder Reducer: Toggle Dialog');
    

        return {
            ...state, 
            [action.payload.target]: action.payload.targetValue

        }
        case actionTypes.BURGERTOTAL: 
        console.log(state)
        return {
            ...state, 
            totalPrice : action.payload.totalPrice
         
        }
        case actionTypes.ORDERBURGER:
        console.log(action.payload.burger.type)
        if (action.payload.burger.type === 'build'){
            return{
                ...state, 
                orderBurgerDialog: true
            }
        }
        else {
            return{
                ...state, 

            }
        }
   
    }
    
    return state
}
export default burgerBuilderReducer


