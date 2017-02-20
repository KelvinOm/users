'use strict';

import UsersList from './users/list/';
import UserForm from './users/form/';

export default class App {
    constructor({elem}) {
        this._elem = elem;

        this._loadUsers();
    }

    onUsersListAdd() {
        let xhr = new XMLHttpRequest();
        let user;
        
        xhr.open("GET", 'https://randomuser.me/api/?results=1&nat=gb', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            let generatedUser = JSON.parse(xhr.responseText);

            let firstName = generatedUser.results[0].name.first;
                firstName = firstName[0].toUpperCase() + firstName.slice(1);

            let lastName = generatedUser.results[0].name.last;
                lastName = lastName[0].toUpperCase() + lastName.slice(1);

            let avatarUrl = generatedUser.results[0].picture.large;

            let city = generatedUser.results[0].location.city;
                city = city[0].toUpperCase() + city.slice(1);

            let street = generatedUser.results[0].location.street;

            user = {
                fullName: `${firstName} ${lastName}`,
                email: generatedUser.results[0].email,
                avatarUrl: avatarUrl,
                birthdate: this._formatDate(generatedUser.results[0].dob),
                address: `${city} ${street}`,
            };

            this.userForm.openUser(user);
        };

        xhr.onerror = function() {
            user = {
                fullName: '',
                email: ''
            };

            this.userForm.openUser(user);
        };

        xhr.send();
    }

    _formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('.');
    }

    _toDate(date) {
        let parts = date.split(".");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    _loadUsers() {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", 'http://test-api.javascript.ru/v1/melnikov/users', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            this.users = JSON.parse(xhr.responseText);

            for (let i = 0; i < this.users.length; i++) {
                this.users[i].birthdate = this._formatDate(this.users[i].birthdate);
            }

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
        
        user.birthdate = this._toDate(user.birthdate);
        
        let json = JSON.stringify(user);
        
        xhr.open("POST", 'http://test-api.javascript.ru/v1/melnikov/users/', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onload = e => {
            let loadedUser = JSON.parse(xhr.responseText);
            loadedUser.birthdate = this._formatDate(loadedUser.birthdate);

            this.usersList.updateList(loadedUser, 'add');
            this.userForm.openUser(loadedUser);
            console.log("Пользователь добавлен");
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
            this.usersList.updateList(user, 'update');
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
        let container = this._elem.querySelector('[data-container]');

        let usersList = this.usersList = new UsersList({ users: this.users });
        container.appendChild(usersList.getElem());

        let userForm = this.userForm = new UserForm({ users: this.users });
        container.appendChild(userForm.getElem());

        usersList.getElem().addEventListener('user-select', function(event) {
            let selectedUser = event.detail.value;
            userForm.openUser(selectedUser);
        });

        usersList.getElem().addEventListener('user-add', this.onUsersListAdd.bind(this));
        userForm.getElem().addEventListener('user-add', this.onUsersListAdd.bind(this));

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