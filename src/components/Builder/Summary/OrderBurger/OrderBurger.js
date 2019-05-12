import React from 'react';
import './_OrderBurger.scss';
import ButtonMedium from '../../../_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';
const OrderBurger = (props) => {
    return (
        <div className="OrderBurger">
           <h3>Your Burger</h3>
           <h5>Order Total: <span>${props.totalPrice}</span></h5>
           <ButtonMedium
            text="Order Now"
           />
        </div>
    );
};

export default OrderBurger;