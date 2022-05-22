const iconLinks = document.querySelectorAll(".iconLink"),
    pages = ["map", "volunteering-page", "donation-page", "info-page"];
iconLinks.forEach(iconLink => {
    function findIndex(element, array){
        let currentIndex = 0;
        array.forEach(item => {
            currentIndex++;
            if (item === element.parentElement) {
                return currentIndex;
            }
        });
        return 0;
    }
    iconLink.addEventListener("click", (e) => {
        let current = findIndex(e.target, iconLinks);
        console.log(e.target);
        console.log(current);
        iconLinks.forEach(item => {
            item.classList.remove("active");
            pages.forEach(item => document.getElementById(item).style.display = "none");
            if (!current){
                document.getElementById(pages[current]).style.display = "block";
            }
        });
        iconLinks[current].classList.add("active");
    });
});
