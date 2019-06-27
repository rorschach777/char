import React, { Component } from 'react';
import ContentCon from '../../components/_MsLib/Con/ContentCon/ContentCon';
import MenuCard from '../../components/Menu/MenuCard/MenuCard';
import CharDialog from '../../components/UI/CharDialog/CharDialog';
import './_Menu.scss';

class Menu extends Component {
    state = {
        showDialog: false
    }
    toggleDialog = () => {
        this.setState(prevState => ({
            showDialog: !prevState.showDialog
        }))
    }
    render() {
        const orderBurger = (e) => {
         
                // locate the event id, use this to select from the menu data. 
                let eTargetParent = e.target.closest('.Menu__card')
                let targetId = eTargetParent.id
                let splitTarget = targetId.split('-')
                let idx = parseInt(splitTarget[2]) + 1
                let menu = burgerMenu
                let dataElement = `burger${idx.toString()}`
                // get the burger contents
                let totalIngredients = menu[dataElement].totalIngredients
                let totalToppings = menu[dataElement].totalToppings
                let totalPrice = menu[dataElement].totalPrice
                let title = menu[dataElement].title
                // return the burger to send the main container state, burger array. 
                // let burger = {
                //   id: this.props.burgerId(),
                //   title, 
                //   totalIngredients, 
                //   totalToppings, 
                //   totalPrice, 
                //   type: 'menu'  
                // } 

                // this.props.assignBurgerId()

                let burger = {
                    id: this.props.burgerId,
                    title, 
                    totalIngredients, 
                    totalToppings, 
                    totalPrice, 
                    type: 'menu'  
                  } 
                console.log(burger)
                return burger;

        }
        const burgerMenu = {
            burger1: {
                title: 'Turkey Jack Burger',
                subTitle: '850 Calories',
                description: 'Sharp Jack Cheese, Turkey Patty, Red Raw Onion, Mayo, Lettuce, Potato Roll',
                totalIngredients: {
                    turkeyPatty: 1,
                    jackCheese: 2,
                },
                totalToppings: {
                    mayo: 1, 
                    lettuce: 1,
                },
                totalPrice: 16.50
            },
            burger2: {
                title: 'Double Decker Burger',
                subTitle: '1600 Calories',
                description: 'Two Angus Patties, Onion, Chipotle Habenaro Sauce, Onion, Lettuce, Sesame Seed Roll ',
                totalIngredients: {
                    angus: 2,
                },
                totalToppings:{
                    onion: 1,
                    chipotleHabenaro: 1,
                    lettuce: 1,
                    sesameRoll: 1
                },
                totalPrice: 15.50
            },
            burger3: {
                title: 'Sundried Burger',
                subTitle: '1000 Calories',
                description: 'Two Angus Patties, Sundried Tomatoe, Colby Jack, Meunster Cheese, Lettuce, Onion, Mushroom',
                totalIngredients: {
                    angus: 2,
                    colbyJack: 2, 
                    meunsterCheese: 2
                },
                totalToppings: {
                    sundriedTomatoe: 3,
                    lettuce: 1, 
                    onion: 1, 
                    mushroom: 1
                 
                },
                totalPrice: 18.50
            },
            burger4: {
                title: 'Meatloaf Burger',
                subTitle: '850 Calories',
                description: 'Specially crafted meatloaf patty, worchester sauce, lettuce, tomatoe, and arugula',
                totalIngredients: {
                    meatloaf: 1,
            
                },
                totalToppings: {
                    worchester: 1,
                    lettuce: 1, 
                    tomatoe: 1, 
                    arugala: 1 
                },
                totalPrice: 14.75
            },
            burger5: {
                title: 'Jalepano Burger',
                subTitle: '1100 Calories',
                description: 'Angus patty, chipoltle southwest sauce, onion, milky cheddar, jalepano peppers, tomatoe',
                totalIngredients: {
                    angus: 1, 
                    milkyCheddar: 1
                },
                totalToppings: {
                    chipotleSouthWest: 1,
                    onion: 1,
                    jalepanoPeppers: 1, 
                    tomatoe: 1
                },
                totalPrice: 13.00
            },
            burger6: {
                title: 'Wake Up Burger',
                subTitle: '1200 Calories',
                description: 'Fried Egg, Angus Patty, tomatoe, maple bacon, american cheese',
                totalIngredients: {
                    angus: 1, 
                    friedEgg: 2, 
                    mapleBacon: 1,
                    americanCheese: 1

                },
                totalToppings: {
                    tomatoe: 1,
                },
                totalPrice: 13.50
            },
            burger7: {
                title: 'Hickory Bacon Burger',
                subTitle: '1100 Calories',
                description: 'Bourbon bison patty, hickory smoked bacon, letuce, tomatoe, carmelized onions ',
                totalIngredients: {
                    bison: 1, 
                    hickoryBacon: 1, 
                    
                },
                totalToppings: {
                    lettuce: 1,
                    tomatoe: 1, 
                    carmelizedOnions: 1
                },
                totalPrice: 14.95
            },
            burger8: {
                title: 'Meat Lovers Burger',
                subTitle: '1500 Calories',
                description: '2 Angus patties,  1 sausage patty, cheddar cheese, topped with crispy bacon, on English muffin',
                totalIngredients: {
                    angus: 2,
                    sausage: 1,
                    cheddar: 1,
                    crispyBacon: 1
                },
                totalToppings: {
                    englishMuffin:1
                },  
                totalPrice: 17.95
            },
        }
        const burgerMenuArr = Object.keys(burgerMenu)
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
                            title={burgerMenu[cur].title} 
                            subTitle={burgerMenu[cur].subTitle} 
                            ingredients={burgerMenu[cur].totalIngredients}
                            toppings={burgerMenu[cur].totalToppings}
                            modifier={offsetIdx(idx)}
                            description={burgerMenu[cur].description}
                            totalPrice={burgerMenu[cur].totalPrice.toFixed(2)}
                            click={(e)=>{let x = orderBurger(e); this.props.pushBurger(x); }}
                            />
                        })
                    }
              
                </ContentCon>
            </div>
        );
    }
}

export default Menu;