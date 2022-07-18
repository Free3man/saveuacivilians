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

//***Time Section***
//Variables
let container = document.getElementById('month-calendar'),
    monthContainer = container.getElementsByClassName('month-name')[0],
    yearContainer = container.getElementsByClassName('year-name')[0],
    prev = container.getElementsByClassName('prev')[0],
    next = container.getElementsByClassName('next')[0],
    monthName = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень',
            'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    weekName = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

var dateSelected = new Date(),
    selectedHours = dateSelected.getHours(), 
    selectedMinutes = dateSelected.getMinutes(),
    dateMoved = new Date();
//Set time indexes
class Timer{
    constructor (valueTime) {
        this.value = valueTime;
    }
    setDate() { 
    }
    increment() { }
    decrement() { }
}
class Year extends Timer {
    setDate () {
        dateSelected.setYear(this.value);
        return this.value;
    }
}
class Month extends Timer {
    setDate () {
        dateSelected.setMonth(this.value);
        return this.value;
    }
}
class Day extends Timer {
    setDate () {
        dateSelected.setDate(this.value);
        return this.value;
    }
}
class Hours extends Timer {
    increment() {
        if (this.value + 1 <= 23) {
            this.value++;
        }
    }
    decrement() {
        if (this.value - 1 >= 0) {
            this.value--;
        }
    }
    setDate () {
        dateSelected.setHours(this.value);
        return this.value;
    }
}
class Minutes extends Timer {
    increment() {
        if (this.value + 1 <= 59) {
            this.value++;
        }
    }
    decrement() {
        if (this.value - 1 >= 0) {
            this.value--;
        }
    }
    setDate () {
        dateSelected.setMinutes(this.value);
        return this.value;
    }
}
//Set calendar
class Calendar {
    constructor (yearSelected, monthSelected, yearToggled, monthToggled) {
        this.daysContainer = container.getElementsByClassName('days')[0];
        this.yearSelected = yearSelected;
        this.monthSelected = monthSelected;
        this.yearToggled = yearToggled;
        this.monthToggled = monthToggled;
    }
    setDayFromCalendar() {
        const manipulateStructureCalendar = this.daysContainer.children;
        for(let dayChecked of manipulateStructureCalendar) {
            const someDate = dayChecked.children[0];
            someDate.addEventListener("click", (e) => {
                //Change active day
                for(let dayRemoved of manipulateStructureCalendar) {
                     dayRemoved.children[0].classList.remove("date-now");
                }
                e.target.classList.add("date-now");
                //Update day
                let dayIndicator = new Day(e.target.innerText).setDate();
                let monthIndicator = new Month(this.monthSelected).setDate();
                let yearIndicator = new Year(this.yearSelected).setDate();
                //Update calendar on form
                let calendarIndex = document.querySelector("#dateTrigger").children;
                calendarIndex[0].innerText = weekName[dateSelected.getDay()];
                calendarIndex[1].innerText = dateSelected.getDate();
                calendarIndex[2].innerText = `${monthName[dateSelected.getMonth()]} ${dateSelected.getFullYear()}`;
                if(dateSelected != new Date() && dateValid == false) {taskProgress = increment(taskProgress, 20); dateValid = true;};
            });
        }
    }
    setMonthCalendar() {
        let monthDays = new Date(this.yearSelected, this.monthSelected + 1, 0).getDate(),
            monthPrefix = new Date(this.yearSelected, this.monthSelected, 0).getDay(),
            monthDaysText = "";
        monthContainer.textContent = monthName[this.monthSelected];
        yearContainer.textContent = this.yearSelected;
        this.daysContainer.innerHTML = '';
        //Add days to container
        if (monthPrefix > 0){
            for (let i = 1 ; i <= monthPrefix; i++){
                monthDaysText += '<li><p></p></li>';
            }
        }
        for (let i = 1; i <= monthDays; i++){
            monthDaysText += '<li><p>' + i + '</p></li>';
        }
        this.daysContainer.innerHTML = monthDaysText;
        //Highlight selected date
        if (this.monthSelected == this.monthToggled && this.yearSelected == this.yearToggled){
            let days = this.daysContainer.getElementsByTagName('li');
            days[monthPrefix+dateSelected.getDate()-1].children[0].classList.add('date-now');
        }
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
      svgCircleProgress = document.querySelector(".circular-chart > .circle"),
      progressBar = document.querySelector(".mobileProgressBar"),
      svgCirclePercentage = document.querySelector(".circular-chart > .percentage"),
      titleInfoBox = document.getElementById("title_box_form"),
      adressBox = document.querySelector(".mapboxgl-ctrl-geocoder--input"),
      mainInfoBox = document.getElementById("main_info_box_form"),
      acceptPolicy = document.querySelectorAll("#accept_form > input[type=checkbox]"),
      extraInfoBox = document.getElementById("extra_info_box_form");
var taskProgress = 0, listValid = false, dateValid = false;
//Functions for validation 
function increment(indexProgress, percentage) {
    let sec = 1;
    svgCircleProgress.style.transition=`${percentage/10}s linear`;
    svgCircleProgress.style.setProperty('--value', `${indexProgress+percentage}`);
    progressBar.style.transition=`${percentage/10}s linear`;
    progressBar.style.setProperty('--value', `${indexProgress+percentage}%`);
    let decrementInterval = setInterval(function() { 
        if(sec<=percentage) {
            svgCirclePercentage.innerHTML = `${(indexProgress+sec)}%`;
        }
        else {
            clearInterval(decrementInterval);
        }
        sec++;
    }, 100);
    return indexProgress + percentage;
}  
function decrement(indexProgress, percentage) {
    let sec = 1;
    svgCircleProgress.style.transition=`${percentage/10}s linear`;
    svgCircleProgress.style.setProperty('--value', `${indexProgress-percentage}`);
    progressBar.style.transition=`${percentage/10}s linear`;
    progressBar.style.setProperty('--value', `${indexProgress-percentage}%`);
    let decrementInterval = setInterval(function() { 
        if(sec<=percentage) {
            svgCirclePercentage.innerHTML = `${(indexProgress-sec)}%`;
        }
        else {
            clearInterval(decrementInterval);
        }
        sec++;
    }, 100);
    return indexProgress - percentage;
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
const contentForm = document.querySelector(".contentBox"),
      iconMobileFormSet = document.querySelectorAll(".mobileIconForm > svg"),
      iconComputerFormSet = document.querySelectorAll(".pcIconForm > svg"),
      hintParagraph = document.querySelectorAll(".hintParagraph"),
      buttonSwitch = document.querySelectorAll(".control-box button"),
      moveForward = document.querySelector("#moveForward"),
      rules = ["Вкажіть заголовок для залучення уваги волонтерів та детально опишіть вид необхідної допомоги.", "Якщо характер допомоги є гумунітарним, то задля відстежування прогресу збору вкажіть усі необхідні ресурси у таблиці.", "Оберіть вашу локацію (місце збору гуманітарної допомоги, зустрічі для перевезення).",  "Напишіть у цій секції додаткові контактні дані, розкажіть більш детально про вашу організацію.", "Оберіть дату та час завершення заявки.", ""];
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
window.onload = async function () {
    //Navigation callback
    const navMotion = new Navigation(iconLinks, pageSections);
    navMotion.changePage();
    //load all elements
    const mapMainContainer = document.getElementById("mapSection");
    mapMain = mapInit(mapMainContainer, styles.property, [32.504, 48.464], 5.18);
    mapMain.resize();
    mapMain.addControl(new mapboxgl.NavigationControl());
    mapMain.on("zoom", function() {
        if(mapMain.getZoom() > 12) {
            for (let marker of document.querySelectorAll(".marker")) {
                marker.classList.add("active");
            }
        } else {
            for (let marker of document.querySelectorAll(".marker")) {
                marker.classList.remove("active");
            }
        }
    });
    const response = await fetch('../system/form_get.php', {method: "GET"});
	const answer = response.json();
	answer.then(resolve => {
		if(resolve.hasOwnProperty('array')){
			resolve.array.forEach(item => {
				item = JSON.parse(item);
                let typeWork; 
                switch(item.types_of_work) {
                    case 'Гумунітарна допомога':
                      typeWork = "humanitary filterHumanitarian";
                      break;
                    case 'Медична допомога':
                      typeWork = "medical filterFirstAid";
                      break;
                    case 'Автопревезення':
                      typeWork = "transport filterTransport";
                      break;
                    default:
                      typeWork = "basic filterMoreTypes";
                      break;
                }
                renderMarker(mapMain, JSON.parse(item.adress_coordinates).coordinates, typeWork);
			});
		}
	});
    // Elements to interact with timer
    const btnsUpSwitch = document.querySelectorAll(".btnUpNum"),
          btnsDownSwitch = document.querySelectorAll(".btnDownNum"),
          parentElementTime = document.querySelectorAll(".timerContainer > input"),
          dateIcon = document.querySelector("#dateTrigger"),
          timerContainer = document.querySelectorAll(".timerContainer");
    // Trigger calendar icon
    dateIcon.children[0].innerText = weekName[dateSelected.getDay()];
    dateIcon.children[1].innerText = dateSelected.getDate();
    dateIcon.children[2].innerText = `${monthName[dateSelected.getMonth()]} ${dateSelected.getFullYear()}`;
    if(selectedHours <= 9) {
        document.querySelectorAll(".timerContainer")[0].children[1].value = "0"+selectedHours;
    }
    else {
        document.querySelectorAll(".timerContainer")[0].children[1].value = selectedHours;
    }
    if(selectedMinutes <= 9) {
        document.querySelectorAll(".timerContainer")[1].children[1].value = "0"+selectedMinutes;
    }
    else {
        document.querySelectorAll(".timerContainer")[1].children[1].value = selectedMinutes;
    }
    //AddEventListeners
    dateIcon.addEventListener("click", function() {
        document.querySelector(".calendar-container").classList.toggle("active");
    });
    document.querySelector(".calendar-container").addEventListener("click", function(e) {
        if(e.target == document.querySelector(".calendar-container")) {
            document.querySelector(".calendar-container").classList.toggle("active");
        }
    });
    timerContainer[0].children[1].addEventListener("input", function() {
        selectedHours = this.value;
        dateSelected = new Date(`${dateSelected.getYear()}-${dateSelected.getMonth()}-${dateSelected.getDate()}T${selectedHours}:${selectedMinutes}`);
    });
    timerContainer[1].children[1].addEventListener("input", function() {
        selectedMinutes = this.value;
        dateSelected = new Date(`${dateSelected.getYear()}-${dateSelected.getMonth()}-${dateSelected.getDate()}T${selectedHours}:${selectedMinutes}`);
    });
    function forCreatedCalendar() {
        let createdCalendar = new Calendar(dateMoved.getFullYear(), dateMoved.getMonth(), dateSelected.getFullYear(), dateSelected.getMonth());
        createdCalendar.setMonthCalendar();
        createdCalendar.setDayFromCalendar();
    }
    prev.onclick = function () {
        dateMoved.setMonth(dateMoved.getMonth() - 1);
        forCreatedCalendar();
    };
    next.onclick = function () {
        dateMoved.setMonth(dateMoved.getMonth() + 1);
        forCreatedCalendar();
    };
    forCreatedCalendar();
    // Current Hour and Minute
    let countHour = parseInt(parentElementTime[0].value),
        countMinute = parseInt(parentElementTime[1].value);
    // Classes Hour and Minute elements
    const hourIndicator = new Hours (countHour),
          minuteIndicator = new Minutes (countMinute);
    // Callback functions of timer
    function setProgressTime(timeOut) {
        clearInterval(timeOut);
        if(dateSelected != new Date() && dateValid == false) {taskProgress = increment(taskProgress, 20); dateValid = true;};
    }
    ['mousedown','touchstart'].forEach(evt => {
        btnsUpSwitch[0].addEventListener(evt, function(e) {
            const timeOut = setInterval(() => {
                hourIndicator.increment();
                countHour = hourIndicator.setDate();
                if(countHour <= 9) {
                    parentElementTime[0].value = "0" + countHour;
                }
                else {
                    parentElementTime[0].value = countHour;
                }
            }, 100);
            ['mouseup', 'mouseleave','touchend','touchcancel'].forEach(underevt =>  {
                this.addEventListener(underevt, function() {
                    setProgressTime(timeOut);
                });
            });
        });
        btnsUpSwitch[1].addEventListener(evt, function(e) {
            const timeOut = setInterval(() => {
                minuteIndicator.increment();
                countHour = minuteIndicator.setDate();
                if(countHour <= 9) {
                    parentElementTime[1].value = "0" + countHour;
                }
                else {
                    parentElementTime[1].value = countHour;
                }
            }, 100);
            ['mouseup', 'mouseleave','touchend','touchcancel'].forEach(underevt =>  {
                this.addEventListener(underevt, function() {
                    setProgressTime(timeOut);
                });
            });
        });
        btnsDownSwitch[0].addEventListener(evt, function(e) {
            const timeOut = setInterval(() => {
                hourIndicator.decrement();
                countHour = hourIndicator.setDate();
                if(countHour <= 9) {
                    parentElementTime[0].value = "0" + countHour;
                }
                else {
                    parentElementTime[0].value = countHour;
                }
            }, 100);
            ['mouseup', 'mouseleave','touchend','touchcancel'].forEach(underevt =>  {
                this.addEventListener(underevt, function() {
                    setProgressTime(timeOut);
                });
            });
        });
        btnsDownSwitch[1].addEventListener(evt, function(e) {
            const timeOut = setInterval(() => {
                minuteIndicator.decrement();
                countHour = minuteIndicator.setDate();
                if(countHour <= 9) {
                    parentElementTime[1].value = "0" + countHour;
                }
                else {
                    parentElementTime[1].value = countHour;
                }
            }, 100);
            ['mouseup', 'mouseleave','touchend','touchcancel'].forEach(underevt =>  {
                this.addEventListener(underevt, function() {
                    setProgressTime(timeOut);
                });
            });
        });
    });
};

document.querySelectorAll(".rotate-trigger").forEach(rotate => {
    rotate.addEventListener("click", function(e) {
        alert(e.target);    
        document.querySelector(".flip-modal-info-inner").classList.toggle("flip-active");
        setTimeout(function() {
            document.querySelectorAll(".rotate-card-flip").forEach(card => {
                card.classList.toggle("transform-disabled");
            });
        }, 300);
    });
});
// Map filter
const triggerFilter = document.querySelectorAll(".trigger-open-block");
for (let trigger of triggerFilter) {
    trigger.addEventListener("click", function() {
        this.parentNode.children[0].classList.toggle("active");
        suggestionsWrapper.innerHTML = "";
       
    });
}
document.querySelector(".searchbar-filter > .cross-input").addEventListener("click", function(e) {
    document.getElementsByClassName("search-adress-main-map")[0].value = "";
    suggestionsWrapper.innerHTML = "";
});
for (let categoryApp of document.querySelectorAll(".box-category-help")) {
    categoryApp.addEventListener("click", function(e) {
        this.classList.toggle("active");
        this.children[0].checked = (this.children[0].checked) ? false : true;
        let filterArray = [];
        for (let options of document.querySelectorAll(".mapFilterActivity")) { 
            if (options.checked) {
                filterArray.push(options.id);
            }
        }
        if(filterArray.length > 0) {
            for (let marker of document.querySelectorAll(`.marker`)) {
                if (filterArray.includes(marker.classList[3]) && marker.style.display === "none") {
                    marker.style.display = "block";
                    marker.classList.add("animate__fadeIn");
                    marker.addEventListener("animationend", () => {
                        marker.classList.remove("animate__fadeIn");
                    }, {once: true});
                } 
                else if (!filterArray.includes(marker.classList[3]) && marker.style.display === "block") {
                    marker.classList.add("animate__fadeOut");
                    marker.addEventListener("animationend", () => {
                            marker.classList.remove("animate__fadeOut");
                            marker.style.display = "none";
                    }, {once: true});
                } 
            }
        } else {
            for (let marker of document.querySelectorAll(`.marker`)) {
                if (marker.style.display === "none") {
                    marker.style.display = "block";
                    marker.classList.add("animate__fadeIn");
                    marker.addEventListener("animationend", () => {
                        marker.classList.remove("animate__fadeIn");
                    }, {once: true});
                }
            }
        }
    });
}
