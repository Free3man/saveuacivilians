class Timer{
    constructor (valueTime) {
        this.value = valueTime;
    }
    setDate() { }
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
class Calendar {
    static daysContainer = container.getElementsByClassName('days')[0];
    constructor (yearSelected, monthSelected, yearToggled, monthToggled) {
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
                for(let dayRemoved of manipulateStructureCalendar) {
                     dayRemoved.children[0].classList.remove("date-now");
                }
                e.target.classList.add("date-now");
                let dayIndicator = new Day(e.target.innerText).setDate();
                let monthIndicator = new Month(this.monthSelected).setDate();
                let yearIndicator = new Year(this.yearSelected).setDate();
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
