'use strict';

import UsersList from './users/list/';
import UserForm from './users/form/';

export default class App {
    constructor({elem}) {
        this._elem = elem;

        this._loadUsers();
    }

    onUsersListAdd() {
        let user = {
            fullName: '',
            email: ''
        };

        this.usersForm.openUser(user);
    }

    _loadUsers() {
        let xhr = new XMLHttpRequest();
        
        xhr.open("GET", 'http://test-api.javascript.ru/v1/melnikov/users', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            this.users = JSON.parse(xhr.responseText);
            this._render();
        };

        xhr.onerror = function() {
            this.users = [];
            this._render();
        };

        xhr.send();
    }

    _addUser(user) {
        let xhr = new XMLHttpRequest();
        let json = JSON.stringify(user);
        
        xhr.open("POST", 'http://test-api.javascript.ru/v1/melnikov/users/', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            this.usersList.updateList(user, 'add');
            // console.log("Пользователь добавлен");
        }

        xhr.onerror = function() {
            console.log("Ошибка!");
        };
        
        xhr.send(json);
    }

    _updateUser(user) {
        let xhr = new XMLHttpRequest();
        let json = JSON.stringify(user);
        
        xhr.open("PATCH", 'http://test-api.javascript.ru/v1/melnikov/users/' + user._id, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            console.log("Пользователь обновлен");   
        }

        xhr.onerror = function() {
            console.log("Ошибка!");
        };
        
        xhr.send(json);
    }

    _deleteUser(user) {
        let xhr = new XMLHttpRequest();
        let json = JSON.stringify(user);
        
        xhr.open("DELETE", 'http://test-api.javascript.ru/v1/melnikov/users/' + user._id, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            this.usersList.updateList(user, 'delete');
            console.log("Пользователь удален");
        }

        xhr.onerror = function() {
            console.log("Ошибка!");
        };
        
        xhr.send(json);
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

        userForm.getElem().addEventListener('delete-user', (event) => {
            let user = event.detail.value;
            this._deleteUser(user);
        });

        userForm.getElem().addEventListener('save-user', (event) => {
            let user = event.detail.value;

            if (!this.users.includes(user)) {
                this._addUser(user);
            } else {
                this._updateUser(user);
            }
        });
    }
}