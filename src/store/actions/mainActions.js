import * as actionTypes from './actionTypes';


export const showState = () =>{
    console.log('Main Action: Show State:')
    return {
        type: actionTypes.SHOWSTATE
    }
}
// export const pushBurger = (e, passedBurger) => {
//     e.preventDefault();
//     console.log('Main Action : Push Burger');

//     return {
//         type: actionTypes.PUSHBURGER,
//         payload: {
//             pushedBurger: passedBurger
//         }
//     }
// }
// export const pushThenGrandTotal = (e, passedBurger) => (dispatch) => {
//     e.preventDefault();
//     dispatch(pushBurger(e, passedBurger))

//     dispatch(getGrandTotal())

//     // dispatch(pushBurger(e, passedBurger))
//     // .then(() => {
//     //     dispatch(getGrandTotal('X'))
//     // });
// }

// This increases an int by one, and then concats this to a string to make a custom id. 
export const burgerId = () => {
    return {
        type: actionTypes.BURGERID
    }
}

export const pushBurger = (e, passedBurger) => {
    e.preventDefault();
       return {
                type: actionTypes.PUSHBURGER,
                payload: {
                    pushedBurger: passedBurger, 
                }
            }

}

export const orderBurger=(e, burger, total, buildType, burgerId)=>{
    // Z-index & Animation functionality of Burger UI

    e.preventDefault();
    let burgerIdString = `burger-${burgerId}`

    if (buildType === 'build') {

        let burgerIngs = document.querySelectorAll('.Ingredient-Con');

        for (let i = 0; i < burgerIngs.length; i++){
            let el = burgerIngs[i]
            el.style.minHeight = '1rem'
            if (burgerIngs[i].classList.contains('Ingredient--sm')){
                el.style.zIndex= 999
            }
        }
        ///// THIS MIGHT NEED TO GO SOMEWHERE ELSE 
        let top = document.querySelector('#bread-top')
        let bottom = document.querySelector('#bread-bottom')
        top.style.zIndex = 1005
        // Setting the Order object. 
        // ings, toppings, price
      ///// THIS MIGHT NEED TO GO SOMEWHERE ELSE 

        console.log('this is a builder burger')
        let totalIngredients = {
            ...burger.ingredients
        }
        let totalToppings = {
            ...burger.toppings
        }
        // ///// SPECIFIC TO BUILDER //// 
        let totalPrice = total
   
        let builtBurger = {
            id: burgerIdString,
            title: 'Char Custom Burger',
            totalIngredients,
            totalToppings,
            totalPrice,
            type: 'build'

        }
        console.log(builtBurger)
        return {
            type: actionTypes.ORDERBURGER,
            payload: {
                burger: builtBurger,

            }
        }
    }
    else if (buildType === 'menu') {
        console.log('this is a menu burger')
   
                // locate the event id, use this to select from the menu data. 
                let eTargetParent = e.target.closest('.Menu__card')
                let targetId = eTargetParent.id
                let splitTarget = targetId.split('-')
                let idx = parseInt(splitTarget[2]) + 1
                let menu = burger;
                
                console.log(menu)
                let dataElement = `burger${idx.toString()}`
                // get the burger contents
           
                let totalIngredients = menu[dataElement].totalIngredients
                let totalToppings = menu[dataElement].totalToppings
                let totalPrice = menu[dataElement].totalPrice
                let title = menu[dataElement].title
    
                let menuBurger = {
                    id: burgerIdString,
                    title, 
                    totalIngredients, 
                    totalToppings, 
                    totalPrice, 
                    type: 'menu'  
                } 
                console.log('---- menu burger to be pushed ----')
                console.log(menuBurger)
                return {
                    type: actionTypes.ORDERBURGER,
                    payload: {
                        burger: menuBurger
                    }
                }


    }



    /////////// UNCOMMENT THIS IF IT DOESNT WORK 

    // ///// SPECIFIC TO BUILDER //// 
    // let totalIngredients = {
    //     ...burger.ingredients
    // }
    // let totalToppings = {
    //     ...burger.toppings
    // }
    // ///// SPECIFIC TO BUILDER //// 
    // let totalPrice = total
    // console.log('Burger Actions: Order Buger')
    // let builtBurger = {
    //     id: 'XXX',
    //     title: 'Char Custom Burger',
    //     totalIngredients,
    //     totalToppings, 
    //     totalPrice,
    //     type: 'build', 

    // }
    // return {
    //     type: actionTypes.ORDERBURGER, 
    //     payload: {
    //         burger: builtBurger
    //     }
    // }

}

export const getGrandTotal =(burgerArr) => {
        if (burgerArr.length >= 1 ){
            console.log('Main Action : Grand Total')
            console.log(burgerArr)
            let burgers = burgerArr
            let prices = []
            burgers.forEach((cur, idx)=>{
                prices.push(cur.totalPrice)
            })
            let grandTotal = prices.reduce((prev, cur)=>{
                return prev + cur
            });
            return {
                type: actionTypes.GETGRANDTOTAL,
                payload: {
                    grandTotal: grandTotal
                }
            }
        }

    return {
        type: actionTypes.GETGRANDTOTAL,
        payload: {
            grandTotal: 0
        }
    }

 
}