import React, { Component } from 'react';
import AnimChildrenCon from '../components/_MsLib/Con/AnimChildrenCon/AnimChildrenCon';
import AnimChild from '../components/_MsLib/AnimChild/AnimChild'
import Logo from '../components/_MsLib/UI/Logo/Logo';
import ButtonLarge from '../components/_MsLib/UI/Buttons/ButtonLarge/ButtonLarge'
import Aux from '../components/_MsLib/Hoc/Aux'



class Intro extends Component {
    render() {
        const introElements = [<Logo/>,  <ButtonLarge click={this.props.click} text="Let's Eat"/>]
        return (
            <Aux>
                <AnimChildrenCon>
                    {introElements.map((cur, idx)=>{return (
                        <AnimChild>
                            {cur}
                        </AnimChild>
                    )})}
                </AnimChildrenCon>
            </Aux>
        );
    }
}

export default Intro;