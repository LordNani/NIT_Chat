/* eslint-disable multiline-comment-style */
/* eslint-disable array-element-newline */
import './scss/bootstrap/bootstrap.min.css';
import './scss/main.scss';

let date = 0;

$('#register-btn').on('click', function () {
    $('#register-form').toggle('show');
});

$('#send-btn').on('click', function () {
    testNewMsg();
});

$("#dropdown-icon").on("click", function () {
    $("#users-dropdown").toggle("show");
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
    if (getWidth() < 600) {
        users.appendTo($('#users-dropdown'));
    } else
        users.insertBefore($('#chat-body'));

}

$(document).on("click", function () {

    if (event.target != $('#register-btn')[0] && ($(event.target).closest("form")[0] != $('#register-form')[0])) {
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


$("#register-form").submit(function (event) {

    event.preventDefault();
    //console.log($('#form-name').val());
    const data = {
        login: $('#form-name').val(),
        passwd: $('#form-password').val()
    }
    const dataToSend = JSON.stringify(data)
    tryLogin(dataToSend);
});

async function tryLogin(dataToSend) {
    console.log(dataToSend);
    const result = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: dataToSend

    })

    const body = await result.json();
    console.log(body);
}


function postMessage(message) {
    $('.post-message').empty();
    if (message == 'Success') {
        $('.post-message')[0].style.backgroundColor = "#63c550";
        setTimeout(function () {
            $("#register-form").toggle("show")
        }, 2000);
    } else {
        $('.post-message')[0].style.backgroundColor = "#ee2336";
    }
    $('.post-message').html(message);
}

function testNewMsg() {
    const elem = jQuery('<div></div>', {
        "class": "chat-message-container"
    });
    const msgWrapper = jQuery('<div></div>', {
        "class": "chat-message-wrapper"
    });

    const header = jQuery('<div></div>', {
        "class": "chat-message-header"
    });

    jQuery('<p></p>', {
        "class": "user-name",
        text: "Gorborukov"
    }).appendTo(header);

    jQuery('<p></p>', {
        "class": "send-date",
        text: ++date
    }).appendTo(header);
    header.appendTo(msgWrapper);

    jQuery('<div></div>', {
        "class": "chat-message-body",
        text: "8Y9sYYU36pBW6zeVmuHQDfSpa6FUsqTTUiDDfoxcp0kFLPaZt8UtM62jkfzfMGZ7KGXRQBOU6LNTxdbfMbaXUl8WGbZj6HOtsPca5Rte2G8UT3csO"
    }).appendTo(msgWrapper);

    jQuery('<img>', {
        "class": "avatar",
        src: 'https://thewanderers.travel/data_content/meet-the-wanderers/blank-user-img.jpg',
        alt: 'user-logo'
    }).appendTo(elem);

    msgWrapper.appendTo(elem);
    elem.appendTo($('#chat-wrapper'));

    $('#chat-wrapper').animate({
        scrollTop: $('#chat-wrapper').get(0).scrollHeight
    }, 100);
}

// <div class="chat-message-container">
// <img src='https://thewanderers.travel/data_content/meet-the-wanderers/blank-user-img.jpg'
//     alt='user-logo' class='avatar'>
// <div class='chat-message-wrapper'>
//     <div class='chat-message-header'>
//         <p class='user-name'>Gorborukov</p>
//         <p class='send-date'>18:45</p>
//     </div>
//     <div class='chat-message-body'>
//         cWszAELtnqJXIXfD2Kf2Rlgiq4fJio7nNHRaofB3kd8TLGDwtxtsnqHiasZvYWT3iRly8yAVWJW48CXvwMrunR38Y9sYYU36pBW6zeVmuHQDfSpa6FUsqTTUiDDfoxcp0kFLPaZt8UtM62jkfzfMGZ7KGXRQBOU6LNTxdbfMbaXUl8WGbZj6HOtsPca5Rte2G8UT3csO
//     </div>
// </div>
// </div>