"use strict";
//Variables
const imageRegForm = document.querySelector(".registration-img"),
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
function checkInputValidity(element) {
    if (element.value) {
        element.classList.remove("mistake");
    } else {
        element.classList.add("mistake");
    }
}

function badPassword(){
    document.getElementById("no-account").classList.remove("active");
    document.getElementById("bad-password").style.display = "block";
}
function noAccount(){
    document.getElementById("bad-password").style.display = "none";
    const cross = document.getElementById("cross"),
        accountNotFound = document.getElementById("no-account"),
        warningSign = document.getElementById("warning");
    setTimeout(() => {
        const iterations = 50;
        let counter = 0, opacity = 0;
        cross.style.display = "block";
        const crossInterval = setInterval(() => {
            opacity += 1/iterations;
            cross.style.opacity = opacity;
            counter++;
            if (iterations == counter) {
                clearInterval(crossInterval);
            }
        }, 500 / iterations);
    }, 5000);
    accountNotFound.classList.add("active");
    cross.addEventListener("click", () => accountNotFound.classList.remove("active"));
    document.getElementById("no-registration").addEventListener("click", () => {
        accountNotFound.classList.remove("active");
        registrationCard.classList.add("active");
        loginCard.classList.add("active");
    });
    const steps = 100;
    let counter = 0;
    let opacity = 1;
    warningSign.style.opacity = opacity;
    const blink = setInterval(function(){
        if (counter<steps/2){
            opacity -= 2/steps;
        }
        else{
            opacity += 2/steps;
        }
        warningSign.style.opacity = opacity;
        counter++;
        if (steps == counter) {
            clearInterval(blink);
        }
    }, 100/steps);
}
function authorise(user) {
    console.log("au");
    console.log(user.id);
    console.log(user.email);
    console.log(user.password);
    console.log(user.name);
    console.log(user.phoneNumber);
}

function checkConnection(){
    const data = {
        zero: null
    };
    fetch("php/checkNetSpeedConnection.php", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(() => {return true;})
    .finally(()=>{return false;});
}
function stableConnection(){
    document.getElementById("connection-failed").style.display = "none";
}
//EventListers
document.getElementById("sign-in").addEventListener("click", async (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("login-form");
    if (mail.value != "" && passwordLog.value != "") {
        await fetch("php/login.php", {
            method: "POST",
            body: new FormData(loginForm)
        }).then((response) => {
            if (response.ok && response.status == 200) {
                return response.json();
            }
        }).then((response) => {
            if (response == 0) {
                badPassword();
            } else {
                if (response == 1) {
                    noAccount();
                } else {
                    authorise(response);
                }
            }
        }).catch(() => {
            if (checkConnection()){
                stableConnection();
            }
            else {
                document.getElementById("connection-failed").style.display = "block";
            }
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
document.getElementById("sign-up").addEventListener("click", (event) => {
    event.preventDefault();
    // const registrationForm = document.getElementById("registration-form");
    let newUser = {
        name: document.getElementById("name").value,
        phoneNumber: document.getElementById("phone-number").value,
        mail: document.getElementById("email-reg").value,
        password: password.value
    };
	console.log(newUser);
    fetch("php/registration.php", {
        method: "POST",
        body: JSON.stringify(newUser)
    }).then(response => {if (response.status == 200 && response.ok) {
        return response.json();
    }}).then((response)=>{
        if (response == "exist"){
            document.getElementById("bad-input").style.display = "block";
        }
        else{

        }
    })
    .catch(()=>{
        
    });
});
document.addEventListener("click", ()=>stableConnection());
Array.prototype.forEach.call(inputs,
    item => item.addEventListener("change", (event) => checkInputValidity(event.target)));
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
const pictureSwitcher = setInterval(() => {
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
// mail.value = "1@gmail.com";
// passwordLog.value = "123";
checkConnection();