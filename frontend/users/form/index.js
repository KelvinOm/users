import template from "./template.pug";
import './style.scss';

export default class UserForm {

    constructor({ users }) {
        this._users = users;
        this._currentUser = users[0];

        this._render();

        this.deleteButton = this._elem.querySelector('.userform__delete-button');
        this.saveButton = this._elem.querySelector('.userform__save-button');

        this.deleteButton.onclick = this.onClickDeleteButton.bind(this);
        this.saveButton.onclick = this.onClickSaveButton.bind(this);
    }

    _render() {
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            item: this._currentUser
        });
        this._elem = tmp.firstElementChild;
    }

    _deleteUser() {
        this._elem.dispatchEvent(new CustomEvent('delete-user', {
            bubble: true,
            detail: {
                value: this._currentUser
            }
        }));

        this.openUser(null);
    }

    _saveUser() {
        this._currentUser.name = this._elem.querySelector("input[name^='name']").value;
        this._currentUser.surname = this._elem.querySelector("input[name^='surname']").value;
        this._currentUser.age = this._elem.querySelector("input[name^='age']").value;

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

    openUser(selectedUser) {
        this._currentUser = selectedUser;

        if (selectedUser) {
            this._elem.querySelector("input[name^='name']").value = selectedUser.name;
            this._elem.querySelector("input[name^='surname']").value = selectedUser.surname;
            this._elem.querySelector("input[name^='age']").value = selectedUser.age;
        } else {
            this._elem.querySelector("input[name^='name']").value = "";
            this._elem.querySelector("input[name^='surname']").value = "";
            this._elem.querySelector("input[name^='age']").value = "";
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
