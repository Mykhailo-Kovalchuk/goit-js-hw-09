// Підключив та імпортував бібліотеку, а через (npm i flatpickr --save)  
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// const flatpickr = require("flatpickr");
// "Витягнув" кнопку та інпут в JS, а також підв`язав ініціалізацію бібліотеки на інпуті. 
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true; // по дефолту кнопка неактивна (активуємо її коли користувач обере дату). 
let countInterval; 


// "Витягнув" інші дата-атрибути з HTML
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');



const inputData = document.querySelector('#datetime-picker');
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) { 
      console.log(selectedDates[0]);
// Завдання секції "Вибір Дати" - Додамо одразу умови методу onClose
if (selectedDates[0] < new Date()) {
   return window.alert("Please choose a date in the future")
} else { //Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
    btnStart.disabled = false;
}
    },
  };
flatpickr(inputData, options);



// Відлік часу
// Трохи видозміню запропонований шаблон функції із завдання і оголошу її як стрілочну
const convertMs = () => {
btnStart.disabled = true;
const selectedDate = inputData._flatpickr.selectedDates[0];

clearInterval(countInterval); // Очищуємо таймер після натискання кнопки.

countInterval = setInterval(() => { 
    
    // Запуск нового таймеру

const timeNow = new Date();
const ms = selectedDate - timeNow;

if (ms <= 0) { // Зупиняю таймер коли він дійшов до нуля.
    clearInterval(countInterval); 
    return;
}


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// Роблю часове вирахування таймеру (через Math.floor беремо нашу різницю в поточному часі та обраним
//  і розбиваємо її на кількість мілісекунд у даному відрізку часу (1000мсек = 1сек, відповідно 
// множенням можна дізнатись, яка кількість мілісекунд є в обраному нами відрізку часу))

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);


// Оновлюю значення таймеру

const formattedDays = addLeadingZero(days);
const formattedHours = addLeadingZero(hours);
const formattedMinutes = addLeadingZero(minutes);
const formattedSeconds = addLeadingZero(seconds);

// Робимо функцію додавання нулю перед одинарним числом 
function addLeadingZero(value) {
    return value < 10 ? `0${value}` : `${value}`;
  };


daysElement.textContent = formattedDays;
hoursElement.textContent = formattedHours;
minutesElement.textContent = formattedMinutes;
secondsElement.textContent = formattedSeconds;

}, 0);

// return { days, hours, minutes, seconds }
};

btnStart.addEventListener('click', convertMs);



