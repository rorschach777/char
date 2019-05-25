import React, { Component } from 'react';
import ContentCon from '../../components/_MsLib/Con/ContentCon/ContentCon';
import './_Form.scss';
import Input from '../../components/_MsLib/UI/Form/Input/Input';
import Select from '../../components/_MsLib/UI/Form/Select/Select';
import ButtonMedium from '../../components/_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';
import {NavLink} from 'react-router-dom';


export class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            formIsValid: false, 
            checkoutMessage: 'Please Enter Your Info Above'
        }
    }
    sayHi=(e)=> {
        e.preventDefault();
        console.log('hi');
    }
    selectChange = (e)=> {
        if (e.target.value === 'Delivery'){
            this.setState(prevState=>({
                delivery: true
            }))
        }
        else if (e.target.value === 'Pickup'){
            this.setState(prevState=>({
                delivery: false
            }))
        }
    }
 
    checkValidity(value, rules){
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
    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid  = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
        this.setState({controls: updatedOrderForm, formIsValid: formIsValid})
        console.log(this.state)
      
    }
    returnFormObj = () => {
        // e.preventDefault();
        let formValueGroups = document.querySelectorAll('.Form__row__input-group');
        const formKeys = Object.keys(this.state.controls)
        const formValues = [];
 
        formValueGroups.forEach((cur, idx)=>{
           formValues.push(cur.childNodes[1].value)
        });
        let order = Object.assign(...formKeys.map((cur, idx)=>({[cur]: formValues[idx]})));
        console.log(order)
        return order
    }
  
    render() {
        let formElements = [];
        // setting an index that increase
        let formElIdx = 0
        for (let key in this.state.controls){
            formElements.push({
                id:key,
                config: this.state.controls[key]

            })
        }
        let formElementsJSX = formElements.map((cur, idx) => {
            return (
                <div key={cur.id} className={`Form__row__input-group ${cur.config.layout}`}>
                    <Input
                        isValid={cur.config.valid}
                        inputType={cur.config.inputType}
                        placeholder={cur.config.placeholder}
                        elementConfig={cur.config.elementConfig}
                        inputChanged={(e)=>{this.inputChangedHandler(e, cur.id)}}
                        styles={!cur.config.valid && cur.config.touched ? 'invalid' : null}
                    />
                </div>
            )
        })
        let incIdx = () => {
            formElIdx += 1
        }
        let returnThreeInputs = ()=>{
            let input1 = formElementsJSX[formElIdx]
            incIdx()
            let input2 = formElementsJSX[formElIdx]
            incIdx()
            let input3 = formElementsJSX[formElIdx]
            incIdx()
            let arr = [input1, input2, input3];
            if (arr.length > formElementsJSX.length){
                return;
            }
            else {
                return (
                    arr
                )
            }
        }
        let returnTwoInputs = ()=>{
            let input1 = formElementsJSX[formElIdx]
            incIdx()
            let input2 = formElementsJSX[formElIdx]
            incIdx()
            let arr = [input1, input2];
            if (arr.length > formElementsJSX.length){
                return;
            }
            else {
                return (
                    arr
                )
            }
        }
        let returnOneInput = ()=>{
            let input1 = formElementsJSX[formElIdx]
            incIdx()
        
            let arr = [input1];
            if (arr.length > formElementsJSX.length){
                return;
            }
            else {
                return (
                    arr
                )
            }
        }
 
 

  
        return (
            <ContentCon>
                <form>
                    <div className="Form">
                        <h3>Order Form</h3>
                        <div className="Form__row">
                            {returnTwoInputs()}
                        </div>
                        <div className="Form__row">
                            {returnTwoInputs()}
                        </div>
                        <div className="Form__row">
                            {returnOneInput()}
                        </div>
                        <div className={`Form__row ${!this.state.controls.deliveryType.elementConfig.delivery ? 'u-hide' : ' '}`}>
                            {this.state.controls.deliveryType.elementConfig.delivery ? returnThreeInputs() : null }
                        </div>
                        <div className="Form__actions">
                            <h5>{this.state.formIsValid ? 'Looks Good, Please Confirm' : 'Please Enter Your Information Above'}</h5>
                            <NavLink to="/build"><ButtonMedium text="EDIT ORDER" styles='Form__actions__btn edit' /></NavLink>
                            <ButtonMedium text="CONFIRM ORDER" styles='Form__actions__btn checkout' click={(e)=>this.props.formInfo(e, this.returnFormObj() )} disabled={!this.state.formIsValid}/>
                            
                        </div>
                    </div>
           
                </form>
             
            </ContentCon>
      
        );
    }
}
