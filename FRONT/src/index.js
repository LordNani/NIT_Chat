/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
/* eslint-disable multiline-comment-style */
/* eslint-disable array-element-newline */
import './scss/bootstrap/bootstrap.min.css';
import './scss/main.scss';
const serverIp = 'ec2-35-180-253-99.eu-west-3.compute.amazonaws.com';
const serverPort = '3030';
const ws = new WebSocket('ws://' + serverIp + ':' + serverPort + '/');
let firstTime = true;
ws.onopen = function (event) {
    //  console.log("Connected");
    //  console.log(getCookie('user'));
};

ws.onmessage = function (event) {
    //console.log(event.data);
    const data = JSON.parse(event.data);
    if (firstTime) {
        firstTime = false;
        console.log(data);
        for (var msg of data) {
            generateMessage(msg.content, msg.send_time, msg.author);
        }
    } else {
        generateMessage(data.content, data.send_time, data.author);
    }

}

ws.onclose = function (e) {
    console.log("Disconnected");
};

function pressSend() {
    const today = new Date();
    //send ajax
    //console.log("sending message");
    const data = {
        author: getCookie('user'),
        content: $('#input-text-area').val(),
        send_time: today.getHours() + ":" + today.getMinutes()
    }
    $('#input-text-area').val('');
    sendMessage(data);
}

$('#register-btn').on('click', function () {
    $('#register-form').toggle('show');
});

$('#send-btn').on('click', function () {
    pressSend();

});

$("#dropdown-icon").on("click", function () {
    $("#users-dropdown").toggle("show");
});

$("#input-text-area").keypress(function (e) {
    const code = e.keyCode || e.which;
    // && getCookie('name') !== null && $('#input-text-area').val() > 0   getCookie('user').length > 0
    if (code == 13) {
        pressSend();
        $(this).val('');
        e.preventDefault();
    }
});

function sendMessage(dataToSend) {
    // console.log(JSON.stringify(dataToSend));
    ws.send(JSON.stringify(dataToSend));
}


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
    $('#register-form').toggle('show');
    event.preventDefault();
    //console.log($('#form-name').val());
    const data = {
        login: $('#form-name').val(),
        passwd: $('#form-password').val()
    }
    tryLogin(data);
});


async function tryLogin(dataToSend) {
    console.log(dataToSend);
    const result = await fetch('http://' + serverIp + ':' + serverPort + '/api/login', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    const body = await result.json();
    if (body.success !== false) {
        console.log("Log in");
        document.cookie = "user=" + dataToSend.login + "; max-age=3600";
    }
    //console.log(body);
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

function generateMessage(content, date, author) {
    const elem = jQuery('<div></div>', {
        "class": "chat-message-container",
    });
    const msgWrapper = jQuery('<div></div>', {
        "class": "chat-message-wrapper"
    });

    const header = jQuery('<div></div>', {
        "class": "chat-message-header"
    });

    jQuery('<p></p>', {
        "class": "user-name",
        text: author
    }).appendTo(header);

    jQuery('<p></p>', {
        "class": "send-date",
        text: date
    }).appendTo(header);
    header.appendTo(msgWrapper);

    jQuery('<div></div>', {
        "class": "chat-message-body",
        text: content
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
    }, 0);
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires.toUTCString) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}