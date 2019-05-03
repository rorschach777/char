import React from 'react';
import './Background.scss';
import Aux from '../_MsLib/Hoc/Aux';
import Logo from '../_MsLib/UI/Logo/Logo';
import ButtonLarge from '../../components/_MsLib/UI/Buttons/ButtonLarge/ButtonLarge'
const Background = () => {
    return (
        <Aux>
           <div className="Background">
            <div className="Background__con">
            <Logo/>
            <ButtonLarge text="Let's Eat"/>
            </div>
       
           </div>
        </Aux>
    );
};

export default Background;