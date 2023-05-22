import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }
    return (
        < PopupWithForm
            name="avatar"
            buttonText="Сохранить"
            title="Обновить аватар"
            isOpened={props.isOpened}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_link" type="url"
                    placeholder="Ссылка на картинку" id="avatar-link" name="avatar" ref={avatarRef} />
                <span className="popup__erorr avatar-link-error"></span>
            </label>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;