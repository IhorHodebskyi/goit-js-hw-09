import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;
let selectedDate = null;
let currentData = null;
let delta = null;
const refs = {
  dateInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysRemaining: document.querySelector('[data-days]'),
  hoursRemaining: document.querySelector('[data-hours]'),
  minutesRemaining: document.querySelector('[data-minutes]'),
  secondsRemaining: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

flatpickr(refs.dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.startBtn.disabled = true;
      Notify.warning('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      refs.startBtn.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  start() {
    intervalId = setInterval(() => {
      refs.dateInput.disabled = true;
      refs.startBtn.disabled = true;
      currentData = Date.now();
      delta = selectedDate - currentData;
      if (delta <= 0) {
        clearInterval(intervalId);
        refs.dateInput.disabled = false;

        return;
      }
      createMarkup(convertMs(delta));
    }, 1000);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function createMarkup({ days, hours, minutes, seconds }) {
  refs.daysRemaining.textContent = addLeadingZero(days);
  refs.hoursRemaining.textContent = addLeadingZero(hours);
  refs.minutesRemaining.textContent = addLeadingZero(minutes);
  refs.secondsRemaining.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
