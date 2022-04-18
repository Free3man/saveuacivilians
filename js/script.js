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
});
document.getElementById("registration").addEventListener("click", (event) => {
    event.preventDefault();
    console.log(loginCard);
    // document.getElementById("registrationCard").classList.add("active");
    // document.getElementById("loginCard").classList.add("active");
});
document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("registrationCard").classList.remove("active");
    document.getElementById("loginCard").classList.remove("active");
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
            }
            else {
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