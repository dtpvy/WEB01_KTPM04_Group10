// import { doc } from('prettier');
// import models from('../../models');

function chooseSeat() {
  if (event.target.classList.contains('seat-choose')) {
    event.target.classList.remove('seat-choose');
  } else {
    event.target.classList.add('seat-choose');
  }
}

// document.querySelector('.seat--padding').addEventListener('onclick', (event) => {
//   if (event.target.classList.contains('seat-choose')) {
//     event.target.classList.remove('seat-choose');
//   } else {
//     event.target.classList.add('seat-choose');
//   }
// });

// //handle form
const form = document.getElementById('booking_form');
form.addEventListener('submit', function () {
  event.preventDefault();
  const idOrderSeats = document.getElementById('booking_order_seat');
  const userId = document.getElementById('');
  const routeId = document.getElementById('');
  const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
  let selectedMethod;
  for (const paymentMethod of paymentMethods) {
    if (paymentMethod.checked) {
      selectedMethod = paymentMethod.value;
      break;
    }
  }
  if (selectedMethod == 'booking_momo_method') {
    console.log('momo');
  } else if (selectedMethod == 'booking_directly_method') {
    console.log('directly');
    console.log(route.id);
    window.location.href = 'http://www.w3schools.com';
  }
  return false;
});

// function submitHandle(){
//   event.preventDefault();
// }
