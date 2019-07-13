import * as actionTypes from '../actions/actionTypes';
export const cartItemId = (e) => {
    let el = e.target
    let target = el.closest('.Cart__item').id

    return {
        type: actionTypes.CARTITEMID,
        payload: {
            target: target
        }
    };
}

export const removeBurger = (burgerId, burgerArr) => {
    // removes the burger from the burger state obj. 
        let burgers = burgerArr
        console.log('----- Cart Actions: Remove Burger -----');

        const removeElement = (idx) => {
            burgers.splice(idx, 1);
           return burgers
        
        }
        // The event click passes the burger id on the closest parent el... 
     
            burgers.forEach((cur, idx)=>{
                if (cur.id === burgerId){
                    return removeElement(idx)
                }
            });
     

            console.log(burgers)

        return {
            type: actionTypes.REMOVEBURGER,
            payload: {
                burgerArr: burgers
            }
        }



}