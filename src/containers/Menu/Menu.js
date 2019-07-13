import React, { Component } from 'react';
import ContentCon from '../../components/_MsLib/Con/ContentCon/ContentCon';
import MenuCard from '../../components/Menu/MenuCard/MenuCard';
import CharDialog from '../../components/UI/CharDialog/CharDialog';
import * as rdxActions from '../../store/actions/index';
import {connect} from 'react-redux';
import axios from '../../axios/axios';
import './_Menu.scss';
class Menu extends Component {
    state = {
        showDialog: false,
        // This object is in the db. 
        burgerMenu: {}
    }
    toggleDialog = () => {
        this.setState(prevState => ({
            showDialog: !prevState.showDialog
        }))
    }
    componentDidMount () {
        // Go out to axios, and get menu burger data. 
        axios.get('/menuBurgers.json')
        .then(burgers=>{
            this.setState(prevState=>({
                burgerMenu: Object.assign(prevState.burgerMenu, burgers.data[0])
            }))
        })
    }
    render() {
        const burgerMenuArr = Object.keys(this.state.burgerMenu)
        const offsetIdx = (idx) => {
            return idx + 1
        }
        return (
            <div>
                <CharDialog 
                   show={this.state.showDialog}
                   click={this.toggleDialog}
                   message={'You added a burger from our menu'}
                   buttonText={'Sounds Good!'}
                />
                <ContentCon styles='Menu'>
                <h3 className="content-heading">Specialty Burgers</h3>
                    {
                        burgerMenuArr.map((cur, idx)=>{
                            return <MenuCard 
                            key={`Menu-Item-${idx}`}
                            id={`menu-card-${idx}`}
                            title={this.state.burgerMenu[cur].title} 
                            subTitle={this.state.burgerMenu[cur].subTitle} 
                            ingredients={this.state.burgerMenu[cur].totalIngredients}
                            toppings={this.state.burgerMenu[cur].totalToppings}
                            modifier={offsetIdx(idx)}
                            description={this.state.burgerMenu[cur].description}
                            totalPrice={this.state.burgerMenu[cur].totalPrice.toFixed(2)}
                            // Click Method. 
                            click={(e)=>{
                            let response = this.props.rdxOrderBurger(e, this.state.burgerMenu, this.state.burgerMenu[cur].totalPrice.toFixed(2), 'menu', this.props.burgerId); 
                            let builtBurger = response.payload.burger; 
                            this.props.pushBurger(e, builtBurger);
                            this.props.rdxIncId();
                        
                            }
                            }
                            />
                        })
                    }
              
                </ContentCon>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        burgerId: state.main.burgerId,
        burgerArr: state.main.burgerArr
    }
} 
const mapDispatchToProps = dispatch => {
    return {
        rdxIncId: ()=>dispatch(rdxActions.burgerId()),
        rdxOrderBurger: (e, burger, total, buildType, burgerId)=>dispatch(rdxActions.orderBurger(e, burger, total, buildType, burgerId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);