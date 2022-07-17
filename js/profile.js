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
//object

//mainflow
let Nikita = new Person("Nikita", "Briazgin", "bryazginnik2005@gmail.com", "+380993100138", "Дніпро",
"Я - волонтер з міста Дніпро. Допомогаю людям з пошуком гуманітарної допомоги у" + 
                            " своєму регіоні. Адміністратор сайту “SaveUACivillians”.");
Nikita.render(document.getElementById("person-name"),
        document.getElementById("person-email"),
        document.getElementById("person-phone-number"),
        document.getElementById("person-city"),
        document.getElementById("person-description"),
        document.getElementById("person-city"),
        document.getElementById("diagram-section"),
        document.getElementById("active-requests"),
        document.getElementById("chats"));
        