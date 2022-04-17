//Variables
const image = document.querySelector(".registrationPic");
let currentPicture = 1;
//Fucntions
//EventListers
//Timers
let pictureSwitcher = setInterval(()=>{
    currentPicture = 1 + currentPicture%7;
    let opacity = 1;
    let changed = false;
    const changer = setInterval(()=>{
        if (changed) 
        {
            opacity += 0.01;
            if (opacity>=1) {
                clearInterval(changer);
                changed = false;
            }
        } 
        else 
        {
            opacity -= 0.01;
            if (opacity <= 0)
            {
                changed = true;
                opacity = 0;
                image.src = `pics/systemPics/registration/${currentPicture}.svg`;
            }
        }
        image.style.opacity = opacity;
        console.log(opacity);
    }, 15);
}, 7000);
//Mainflow