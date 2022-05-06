"use strict";
//Variables
const imageRegForm = document.querySelector(".registration-img"),
    regCard = document.getElementById("registration-card"),
    logCard = document.getElementById("login-card"),
    pass = document.getElementById("password-reg"),
    passCheck = document.getElementById("password-check"),
    inputs = document.getElementsByTagName("input");
let currentPicture = 1;
//Funcions
function checkpass() {
    if (pass.value != passCheck.value &&
        pass.value != "" &&
        passCheck.value != "") {
        //TODO rework alert in a modal form
        alert("Паролі не збігаюся");
    }
}
function stableConnection(){
    function checkConnection(){
        const data = {zero: "0"};
        let result = false;
        result = fetch("php/checkNetSpeedConnection.php", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            return response.status == 200 && response.ok || false;
        });
        return result;
    }
    if(checkConnection()){
        document.getElementById("connection-failed").style.display = "none";
    }
    else{
        document.getElementById("connection-failed").style.display = "block";
    }
}
//EventListers
document.getElementById("retry").addEventListener("click", ()=> stableConnection());
for (let input of inputs) {
    input.addEventListener("change", (event) => {
        if (event.target.value) {
            event.target.classList.remove("mistake");
        } else {
            event.target.classList.add("mistake");
        }
    });
}
document.getElementById("registration").addEventListener("click", (event) => {
    event.preventDefault();
    regCard.classList.add("active");
    logCard.classList.add("active");
});
document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    regCard.classList.remove("active");
    logCard.classList.remove("active");
});
pass.addEventListener("change", checkpass);
passCheck.addEventListener("change", checkpass);
pass.addEventListener("paste", (event) => event.preventDefault());
passCheck.addEventListener("paste", (event) => event.preventDefault());
document.getElementById("password-log").addEventListener("paste", (event) => event.preventDefault());
//Timers
const pictureSwitcher = setInterval(() => {//imgSwitcher
    if (regCard.classList.contains("active")) {
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