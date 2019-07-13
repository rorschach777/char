import * as actionTypes from '../actions/actionTypes'

export const showState = (passedVal) => {

    console.log(`----- ${passedVal} ------`);
}
export const consoleLog = (passedVal) => {
    console.log(`---- TESTING ACTION: ----- `);
    console.log(passedVal);
}

export const helloFromBB = (e, x) => {
    e.preventDefault();

    return {
        type: actionTypes.DOSOMETHING
    }
}