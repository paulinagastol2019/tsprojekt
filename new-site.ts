const imionSelect = document.querySelector<HTMLInputElement>("#imiona");
const datSelect = document.querySelector<HTMLInputElement>("#data");
const miastSelect = document.querySelector<HTMLSelectElement>("#miasto");
const bagaSelect = document.querySelector<HTMLInputElement>("#bagaz");

class AppNewSite {
    wybranyLotIndex;
    constructor() {
        this.pokazLot();
        this.podlaczPrzyciski();
    }
    
    // uzupełnia formularz danymi z localStorage
    pokazLot() {
        let loty = localStorage.getItem('zapiszLoty');
        let przechowalniaLotow = JSON.parse(loty);
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        let idPobrane = urlParams.get('id');
        let id = parseInt(idPobrane) - 1;
        let wybranyLot = przechowalniaLotow[id];
        this.wybranyLotIndex = id;
        if(przechowalniaLotow != null) {
            imionSelect.value = wybranyLot.wybraneImiona.nazwa;
            datSelect.value = wybranyLot.wybranaData.nazwa;
            miastSelect.options[miastSelect.selectedIndex].innerHTML = wybranyLot.wybraneMiasto.nazwa;
        } else {
            window.location.href = 'helloweb.html';
        }
    }

    // podłączenie działania przycisków
    podlaczPrzyciski() {
        document.querySelector('#potwierdz').addEventListener('click', this.zapiszLot);
        document.querySelector('#wstecz').addEventListener('click', this.powrotDoGlownejStrony);
    }

    // reakcja na przycisk Potwierdź Lot, która aktualizuje wybrany lot z tabeli i aktualizuje localStorage i przenosi do głównej strony
    zapiszLot() {
        let loty = localStorage.getItem('zapiszLoty');
        let przechowalniaLotow = JSON.parse(loty);
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const idPobrane = urlParams.get('id');
        let id = parseInt(idPobrane) - 1;
        przechowalniaLotow[id] = {
            wybraneImiona: {nazwa: imionSelect.value},
            wybranaData: {nazwa: datSelect.value},
            wybraneMiasto: {nazwa: miastSelect.options[miastSelect.selectedIndex].innerHTML},
            wybranyBagaz: {nazwa: bagaSelect.checked.toString()}
        };
        let lotyZmienione = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', lotyZmienione);
        window.location.href = 'helloweb.html';
    }

    // powrót do strony wcześniejszej
    powrotDoGlownejStrony() {
        window.location.href = 'helloweb.html';
    }
}

let appNewSite = new AppNewSite();