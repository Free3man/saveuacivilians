const iconLinks = document.querySelectorAll(".iconLink"),
    pages = ["mapSection", "volunteering-page", "donation-page", "info-page", "profile"];
let currentPage = document.getElementById(pages[0]);
console.log(currentPage);
iconLinks.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        function findIndex(element, array){
            for (let i = 0; i < array.length; i++) {
                if (array[i] == element){
                    return i;
                }
            }
            return 0;
        }
        let fadeOut = true,
            step = 50,
            counter = step;
        let fadeing = setInterval(() => {
            currentPage.style.opacity = (counter/step);
            if (fadeOut){
                counter--;
            }
            else{
                counter++;
            }
            if (!counter){
                fadeOut = false;
                currentPage.style.display = "none";
                currentPage.style.opacity = 1;
                currentPage = document.getElementById(pages[findIndex(this, iconLinks)]);
                currentPage.style.opacity = 0;
                currentPage.style.display = "block";
            }
            if (counter >= step && !fadeOut){
                clearInterval(fadeing);
                currentPage.style.opacity = 1;
            }
        }, 1);
        iconLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});