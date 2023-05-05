import React from "react";

function PopupWithForm(props) {
    const className = `popup popup_type_${props.name} ${props.isOpened ? 'popup_opened' : ''}`
    return (
        <div className={className}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__form popup__form_type_${props.name}`}>
                    {props.children}
                    <button className="popup__submit" type='submit' >{props.buttonText}</button>
                </form>
                <button className={`popup__close popup__close_type_${props.name}`} type='button' onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;