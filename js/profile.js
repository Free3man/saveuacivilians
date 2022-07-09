//Classes
class Person{
    constructor(name, surname, eMail, phoneNumber, city, description){
        this.name = name;
        this.surname = surname;
        this.eMail = eMail;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.description = description;
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
        nameBlock.innerText = this.name + " " + this.surname;
        eMailBlock.innerText = this.eMail;
        phoneNumberBlock.innerText = this.phoneNumber || "not stated";
        cityBlock.innerText = this.city || "not stated";
        descriptionBlock.innerText = this.description || "not stated";
        renderDiagrams(diagramsBlock, diagramsData());
    }
}
//Variables
const userName = document.getElementById("name"),
    postAdress = document.getElementById("email"),
    phoneNumber = document.getElementById("phone-number"),
    city = document.getElementById("city");
//mainflow
let Nikita = new Person("Nikita", "Briazgin", "bryazginnik2005@gmail.com", "+380506666666");
Nikita.render(document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("phone-number"),
        document.getElementById());