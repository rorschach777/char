import React, { Component } from 'react';
import './_Cart.scss';
import ContentCon from '../../components/_MsLib/Con/ContentCon/ContentCon';
import CartItem from '../../components/Cart/CartItem/CartItem';
import OrderBurger from '../../components/Summary/OrderBurger/OrderBurger';
import ButtonMedium from '../../components/_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as rdxActions from '../../store/actions/index';

class Cart extends Component {
    cartItemId=(e)=>{
        let x = e.target
        let target = x.closest('.Cart__item').id
        return target;
    }
    render() {
        return (
            <ContentCon styles="Cart">
                 <div className="u-margin-x">
                   <h3>SHOPPING CART  {this.props.grandPrice}</h3>
                   {/* Come Back and Clean this Up  */}
                   <div className="col-lg-12 col-sm-hide">
                        {/* <div className="Cart__item__img"></div> */}
                        <div className="col-lg-6">
                            <span>Burger Name</span>
                        </div>
                        <div className="col-lg-2">BURGER TYPE</div>
                        <div className="col-lg-2">TOTAL</div>
                        <div className="Cart__item__actions col-lg-2">
                            <span>Actions</span>
                        </div>
                    </div>
                    {this.props.cartItems.map((cur, idx)=>{return (
                    <CartItem
                    key={`cart-item-${idx}`}
                    id={cur.id}
                    idx={idx}
                    title={cur.title}
                    ingName={this.props.ingName}
                    type={cur.type}
                    totalIngredients={cur.totalIngredients}
                    totalToppings={cur.totalToppings}
                    totalPrice={cur.totalPrice}
                    removeBurger={(e)=>
                        {
                        let elementId = this.props.rdxCartItemId(e); 
                        this.props.rdxRemoveBurger(elementId.payload.target, this.props.burgerArr)
                        // this.props.getGrandTotal(this.props.burgerArr)
                        }
                    }
                    />
                    )})}
                    </div>
                    <OrderBurger 
                 
                    styles="Cart__Order-Burger"
                    totalPrice={this.props.grandTotal}
                    >
                    <NavLink to="/checkout">
                        <ButtonMedium
                            styles={'order'}
                            text="Order Now"
                        />
                    </NavLink>
                    </OrderBurger>
                
         
            </ContentCon>
        );
    }
}
const mapStateToProps = state => {
    return {
       burgerArr: state.main.burgerArr
    }
}
const mapDispatchToProps = dispatch => {
    return {
        rdxCartItemId: (e)=>dispatch(rdxActions.cartItemId(e)),
        rdxRemoveBurger: (burgerId, burgerArr)=>dispatch(rdxActions.removeBurger(burgerId, burgerArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);