import React from 'react';
import Aux from '../_MsLib/Hoc/Aux';
import './_Background.scss'
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