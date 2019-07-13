import * as actionTypes from '../actions/actionTypes';
const initialState = {
    formObj: {},
    formSubmitted: false, 
    delivery: false, 
    controls: {
        firstName: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
                required: true
            },
            placeholder: 'First Name',
            layout: 'col-lg-7 col-md-6', 
            styles: '', 
            touched: false
        },
        lastName: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
                required: true
            },
            placeholder: 'Last Name',
            layout: 'col-lg-5 col-md-6', 
            styles: '', 
            touched: false
        },
        emailAddress: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
                required: true, 
                email: true,
            },
            placeholder: 'Email Address',
            layout: 'col-lg-8 col-md-6', 
            styles: '', 
            touched: false
        },
        phoneNumber: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
                required: true,
               minLength: 10
            },
            placeholder: 'Phone Number',
            layout: 'col-lg-4 col-md-6', 
            styles: '', 
            touched: false
        },
        deliveryType: {
            inputType: 'select',
            elementConfig: {
                options: [
                    {value: null, displayName : '-- SELECT DELIVERY TYPE --'},
                    {value: 'Pickup', displayName : 'Pickup'},
                    {value: 'Delivery', displayName : 'Delivery'} 
                 
                ],
                delivery: false
            }, 
            valid: false, 
            validation: {
                required: true
            },
            placeholder: 'Delivery Method',
            layout: 'col-lg-4 col-md-6', 
            styles: '', 
            touched: false
        },
        address: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
                required: true
                
            },
            placeholder: 'Address',
            layout: 'col-lg-4 col-md-5', 
            styles: '', 
            touched: false
        },
        City: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
                required: true
            },
            placeholder: 'City',
            layout: 'col-lg-4 col-md-4', 
            styles: '', 
            touched: false
        },
        Zip: {
            inputType: 'input',
            elementConfig: {}, 
            valid: false, 
            validation: {
         
                zip: true
           
         
            },
            placeholder: 'Zip',
            layout: 'col-lg-4 col-md-3', 
            styles: '', 
            touched: false
        },
    },
    formIsValid: false
}
const orderFormReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.RESET:
            return {
                ...state,
            }
            case actionTypes.FORMINFO: 
            return {
                ...state
            }
        case actionTypes.INPUTCHANGEDHANDLER:
            return {
                ...state, 
                controls: action.payload.controls,
                formIsValid: action.payload.formIsValid
            }
        case actionTypes.RETURNFORMOBJ: 
        return {
            ...state,
            formObj: action.payload.order, 
            formSubmitted: action.payload.formSubmitted
        }
        case actionTypes.SELECTCHANGE:
            return {
                ...state
            }
        case actionTypes.FORMINFO:
            return {
                ...state, 
                formObj: action.payload.formObj,
                formSubmitted: action.payload.formSubmitted
            }
    }
    return state
}
export default orderFormReducer