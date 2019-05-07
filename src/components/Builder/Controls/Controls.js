import React from 'react';

import Aux from '../../_MsLib/Hoc/Aux'
const Controls = (props) => {
    return (
        <Aux>
            <button id={`${props.current}-more`}  className="ingredient__actions--more" onClick={(e)=>props.add(e, props.current)}>More</button>
            <button id={`${props.current}-less`} className="ingredient__actions--less"  onClick={(e)=>props.remove(e, props.current)}>Less</button>
        </Aux>
    );
};

export default Controls;