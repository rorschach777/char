import React, { Component } from 'react';
import './_CheckControl.scss';
import Aux from '../../../_MsLib/Hoc/Aux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class CheckControl extends Component {
    state = {
        added: true, 
    }
    disable = (e)=>{
        this.setState(prevState=>({
            added: !prevState.added
        }))
    }
    render(){
  
        let iconChecked= <FontAwesomeIcon icon="check-circle" />;
        let iconRemoved= <FontAwesomeIcon icon="times-circle" />;
        return (
            <Aux>
               <button 
               id={`${this.props.current}-more`} 
               className={this.state.added ?  'ingredient__actions--added' : 'ingredient__actions--remove'}
               onClick={ this.state.added ? (e)=>this.props.add(e, this.props.current, this.props.type, this.disable()) : (e)=>this.props.remove(e, this.props.current, this.props.type, this.disable())}
               >
               {this.state.added ? iconChecked : iconRemoved}&nbsp;&nbsp;{this.state.added ? 'Add' : 'Remove'} 
               </button>
            </Aux>
        );
    }
   
    

  
};
export default CheckControl;