const { doc } = require('prettier');

function chooseSeat() {
  if (event.target.classList.contains('seat-choose')) {
    event.target.classList.remove('seat-choose');
  } else {
    event.target.classList.add('seat-choose');
  }
}

//handle form
const form = document.getElementById('booking_form');
form.addEventListener('submit,', function (event) {
  // event.preventDefault();
  const idOrderSeats = document.getElementById('booking_order_seat');
  const userId = document.getElementById('');
  const routeId = document.getElementById('');
  const paymentMethod = document.getElementById('booking_directly_method');
  if (paymentMethod.checked) {
    console.log('helo');
  }
});
