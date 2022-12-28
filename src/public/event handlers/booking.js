function chooseSeat() {
  if (event.target.classList.contains('seat-choose')) {
    event.target.classList.remove('seat-choose');
  } else {
    event.target.classList.add('seat-choose');
  }
}

function switchBetweenBookingSteps() {
  console.log(event.target.id);
  step1 = document.querySelector('#booking_choose_seat').classList;
  step2 = document.querySelector('#booking_input_infor').classList;
  step3 = document.querySelector('#booking_choose_payment').classList;
  // switch (event.target.id) {
  //   case 'booking_step_1_to_2':
  //     step1.remove('d-block');
  //     step1.add('d-none');
  //     step2.remove('d-none');
  //     step2.add('d-block');
  //     break;
  // case 'booking_step_2_to_1':
  // step2.remove('d-block');
  // step2.add('d-none');
  // step1.remove('d-none');
  // step1.add('d-block');
  //   break;
  // // case booking_step_2_to_1:
  // //   break;
  // default:
  //   break;
  // }
  if (step1.contains('d-block')) {
    step1.remove('d-block');
    step1.add('d-none');
    step2.remove('d-none');
    step2.add('d-block');
  } else if (step2.contains('d-block')) {
    step2.remove('d-block');
    step2.add('d-none');
    if (event.target.id == 'booking_step_2_to_1') {
      step1.remove('d-none');
      step1.add('d-block');
    } else if (event.target.id == 'booking_step_2_to_3') {
      step3.remove('d-none');
      step3.add('d-block');
    }
  } else {
    step3.remove('d-block');
    step3.add('d-none');
    step2.remove('d-none');
    step2.add('d-block');
  }
  console.log('step1:', step1);
  console.log('step2:', step2);
  console.log('step3:', step3);
}
