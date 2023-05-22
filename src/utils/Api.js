class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getProfileInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    setUserInfo(info) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    changeAvatar(info) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: info.avatar
            })
        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers,

        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })

        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    _addLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    _removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })

            .then(res => {
                return this._getResponseData(res);
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this._removeLike(cardId);
        } else { return this._addLike(cardId); }

    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: 'ed0399b7-ebdf-4a38-88ea-fec0aabc8446',
        'Content-Type': 'application/json'
    }
})

export default api;