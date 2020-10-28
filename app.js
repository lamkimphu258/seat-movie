const movie = document.querySelector("#movie");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat:not(.occupied)");

updateCount();

function addMovieData(movieIndex, ticketPrice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("ticketPrice", ticketPrice);
}

function updateCount() {
  let ticketPrice = ~~localStorage.getItem("ticketPrice") || ~~movie.value;
  movie.selectedIndex =
    ~~localStorage.getItem("movieIndex") || movie.selectedIndex;
  const selectedSeatsIndex =
    JSON.parse(localStorage.getItem("selectedSeatsIndex")) || [];
  allSeats.forEach(
    (seat, index) =>
      selectedSeatsIndex.includes(index) && seat.classList.add("selected")
  );
  count.textContent = selectedSeatsIndex.length;
  total.textContent = selectedSeatsIndex.length * ticketPrice;
}

movie.addEventListener("change", (e) => {
  addMovieData(e.target.selectedIndex, e.target.value);
  updateCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    let selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsIndex = [...selectedSeats].map((seat) =>
      [...allSeats].indexOf(seat)
    );
    localStorage.setItem(
      "selectedSeatsIndex",
      JSON.stringify(selectedSeatsIndex)
    );
    updateCount();
  }
});
