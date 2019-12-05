/* eslint-disable multiline-comment-style */
/* eslint-disable array-element-newline */
import './scss/bootstrap/bootstrap.min.css';
import './scss/main.scss';

$('#register-btn').on('click', function () {
    console.log("pressed register");
    $('#register-form').toggle('show');
});
