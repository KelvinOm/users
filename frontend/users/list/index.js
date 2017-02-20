import template from "./template.pug";
import userTemplate from "./user.pug";
import './style.scss';

export default class UsersList {

    constructor({ users }) {
        this._users = users;

        this._render();

        this.elemCollection = this._elem.getElementsByTagName('li');

        if (this.elemCollection[0]) {
            this.elemCollection[0].classList.add('active');
        }

        this._elem.querySelector('[data-attach-add]').onclick = this.onAddClick.bind(this);
        this._elem.onclick = this.onClick.bind(this);
    }

    onAddClick(event) {
        event.preventDefault();

        for (var i = 0; i < this.elemCollection.length; i++) {
            this.elemCollection[i].classList.remove('active');
        }

        this._elem.dispatchEvent(new CustomEvent('user-add', {
            bubbles: true
        }));
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
                let colectionId = this.elemCollection[i].querySelector('a').getAttribute('data-id'); 
                if (colectionId == link.getAttribute('data-id')) {
                    selectedUser = this._users[i];
                    this.elemCollection[i].classList.add('active');
                }
            }
            
            this._elem.dispatchEvent(new CustomEvent('user-select', {
                bubbles: true,
                detail: {
                    value: selectedUser
                }
            }));
        }
    }

    updateList(user, action) {
        if (action === 'add') {
            this._users.push(user);
            this._elem.querySelector('ul').innerHTML = userTemplate({items: this._users});
            this.elemCollection[this.elemCollection.length - 1].classList.add('active');
            return;
        }
        for (var i = 0; i < this._users.length; i++) {
            if (this._users[i]._id === user._id) {
                if (action === 'delete') {
                    this._users.splice(i, 1);
                    let elem =  this.elemCollection[i + 1] || this.elemCollection[i - 1] || null;
                    this.elemCollection[i].remove();
                    if (elem) {
                        elem.classList.add('active');
                    } else {
                        this._elem.querySelector('ul').innerHTML = '<li>Список пуст</li>';
                    }
                }
                if (action === 'update') {
                    this.elemCollection[i].querySelector('a').innerHTML = user.fullName;
                }
                break;
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
