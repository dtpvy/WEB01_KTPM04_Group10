// import { doc } from('prettier');
// import models from('../../models');

// const { models } = require('../../models');
let numberOfSeatChosen = 0;
function chooseSeat(numberOfSeatChosen) {
  if (event.target.classList.contains('seat-choose')) {
    event.target.classList.remove('seat-choose');
    numberOfSeatChosen--;
    console.log(numberOfSeatChosen);
  } else {
    event.target.classList.add('seat-choose');
    numberOfSeatChosen++;
    console.log(numberOfSeatChosen);
  }
}

// //handle form
// const form = document.getElementById('booking_form');
// form.addEventListener('submit', async function () {
//   event.preventDefault();
//   const idOrderSeats = document.getElementById('booking_order_seat');
//   const userId = document.getElementById('booking_user_id').value;
//   const routeId = document.getElementById('route_id').value;
//   const coachId = document.getElementById('booking_coach_id').value;
//   console.log(userId, routeId, coachId);
//   const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
//   let selectedMethod;
//   for (const paymentMethod of paymentMethods) {
//     if (paymentMethod.checked) {
//       selectedMethod = paymentMethod.value;
//       break;
//     }
//   }
//   if (selectedMethod == 'booking_momo_method') {
//     console.log('momo');
//   } else if (selectedMethod == 'booking_directly_method') {
//     console.log('directly');
//     models.Order.create({
//       routeId: routeId,
//       userId: userId,
//     });
//     const order = await models.Order.findOne({
//       where: {
//         routeId: routeId,
//       },
//       order: [['createdAt', 'DESC']],
//       include: [
//         {
//           model: models.Route,
//           required: true,
//         },
//       ],
//     });
//     window.location.href = `/booking/booked_ticket/${order.id}`;
//   }
//   return false;
// });

// function submitHandle(){
//   event.preventDefault();
// }
