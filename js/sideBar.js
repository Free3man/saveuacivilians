const iconLinks = document.querySelectorAll(".iconLink"),
    pages = ["map", "volunteering-page", "donation-page", "info-page"];
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
        pages.forEach(item => document.getElementById(item).style.display = "none");
        document.getElementById(pages[findIndex(this, iconLinks)]).style.display = 'block';
        iconLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});