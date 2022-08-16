//***Navigation Section***
//Variables
const iconLinks = document.querySelectorAll(".iconLink");
const pageSections = document.querySelectorAll("main > section");
//Set navigation switcher
class Navigation {
    constructor(links, pages) {
        this.links = links;
        this.pages = pages;
    }
    changePage () {
        this.links.forEach(linkAdd => {
            linkAdd.addEventListener("click", (e) => {
                for (let linkRemove of this.links) {
                   linkRemove.classList.remove("active");
                }
                e.target.parentElement.classList.add("active");
                for (let pageHide of this.pages) {
                    pageHide.style = "display: none;";
                }
                let pageID = parseInt(e.target.parentElement.getAttribute("data-page"));
                this.pages[pageID].style = "display: block;";
            });
        });
    }
}



//***Form executor methods***
//Variables (form components)
const labelTrigerMenu = document.querySelectorAll(".labelTrigerMenu"),
      inputTableAdd = document.querySelector(".add-next-field-input"),
      tableForm = document.querySelector(".data_form_staff"),
      inputAddBlock = document.querySelector(".add_field_type"),
      selectCheckbox = document.querySelector(".FormActivities"),
      formSubmitBtn = document.querySelector(".volunteeringformSendButton"),
      titleInfoBox = document.getElementById("title_box_form"),
      adressBox = document.querySelector(".mapboxgl-ctrl-geocoder--input"),
      mainInfoBox = document.getElementById("main_info_box_form"),
      acceptPolicy = document.querySelectorAll("#accept_form > input[type=checkbox]"),
      extraInfoBox = document.getElementById("extra_info_box_form");
var taskProgress = 0, listValid = false, dateValid = false;
//Functions for validation 
const Progress = {
    circle: document.querySelector(".circular-chart > .percentage"),
    bar: document.querySelector(".mobileProgressBar"),
    stateProgress: 0,
    setNewValue: function(percentage) {
        this.stateProgress = this.stateProgress + percentage;
        [this.circle, this.bar].forEach((element) => {
            element.style.transition=`${this.percentage / 10}s linear`;
            element.style.setProperty('--value', `${this.stateProgress}`);
        });
        let interval = setInterval(function() { 
            // if(this.percentage >= 1) {
            //     svgCirclePercentage.innerHTML = `${(indexProgress+sec)}%`;
            // }
            // else {
            //     clearInterval(decrementInterval);
            // }
            console.log(interval);
        }, 100);
    }
},
Validation = {
    textFields: document.querySelectorAll("textfield form__textfield"),
};

Progress.setNewValue(10);
for (let element of Validation.textFields) { 
    element.addEventListener("input", function(e) { 
        Progress.setNewValue(e.target.getAttribute("data-points"));
    });
}
function checkboxMenuProgress() {
    let workValid = false;
    for (let workChecked of document.querySelectorAll(".FormActivities > .activity input[type=checkbox]")) {
        if(this !== workChecked) {
            workChecked.checked = false;
        } 
        if(workChecked.checked) {
            workValid = true;
            if(!listValid) {
                taskProgress = increment(taskProgress, 10);
                listValid = true;
            }
            break;
        }
    }
    if(!workValid) {
        taskProgress = decrement(taskProgress, 10);
        listValid = false;
    }
}
//Selectbox control
for (let selectors of labelTrigerMenu) {
    selectors.addEventListener("click", function() {
        this.children[1].classList.toggle("active");  
        this.parentElement.children[1].classList.toggle("active");
    });
}
//Add new field to selectbox
inputAddBlock.addEventListener("change", function(){
    let typeExtra = document.querySelector(".FormActivities > .activity").cloneNode(true);
    typeExtra.innerHTML += `<img src="/img/deleteBin.svg" alt=""class="deleteRecord">`;
    typeExtra.children[0].addEventListener("click", checkboxMenuProgress, false);
    typeExtra.children[0].id = this.value;
    typeExtra.children[1].setAttribute("for", this.value);
    typeExtra.children[1].innerText = this.value;
    typeExtra.children[2].addEventListener("click", function() {
        let deleteRecord = false;
        for (let workChecked of document.querySelectorAll(".FormActivities > .activity input[type=checkbox]")) {
            if(workChecked.checked) {
                deleteRecord = true;
            }
        }
        this.parentElement.remove();
        if(selectCheckbox.children.length <= 6) {
            inputAddBlock.removeAttribute('disabled', '');
            inputAddBlock.style.opacity = "1";
        }
        if(deleteRecord) {
            let validCheck = false;
            for (let workChecked of document.querySelectorAll(".FormActivities > .activity input[type=checkbox]")) {
                if(workChecked.checked) {
                    validCheck = true;
                } 
            }
            if(!validCheck) {
                taskProgress = decrement(taskProgress, 10);
                listValid = false;
            }
        }
    });
    selectCheckbox.appendChild(typeExtra);
    if(selectCheckbox.children.length == 6)
    {
        this.setAttribute('disabled', '');
        this.style.opacity = "0.5";
    }
    this.value = "";
});
//Add new field to table
inputTableAdd.addEventListener("change", function () {
    if(this.value != "")
    {
        let clonetableRow = this.parentElement.parentElement.cloneNode(true),
            newRow = clonetableRow.firstElementChild.firstElementChild,
            rowElements = this.parentElement.parentElement.children;
        newRow.value = this.value;
        newRow.classList.remove("add-next-field-input");
        newRow.addEventListener("change", function() {
            if(this.value == "")
            {
                this.parentElement.parentElement.remove();
            }
        });
        for (let rowElement of rowElements)
        {
            this.parentElement.parentElement.children[0].firstElementChild.value = "";
            this.parentElement.parentElement.children[1].firstElementChild.value = "";
            this.parentElement.parentElement.children[2].firstElementChild.value = "";
        }
        tableForm.appendChild(clonetableRow);
    }

});
//Donut Progress count and animations
for (let checkBoxWork of  document.querySelectorAll(".FormActivities > .activity input[type=checkbox]")) {
    checkBoxWork.addEventListener("click", checkboxMenuProgress);
}
for (let fieldAccept of acceptPolicy) {
    fieldAccept.addEventListener("click", function() {
        if(this.checked) {
            taskProgress = increment(taskProgress, 5);
        }
        else {
            taskProgress = decrement(taskProgress, 5);
        }
    });
}
function inputProgress() {
    if(this.value.length >= 1) {
        if(this.getAttribute("data-filled") != "true") {
            this.setAttribute("data-filled", "true");
            taskProgress = increment(taskProgress, 15);
        }
    }
    if(this.value.length == 0) {
        if(this.getAttribute("data-filled") != "false") {
            this.setAttribute("data-filled", "false");
            taskProgress = decrement(taskProgress, 15);
        }
    }
}
[titleInfoBox, mainInfoBox, extraInfoBox, adressBox].forEach(elementFormVolunteer => elementFormVolunteer.addEventListener("change", inputProgress));

//***Animation for Form***
//Variables

//***Send form***
let adressLine = []; 
formSubmitBtn.addEventListener("click", () => {
    const formData = {
        title: titleInfoBox.value,
        mainInfo: mainInfoBox.value,
        typeOfWork: "",
        table: [],
        adressLine: adressLine,
        timer: dateSelected.toISOString().split('T')[0] + ' ' + dateSelected.toTimeString().split(' ')[0],
        extraInfo: extraInfoBox.value,
        accept: {
            line1: acceptPolicy[0].checked,
            line2: acceptPolicy[1].checked
        }
    };
    let typeworkcheck = false, tablerowcheck = true;
    for (let checkWork of document.querySelectorAll(".FormActivities > .activity input[type=checkbox]"))
    {
        if(checkWork.checked) {
            formData.typeOfWork = checkWork.id;
            typeworkcheck = true;
        }
    }
    for (let rowTable of document.querySelectorAll(".form_table"))
    {
        if(rowTable.children[0].children[0].value != "") {
            let rowObject = {
                stuffTable: rowTable.children[0].children[0].value, 
                numberTable: rowTable.children[1].children[0].value, 
                measureTable: rowTable.children[2].children[0].value
            };
            if (rowObject.stuffTable == "" || rowObject.number == "" || rowObject.measureTable == "") {
                tablerowcheck = false;
                break;
            }
            formData.table.push(rowObject);
        }
    }
    function setSection (numberSection, text) {
        iconMobileFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.classList.remove("active"));
        iconMobileFormSet[numberSection].classList.add("active");
        iconComputerFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.classList.remove("active"));
        iconComputerFormSet[numberSection].classList.add("active");
        document.querySelector(".alert-error").style.display = "block";
        document.querySelector(".alert-error > p").innerHTML = text;    
        animateSlideChange(numberSection);
    }
    if (titleInfoBox.value == "" || mainInfoBox.value == "") {
        setSection(0, "Заповніть ці поля(-е)");
    }
    else if (adressLine == []) {
        setSection(2, "Вкажіть адресу");
    }
    else if (dateSelected <= new Date()) {
        setSection(4, "Укажіть коректну дату");
    }
    else if (extraInfoBox.value == "") {
        setSection(3, "Вкажіть додаткову інформації");
    }
    else if (!acceptPolicy[0].checked || !acceptPolicy[1].checked) {
        setSection(5, "Підтвердіть усі пункти");
    }
    else if(!typeworkcheck) {
        setSection(1, "Вкажіть вид волонтерської роботи");
    }
    else if(!tablerowcheck) {
        setSection(1, "Заповніть усі пункти таблиці");
    }
    else {
        document.querySelector(".alert-error").style.display = "none";
        const url = '../system/form_send.php';
        try {
            const response = fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resolve => {
                const modalsendBlock = document.querySelector(".block-modal-form"), 
                      completeFormMessage = document.querySelector(".status-message"),
                      formSectionVolunteering = document.querySelector("#form-add-request"),
                      sectionVolunteering = document.querySelector("#addVolunteeringForm");
                formSectionVolunteering.style.padding = "0 calc(50% - 400px)";
                modalsendBlock.style.display = 'none';
                document.querySelector("lottie-player").play();
                completeFormMessage.children[1].innerText = "Вашу заяву успішно опубліковано";
                completeFormMessage.style.display = "flex";
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            });
        }
        catch (error) {
            setSection(0, "Сервер тимчасово не працює, перезавантажте сторінку");
        }
    }
});

//***Website onload callback***

    //Navigation callback
    const navMotion = new Navigation(iconLinks, pageSections);
    navMotion.changePage();
    document.querySelectorAll(".rotate-trigger").forEach(rotate => {
        rotate.addEventListener("click", function(e) {
            document.querySelector(".flip-modal-info-inner").classList.toggle("flip-active");
            setTimeout(function() {
                document.querySelectorAll(".rotate-card-flip").forEach(card => {
                    card.classList.toggle("transform-disabled");
                });
            }, 300);
        });
    });



    const contentForm = document.querySelector(".contentBox"),
      iconMobileFormSet = document.querySelectorAll(".mobileIconForm > svg"),
      iconComputerFormSet = document.querySelectorAll(".pcIconForm > svg"),
      hintParagraph = document.querySelectorAll(".hintParagraph"),
      buttonSwitch = document.querySelectorAll(".control-box button"),
      moveForward = document.querySelector("#moveForward"),
      rules = ["Вкажіть заголовок для залучення уваги волонтерів та детально опишіть вид необхідної допомоги.", 
      "Якщо характер допомоги є гумунітарним, то задля відстежування прогресу збору вкажіть усі необхідні ресурси у таблиці.", 
      "Оберіть вашу локацію (місце збору гуманітарної допомоги, зустрічі для перевезення).",  
      "Напишіть у цій секції додаткові контактні дані, розкажіть більш детально про вашу організацію.", 
      "Оберіть дату та час завершення заявки."];
let numSection = 0;
//Callback animations and switchers
hintParagraph.forEach(hint => {hint.addEventListener('animationend', () => {hint.classList.remove("animate__flipInX");});});
contentForm.addEventListener('animationend', () => {contentForm.classList.remove("animate__fadeIn");});
buttonSwitch[0].addEventListener("click", () => {buttonSwitch[0].classList.add("animate__jello");});
buttonSwitch[0].addEventListener("animationend", () => {buttonSwitch[0].classList.remove("animate__jello");});
//Highlight animations
function animateSlideChange(numSection) {
    if(numSection != 5)
    {
        hintParagraph.forEach(hint => {hint.innerHTML = '<b style="font-weight: 600;">Підказка: </b>' +rules[numSection];});
        hintParagraph.forEach(hint => {
            hint.classList.add("animate__flipInX");
        });
        buttonSwitch[1].style="display:none"; 
        buttonSwitch[0].style="display:block"; 
    }
    else
    {
        hintParagraph.forEach(hint => {hint.innerHTML = '';}); 
        buttonSwitch[0].style="display:none"; 
        buttonSwitch[1].style="display:block"; 
    }
    contentForm.classList.remove("animate__fadeIn");
    for(let formSection of contentForm.children)
    {
        formSection.style.display="none";
    }
    contentForm.children[numSection].style.display="flex";
    contentForm.classList.add("animate__fadeIn");
    if(contentForm.children[numSection].style.display === "flex") {
        mapForm.resize();
    }
}
function selectSlideFormthroughIcon() {
    numSection = parseInt(this.getAttribute('data-formsection'));
    animateSlideChange(numSection);
    iconMobileFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.classList.remove("active"));
    iconMobileFormSet[numSection].classList.add("active");
    iconComputerFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.classList.remove("active"));
    iconComputerFormSet[numSection].classList.add("active");
}
iconMobileFormSet.forEach(iconLink => {
    iconLink.addEventListener("click", selectSlideFormthroughIcon);
});
iconComputerFormSet.forEach(iconLink => {
    iconLink.addEventListener("click", selectSlideFormthroughIcon);
});
moveForward.addEventListener("click", function() { 
    iconMobileFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.classList.remove("active"));
    iconComputerFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.classList.remove("active"));
    numSection++;
    iconMobileFormSet[numSection].classList.add("active");
    iconComputerFormSet[numSection].classList.add("active");
    animateSlideChange(numSection);
});
