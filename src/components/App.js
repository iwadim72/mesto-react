import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { IsLoadingContext } from '../contexts/IsLoadingContext';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


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

    function handleSubmit(request) {
        setIsLoading(true);
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleUpdateUser(info) {
        function makeRequest() {
            return api.setUserInfo(info).then(setCurrentUser);
        }

        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(info) {
        function makeRequest() {
            return api.changeAvatar(info).then(setCurrentUser);
        }

        handleSubmit(makeRequest);
    }

    function handleAddNewCard(newCard) {
        function makeRequest() {
            return api.addNewCard(newCard).then((res) => { setCards([res, ...cards]) });
        }

        handleSubmit(makeRequest);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => { console.log(err) })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <IsLoadingContext.Provider value={{ isLoading, closeAllPopups }}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    < Header />

                    < Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete} />

                    < Footer />
                </div>

                < EditProfilePopup
                    isOpened={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />


                <EditAvatarPopup
                    isOpened={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />


                < PopupWithForm name="confirm" buttonText="Да" title="Вы уверены?" />

                <AddPlacePopup
                    isOpened={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddNewCard={handleAddNewCard} />

                < ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </IsLoadingContext.Provider>

    )
}

export default App;
