import React, {Component} from 'react';
import "./_CartItem.scss";
import posed from 'react-pose'
import visibileIcon from '../../../assets/images/icons/icon-visibile.svg';
import deleteIcon from '../../../assets/images/icons/icon-delete.svg';
// import * as switchUtil from '../../../utils/switchUtil'
const CartItemBottom = posed.div({
    open: {
        applyAtStart: {
            display: 'block'
        },
        opacity: 1, 
        x: '0%'
    }, 
    closed: {
        applyAtEnd: {
            display: 'none'
        },
        opacity: 0, 
        x: '-300%'
    }
})

class CartItem extends Component  {
    state={
        open: false,

    }
    toggleVisible=()=>{
        this.setState(prevState=>({
            open: !prevState.open,
        }))
    }
    getBkgImg =(title, type)=>{
        let base = 'Cart__item__name__featured-img'
        if (type === 'menu' ){
         
            if (title === 'Turkey Jack Burger'){
                return `${base}--1`
            }
            else if (title === 'Double Decker Burger'){
                return `${base}--2`
            }
            else if (title === 'Sundried Burger'){
                return `${base}--3`
            }
            else if (title === 'Meatloaf Burger'){
                return `${base}--4`
            }
            else if (title === 'Jalepano Burger'){
                return `${base}--5`
            }
            else if (title === 'Wake Up Burger'){
                return `${base}--6`
            }
            else if (title === 'Hickory Bacon Burger'){
                return `${base}--7`
            }
            else if (title === 'Meat Lovers Burger'){
                return `${base}--8`
            }
    
        }
        else {
            return `${base}--build`
        }
    }
    render(){
        let ingKey = Object.keys(this.props.totalIngredients);
        let ingValue = Object.values(this.props.totalIngredients);
        let topKey = Object.keys(this.props.totalToppings)
        let topValue = Object.values(this.props.totalToppings)
        let ingList = ingKey.map((cur, idx)=>{
            if (ingValue[idx] > 0){
                console.log(ingValue[idx])
                return  <li key={`${cur}-${idx}`}><span>({ingValue[idx]})</span>&nbsp;{this.props.ingName(cur)}</li>
            }
            return 
          
        });
        let topList = topKey.map((cur, idx)=>{
            if (topValue[idx] > 0) {
                return <li key={`${cur}-${idx}`}><span>({topValue[idx]})</span>&nbsp;{this.props.ingName(cur)}</li>
            }
           
        })
        return (
            <div id={this.props.id} className="Cart__item">
                <div className="Cart__item__top col-lg-12-gutterless">
                    <div className="Cart__item__top__name col-lg-6 col-sm-12 ">
                        <div className={`Cart__item__name__featured-img ${this.getBkgImg(this.props.title, this.props.type)}`}></div>
                        <span>{this.props.title}</span>
                    </div>
                    <div className="col-lg-2 col-sm-hide">Type: {this.props.type.charAt(0).toUpperCase()+this.props.type.slice(1)}</div>
                    <div className="col-lg-2 col-sm-hide">Total: {this.props.totalPrice.toFixed(2)}</div>
                    <div className="Cart__item__top__actions col-lg-2 col-sm-12 ">
                        <div className="Cart__item__atop__actions__view">
                            <img src={visibileIcon} />
                            <span 
                            onClick={this.toggleVisible}
                            className={this.state.open ? 'active' : ''}
                            >View</span>
                        </div>
                        <div className="Cart__item__top__actions__delete">
                            <img src={deleteIcon} />
                            <span
                            onClick={this.props.removeBurger}
                            >Delete</span>
                        </div>
                    </div>
                </div>
                <CartItemBottom  pose={this.state.open ? 'open' : 'closed'} className="Cart__item__bottom col-lg-12-gutterless">
                    <div className="Cart__item__bottom__content col-lg-12">
                        <h5>Burger Ingredients:</h5>
                        <div className="Cart__item__bottom__content__ingredients col-lg-9 col-sm-8">
                            <ul>
                                {ingList}
                                {topList}
                            </ul>
                        </div>
                        <div className="Cart__item__bottom__content__price col-lg-3 col-sm-4">
                            <h6>Price: <span>$ {this.props.totalPrice.toFixed(2)}</span></h6>
                        </div>
                    </div>
                </CartItemBottom>
            </div>
        );
    }    
};

export default CartItem;