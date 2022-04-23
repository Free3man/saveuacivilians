"use strict";
//Variables
const imageRegForm = document.querySelector(".registration-pic"),
    registrationCard = document.getElementById("registration-card"),
    loginCard = document.getElementById("login-card"),
    password = document.getElementById("password-reg"),
    passwordCheck = document.getElementById("password-check"),
    passwordLog = document.getElementById("password-log"),
    mail = document.getElementById("email-log"),
    inputs = document.getElementsByTagName("input");
let currentPicture = 1;
//Fucntions
function checkPassword() {
    if (password.value != passwordCheck.value &&
        password.value != "" &&
        password.value != "") {
        //TODO rework alert in a modal form
        alert("Паролі не збігаюся");
    }
}
function authorise(user) {}
function checkInputValidity(element) {
    if (element.value) {
        element.classList.remove("mistake");
    } else {
        element.classList.add("mistake");
    }
}
function noSuchEmail() {
    const cross = document.getElementById("cross"),
        accountNotFound = document.getElementById("no-account");
    accountNotFound.classList.add("active");
    setTimeout(() => {
        const iterations = 50;
        let counter = 0;
        cross.style.display = "block";
        const crossInterval = setInterval(() => {
            cross.style.opacity = +cross.style.opacity + 1 / iterations;
            if (iterations == counter) {
                clearInterval(crossInterval);
            }
            counter++;
        }, 500 / iterations);
    }, 5000);
    cross.addEventListener("click",
        () => accountNotFound.classList.remove("active"));
    document.getElementById("no-registration").addEventListener("click", () => {
        accountNotFound.classList.remove("active");
        registrationCard.classList.add("active");
        loginCard.classList.add("active");
    });
}
function badPassword() {
    document.getElementById("bad-password").style.display = "block";
}
//EventListers
document.getElementById("sign-in").addEventListener("click", async (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("login-form");
    if (mail.value != "" && passwordLog.value != "") {
        await fetch("php/login.php", {
                method: "POST",
                body: new FormData(loginForm)
            })
            .then((response)=>console.log(response.json()))
            // .then((response) => response.json())
            .then((response) => {
                console.log(response);
                // console.log(JSON.parse(response));
                if (response == "0") {
                    badPassword();
                } else {
                    if (response == false) {
                        noSuchEmail();
                    } else {
                        authorise(JSON.parse(response));
                        console.log(JSON.parse(response));
                    }
                }
            }).catch(() => {
                alert("Could not reach server! Search for issues");
            }).finally(() => {
                loginForm.reset();
            });
    } else {
        if (mail.value == "") {
            mail.classList.add("mistake");
        }
        if (passwordLog.value == "") {
            passwordLog.classList.add("mistake");
        }
    }
});
Array.prototype.forEach.call(inputs,
    item => item.addEventListener("change", (event) => checkInputValidity(event.target)));
document.getElementById("sign-up").addEventListener("click", (event) => {
    event.preventDefault();
    let newUser = {
        name: document.getElementById("name").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        mail: document.getElementById("emailR").value,
        password: password.value
    };
});
document.getElementById("registration").addEventListener("click", (event) => {
    event.preventDefault();
    registrationCard.classList.add("active");
    loginCard.classList.add("active");
});
document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    registrationCard.classList.remove("active");
    loginCard.classList.remove("active");
});
password.addEventListener("change", checkPassword);
passwordCheck.addEventListener("change", checkPassword);
password.addEventListener("paste", (event) => event.preventDefault());
passwordCheck.addEventListener("paste", (event) => event.preventDefault());
passwordLog.addEventListener("paste", (event) => event.preventDefault());
//Timers
let pictureSwitcher = setInterval(() => {
    if (registrationCard.classList.contains("active")) {
        currentPicture = 1 + currentPicture % 7;
        let opacity = 1;
        let changed = false;
        const changer = setInterval(() => {
            if (changed) {
                opacity += 0.01;
                if (opacity >= 1) {
                    clearInterval(changer);
                    changed = false;
                }
            } else {
                opacity -= 0.01;
                if (opacity <= 0) {
                    changed = true;
                    opacity = 0;
                    imageRegForm.src = `img/system/registration/${currentPicture}.svg`;
                }
            }
            imageRegForm.style.opacity = opacity;
        }, 15);
    }
}, 15000);
//Mainflow
mail.value = "1@gmail.com";