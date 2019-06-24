import * as actionTypes from './actionTypes'
const initialState = {
    prop: 'X'
}
const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.REDUXTEST){

        alert('Test from Redux')

    }
    return state
}
export default reducer