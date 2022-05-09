let currentDonationPhoto = 0,
donationContent = document.getElementsByClassName("donation-content"),
currentX = 0,
dots = document.getElementsByClassName("dot");
function changeContent(){
    for (const item of donationContent) {
        item.classList.add("hidden");
    }
    for (const item of dots) {
        item.classList.remove("selection");
    }
    donationContent[currentDonationPhoto].classList.remove("hidden");
    dots[currentDonationPhoto].classList.add("selection");
}
document.querySelector("#left-arrow").addEventListener("click", ()=>{
    currentDonationPhoto = (currentDonationPhoto+donationContent.length-1)%3;
    changeContent();
});
document.querySelector("#right-arrow").addEventListener("click", ()=>{
    currentDonationPhoto = (currentDonationPhoto+1)%3;
    changeContent();
});
setInterval(()=>{
    currentDonationPhoto = (currentDonationPhoto+1)%3;
    changeContent();
}, 7500);
