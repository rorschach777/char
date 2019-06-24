import * as actionTypes from './actionTypes'
const initialState = {
    prop2: 'Y'
}
const reducer2 = (state = initialState, action) => {
    if(action.type === actionTypes.REDUXTEST){
        alert('Test from Redux 2')
    }
    return state
}
export default reducer2