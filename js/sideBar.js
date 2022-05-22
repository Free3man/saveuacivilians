const iconLinks = document.querySelectorAll(".iconLink");
iconLinks.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        iconLinks.forEach(linkRemove => linkRemove.classList.remove("active"));
        this.classList.add("active");
    });
});
