// variables
const iconLinks = document.querySelectorAll(".icon-link"),
      sectionFormLinks = document.querySelectorAll(".icon-section img"),
      contentForm = document.querySelector(".content-box"),
      sideBarPC = document.querySelector(".icons-side-bar-pc"),
      headerMobile = document.querySelector(".mobile-profile-bar"),
      footerMobile = document.querySelector(".footer-side-bar-mobile"),
      sectionPage = document.querySelector(".section_page"),
      rules = ["Вкажіть заголовок для залучення уваги волонтерів та детально опишіть вид необхідної допомоги.", "Якщо характер допомоги є гумунітарним: збір продовольства або медична допомога, то задля відстежування прогресу вкажіть усі необхідні ресурси у таблиці.", "Оберіть вашу локацію (місце збору гуманітарної допомоги, зустрічі для перевезення).", "Оберіть дату та час завершення заявки.", "Напишіть у цій секції додаткові контактні дані, розкажіть більш детально про вашу організацію (необов’язково)."];

// objects
const formData = {
    title: "",
    mainInfo: "",
    typeOfWork: "",
    table: {
        field1:{
            stuff: "",
            number: 0,
            units: "", 
        }
    },
    adressLine: "",
    timer: Date(),
    extraInfo: "",
    accept: {
        line1: false,
        line2: false
    }
};

//addEventListener

window.addEventListener("load", () =>
{
    sectionPage.style.height = `calc(100vh - ${(headerMobile.clientHeight + footerMobile.clientHeight)}px)`;
})

iconLinks.forEach(iconLink => {
    iconLink.addEventListener("click", function() {
        iconLinks.forEach(linkRemove => linkRemove.classList.remove("active"));
        this.classList.add("active");
    });
});


// sectionPage.style.height = `calc(100vh - ${sideBarPC.offsetWidth}px)`;


// sectionFormLinks.forEach(formLink => {
//     formLink.addEventListener("click", function() {
        
//     });
// });

// contentForm.innerHTML = 
// `
// <input type="text" name="" placeholder="Адреса">
// <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29925.971825435387!2d35.06043173705367!3d48.47365731806246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1650455497288!5m2!1sru!2sua" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
// `;

// contentForm.innerHTML = 
// `
// <input type="text" name="" placeholder="Адреса">
// <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29925.971825435387!2d35.06043173705367!3d48.47365731806246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1650455497288!5m2!1sru!2sua" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
// `;