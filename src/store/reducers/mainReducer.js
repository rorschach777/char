import * as actionTypes from '../actions/actionTypes'
import * as rdxActions from '../actions/index';
const initialState = {
        introTitle: false, 
        menuCollapsed: false,
        burgerArr:[],
        grandTotal: 0,
        burgerId: 1,
}
const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOWSTATE:
            return {
                ...state
            }
        case actionTypes.RETURNSTATE:
     
            return {
                ...state
            }
        case actionTypes.BURGERID:
     
            return {
                ...state, 
                burgerId: state.burgerId += 1
            }
        case actionTypes.TEST:
            return {
                ...state
            }
        case actionTypes.PUSHBURGER:
            return {
                ...state,
                burgerArr: state.burgerArr.concat(action.payload.pushedBurger),

            }
        case actionTypes.CARTITEMID: 
        return{
            ...state
        }
        case actionTypes.REMOVEBURGER:
        return {
            ...state, 
            burgerArr: [...action.payload.burgerArr]
        }
        case actionTypes.GETGRANDTOTAL:
            return {
                ...state,
                grandTotal: action.payload.grandTotal
            }
    }
    return state
}
export default mainReducer;