// tsc -w
// Live-server
var Lot = /** @class */ (function () {
    function Lot() {
    }
    return Lot;
}());
var App = /** @class */ (function () {
    function App() {
        this.pokazZapisaneLoty();
        this.podlaczPrzyciski();
    }
    // dodanie addEventListenera do poszczególnych elementów
    App.prototype.zaladujZmiany = function () {
        lot.wybraneImiona.metoda.call(lot.wybraneImiona.wybranyEl);
        lot.wybranaData.metoda.call(lot.wybranaData.wybranyEl);
        lot.wybraneMiasto.metoda.call(lot.wybraneMiasto.wybranyEl);
        lot.wybranyBagaz.metoda.call(lot.wybranyBagaz.wybranyEl);
    };
    // podłączenie działania przycisków
    App.prototype.podlaczPrzyciski = function () {
        document.querySelector('#potwierdz').addEventListener('click', this.zapiszLot);
        document.querySelector('#usunLot').addEventListener('click', this.usunLot);
    };
    // po odświeżeniu strony, pobierane są loty
    App.prototype.pokazZapisaneLoty = function () {
        var loty = localStorage.getItem('zapiszLoty');
        przechowalniaLotow = JSON.parse(loty);
        if (przechowalniaLotow != null) {
            var loty_1 = localStorage.getItem('zapiszLoty');
            przechowalniaLotow = JSON.parse(loty_1);
        }
        else {
            przechowalniaLotow = [];
        }
    };
    // reakcja na przycisk Potwierdź Lot, która dodaje lot i aktualizuje localStorage
    App.prototype.zapiszLot = function () {
        przechowalniaLotow.push({
            wybraneImiona: { nazwa: lot.wybraneImiona.nazwa },
            wybranaData: { nazwa: lot.wybranaData.nazwa },
            wybraneMiasto: { nazwa: lot.wybraneMiasto.nazwa },
            wybranyBagaz: { nazwa: lot.wybranyBagaz.nazwa }
        });
        var loty = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', loty);
    };
    // reakcja na przycisk Usuń Lot, która usuwa ostatni lot i aktualizuje localStorage
    App.prototype.usunLot = function () {
        przechowalniaLotow.pop();
        var loty = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', loty);
    };
    return App;
}());
var imionaSelect = document.querySelector("#imiona");
var dataSelect = document.querySelector("#data");
var miastoSelect = document.querySelector("#miasto");
var bagazSelect = document.querySelector("#bagaz");
// tablica, która zapisuje się w localStorage
var przechowalniaLotow = [];
// ustawienie daty na dzisiejszy dzień
dataSelect.valueAsDate = new Date();
var lot = {
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
};
var app = new App();
// przypisanie metod, reagujących na zmiane w wybranych elementach
lot.wybraneImiona.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybraneImiona.nazwa = document.querySelector("#imiona").value;
    });
};
lot.wybranaData.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybranaData.nazwa = document.querySelector("#data").value;
    });
};
lot.wybraneMiasto.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybraneMiasto.nazwa = document.querySelector("#miasto").options[document.querySelector("#miasto").selectedIndex].innerHTML;
    });
};
lot.wybranyBagaz.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybranyBagaz.nazwa = document.querySelector("#bagaz").checked.toString();
    });
};
// wywołanie powyższych metod
app.zaladujZmiany();
//# sourceMappingURL=helloweb.js.map