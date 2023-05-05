import React from "react";

function ImagePopup(props) {

    const className = `popup-photo popup ${props.card.name ? 'popup_opened' : ''}`;


    return (
        <div className={className}>
            <div className="popup-photo__container">
                <figure className="popup-photo__figure">
                    <img className="popup-photo__capture" src={props.card ? `${props.card.link}` : ''} />
                    <figcaption className="popup-photo__capture-name">{props.card ? `${props.card.name}` : ''}</figcaption>
                </figure>
                <button className="popup__close popup__close_place_photo" type="button" onClick={props.onClose}></button>
            </div >
        </div >
    )
}

export default ImagePopup;