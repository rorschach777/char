import React from 'react';
import './Background.scss';
import Aux from '../_MsLib/Hoc/Aux';

const Background = (props) => {
    return (
        <Aux>
           <div className="Background">
                {props.children}
           </div>
        </Aux>
    );
};

export default Background;