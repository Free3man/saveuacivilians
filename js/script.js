const iconLinks = document.querySelectorAll(".iconLink");
const pageSections = document.querySelectorAll("main > section");
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

window.onload = function () {
    const navMotion = new Navigation(iconLinks, pageSections);
    navMotion.changePage();
};
// --functions

const sideBarPC = document.querySelector(".sideBar");
const headerMobile = document.querySelector(".mobileProfileBar");
const footerMobile = document.querySelector(".mobileFooter");

const contentForm = document.querySelector(".contentBox");
const iconLinkFormSet = document.querySelectorAll(".mobileIconForm"),
      iconLinkFormSetMobile = document.querySelectorAll(".mobilelinksForm svg"),
      hintParagraph = document.querySelectorAll(".hintParagraph"),
      buttonSwitch = document.querySelectorAll(".control-box button"),
      inputTableAdd = document.querySelector(".add-next-field-input"),
      tableForm = document.querySelector(".data_form_staff"),
      inputAddBlock = document.querySelector("#add_field_type"),
      selectCheckbox = document.querySelector(".fieldCheckBoxActivity"),
      rules = ["Вка&#173;жіть за&#173;го&#173;ло&#173;вок для за&#173;лу&#173;чен&#173;ня ува&#173;ги во&#173;лон&#173;терів та де&#173;таль&#173;но опи&#173;шіть вид не&#173;об&#173;хід&#173;ної до&#173;по&#173;мо&#173;ги.", "Як&#173;що ха&#173;рак&#173;тер до&#173;по&#173;мо&#173;ги є гу&#173;мунітар&#173;ним, то зад&#173;ля від&#173;сте&#173;жу&#173;ван&#173;ня про&#173;гре&#173;су збо&#173;ру вка&#173;жіть усі не&#173;об&#173;хід&#173;ні ре&#173;сур&#173;си у таб&#173;ли&#173;ці.", "Оберіть ва&#173;шу ло&#173;ка&#173;цію (міс&#173;це збо&#173;ру гу&#173;манітар&#173;ної до&#173;по&#173;мо&#173;ги, зустрічі для пе&#173;ре&#173;ве&#173;зен&#173;ня).",  "На&#173;пи&#173;шіть у цій сек&#173;ції до&#173;дат&#173;ко&#173;ві кон&#173;такт&#173;ні дані, роз&#173;ка&#173;жіть більш де&#173;таль&#173;но про ва&#173;шу ор&#173;гані&#173;за&#173;цію (не&#173;обов’яз&#173;ко&#173;во).", "Оберіть да&#173;ту та час за&#173;вер&#173;шен&#173;ня за&#173;яв&#173;ки.", ""];



iconLinkFormSet.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        iconLinkFormSet.forEach(iconLinkFormRemove => iconLinkFormRemove.children[0].classList.remove("active"));
        this.children[0].classList.add("active");
        let numSection = parseInt(this.getAttribute('data-formSection')),
            numberFilled = 0;
        if(numSection != 5)
        {
            hintParagraph.forEach(hint => {hint.innerHTML = '<b style="font-weight: 600;">Підказка: </b>' +rules[numSection];})
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
        // svgCircleProgress.style.cssText = `stroke-dashoffset: calc((100 * 6) - ((100 * 6) * (${numberFilled} * 10)) / 100)`;
        insertForm(numSection);
    });
});
inputAddBlock.addEventListener("change", function(){
    selectCheckbox.innerHTML += `<div class="activity">
        <input type="checkbox" name="" id="transit_auto"><label for="transit_auto">${this.value}</label>
        <img src="/img/deleteBin.svg" alt=""class="deleteRecord">
    </div>`;
    for(var recordBin of document.getElementsByClassName("deleteRecord"))
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
// animation
hintParagraph.forEach(hint => {hint.addEventListener('animationend', () => {hint.classList.remove("animate__flipInX");});});
contentForm.addEventListener('animationend', () => {contentForm.classList.remove("animate__fadeIn");});
buttonSwitch[0].addEventListener("click", () => {buttonSwitch[0].classList.add("animate__jello");});
buttonSwitch[0].addEventListener("animationend", () => {buttonSwitch[0].classList.remove("animate__jello");});




//functions
function insertForm(idSection)
{
    contentForm.classList.remove("animate__fadeIn");
    for(formSection of contentForm.children)
    {
        formSection.style.display="none";
    }
    contentForm.children[idSection].style.display="flex";
    contentForm.classList.add("animate__fadeIn");
}


//form executor

const titleBox = document.getElementById("title_box_form"),
    labelTrigerMenu = document.querySelectorAll(".labelTrigerMenu"),
    selectorList = document.querySelector(".activitiesList");

    

//create element
console.log(labelTrigerMenu);
for (let selectors of labelTrigerMenu) {
    selectors.addEventListener("click", function() {
        console.log(this.children[1]);
        this.children[1].classList.toggle("active");  
        this.parentElement .children[1].classList.toggle("active");
    });
}


inputTableAdd.addEventListener("change", function () {
    if(this.value != "")
    {
        let clonetableRow = this.parentElement.parentElement.cloneNode(true),
            newRow = clonetableRow.firstElementChild.firstElementChild,
            rowElements = this.parentElement.parentElement.children;
        newRow.value = this.value;
        newRow.classList.remove("add-next-field-input");
        newRow.addEventListener("change", checkBlank);
        for (rowElement of rowElements)
        {
            this.parentElement.parentElement.children[0].firstElementChild.value = "";
            this.parentElement.parentElement.children[1].firstElementChild.value = "";
            this.parentElement.parentElement.children[2].firstElementChild.value = "";
        }
        
        tableForm.appendChild(clonetableRow);
    }

});

function checkBlank(){
    if(this.value == "")
    {
        this.parentElement.parentElement.remove();
    }
}
const contentFormFields = document.getElementsByClassName("contentFields");

for (fieldForm of contentFormFields) {
    for(childrenField of fieldForm.children)
    console.log(fieldForm.children);
}






//form components
const formSubmitBtn = document.querySelector(".volunteeringformSendButton"),
      svgCircleProgress = document.querySelector(".circular-chart > .circle"),
      svgCirclePercentage = document.querySelector(".circular-chart > .percentage"),
      titleInfoBox = document.getElementById("title_box_form"),
      mainInfoBox = document.getElementById("main_info_box_form"),
      adressInfoBox = document.getElementById("adress_info_box_form"),
      acceptPolicy = document.querySelectorAll("#accept_form > input[type=checkbox]"),
      typesofWorkCheckbox = document.querySelectorAll(".fieldCheckBoxActivity > .activity input[type=checkbox]"),
      extraInfoBox = document.getElementById("extra_info_box_form");
var taskProgress = 0;
//functions of bar animation
async function increment(indexProgress) {
    let sec = 1;
    let promise = new Promise(resolve => {
        svgCircleProgress.style.setProperty('--value', `${(indexProgress+1)*10}`);
        let decrementInterval = setInterval(function() { 
            if(sec<=10) {
                svgCirclePercentage.innerHTML = `${(indexProgress*10) + sec}%`;
            }
            else {
                clearInterval(decrementInterval);
                resolve();
            }
            sec++;
        }, 100);
    });
    promise.then(() => {
        indexProgress++;
        taskProgress = indexProgress;
    });
}
async function decrement(indexProgress) {
    let sec = 1;
    let promise = new Promise(resolve => {
        svgCircleProgress.style.setProperty('--value', `${(indexProgress-1)*10}`);
        let decrementInterval = setInterval(function() { 
            if(sec<=10) {
                svgCirclePercentage.innerHTML = `${(indexProgress*10) - sec}%`;
            }
            else {
                clearInterval(decrementInterval);
                resolve();
            }
            sec++;
        }, 100);
    });
    promise.then(() => {
        indexProgress--;
        taskProgress = indexProgress;
    });
} 
// elements validaton
for (var fieldAccept of acceptPolicy) {
    fieldAccept.addEventListener("click", function() {
        if(this.checked) {
            increment(taskProgress);
        }
        else {
            decrement(taskProgress);
        }
    });
}
for (var checkBoxWork of typesofWorkCheckbox) {
    checkBoxWork.addEventListener("click", function() {
        for (var workChecked of typesofWorkCheckbox) {
            if(workChecked.checked) {
                typesofWorkValid = true;
            }
        }
        if(typesofWorkValid) {
            increment(taskProgress);
        }
        else {
            decrement(taskProgress);
        }
    });
}
[titleInfoBox, mainInfoBox, extraInfoBox, adressInfoBox].forEach(elementFormVolunteer => elementFormVolunteer.addEventListener("change", function() {   
    if(this.value.length >= 1) {
        if(this.getAttribute("data-filled") != "true") {
            this.setAttribute("data-filled", "true");
            increment(taskProgress);
        }
    }
    if(this.value.length == 0) {
        if(this.getAttribute("data-filled") != "false") {
            this.setAttribute("data-filled", "false");
            decrement(taskProgress);
        }
    }
}));
//form sending
formSubmitBtn.addEventListener("click", () => {
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
    formData.title = titleInfoBox.value;
    formData.mainInfo = mainInfoBox.value;
    formData.extraInfo = extraInfoBox.value;
    formData.adressLine =  adressInfoBox.value;
    formData.accept.line1 = acceptPolicy[0].checked;
    formData.accept.line2 = acceptPolicy[1].checked;
    for (var checkWork of typesofWorkCheckbox)
    {
        if(checkWork.checked) {
            formData.typeOfWork.push(checkWork.id);
        }
    }
    console.log(formData);
});