//Variables
const image = document.querySelector(".registrationPic"),
    registrationCard = document.getElementById("registrationCard"),
    loginCard = document.getElementById("loginCard");
let currentPicture = 1;
//Fucntions
//EventListers
document.getElementById("signIn").addEventListener("click", (event) => {
    event.preventDefault();
    let user = {
        mail: document.getElementById("emailL").value,
        password: document.getElementById("passwordL").value
    };
    console.log(user);
});
document.getElementById("passwordR").addEventListener("onblur", () => {
    if (document.getElementById("passwordR").value != document.getElementById("password").value &&
        document.getElementById("passwordR").value != "" &&
        document.getElementById("password").value != "") {
        alert("Паролі не збігаюся");
    }
});
// document.getElementById("signUp").addEventListener("click", (event)=>{
//     event.preventDefault();
//     let newUser = {
//         name: document.getElementById("name").value,
//         phoneNumber: document.getElementById("phoneNumber").value,
//         mail: document.getElementById("emailL").value,
//         password: document.getElementById("passwordL").value
//     };
// });
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
                    image.src = `pics/systemPics/registration/${currentPicture}.svg`;
                }
            }
            image.style.opacity = opacity;
        }, 15);
    }
}, 15000);
//Mainflow