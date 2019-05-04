import React, { Component } from 'react';
import Header from '../components/_MsLib/Header/Header';
import Logo from '../components/_MsLib/UI/Logo/Logo';
import {LogoImg} from '../assets/images/logo.svg';
import Aux from '../components/_MsLib/Hoc/Aux';
import './BurgerBuilder.scss';
import ContentCon from '../components/_MsLib/Con/ContentCon/ContentCon'
class BugerBuilder extends Component {
    render() {
        return (
            <Aux>
                <Header>
                     <Logo LogoImg={LogoImg}/>
                </Header>
                <ContentCon style="BurgerBuilder">
                    <div className="BurgerBuilder__col">
                        <div className="BurgerBuilder__col__con">
                            <ul>
                                <li>Ingredients</li>
                                <li>Prices</li>
                                <li>Actions</li>
                            </ul>
                        </div>
                       
                    </div>
                    <div className="BurgerBuilder__col">
                        <div className="BurgerBuilder__col__con">
                        
                        </div>
                    </div>
                </ContentCon>
            </Aux>
        );
    }
}

export default BugerBuilder;