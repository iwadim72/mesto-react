import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddNewCard({
            name: name,
            link: url
        });
    }

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetUrl(e) {
        setUrl(e.target.value);
    }

    return (
        < PopupWithForm
            name="add-place"
            buttonText="Создать"
            title="Новое место"
            isOpened={props.isOpened}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_place-name" type="text"
                    placeholder="Название" id="place-name" name='name' minLength="2" maxLength="30" required onChange={handleSetName} />
                <span className="popup__erorr place-name-error"></span>
            </label>
            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_place-url" type="url"
                    placeholder="Ссылка на картинку" id="place-url" name='link' required onChange={handleSetUrl} />
                <span className="popup__erorr place-url-error"></span>
            </label>

        </PopupWithForm>
    )
}

export default AddPlacePopup;