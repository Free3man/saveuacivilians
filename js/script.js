"use strict";
//Variables
const image = document.querySelector(".registrationPic"),
    registrationCard = document.getElementById("registrationCard"),
    loginCard = document.getElementById("loginCard"),
    password = document.getElementById("passwordR"),
    passwordCheck = document.getElementById("password"),
    passwordLog = document.getElementById("passwordL");
let currentPicture = 1;
//Fucntions
function checkPassword() {
    if (document.getElementById("passwordR").value != document.getElementById("password").value &&
        document.getElementById("passwordR").value != "" &&
        document.getElementById("password").value != ""){
        alert("Паролі не збігаюся");
    }
}
function authorise(user) {}
//EventListers
document.getElementById("signIn").addEventListener("click", async (event) => {
    event.preventDefault();
    const mail = document.getElementById("emailL");
    const loginForm = document.getElementById("loginForm");
    if (mail.value != "" && passwordLog.value!="")
    {
        await fetch("php/login.php", {
            method: "POST",
            // headers: {"Content-Type": "application/json"},
            body: new FormData(loginForm)
        }).then((response)=>response.text())
        .then((response)=>{
            console.log(response);
        }).catch(()=>{
            alert("Could not reach server! Search for issues");
        }).finally(()=>{
            document.getElementById("loginForm").reset();
        });
    }
    else {
        alert("Login or password can`t be empty");
    }
});
document.getElementById("signUp").addEventListener("click", (event)=>{
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
                    image.src = `img/system/registration/${currentPicture}.svg`;
                }
            }
            image.style.opacity = opacity;
        }, 15);
    }
}, 15000);
//Mainflow