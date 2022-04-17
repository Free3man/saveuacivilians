const iconLink = document.querySelectorAll(".icon-link");
iconLink.forEach(linkClick => {
    linkClick.addEventListener("click", function() {
        iconLink.forEach(linkRemove => linkRemove.classList.remove("active"));
        this.classList.add("active");
    });
});
console.log(document.querySelector(".icon-link img:nth-child(2)"));