import React from 'react';
import './_OrderBurger.scss';
import ButtonMedium from '../../../_MsLib/UI/Buttons/ButtonMedium/ButtonMedium';
import MobileCon from '../../../_MsLib/Con/MobileCon/MobileCon';
import DesktopCon from '../../../_MsLib/Con/DesktopCon/DesktopCon';
import {Route, NavLink} from 'react-router-dom'
const OrderBurger = (props) => {
    return (
        <div className="OrderBurger">
        <h3 className>Your Burger</h3>
        <div className="OrderBurger__con stroke-light">
    
            <h5>Order Total: <span>${props.totalPrice}</span></h5>
            <DesktopCon>
                <NavLink to='/checkout'>
                <ButtonMedium
                    styles={'order'}
                    text="Order Now"
                    click={props.click}
                />
                </NavLink>
            </DesktopCon>
        </div>
        </div>
    );
};

export default OrderBurger;