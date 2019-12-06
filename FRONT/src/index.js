/* eslint-disable multiline-comment-style */
/* eslint-disable array-element-newline */
import './scss/bootstrap/bootstrap.min.css';
import './scss/main.scss';

$('#register-btn').on('click', function () {
    $('#register-form').toggle('show');
});

$(function () {
    $("#input-text-area").keypress(function (e) {
        const code = e.keyCode || e.which;
        if (code == 13) {
            //send ajax
            $(this).val('');
            e.preventDefault();
        }
    });
});

window.onresize = function () {
    const users = $('#users-wrapper').detach();
    if (getWidth() < 600)
        users.appendTo($('#users-dropdown'));
    else
        users.insertBefore($('#chat-body'));

}

$(document).on("click", function () {
    if (event.target != $('#register-btn')[0] && $(event.target).closest("form") != $('#register-form')[0]) {
        console.log("bug");
        $("#register-form")[0].style.display = "none";
        $('#register-form')[0].reset();
    }

    // if (!(event.target.matches('#dropdown-icon') || event.target.matches('.current-category'))) {
    //     var dropdowns = $(".dropdown-content");
    //     for (var openDropdown of dropdowns) {

    //         if (openDropdown.style.display != "none") {
    //             openDropdown.style.display = "none";
    //             console.log(openDropdown);
    //         }
    //     }
    // }
});

function getWidth() {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}
