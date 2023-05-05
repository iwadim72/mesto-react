import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li class="places__element">
            <div class="places__photo" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></div>
            <div class="places__name-container">
                <h3 class="places__name">{props.card.name}</h3>
                <div class="places__like-container">
                    <button class="places__like" type="button"></button>
                    <p class="places__like-counter">{props.card.likes.length}</p>
                </div>
                <button class="places__delete" type="button"></button>
            </div>
        </li>
    )
}

export default Card;