import React, { Component } from 'react';
// import AnimChildrenCon from '../components/_MsLib/Con/AnimChildrenCon/AnimChildrenCon';
// import AnimChild from '../components/_MsLib/AnimChild/AnimChildDiv'
import Logo from '../../components/_MsLib/UI/Logo/Logo';
import ButtonLarge from '../../components/_MsLib/UI/Buttons/ButtonLarge/ButtonLarge';
import ContentCon from '../../components/_MsLib/Con/ContentCon/ContentCon';
import Aux from '../../components/_MsLib/Hoc/Aux';
import {NavLink} from 'react-router-dom';
import './_Intro.scss'



class Intro extends Component {

    render() {
    
        return (
            <Aux>
                <ContentCon styles={'Intro'}>
                    <Logo styles={'Intro__Logo'}/>
                    <NavLink to='/build'>
                        <ButtonLarge text="Let's Eat" click={this.props.click} styles={'color-1'} />
                    </NavLink>
        
                        {/* <ButtonLarge click={this.props.reduxTest} text="Let's Eat" styles={'color-1'} /> */}
      
                </ContentCon>
            </Aux>
        );
    }
}

export default Intro;