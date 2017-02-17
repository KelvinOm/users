'use strict';

import UsersList from './users/list/';
import UserForm from './users/form/';

export default class App {
    constructor({elem}) {
        this._elem = elem;

        this.users = [];

        this._render();
    }

    onUsersListAdd() {
        let user = {
            fullName: '',
            email: ''
        };

        this.usersForm.openUser(user);
    }

    _render() {

        let container = this._elem.querySelector('.vertical-center-row');

        let usersList = this.usersList = new UsersList({ users: this.users });
        container.appendChild(usersList.getElem());



        let userForm = this.usersForm = new UserForm({ users: this.users });
        container.appendChild(userForm.getElem());

        usersList.getElem().addEventListener('user-select', function(event) {
            let selectedUser = event.detail.value;
            userForm.openUser(selectedUser);
        });

        usersList.getElem().addEventListener('user-add', this.onUsersListAdd.bind(this));

        userForm.getElem().addEventListener('delete-user', function(event) {
            usersList.updateList(event.detail.value, 'delete');
        });

        userForm.getElem().addEventListener('save-user', (event) => {
            let user = event.detail.value;
            if (!this.users.includes(user)) {
                this.users.push(user);
                usersList.updateList(user, 'add');
            } else {
                usersList.updateList(user, 'update');
            }
        });

    }
}