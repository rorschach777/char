import React from 'react';
import './_Footer.scss';
import Logo from '../../components/_MsLib/UI/Logo/Logo'
const Footer = (props) => {
    return (
        <div className="Footer">
            {props.children}
            <div className="Footer__logo">
                <Logo/>
            </div>
  
            Char Bar &amp; Grill, 2019
        </div>
    );
};

export default Footer;