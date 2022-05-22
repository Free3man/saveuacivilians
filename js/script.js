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
const contentForm = document.querySelector(".contentBox"),
      iconLinkFormSet = document.querySelectorAll(".mobileIconForm"),
      hintParagraph = document.querySelectorAll(".hintParagraph"),
      inputAddBlock = document.querySelector("#add_field_type"),
      selectCheckbox = document.querySelector(".fieldCheckBoxActivity"),
      rules = ["Вкажіть заголовок для залучення уваги волонтерів та детально опишіть вид необхідної допомоги.",
        "Якщо характер допомоги є гумунітарним, то задля відстежування прогресу збору вкажіть усі необхідні " +
                                                                                            "ресурси у таблиці.",
        "Оберіть вашу локацію (місце збору гуманітарної допомоги, зустрічі для перевезення).",
        "Напишіть у цій секції додаткові контактні дані, розкажіть більш детально про вашу "+
                                                                                    "організацію (необов’язково).",
        "Оберіть дату та час завершення заявки."];
//Functions
function checkBlank(element) {
    if(element.value == "")
    {
        element.parentElement.parentElement.remove();
    }
}
//EventListners
window.addEventListener("load", () =>
{
    const sectionPage = document.querySelector(".sectionRequestForm");
    sectionPage.style.width = `calc(100vw - ${document.querySelector(".sideBar").offsetWidth}px)`;
    sectionPage.style.height = `calc(100vh - ${(document.querySelector(".mobileProfileBar").clientHeight + 
                                                    document.querySelector(".mobileFooter").clientHeight)}px)`;
});
iconLinkFormSet.forEach(iconLink => {
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
    iconLink.addEventListener("click", () => {
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
inputAddBlock.addEventListener("change", () => {
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
document.querySelector(".add-next-field-input").addEventListener("change", (event) => {
    if(event.value != "")
    {
        let clonetableRow = event.target.parentElement.parentElement.cloneNode(true),
            newRow = clonetableRow.firstElementChild.firstElementChild,
            rowElements = event.target.parentElement.parentElement.children;
        newRow.value = event.target.value;
        newRow.classList.remove("add-next-field-input");
        for (let rowElement of rowElements)
        {
            event.target.parentElement.parentElement.children[0].firstElementChild.value = "";
            event.target.parentElement.parentElement.children[1].firstElementChild.value = "";
            event.target.parentElement.parentElement.children[2].firstElementChild.value = "";
        }
        document.querySelector(".data_form_staff").appendChild(clonetableRow);
    }
});
//Main flow