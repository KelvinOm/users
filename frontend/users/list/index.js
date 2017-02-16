import template from "./template.pug";
import './style.scss';

export default class UsersList {

    constructor({ users }) {
        this._items = users;

        this._render();

        this._elem.onclick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        let link = event.target.closest('li');
        let selectedUser;
        if (link && this._elem.contains(link)) {
            for (let i = 0; i <= this._items.length - 1; i++) {
                if (this._items[i].name === link.innerHTML) {
                    selectedUser = this._items[i];
                }
            }
            this._elem.dispatchEvent(new CustomEvent('user-select', {
                bubble: true,
                detail: {
                    value: selectedUser
                }
            }));
        }
    }

    updateList(user, action) {
        let userCollection = this._elem.querySelectorAll('li');
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].id === user.id) {
                if (action === 'delete') {
                    userCollection[i].remove();
                }
                if (action === 'update') {
                    userCollection[i].innerHTML = user.name;
                }
            }
        }
    }

    _render() {
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            items: this._items
        });
        this._elem = tmp.firstElementChild;
    }

    getElem() {
        return this._elem;
    }
}
