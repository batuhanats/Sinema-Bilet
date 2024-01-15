const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie")
const count = document.querySelector("#count")
const amount = document.querySelector("#amount")
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton")
runEventListeners();

function runEventListeners() {
    container.addEventListener("click", select);
    selectMovie.addEventListener("change", changemovie);
    document.addEventListener("DOMContentLoaded", runPageLoaded)
    buyButton.addEventListener("click", buyTicket)

}

function runPageLoaded() {
    const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
    seats.forEach((seat, index) => {
        if (selectedSeatsIndex.includes(index)) {
            seat.classList.add("selected");
        }
    })

    selectMovie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
}

function buyTicket() {
    if (confirm("Satın Almak İsyor musunuz ?")) {
        const selectedSeats = getSelectedSeats();
        const selectedSeatsIndex = getSelectedSeatsIndex();

        selectedSeats.forEach(seat => seat.classList.remove("selected"));
        Storagex.AddFullSeatToStorage(selectedSeatsIndex);




    }

}

function select(e) {
    const selectedElement = e.target.parentElement;
    if (selectedElement.classList.contains("seat") && !selectedElement.classList.contains(".full")) {
        selectedElement.classList.toggle("selected");
        calculate();
        saveSelectedSeatsIndexToStorage();
        saveSelectedMovieIndexToStorage();

    }
}

function changemovie() {
    calculate();
    saveSelectedMovieIndexToStorage();

}

function getSelectedSeats() {
    const selectedList = [...container.querySelectorAll(".selected")];
    return selectedList;

}

function getSelectedSeatsIndex() {
    const selectedList = getSelectedSeats();
    const selectedSeatsIndex = selectedList.map((seat) => {
        return seats.indexOf(seat);

    })
    return selectedSeatsIndex;
}

function saveSelectedSeatsIndexToStorage() {
    const selectedSeatsIndex = getSelectedSeatsIndex();
    Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
};

function saveSelectedMovieIndexToStorage() {
    const selectedMovieIndex = selectMovie.selectedIndex;
    Storagex.addSelectedMovieToStorage(selectedMovieIndex);

}


function calculate() {
    const selectedSeatsCount = getSelectedSeats().length;
    const price = selectMovie.options[selectMovie.selectedIndex].value;

    count.textContent = selectedSeatsCount;
    amount.textContent = selectedSeatsCount * price

}