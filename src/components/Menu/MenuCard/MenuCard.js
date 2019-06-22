import React from 'react';
import './_MenuCard.scss';
const MenuCard = (props) => {
    return (
        <div id={props.id} className="Menu__card">
            <div className={`Menu__card__image Menu__card__image--${props.modifier}`}>
            </div>
            <div className="Menu__card__description">
                <div className="Menu__card__description__left">
                    <button onClick={props.click} >+</button>
                </div>
                <div className="Menu__card__description__right">
                    <h6>{props.title}</h6>
                    <span>{props.subTitle} |</span><span> ${props.totalPrice} each</span>
                </div>
                <div className="Menu__card__description__bottom">
                <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;