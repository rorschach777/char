import React, { Component } from 'react';
import Background from '../components/Background/Background';
import Intro from './Intro';
import BurgerBuilder from './BurgerBuilder';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon';
import '../assets/styles/project-styles/index.scss';
import posed from 'react-pose';
import {Route} from 'react-router-dom'
const FadeSection = posed.div({
    open: {
        y: '0%',
        opacity: 1, 
        delay: 500, 
        applyAtStart: {display: 'block'}
    }, 
    closed: {
        y: '-500%',
        opacity: 0,
        applyAtEnd: {display: 'none'}
    }
})
class Main extends Component {
    state = {
        introTitle: true
    }
    letsEat=()=>{
        this.setState({
            introTitle: false
        })
    }
    render() {
   

        return (
            <div>
                <Background>
                    {/* LOBBY */}
                    <FadeSection pose={this.state.introTitle ? 'closed' : 'open'}>
                        <BurgerBuilder/>
                    </FadeSection>
                    {/*  */}
                    <FadeSection pose={this.state.introTitle ? 'open' : 'closed'}>
                        <ContentCon style={'char-intro'}>
                            <Intro click={this.letsEat}/>
                        </ContentCon>
                    </FadeSection>
                </Background>
            </div>
        );
    }
}

export default Main;