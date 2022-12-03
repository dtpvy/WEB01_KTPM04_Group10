function chooseSeat() {
  if (event.target.classList.contains('seat-choose')) {
    event.target.classList.remove('seat-choose');
  } else {
    event.target.classList.add('seat-choose');
  }
}
