import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form.form');

form.addEventListener('submit', create);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function create(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;

  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {

    
    createPromise(i, inputDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
        timeout: 10000,
      });
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
        timeout: 10000,
      });
    });
    inputDelay += inputStep;
    e.currentTarget.reset();
  }
}
