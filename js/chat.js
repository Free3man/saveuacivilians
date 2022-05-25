"use strict";
let menuBar = document.getElementById("chat-menu");
document.getElementById("menu").addEventListener("click", ()=>{
    menuBar.classList.add("active");
});
document.getElementById("cross").addEventListener("click", ()=>{
    menuBar.classList.remove("active");
});