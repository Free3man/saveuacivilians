"use strict";
//Enums
const ServerResponses = 
{
    connettionFailed: "connection failed",
    emailExist: "email exist",
    emailNotFound: "email not found",
    wrongPassword: "wrong password",
    success: "success",
    failure: "failure"
};
//Variables
const registrationCard = document.getElementById("registration-card"),
    loginCard = document.getElementById("login-card"),
    password = document.getElementById("password-reg"),
    passwordLog = document.getElementById("password-log"),
    mail = document.getElementById("email-log");
//Functions
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
    console.log(user.id);
    console.log(user.email);
    console.log(user.password);
    console.log(user.name);
    console.log(user.phoneNumber);
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
//EventListners
document.getElementById("sign-in").addEventListener("click", async (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("login-form");
    if (mail.value != "" && passwordLog.value != "") {
        fetch("php/login.php", {
            method: "POST",
            body: new FormData(loginForm)
        }).then((response) => {
            if (response.ok && response.status == 200) {
                return response.json();
            }
            else{
                stableConnection();
            }
        }).then(answer => {
            if ((answer.error == ServerResponses.wrongPassword) && answer.hasOwnProperty("error")) 
            {
                badPassword();
            } else {
                if ((answer.error == ServerResponses.emailNotFound) && answer.hasOwnProperty("error")) 
                {
                    noAccount();
                } 
                else 
                {
                    authorise(answer);
                }
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
    let newUser = {
        name: document.getElementById("name").value,
        phoneNumber: document.getElementById("phone-number").value,
        email: document.getElementById("email-reg").value,
        password: password.value
    };
    fetch("php/registration.php", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status == 200 && response.ok) {
            return response.json();
        }
    }).then(response => {
        const RegistrationMassage = document.getElementById("registration-failed"),
            badInput = document.getElementById("bad-input");
        if ((response.error == ServerResponses.emailExist) && response.hasOwnProperty("error")){
            RegistrationMassage.style.display = "none";
            badInput.style.display = "block";
            badInput.children[0].addEventListener("click", (e)=>{
                e.preventDefault();
                badInput.style.display="none";
                registrationCard.classList.remove("active");
                loginCard.classList.remove("active");
                mail.value = document.getElementById("email-reg").value;
            });
        }
        else {
            badInput.style.display = "none";
            if ((response.result == ServerResponses.failure) && response.hasOwnProperty("result")){
                RegistrationMassage.style.display = "block";
                document.getElementById("ok-registration-failure").addEventListener("click", (e)=>{
                    e.preventDefault();
                    RegistrationMassage.style.display = "none";
                }); 
            }
            else{
                authorise(response);
            }
        }
    });
});