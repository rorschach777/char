import * as actionTypes from './actionTypes'
import { truncate } from 'fs';
const initialState = {
    // prop: 'X', 
    // introTitle: false, 
    // menuCollapsed: false,
    // formSubmitted: false, 
    // burgerArr:[],
    // formObj: {},
    // grandTotal: 0,
    // burgerQty: 1,
    incInt: 0,
    introTitle: true, 
    burgerId: 'burger-0',
    menuCollapsed: false,
    formSubmitted: false, 
    burgerArr:[],
    formObj: {},
    grandTotal: 0,
    burgerQty: 1

}
const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        /////////////////////////////////
        case actionTypes.SHOWSTATE:{
            console.log('REDUCER SHOW STATE')
            console.log(state)
        }
        /////////////////////////////////
        case actionTypes.ASSIGNBURGERID:
            let int = state.incInt += 1
            let str = `burger-${int}`
            return {
                ...state,
                burgerId: str,
                burgerQty: int,
            }
        /////////////////////////////////
        case actionTypes.TOGGLEMENU:
            return {
                ...state,
                menuCollapsed: !state.menuCollapsed
            }
        /////////////////////////////////
        case actionTypes.SHOWMENU:
            return {
                ...state,
                menuCollapsed: false
            }
        /////////////////////////////////
        case actionTypes.RESET:
            return {
                ...state,
                formSubmitted: false,
                burgerArr: []
            }
        ////////////////////////////////
        case actionTypes.PUSHBURGER:
            let pushedBurgers = state.burgerArr.concat(action.payload.burger)
         
            return{
                ...state,
                burgerArr: pushedBurgers
            }
        ////////////////////////////////
        case actionTypes.GRANDTOTAL:
                let burgers = state.burgerArr
                let prices = []
                burgers.forEach((cur, idx)=>{
                    prices.push(cur.totalPrice)
                })
                let grandTotal = prices.reduce((prev, cur)=>{
                    return prev + cur
                });
            return {
                ...state,
                grandTotal: grandTotal
            }
        ////////////////////////////////    
        case actionTypes.REMOVEBURGER: 
        let updatedArr = [...state.burgerArr]

        const removeElement = (idx) => {
            updatedArr.splice(idx, 1);
            
            return updatedArr
            
        }
        // The event click passes the burger id on the closest parent el... 
        updatedArr.forEach((cur, idx)=>{
            if (cur.id === action.payload.id){
                return removeElement(idx)
            }
        });
        return{
            ...state,
            burgerArr: [...updatedArr]

        }
     
        ////////////////////////////////
        case actionTypes.LETSEAT:
            return{
                ...state,
                introTitle: false
             
            }
    }

    return state
}
export default mainReducer