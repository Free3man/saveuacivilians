const Form = {
    linksForm: document.querySelectorAll(".roadmap__child"),
    sections: document.querySelectorAll(".form__section"),
    selectPart: function (partIndex) {
        for (let part of this.sections) {
            part.classList.remove("form-stage-active");
        }
        this.sections[partIndex].classList.add("form-stage-active") ;
    }
},
Progress = {
    circleBlock: document.querySelector(".circular-chart > .circle"),
    barBlock: document.querySelector(".mobileProgressBar"),
    percentageText: document.querySelector(".circular-chart > .percentage"),
    stateProgress: 0,
    setNewValue: function(percentage) {
        this.stateProgress = this.stateProgress + percentage;
        [this.circleBlock, this.barBlock].forEach((element) => {
            element.style.transition=`${Math.abs(percentage) / 10}s linear`;
            element.style.setProperty('--value', `${this.stateProgress}`);
        });
        let limitInterval = 1;
        const interval = setInterval(function() { 
            if(limitInterval != percentage) {
                Progress.percentageText.innerHTML = `${limitInterval}%`;
            }
            else {
                clearInterval(interval);
            }
            limitInterval++;
        }, 100);
    }
},
Validation = {
    textFields: document.querySelectorAll(".textfield.form__textfield"),
    checkBoxes: document.querySelectorAll(".checkbox.form__checkbox")
},
ListProperties = {
    inputNewCategory: document.querySelector(".form__input.add__category"),
    inputNewStuff: document.querySelector(".form__input.add__stuff"),
    containerCategories: document.querySelector(".categories"),
    containerToDoList: document.querySelector(".todolist"), 
    classCategoty: "categories__category",
    classStuff: "todolist__stuff",
    btnRemoveCategories: document.querySelector(".btn__remove.remove__category"),
    btnRemoveStuff: document.querySelector(".btn__remove.remove__stuff"),
    setNewValue: (name_, class_, container_, prefix_) => {
        let point = document.createElement("div");
        point.className = class_;
        point.innerHTML = `<span>${prefix_+name_}</span>`;
        point.addEventListener("click", function () {
            if (this.classList.contains("todolist__stuff")) {
                this.classList.add("animation__overlap");
                setTimeout (() => {
                    this.remove();
                }, 600);
            } else {
                this.remove();
            }
        });
        container_.appendChild(point);
    },
    removeAllValues: class_ => {
        for (let point of document.querySelectorAll(`.${class_}`)) {
            point.remove();
        }
    } 
};
//Form 
for (let link of Form.linksForm) {
    link.addEventListener("click", function() {
        Form.selectPart(this.getAttribute("data-mapform"));
    });
}
// Validation
for (let input of Validation.textFields) { 
    input.addEventListener("input", function(e) {
        if (e.target.value.length >= 1 && e.target.getAttribute("data-input") == "false") {
            Progress.setNewValue(10);
            e.target.setAttribute("data-input", "true");
        } else if (e.target.value.length == 0) {
            Progress.setNewValue(-10);
            e.target.setAttribute("data-input", "false");
        }
    });
}
for (let checkBox of Validation.checkBoxes) { 
    checkBox.addEventListener("click", function(e) { 
        if (e.target.checked) {
            Progress.setNewValue(5);
        } else {
            Progress.setNewValue(-5);
        }
    });
}
//ListProperties
ListProperties.inputNewCategory.addEventListener("change", function () {
    ListProperties.setNewValue(this.value, ListProperties.classCategoty, ListProperties.containerCategories, "#");
    this.value = "";
});
ListProperties.inputNewStuff.addEventListener("change", function () {
    let stuffElements = ListProperties.setNewValue(this.value, ListProperties.classStuff, ListProperties.containerToDoList, "");
    this.value = "";
});
ListProperties.btnRemoveCategories.addEventListener("click", function () {
    ListProperties.removeAllValues(ListProperties.classCategoty);
});
ListProperties.btnRemoveStuff.addEventListener("click", function () {
    ListProperties.removeAllValues(ListProperties.classStuff);
});