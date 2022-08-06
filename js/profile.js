//Classes
class Circle{
    constructor(data){
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    render(block){
        block.innerHTML += 
        `<div class="item">
            <div class="person-profile-circle"><p>${this.value}</p></div>
            <h3 id="description">${this.description}</h3>
        </div>`;
        
    }
}
class Request{
    constructor(data){
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    render(block){
        block.innerHTML += 
        `<div class="item request">
        <div id="request-info"></div>
        <div class="menu-bar">
            <div id="matchReaded" class="option">
                <img src="img/system/menuBar/match as read.svg">
            </div>
            <div id="edit" class="option">
                <img src="img/system/menuBar/edit.svg">
            </div>
            <div id="delete" class="option">
                <img src="img/system/menuBar/delete.svg">
            </div>
        </div>
    </div>`;
        
    }
}
class Chat{
    constructor(data){
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    render(block){
        block.innerHTML += 
        `<div class="item">
            <div class="item chat">
                <div id="request-info"></div>
            </div>
        </div>`;
    }
}
class Person{
    constructor(user, circlesData, activeRequests, matchedChats){
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                this[key] = user[key];
            }
        }
        this.circles = [];
        circlesData.forEach(temp => {
            this.circles.push(new Circle(temp).render(document.getElementById("person-circles-block")));
        });
        this.requests = [];
        activeRequests.forEach(temp => {
            this.requests.push(new Request(temp).render(document.getElementById("person-requests-block")));
        });
        this.chats = [];
        matchedChats.forEach(temp => {
            this.chats.push(new Chat(temp).render(document.getElementById("person-chats-block")));
        });
    }
    render() {
        const userImg = document.createElement("img");
        document.getElementById("person-picture").appendChild(userImg);
        //TODO: redo reaching picture
        userImg.src = `img/${this.picture}`;
        userImg.classList.add();
        document.getElementById("person-name").innerText = `${this.surname} ${this.name} ${this.fatherName}`;
        document.getElementById("person-e-mail").innerText = this.eMail;
        document.getElementById("person-phone-number").innerText = this.phoneNumber || "not stated";
        document.getElementById("person-city").innerText = this.city || "not stated";
        if(this.description){
            document.getElementById("person-info-block").innerHTML += 
            `<div class="item">
                <p>Про себе:</p>
                <h3>${this.description}</h3>
            </div>`;
        }
    }
    static async getPersonFromServer(searchingParams) {
        const response = await fetch("php/profile.php", {
            method: "POST",
            body: JSON.stringify(searchingParams)
        });
        return await response.then(response => {
            if(response.ok && response.status == 200){
                response.json();
            }
        });
    }
    static async getPersonsCircles(searchingParams) {
        const response = await fetch("php/profile.php", {
            method: "POST",
            body: JSON.stringify(searchingParams)
        });
        return await response.then(response => {
            if(response.ok && response.status == 200){
                response.json();
            }
        });
    }
    static async getPersonsRequests(searchingParams) {
        const response = await fetch("php/profile.php", {
            method: "POST",
            body: JSON.stringify(searchingParams)
        });
        return await response.then(response => {
            if(response.ok && response.status == 200){
                response.json();
            }
        });
    }
    static async getPersonsChats(searchingParams) {
        const response = await fetch("php/profile.php", {
            method: "POST",
            body: JSON.stringify(searchingParams)
        });
        return await response.then(response => {
            if(response.ok && response.status == 200){
                response.json();
            }
        });
    }
    
}
//Objects
localStorage.setItem("mainUser", JSON.stringify({
    name: "Микита",
    surname: "Брязгін",
    fatherName: "Сергійович",
    eMail: "bryazginnik2005@gmail.com",
    phoneNumber: "+380993100138",
    city: "Дніпро",
    description: "Я - волонтер з міста Дніпро. Допомогаю людям з пошуком гуманітарної допомоги у" + 
                " своєму регіоні. Адміністратор сайту “SaveUACivillians”.",
    picture: "bryazginnik2005.svg",
}));
//mainflow
const user = new Person(JSON.parse(localStorage.mainUser), [{value: 15, description: "gndfkjngijfdn"}], [], []);
user.render();