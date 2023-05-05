import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((error) => {
                console.log(error);
            })

        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main classNameName="main">
            <section className="profile">
                <div className="profile__main-info">
                    <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__name-description">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="places">
                <ul class="places__elements">
                    {cards.map((card) => {
                        return < Card card={card} onCardClick={props.onCardClick} key={card._id} />
                    })}
                </ul>
            </section>
        </main >
    )
}

export default Main;