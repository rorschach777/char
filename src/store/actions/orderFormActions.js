import * as actionTypes from './actionTypes';
import axios from '../../axios/axios'

export const reset =()=>{
    // this.setState(prevState=>({
    //     formSubmitted: false, 
    //     burgerArr: []
    // }))
    return {
        type: "SOMETHING"
    }
}
const checkValidity=(value, rules)=>{
    let isValid = true; 
 
    if (rules.required){
        isValid = value.length > 0 && isValid;
    }
    if (rules.email){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength
       
    }
    if(rules.zip){
        isValid = value.length === 5
    }
    return isValid;

}
export const inputChangedHandler = (event, inputIdentifier, controls) => {
    
    const updatedOrderForm = {
        // Need this
        ...controls
    };
    // look at the touched input element
    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };
    // get the value
    updatedFormElement.value = event.target.value;
    // checkValidity method.
    updatedFormElement.valid  = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    // Check regarding delivery or 
    if (inputIdentifier === 'deliveryType' && event.target.value === 'Delivery'){
        updatedFormElement.elementConfig.delivery = true
        console.log('true')
    }
    else if (inputIdentifier === 'deliveryType' && event.target.value === 'Pickup'){
        updatedOrderForm.address.valid = true;
        updatedOrderForm.address.touched = true;
        updatedOrderForm.City.valid = true;
        updatedOrderForm.City.touched = true;
        updatedOrderForm.Zip.valid = true;
        updatedOrderForm.Zip.touched = true;
        
        // updatedFormElement.City.valid = true, 
        // updatedFormElement.Zip.valid = true

    }
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    // this.setState({controls: updatedOrderForm, formIsValid: formIsValid})
    return {
        type: actionTypes.INPUTCHANGEDHANDLER,
        payload: {
            controls: updatedOrderForm,
            formIsValid: formIsValid
        }
    }
}

export const returnFormObj = (e, controls) => {
    e.preventDefault();
    let formValueGroups = document.querySelectorAll('.Form__row__input-group');
    // pass controls
    const formKeys = Object.keys(controls)
    const formValues = [];

    formValueGroups.forEach((cur, idx)=>{
       formValues.push(cur.childNodes[1].value)
    });
    let order = Object.assign(...formKeys.map((cur, idx)=>({[cur]: formValues[idx]})));
    console.log(order)
    // return order
    return {
        type: actionTypes.RETURNFORMOBJ, 
        payload: {
            order: order, 
            formSubmitted: true
        }
    }
}

export const selectChange = (e)=> {
    // if (e.target.value === 'Delivery'){
    //     this.setState(prevState=>({
    //         delivery: true
    //     }))
    // }
    // else if (e.target.value === 'Pickup'){
    //     this.setState(prevState=>({
    //         delivery: false
    //     }))
    // }
    return {
        type: 'SOMETHING'
    }
}

// export const formInfo = (e, formObj)=>{
//     let updatedFormObj = formObj
//     return {
//         type: actionTypes.FORMINFO,
//         payload: {
//             formObj:formObj,
//             formSubmitted: true
//         }

//     }
// }

export const sendOrder=(burgers, contactInfo)=>{
    let buildBurgers, menuBurgers, allBurgers
    buildBurgers = []
    menuBurgers = []
    allBurgers = [...burgers]

    allBurgers.map((cur, idx)=>{
        if (cur.type === 'build'){
            buildBurgers.push(cur)
        }
        else {
            menuBurgers.push(cur)
        }
    })
 
    let orderData = {
        burgers: {
            builtBurgers: buildBurgers, 
            menuBurgers: menuBurgers
        }, 
        contactInfo: {...contactInfo}, 
    }
    console.log('Form Actions: Send Order: ')
    console.log(orderData)
    axios.post('https://char-93c7a.firebaseio.com/orders.json', orderData); 
    return {
        type: actionTypes.SENDORDER
    }
}
