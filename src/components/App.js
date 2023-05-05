import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false)
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
        <>
            <div className="page">
                < Header />
                < Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
                < Footer />
            </div>

            < PopupWithForm name="profile" buttonText="Сохранить" title="Редактировать профиль" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} children={<>
                <label class="popup__field">
                    <input className="popup__text-input popup__text-input_content_name" type="text" placeholder="Имя"
                        id="name-input" name="name" minlength="2" maxlength="40" required />
                    <span className="popup__erorr name-input-error"></span>
                </label>
                <label class="popup__field">
                    <input className="popup__text-input popup__text-input_content_job" type="text" placeholder="Описание"
                        id="job-input" name="job" minlength="2" maxlength="200" required />
                    <span className="popup__erorr job-input-error"></span>
                </label>
            </>} />

            < PopupWithForm name="avatar" buttonText="Сохранить" title="Обновить аватар" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} children={<>
                <label className="popup__field">
                    <input className="popup__text-input popup__text-input_content_link" type="url" value=""
                        placeholder="Ссылка на картинку" id="avatar-link" name="avatar" required />
                    <span className="popup__erorr avatar-link-error"></span>
                </label>
            </>} />


            < PopupWithForm name="confirm" buttonText="Да" title="Вы уверены?" />

            < PopupWithForm name="add-place" buttonText="Создать" title="Новое место" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} children={<>
                <label className="popup__field">
                    <input className="popup__text-input popup__text-input_content_place-name" type="text"
                        placeholder="Название" id="place-name" name='name' minlength="2" maxlength="30" required />
                    <span className="popup__erorr place-name-error"></span>
                </label>
                <label className="popup__field">
                    <input className="popup__text-input popup__text-input_content_place-url" type="url"
                        placeholder="Ссылка на картинку" id="place-url" name='link' required />
                    <span className="popup__erorr place-url-error"></span>
                </label>
            </>} />

            < ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </>
    )
}

export default App;
