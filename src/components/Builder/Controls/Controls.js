import React from 'react';

import Aux from '../../_MsLib/Hoc/Aux';
import './_Controls.scss';
const Controls = (props) => {
 
    
    return (
        <Aux>
            <button id={`${props.current}-more--inc`}  className="ingredient__actions__base ingredient__actions--more" onClick={(e)=>{props.add(e, props.current, props.type)}}>More</button>
            <button id={`${props.current}-less--inc`}  className="ingredient__actions__base ingredient__actions--less"  onClick={(e)=>props.remove(e, props.current, props.type)}>Less</button>
        </Aux>
    );
};

export default Controls;