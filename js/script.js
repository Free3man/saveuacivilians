"use strict";
// Objects
const formData = {
    title: "",
    mainInfo: "",
    typeOfWork: [],
    table: {
    },
    adressLine: "",
    timer: "",
    extraInfo: "",
    accept: {
        line1: false,
        line2: false
    }
};
//Variables
const iconLinks = document.querySelectorAll(".iconLink"),
      sectionFormLinks = document.querySelectorAll(".icon-section img"),
      contentForm = document.querySelector(".contentBox"),
      sideBarPC = document.querySelector(".sideBar"),
      headerMobile = document.querySelector(".mobileProfileBar"),
      footerMobile = document.querySelector(".mobileFooter"),
      iconLinkFormSet = document.querySelectorAll(".mobileIconForm"),
      iconLinkFormSetMobile = document.querySelectorAll(".mobilelinksForm svg"),
      hintParagraph = document.querySelectorAll(".hintParagraph"),
      buttonSwitch = document.querySelector(".control-box button"),
      inputTableAdd = document.querySelector(".add-next-field-input"),
      tableForm = document.querySelector(".data_form_staff"),
      inputAddBlock = document.querySelector("#add_field_type"),
      selectCheckbox = document.querySelector(".fieldCheckBoxActivity"),
      svgCircleProgress = document.querySelector(".circle_box circle:nth-child(2)"),
      titleBox = document.getElementById("title_box_form"),
      mainInfoBox = document.getElementById("main_info_box_form"),
      dropDownMenu = document.querySelector(".taskTitleBox"),
      selectorTitle  = document.querySelector(".taskTitleBox"),
      selectorButton = document.querySelector(".taskTitleBox img"),
      selectorList = document.querySelector(".activitiesList"),
      rules = ["Вкажіть заголовок для залучення уваги волонтерів та детально опишіть вид необхідної допомоги.",
        "Якщо характер допомоги є гумунітарним, то задля відстежування прогресу збору вкажіть усі необхідні " +
                                                                                            "ресурси у таблиці.",
        "Оберіть вашу локацію (місце збору гуманітарної допомоги, зустрічі для перевезення).",
        "Напишіть у цій секції додаткові контактні дані, розкажіть більш детально про вашу "+
                                                                                    "організацію (необов’язково).",
        "Оберіть дату та час завершення заявки."];
//Functions
iconLinks.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        iconLinks.forEach(linkRemove => linkRemove.classList.remove("active"));
        this.classList.add("active");
    });
});
function insertForm(idSection)
{
    contentForm.classList.remove("animate__fadeIn");
    for(let formSection of contentForm.children)
    {
        formSection.style.display="none";
    }
    contentForm.children[idSection].style.display="flex";
    contentForm.classList.add("animate__fadeIn");
}
function checkBlank(){
    if(this.value == "")
    {
        this.parentElement.parentElement.remove();
    }
}
for (let fieldForm of document.getElementsByClassName("contentFields")) {
    for(let childrenField of fieldForm.children){
        console.log(fieldForm.children);
    }
}
//EventListners
window.addEventListener("load", () =>
{
    const sectionPage = document.querySelector(".sectionRequestForm");
    sectionPage.style.width = `calc(100vw - ${sideBarPC.offsetWidth}px)`;
    sectionPage.style.height = `calc(100vh - ${(headerMobile.clientHeight + footerMobile.clientHeight)}px)`;
});
iconLinkFormSet.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        iconLinkFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.children[0].classList.remove("active"));
        this.children[0].classList.add("active");
        let numSection = parseInt(this.getAttribute('data-formSection')),
            numberFilled = 0;
        if(numSection != 5)
        {
            hintParagraph.forEach(hint => 
                        hint.innerHTML = '<b style="font-weight: 600;">Підказка: </b>' +rules[numSection]);
            hintParagraph.forEach(hint => {
                hint.classList.add("animate__flipInX");
            });
        }
        else
        {
            hintParagraph.forEach(hint => {hint.innerHTML = '';});
        }
        for (let field in formData) {
            if((field!="")&&(field!=[]))
            {
                numberFilled++;
            }
        }
        insertForm(numSection);
    });
});
inputAddBlock.addEventListener("change", function(){
    selectCheckbox.innerHTML += `
    <div class = "activity">
        <input type = "checkbox" id = "transit_auto">
        <label for = "transit_auto">
            ${this.value}
        </label>
        <div>
            <img src = "/img/deleteBin.svg" alt=""class="deleteRecord">
        </div>
    </div>`;
    for(let recordBin of document.getElementsByClassName("deleteRecord"))
    {
        recordBin.addEventListener("click", function(){
            this.parentElement.remove();
            if(selectCheckbox.children.length <= 6)
            {
                inputAddBlock.removeAttribute('disabled', '');
                inputAddBlock.style.opacity = "1";
            }
        });
    }
    if(selectCheckbox.children.length == 6)
    {
        this.setAttribute('disabled', '');
        this.style.opacity = "0.5";
    }
    this.value = "";
});
document.querySelector(".taskTitleBox").addEventListener("click", () => {
    document.querySelector(".taskTitleBox img").classList.toggle("active");
    document.querySelector(".activitiesList").classList.toggle("active");
});
inputTableAdd.addEventListener("change", function () {
    if(this.value != "")
    {
        let clonetableRow = this.parentElement.parentElement.cloneNode(true),
            newRow = clonetableRow.firstElementChild.firstElementChild,
            rowElements = this.parentElement.parentElement.children;
        newRow.value = this.value;
        newRow.classList.remove("add-next-field-input");
        newRow.addEventListener("change", checkBlank);
        for (let rowElement of rowElements)
        {
            this.parentElement.parentElement.children[0].firstElementChild.value = "";
            this.parentElement.parentElement.children[1].firstElementChild.value = "";
            this.parentElement.parentElement.children[2].firstElementChild.value = "";
        }
        tableForm.appendChild(clonetableRow);
    }
});
//Main flow