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
    render(nameBlock, eMailBlock, phoneNumberBlock, cityBlock,
        descriptionBlock, diagramsBlock, advertisementsBlock, chatsBlock) {
        function renderDiagrams(diagramsBlock, diagramsData) {
            
        }
        function renderAdvertisements(advBlock, advData) {
            
        }
        function renderChats(chatsBlock, chatsData) {
            
        }
        function diagramsData(){

        }
        function advData(){

        }
        function chatsData(){

        }
        nameBlock.innerText = this.name + " " + this.surname;
        eMailBlock.innerText = this.eMail;
        phoneNumberBlock.innerText = this.phoneNumber || "not stated";
        cityBlock.innerText = this.city || "not stated";
        descriptionBlock.innerText = this.description || "not stated";
        renderDiagrams(diagramsBlock, diagramsData());
        renderAdvertisements(advertisementsBlock, advData());
        renderChats(chatsBlock, chatsData());
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
                " своєму регіоні. Адміністратор сайту “SaveUACivillians”."
}));
//mainflow
let Nikita = new Person(JSON.parse(localStorage.mainUser));
Nikita.render(document.getElementById("person-name"),
        document.getElementById("person-email"),
        document.getElementById("person-phone-number"),
        document.getElementById("person-city"),
        document.getElementById("person-description"),
        document.getElementById("person-city"),
        document.getElementById("diagram-section"),
        document.getElementById("active-requests"),
        document.getElementById("chats"));