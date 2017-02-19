/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (item) {pug_html = pug_html + "\u003Cli\u003E\u003Ca href=\"#\"\u003E" + (pug.escape(null == (pug_interp = item.fullName) ? "" : pug_interp)) + " " + (pug.escape(null == (pug_interp = item.email) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";}.call(this,"item" in locals_for_with?locals_for_with.item:typeof item!=="undefined"?item:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(9).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _list = __webpack_require__(4);

var _list2 = _interopRequireDefault(_list);

var _form = __webpack_require__(3);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App(_ref) {
        var elem = _ref.elem;

        _classCallCheck(this, App);

        this._elem = elem;

        this._loadUsers();
    }

    _createClass(App, [{
        key: 'onUsersListAdd',
        value: function onUsersListAdd() {
            var user = {
                fullName: '',
                email: ''
            };

            this.usersForm.openUser(user);
        }
    }, {
        key: '_loadUsers',
        value: function _loadUsers() {
            var _this = this;

            var xhr = new XMLHttpRequest();

            xhr.open("GET", 'http://test-api.javascript.ru/v1/melnikov/users', true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            xhr.onload = function (e) {
                _this.users = JSON.parse(xhr.responseText);
                _this._render();
            };

            xhr.onerror = function () {
                this.users = [];
                this._render();
            };

            xhr.send();
        }
    }, {
        key: '_render',
        value: function _render() {
            var _this2 = this;

            var container = this._elem.querySelector('.vertical-center-row');

            var usersList = this.usersList = new _list2.default({ users: this.users });
            container.appendChild(usersList.getElem());

            var userForm = this.usersForm = new _form2.default({ users: this.users });
            container.appendChild(userForm.getElem());

            usersList.getElem().addEventListener('user-select', function (event) {
                var selectedUser = event.detail.value;
                userForm.openUser(selectedUser);
            });

            usersList.getElem().addEventListener('user-add', this.onUsersListAdd.bind(this));

            userForm.getElem().addEventListener('delete-user', function (event) {
                usersList.updateList(event.detail.value, 'delete');
            });

            userForm.getElem().addEventListener('save-user', function (event) {
                var user = event.detail.value;
                if (!_this2.users.includes(user)) {
                    _this2.users.push(user);
                    usersList.updateList(user, 'add');
                } else {
                    usersList.updateList(user, 'update');
                }
            });
        }
    }]);

    return App;
}();

exports.default = App;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(7);

var _template2 = _interopRequireDefault(_template);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserForm = function () {
    function UserForm(_ref) {
        var _this = this;

        var users = _ref.users;

        _classCallCheck(this, UserForm);

        this._users = users;
        this._currentUser = users[0];

        this._render();

        this._elem.addEventListener('click', function (e) {
            if (e.target.classList.contains('userform__delete-button')) {
                _this.onClickDeleteButton(e);
                e.preventDefault();
            } else if (e.target.classList.contains('userform__save-button')) {
                _this.onClickSaveButton(e);
                e.preventDefault();
            }
        });
    }

    _createClass(UserForm, [{
        key: '_render',
        value: function _render() {
            if (!this._elem) {
                this._elem = document.createElement('div');
            }
            this._elem.innerHTML = (0, _template2.default)({
                item: this._currentUser
            });
        }
    }, {
        key: '_deleteUser',
        value: function _deleteUser() {
            this._elem.dispatchEvent(new CustomEvent('delete-user', {
                bubble: true,
                detail: {
                    value: this._currentUser
                }
            }));

            this.openUser(null);
        }
    }, {
        key: '_saveUser',
        value: function _saveUser() {
            this._currentUser.fullName = this._elem.querySelector("input[name^='fullName']").value;
            this._currentUser.email = this._elem.querySelector("input[name^='email']").value;

            this._elem.dispatchEvent(new CustomEvent('save-user', {
                bubble: true,
                detail: {
                    value: this._currentUser
                }
            }));
        }
    }, {
        key: 'onClickDeleteButton',
        value: function onClickDeleteButton(event) {
            event.preventDefault();
            this._deleteUser();
        }
    }, {
        key: 'onClickSaveButton',
        value: function onClickSaveButton(event) {
            event.preventDefault();
            this._saveUser();
        }
    }, {
        key: 'openUser',
        value: function openUser(selectedUser) {
            this._currentUser = selectedUser;
            this._render();
            this._elem.querySelector('input').focus();
        }
    }, {
        key: 'getUsersList',
        value: function getUsersList() {
            return this._users;
        }
    }, {
        key: 'getCurrentUser',
        value: function getCurrentUser() {
            return this._currentUser;
        }
    }, {
        key: 'getElem',
        value: function getElem() {
            return this._elem;
        }
    }]);

    return UserForm;
}();

exports.default = UserForm;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(8);

var _template2 = _interopRequireDefault(_template);

var _user = __webpack_require__(0);

var _user2 = _interopRequireDefault(_user);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersList = function () {
    function UsersList(_ref) {
        var users = _ref.users;

        _classCallCheck(this, UsersList);

        this._users = users;

        this._render();

        this.elemCollection = this._elem.getElementsByTagName('li');

        if (this.elemCollection[0]) {
            this.elemCollection[0].classList.add('active');
        }
        this._elem.querySelector('[data-attach-add]').onclick = this.onAddClick.bind(this);
        this._elem.onclick = this.onClick.bind(this);
    }

    _createClass(UsersList, [{
        key: "onAddClick",
        value: function onAddClick(event) {
            this._elem.dispatchEvent(new CustomEvent('user-add', {
                bubbles: true
            }));
            event.preventDefault();
        }
    }, {
        key: "onClick",
        value: function onClick(event) {
            event.preventDefault();
            var link = event.target.closest('a');
            var selectedUser = void 0;

            if (link && this._elem.contains(link)) {

                for (var i = 0; i < this.elemCollection.length; i++) {
                    this.elemCollection[i].classList.remove('active');
                }

                for (var _i = 0; _i <= this.elemCollection.length - 1; _i++) {
                    var colectionId = this.elemCollection[_i].querySelector('a').getAttribute('data-id');
                    if (colectionId == link.getAttribute('data-id')) {
                        selectedUser = this._users[_i];
                        this.elemCollection[_i].classList.add('active');
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
    }, {
        key: "updateList",
        value: function updateList(user, action) {
            for (var i = 0; i < this._users.length; i++) {
                if (this._users[i] === user) {
                    if (action === 'delete') {
                        this.elemCollection[i].remove();
                    }
                    if (action === 'update') {
                        this.elemCollection[i].querySelector('a').innerHTML = user.fullName + " " + user.email;
                    }
                    if (action === 'add') {
                        this._elem.querySelector('ul').insertAdjacentHTML('beforeend', (0, _user2.default)({ item: user }));
                    }
                }
            }
        }
    }, {
        key: "_render",
        value: function _render() {
            var tmp = document.createElement('div');
            tmp.innerHTML = (0, _template2.default)({
                items: this._users
            });
            this._elem = tmp.firstElementChild;
        }
    }, {
        key: "getElem",
        value: function getElem() {
            return this._elem;
        }
    }]);

    return UsersList;
}();

exports.default = UsersList;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (item) {pug_html = pug_html + "\u003Cdiv class=\"user-form col-lg-9\"\u003E\u003Cdiv class=\"panel panel-default\"\u003E\u003Cdiv class=\"panel-heading\"\u003EИнформация\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel-body\"\u003E";
if (item) {
pug_html = pug_html + "\u003Cform\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel class=\"col-2 col-form-label\"\u003EИмя\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"userform__input form-control\""+" type=\"text\" name=\"fullName\""+pug.attr("value", item.fullName, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel class=\"col-2 col-form-label\"\u003EEmail\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"userform__input form-control\""+" type=\"email\" name=\"email\""+pug.attr("value", item.email, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"userform__buttons text-right\"\u003E\u003Cbutton class=\"userform__delete-button btn btn-default btn-danger\" type=\"button\"\u003EУдалить\u003C\u002Fbutton\u003E\u003Cbutton class=\"userform__save-button btn btn-default btn-success\" type=\"submit\"\u003EСохранить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";
}
else {
pug_html = pug_html + "Выберите или создайте пользователя.";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"item" in locals_for_with?locals_for_with.item:typeof item!=="undefined"?item:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (items) {pug_html = pug_html + "\u003Cdiv class=\"user-list col-lg-3\"\u003E\u003Cdiv class=\"panel panel-default\"\u003E\u003Cdiv class=\"panel-heading\"\u003EПользователи" + (pug.escape(null == (pug_interp = ' ') ? "" : pug_interp)) + "\u003Cbutton class=\"btn-default btn\" type=\"button\" data-attach-add\u003E+\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cul class=\"nav nav-pills nav-stacked\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Ca" + (" href=\"#\""+pug.attr("data-id", item._id, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.fullName) ? "" : pug_interp)) + " " + (pug.escape(null == (pug_interp = item.email) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Ca" + (" href=\"#\""+pug.attr("data-id", item._id, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.fullName) ? "" : pug_interp)) + " " + (pug.escape(null == (pug_interp = item.email) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(2);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default({
    elem: document.body
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map