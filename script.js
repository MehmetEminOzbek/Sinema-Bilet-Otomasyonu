const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromlocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
})
select.addEventListener('change', function(e) {
    calculateTotal();
})

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatsArr = [];
    const seatsArr = [];
    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });
    seats.forEach(function(seat) {
        seatsArr.push(seat);
    });
    let selectedSeatsIndexes = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    });
    let selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeats.length;
    amount.innerText = selectedSeatsCount * select.value;

    saveTolocalStorage(selectedSeatsIndexes);
}

function saveTolocalStorage(indexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem("selectedSeatsMovie", select.selectedIndex);
}

function getFromlocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem(localStorage.getItem('selectedMovieIndex'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}