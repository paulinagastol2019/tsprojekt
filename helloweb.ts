// tsc -w
// Live-server

interface LotStorage {
    zapiszLot();
    usunLot();
}

interface ZmienneFormularza {
    nazwa: string;
    wybranyEl?: HTMLElement;
    metoda?(): void;
}

class Lot {
    wybraneImiona: ZmienneFormularza;
    wybranaData: ZmienneFormularza;
    wybraneMiasto: ZmienneFormularza;
    wybranyBagaz: ZmienneFormularza;
}

class App implements LotStorage {
    constructor() {
        this.pokazZapisaneLoty();
        this.podlaczPrzyciski();
    }

    // dodanie addEventListenera do poszczególnych elementów
    zaladujZmiany(){
        lot.wybraneImiona.metoda.call(lot.wybraneImiona.wybranyEl);
        lot.wybranaData.metoda.call(lot.wybranaData.wybranyEl);
        lot.wybraneMiasto.metoda.call(lot.wybraneMiasto.wybranyEl);
        lot.wybranyBagaz.metoda.call(lot.wybranyBagaz.wybranyEl);
    }

    // podłączenie działania przycisków
    podlaczPrzyciski() {
        document.querySelector('#potwierdz').addEventListener('click', this.zapiszLot);
        document.querySelector('#usunLot').addEventListener('click', this.usunLot);
    }

    // po odświeżeniu strony, pobierane są loty
    pokazZapisaneLoty() {
        let loty = localStorage.getItem('zapiszLoty');
        przechowalniaLotow = JSON.parse(loty);
        if(przechowalniaLotow != null) {
            let loty = localStorage.getItem('zapiszLoty');
            przechowalniaLotow = JSON.parse(loty);
        } else {
            przechowalniaLotow = [];
        }
    }

    // reakcja na przycisk Potwierdź Lot, która dodaje lot i aktualizuje localStorage
    zapiszLot() {
        przechowalniaLotow.push({
            wybraneImiona: {nazwa: lot.wybraneImiona.nazwa},
            wybranaData: {nazwa: lot.wybranaData.nazwa},
            wybraneMiasto: {nazwa: lot.wybraneMiasto.nazwa},
            wybranyBagaz: {nazwa: lot.wybranyBagaz.nazwa}
        });
        let loty = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', loty);
    }

    // reakcja na przycisk Usuń Lot, która usuwa ostatni lot i aktualizuje localStorage
    usunLot() {
        przechowalniaLotow.pop();
        let loty = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', loty);
    }
}

const imionaSelect = document.querySelector<HTMLInputElement>("#imiona");
const dataSelect = document.querySelector<HTMLInputElement>("#data");
const miastoSelect = document.querySelector<HTMLSelectElement>("#miasto");
const bagazSelect = document.querySelector<HTMLInputElement>("#bagaz");

// tablica, która zapisuje się w localStorage
let przechowalniaLotow: Array<Lot> = [];

// ustawienie daty na dzisiejszy dzień
dataSelect.valueAsDate = new Date();

let lot: Lot = {
    wybraneImiona: {
        nazwa: imionaSelect.value,
        wybranyEl: imionaSelect
    },
    wybranaData: {
        nazwa: dataSelect.value,
        wybranyEl: dataSelect
    },
    wybraneMiasto: {
        nazwa: miastoSelect.options[miastoSelect.selectedIndex].innerHTML,
        wybranyEl: miastoSelect
    },
    wybranyBagaz: {
        nazwa: bagazSelect.checked.toString(),
        wybranyEl: bagazSelect
    }
}

let app = new App();

// przypisanie metod, reagujących na zmiane w wybranych elementach
lot.wybraneImiona.metoda = function(){
    this.addEventListener('change', function() {
        lot.wybraneImiona.nazwa = document.querySelector<HTMLInputElement>("#imiona").value;
    })
}
lot.wybranaData.metoda = function() {
    this.addEventListener('change', function() {
        lot.wybranaData.nazwa = document.querySelector<HTMLInputElement>("#data").value;
    })
}
lot.wybraneMiasto.metoda = function() {
    this.addEventListener('change', function() {
        lot.wybraneMiasto.nazwa = document.querySelector<HTMLSelectElement>("#miasto").options[document.querySelector<HTMLSelectElement>("#miasto").selectedIndex].innerHTML;
    })
}
lot.wybranyBagaz.metoda = function() {
    this.addEventListener('change', function() {
        lot.wybranyBagaz.nazwa = document.querySelector<HTMLInputElement>("#bagaz").checked.toString();
    })
}

// wywołanie powyższych metod
app.zaladujZmiany()