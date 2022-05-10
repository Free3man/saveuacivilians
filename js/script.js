
// navigation-menu --variables
const iconLinks = document.querySelectorAll(".iconLink"),
      sectionFormLinks = document.querySelectorAll(".icon-section img"),
      contentForm = document.querySelector(".contentBox"),
      sideBarPC = document.querySelector(".sideBar"),
      headerMobile = document.querySelector(".mobileProfileBar"),
      footerMobile = document.querySelector(".mobileFooter");
// --functions
iconLinks.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        iconLinks.forEach(linkRemove => linkRemove.classList.remove("active"));
        this.classList.add("active");
    });
});
// css-fix
const sectionPage = document.querySelector(".sectionRequestForm");
window.addEventListener("load", () =>
{
    sectionPage.style.width = `calc(100vw - ${sideBarPC.offsetWidth}px)`;
    sectionPage.style.height = `calc(100vh - ${(headerMobile.clientHeight + footerMobile.clientHeight)}px)`;
});

const iconLinkFormSet = document.querySelectorAll(".mobileIconForm"),
      iconLinkFormSetMobile = document.querySelectorAll(".mobilelinksForm svg"),
      hintParagraph = document.querySelectorAll(".hintParagraph"),
      buttonSwitch = document.querySelector(".control-box button"),
      inputTableAdd = document.querySelector(".add-next-field-input"),
      tableForm = document.querySelector(".data_form_staff"),
      inputAddBlock = document.querySelector("#add_field_type"),
      selectCheckbox = document.querySelector(".fieldCheckBoxActivity"),
      svgCircleProgress = document.querySelector(".circle_box circle:nth-child(2)"),
      rules = ["Вка&#173;жіть за&#173;го&#173;ло&#173;вок для за&#173;лу&#173;чен&#173;ня ува&#173;ги во&#173;лон&#173;терів та де&#173;таль&#173;но опи&#173;шіть вид не&#173;об&#173;хід&#173;ної до&#173;по&#173;мо&#173;ги.", "Як&#173;що ха&#173;рак&#173;тер до&#173;по&#173;мо&#173;ги є гу&#173;мунітар&#173;ним, то зад&#173;ля від&#173;сте&#173;жу&#173;ван&#173;ня про&#173;гре&#173;су збо&#173;ру вка&#173;жіть усі не&#173;об&#173;хід&#173;ні ре&#173;сур&#173;си у таб&#173;ли&#173;ці.", "Оберіть ва&#173;шу ло&#173;ка&#173;цію (міс&#173;це збо&#173;ру гу&#173;манітар&#173;ної до&#173;по&#173;мо&#173;ги, зустрічі для пе&#173;ре&#173;ве&#173;зен&#173;ня).",  "На&#173;пи&#173;шіть у цій сек&#173;ції до&#173;дат&#173;ко&#173;ві кон&#173;такт&#173;ні дані, роз&#173;ка&#173;жіть більш де&#173;таль&#173;но про ва&#173;шу ор&#173;гані&#173;за&#173;цію (не&#173;обов’яз&#173;ко&#173;во).", "Оберіть да&#173;ту та час за&#173;вер&#173;шен&#173;ня за&#173;яв&#173;ки.", ""];
// objects
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

//addEventListener




iconLinkFormSet.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        console.log(hintParagraph);
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
        // svgCircleProgress.style.cssText = `stroke-dashoffset: calc((100 * 6) - ((100 * 6) * (${numberFilled} * 10)) / 100)`;
        insertForm(numSection);
    });
});
inputAddBlock.addEventListener("change", function(){
    selectCheckbox.innerHTML += `<div class="activity">
        <input type="checkbox" name="" id="transit_auto"><label for="transit_auto">${this.value}</label>
        <img src="/img/deleteBin.svg" alt=""class="deleteRecord">
    </div>`;
    for(recordBin of document.getElementsByClassName("deleteRecord"))
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
buttonSwitch.addEventListener("click", () => {buttonSwitch.classList.add("animate__jello");});
buttonSwitch.addEventListener("animationend", () => {buttonSwitch.classList.remove("animate__jello");});




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
      mainInfoBox = document.getElementById("main_info_box_form"),
      dropDownMenu = document.querySelector(".taskTitleBox"),
      selectorTitle  = document.querySelector(".taskTitleBox"),
      selectorButton = document.querySelector(".taskTitleBox img"),
      selectorList = document.querySelector(".activitiesList");

    

//create element
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