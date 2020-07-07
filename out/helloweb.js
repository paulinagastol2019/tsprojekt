// tsc -w
// Live-server
var Lot = /** @class */ (function () {
    function Lot() {
    }
    return Lot;
}());
var App = /** @class */ (function () {
    function App() {
        this.pokazMessage();
        this.podlaczPrzyciski();
        this.pokazZapisaneLoty();
    }
    // tekst pod formularzem (przy zmianie wybranego inputu bądź selecta)
    App.prototype.pokazMessage = function () {
        var message = "<h4>Rezerwacja lotu</h4> dla osoby " + lot.wybraneImiona.nazwa + " <br> dnia " + lot.wybranaData.nazwa + " <br> do miasta " + lot.wybraneMiasto.nazwa;
        if (lot.wybranyBagaz.nazwa === "true") {
            message += '<br> z bagażem';
        }
        document.querySelector('#pokaz').innerHTML = message;
    };
    ;
    // dodanie addEventListenera do poszczególnych elementów
    App.prototype.zaladujZmiany = function () {
        var _this = this;
        lot.wybraneImiona.metoda.call(lot.wybraneImiona.wybranyEl);
        lot.wybranaData.metoda.call(lot.wybranaData.wybranyEl);
        lot.wybraneMiasto.metoda.call(lot.wybraneMiasto.wybranyEl);
        lot.wybranyBagaz.metoda.call(lot.wybranyBagaz.wybranyEl);
        document.querySelectorAll('.tr').forEach(function (el) {
            el.addEventListener('click', _this.pokazWNowymOknie);
        });
    };
    // podłączenie działania przycisków
    App.prototype.podlaczPrzyciski = function () {
        document.querySelector('#potwierdz').addEventListener('click', this.zapiszLot);
        document.querySelector('#usunLot').addEventListener('click', this.usunLot);
    };
    // wskazanie indeksu dziecka z listy w tabeli i przesłanie go do new-site.html
    App.prototype.pokazWNowymOknie = function () {
        var parent = document.querySelector('.tr').parentNode;
        var children = parent.children;
        var wybraneChild = 0;
        for (var i = children.length - 1; i > 0; i--) {
            if (this == children[i]) {
                wybraneChild = i;
                break;
            }
        }
        window.location.href = 'new-site.html?id=' + wybraneChild;
    };
    // po odświeżeniu strony, pobierane są loty (dodane we wcześniejszej sesji) i wstawine do tabeli
    App.prototype.pokazZapisaneLoty = function () {
        var loty = localStorage.getItem('zapiszLoty');
        przechowalniaLotow = JSON.parse(loty);
        if (przechowalniaLotow != null) {
            var loty_1 = localStorage.getItem('zapiszLoty');
            przechowalniaLotow = JSON.parse(loty_1);
            for (var i = 0; i < przechowalniaLotow.length; i++) {
                var template = document.querySelector('#tableRow');
                var clone = template.content.cloneNode(true);
                var td = clone.querySelectorAll("td");
                td[0].textContent = przechowalniaLotow[i].wybraneImiona.nazwa;
                td[1].textContent = przechowalniaLotow[i].wybranaData.nazwa;
                td[2].textContent = przechowalniaLotow[i].wybraneMiasto.nazwa;
                td[3].textContent = przechowalniaLotow[i].wybranyBagaz.nazwa;
                document.querySelector('table').appendChild(clone);
            }
        }
        else {
            przechowalniaLotow = [];
        }
    };
    // reakcja na przycisk Potwierdź Lot, która dodaje lot do tabeli i aktualizuje localStorage
    App.prototype.zapiszLot = function () {
        przechowalniaLotow.push({
            wybraneImiona: { nazwa: lot.wybraneImiona.nazwa },
            wybranaData: { nazwa: lot.wybranaData.nazwa },
            wybraneMiasto: { nazwa: lot.wybraneMiasto.nazwa },
            wybranyBagaz: { nazwa: lot.wybranyBagaz.nazwa }
        });
        var template = document.querySelector('#tableRow');
        var clone = template.content.cloneNode(true);
        var td = clone.querySelectorAll("td");
        td[0].textContent = przechowalniaLotow[przechowalniaLotow.length - 1].wybraneImiona.nazwa;
        td[1].textContent = przechowalniaLotow[przechowalniaLotow.length - 1].wybranaData.nazwa;
        td[2].textContent = przechowalniaLotow[przechowalniaLotow.length - 1].wybraneMiasto.nazwa;
        td[3].textContent = przechowalniaLotow[przechowalniaLotow.length - 1].wybranyBagaz.nazwa;
        document.querySelector('table').appendChild(clone);
        var loty = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', loty);
    };
    // reakcja na przycisk Usuń Lot, która usuwa ostatni lot z tabeli i aktualizuje localStorage
    App.prototype.usunLot = function () {
        przechowalniaLotow.pop();
        document.querySelector(".tr:last-child").remove();
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
// przypisanie metod, reagujących na zmiane w wybranych elementach i pokazywanie efektów na stronie
lot.wybraneImiona.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybraneImiona.nazwa = document.querySelector("#imiona").value;
        app.pokazMessage();
    });
};
lot.wybranaData.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybranaData.nazwa = document.querySelector("#data").value;
        app.pokazMessage();
    });
};
lot.wybraneMiasto.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybraneMiasto.nazwa = document.querySelector("#miasto").options[document.querySelector("#miasto").selectedIndex].innerHTML;
        app.pokazMessage();
    });
};
lot.wybranyBagaz.metoda = function () {
    this.addEventListener('change', function () {
        lot.wybranyBagaz.nazwa = document.querySelector("#bagaz").checked.toString();
        app.pokazMessage();
    });
};
// wywołanie powyższych metod
app.zaladujZmiany();
//# sourceMappingURL=helloweb.js.map