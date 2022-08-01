//Classes
class Circle{
    constructor(data){
        this.value = data.value;
        this.description = data.description;
    }
    render(block){
        
    }
}
class Person{
    constructor(user){
        this.picture = user.picture;
        this.name = user.name;
        this.surname = user.surname;
        this.eMail = user.eMail;
        this.phoneNumber = user.phoneNumber;
        this.city = user.city;
        this.description = user.description;
    }
    static async getPersonFromServer(searchingParams) {
        const response = await fetch("php/profile.php", {
            method: "Post",
            body: JSON.stringify(searchingParams)
        });
        return await response.then(response => {
            if(response.ok && response.status == 200){
                response.json();
            }
        });
    }
    render() {
        document.getElementById("person-picture").innerHTML = document.createElement("img").src = "currentUser.svg";
        nameBlock.innerText = this.name + " " + this.surname;
        eMailBlock.innerText = this.eMail;
        phoneNumberBlock.innerText = this.phoneNumber || "not stated";
        cityBlock.innerText = this.city || "not stated";
        descriptionBlock.innerText = this.description || "not stated";
    }
}








//Objects
localStorage.setItem("mainUser", JSON.stringify({
    name: "Nikita",
    surname: "Briazgin",
    eMail: "bryazginnik2005@gmail.com",
    phoneNumber: "+380993100138",
    city: "Дніпро",
    description: "Я - волонтер з міста Дніпро. Допомогаю людям з пошуком гуманітарної допомоги у" + 
                " своєму регіоні. Адміністратор сайту “SaveUACivillians”.",
    picture: "briazgin2005.svg",
}));
//mainflow
let Nikita = new Person(JSON.parse(localStorage.mainUser));
Nikita.render();