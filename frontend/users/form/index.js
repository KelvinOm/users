import template from "./template.pug";
import './style.scss';

export default class UserForm {

    constructor({ users }) {
        this._users = users;
        this._currentUser = users[0];

        this._render();

        this._elem.addEventListener('click', e => {
            if (e.target.classList.contains('userform__delete-button')) {
                this.onClickDeleteButton(e);
                e.preventDefault();
            } else if(e.target.classList.contains('userform__save-button')) {
                this.onClickSaveButton(e);
                e.preventDefault();
            } else if(e.target.classList.contains('userform__add-button')) {
                this.onClickaddButton(e);
                e.preventDefault();
            }
        });
    }

    _render() {
        if (!this._elem) {
            this._elem = document.createElement('div');
        }
        this._elem.innerHTML = template({
            item: this._currentUser
        });
    }

    _deleteUser() {
        this._elem.dispatchEvent(new CustomEvent('delete-user', {
            bubble: true,
            detail: {
                value: this._currentUser
            }
        }));

        let selectedUser;

        for (var i = 0; i < this._users.length; i++) {
            if (this._currentUser._id === this._users[i]._id) {
                selectedUser = this._users[i - 1] || this._users[i + 1] || null;
                break;
            }
        }

        this.openUser(selectedUser);
    }

    _saveUser() {
        this._currentUser.fullName = this._elem.querySelector("input[name^='fullName']").value;
        this._currentUser.email = this._elem.querySelector("input[name^='email']").value;

        this._elem.dispatchEvent(new CustomEvent('save-user', {
            bubble: true,
            detail: {
                value: this._currentUser
            }
        }));
    }

    onClickDeleteButton(event) {
        event.preventDefault();
        this._deleteUser();
    }

    onClickSaveButton(event) {
        event.preventDefault();
        this._saveUser();
    }

    onClickaddButton(event) {
        event.preventDefault();
        this._elem.dispatchEvent(new CustomEvent('user-add', {
            bubble: true
        }));
    }

    openUser(selectedUser) {
        this._currentUser = selectedUser;
        this._render();
        if (this._currentUser) {
            this._elem.querySelector('input').focus();
        }
    }

    getUsersList() {
        return this._users;
    }

    getCurrentUser() {
        return this._currentUser;
    }

    getElem() {
        return this._elem;
    }
}
