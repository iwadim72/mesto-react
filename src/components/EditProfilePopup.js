import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        < PopupWithForm
            name="profile"
            buttonText="Сохранить"
            title="Редактировать профиль"
            isOpened={props.isOpened}
            onClose={props.onClose}
            onSubmit={handleSubmit}>


            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_name" type="text" placeholder="Имя"
                    id="name-input" name="name" minLength="2" maxLength="40" required value={name} onChange={handleChangeName} />
                <span className="popup__erorr name-input-error"></span>
            </label>
            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_job" type="text" placeholder="Описание"
                    id="job-input" name="job" minLength="2" maxLength="200" required value={description} onChange={handleChangeDescription} />
                <span className="popup__erorr job-input-error"></span>
            </label>

        </PopupWithForm>)
}

export default EditProfilePopup;