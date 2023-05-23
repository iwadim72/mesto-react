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

    _request(url, options) {
        return fetch(this.baseUrl + url, options).then(this._getResponseData)
    }

    getProfileInfo() {
        return this._request('/users/me', {
            method: 'GET',
            headers: this.headers,
        })
    }

    setUserInfo(info) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
    }

    changeAvatar(info) {
        return this._request('/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: info.avatar
            })
        })
    }

    getInitialCards() {
        return this._request('/cards', {
            method: 'GET',
            headers: this.headers,
        })
    }

    addNewCard(data) {
        return this._request('/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
    }

    _addLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })
    }

    _removeLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
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