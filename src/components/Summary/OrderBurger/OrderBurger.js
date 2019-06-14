import React from 'react';
import './_OrderBurger.scss';
import ButtonMedium from '../../_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';

import DesktopCon from '../../_MsLib/Con/DesktopCon/DesktopCon';
import {Route, NavLink, Redirect} from 'react-router-dom'
const OrderBurger = (props) => {
    let price = props.totalPrice.toFixed(2)
    return (
        <div className={`OrderBurger ${props.styles}`}>
            <h3 className>{props.headline}</h3>
            <div className="OrderBurger__con stroke-light">
                <h5>Order Total: <span>${price}</span></h5>
     
                        {props.children}
                        <NavLink to="/checkout">
                        {/* <ButtonMedium
                            styles={'order'}
                            text="Order Now"
                            click={props.click}
                        /> */}
                    </NavLink>
            </div>
        </div>
    );
};

export default OrderBurger;