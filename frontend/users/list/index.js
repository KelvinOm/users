import template from "./template.pug";
import './style.scss';

export default class UsersList {

    constructor({ users }) {
        this._users = users;

        this._render();

        this.elemCollection = this._elem.querySelectorAll('li');
        this.elemCollection[0].classList.add('active');

        this._elem.onclick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        let link = event.target.closest('a');
        let selectedUser;

        if (link && this._elem.contains(link)) {
            
            for (var i = 0; i < this.elemCollection.length; i++) {
                this.elemCollection[i].classList.remove('active');
            }

            for (let i = 0; i <= this.elemCollection.length - 1; i++) {
                if (this.elemCollection[i].querySelector('a').innerHTML == link.innerHTML) {
                    selectedUser = this._users[i];
                    this.elemCollection[i].classList.add('active');
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
        for (var i = 0; i < this._users.length; i++) {
            if (this._users[i].id === user.id) {
                if (action === 'delete') {
                    this.elemCollection[i].remove();
                }
                if (action === 'update') {
                    this.elemCollection[i].querySelector('a').innerHTML = `${user.name} ${user.surname}`;
                }
            }
        }
    }

    _render() {
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            items: this._users
        });
        this._elem = tmp.firstElementChild;
    }

    getElem() {
        return this._elem;
    }
}
