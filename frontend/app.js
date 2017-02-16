'use strict';

import UsersList from './users/list/';
import UserForm from './users/form/';

let users = [{
    "id": "1",
    "name": "Иван",
    "surname": "Иванов",
    "age": "28 лет",
}, {
    "id": "2",
    "name": "Александр",
    "surname": "Тарасов",
    "age": "20 лет",
}, {
    "id": "3",
    "name": "Петр",
    "surname": "Сидоров",
    "age": "33 года",
}];

let container = document.body.querySelector('.vertical-center-row');

let usersList = new UsersList({ users });
container.appendChild(usersList.getElem());

let userForm = new UserForm({ users });
container.appendChild(userForm.getElem());

usersList.getElem().addEventListener('user-select', function(event) {
    let selectedUser = event.detail.value;
    userForm.openUser(selectedUser);
});

userForm.getElem().addEventListener('delete-user', function(event) {
    usersList.updateList(event.detail.value, 'delete');
});

userForm.getElem().addEventListener('save-user', function(event) {
    usersList.updateList(event.detail.value, 'update');
});
