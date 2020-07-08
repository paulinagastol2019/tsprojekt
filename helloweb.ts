// tsc -w
// Live-server

interface LotStorage {          //implentacja interfejsu lotStorage
    zapiszLot(pokazWNowymOknie);
    usunLot();
}

interface ZmienneFormularza {
    nazwa: string;
    wybranyEl?: HTMLElement;
    metoda?(): void;
}

class Lot {
    wybraneImiona: ZmienneFormularza; // klasa - szablon zawierajacy charakterystykę obiektu tworzonego
    wybranaData: ZmienneFormularza;
    wybraneMiasto: ZmienneFormularza;
    wybranyBagaz: ZmienneFormularza;
}

class App implements LotStorage{  // konstruktor klasy app
    constructor() {
        this.pokazMessage();
        this.podlaczPrzyciski();
        this.pokazZapisaneLoty();
    }
    
    // tekst pod formularzem (przy zmianie wybranego inputu bądź selecta)
    pokazMessage(){
        let message: string =  `<h4>Rezerwacja lotu</h4> dla osoby ${lot.wybraneImiona.nazwa} <br> dnia ${lot.wybranaData.nazwa} <br> do miasta ${lot.wybraneMiasto.nazwa}`;
        if(lot.wybranyBagaz.nazwa === "true") {  //wstrzykuje w wiadomosc pod inputem i selektem wybrane dane 
            message += '<br> z bagażem';
        }
        document.querySelector('#pokaz').innerHTML = message; // zwraca pierwszy element wewnatrz dokumentu
    };

    // dodanie addEventListenera do poszczególnych elementów
    zaladujZmiany(){
        lot.wybraneImiona.metoda.call(lot.wybraneImiona.wybranyEl); 
        lot.wybranaData.metoda.call(lot.wybranaData.wybranyEl);
        lot.wybraneMiasto.metoda.call(lot.wybraneMiasto.wybranyEl);
        lot.wybranyBagaz.metoda.call(lot.wybranyBagaz.wybranyEl);
        document.querySelectorAll('.tr').forEach(el => {                // dodaje kolejny element w tabeli 
            el.addEventListener('click', this.pokazWNowymOknie); // nasluchuje i po kliknieciu przenosi do nowego okna
        })
    }
    
    // podłączenie działania przycisków
    podlaczPrzyciski() {
        document.querySelector('#potwierdz').addEventListener('click', () => {
			this.zapiszLot(this.pokazWNowymOknie);                                      //reakcja na klikniecie mysza
		});
        document.querySelector('#usunLot').addEventListener('click', this.usunLot);
    }

    // wskazanie indeksu dziecka z listy w tabeli i przesłanie go do new-site.html
    pokazWNowymOknie() { 
        let parent = document.querySelector('.tr').parentNode;
        let children = parent.children;
        let wybraneChild = 0;
        for (let i = children.length - 1; i > 0; i--){
            if ((this as unknown as HTMLElement) == children[i]){
                wybraneChild = i;
                break;
            }
        }
        window.location.href = 'new-site.html?id=' + wybraneChild;
    }

    // po odświeżeniu strony, pobierane są loty (dodane we wcześniejszej sesji) i wstawine do tabeli
    pokazZapisaneLoty() {
        let loty = localStorage.getItem('zapiszLoty');
        przechowalniaLotow = JSON.parse(loty);
        if(przechowalniaLotow != null) {
            let loty = localStorage.getItem('zapiszLoty');
            przechowalniaLotow = JSON.parse(loty);
            for(let i = 0; i < przechowalniaLotow.length; i++) {
                let template = document.querySelector<HTMLTemplateElement>('#tableRow');
                let clone = template.content.cloneNode(true);
                let td = (clone as HTMLElement).querySelectorAll("td");
                td[0].textContent = przechowalniaLotow[i].wybraneImiona.nazwa;
                td[1].textContent = przechowalniaLotow[i].wybranaData.nazwa;
                td[2].textContent = przechowalniaLotow[i].wybraneMiasto.nazwa;
                td[3].textContent = przechowalniaLotow[i].wybranyBagaz.nazwa;
                document.querySelector('table').appendChild(clone);
            }
        } else {
            przechowalniaLotow = [];
        }
    }

    // reakcja na przycisk Potwierdź Lot, która dodaje lot do tabeli i aktualizuje localStorage
    zapiszLot(pokazWNowymOknie) {
        przechowalniaLotow.push({
            wybraneImiona: {nazwa: lot.wybraneImiona.nazwa},
            wybranaData: {nazwa: lot.wybranaData.nazwa},
            wybraneMiasto: {nazwa: lot.wybraneMiasto.nazwa},
            wybranyBagaz: {nazwa: lot.wybranyBagaz.nazwa}
        });
        let template = document.querySelector<HTMLTemplateElement>('#tableRow');
        let clone = template.content.cloneNode(true);
        let td = (clone as HTMLElement).querySelectorAll("td");
        td[0].textContent = przechowalniaLotow[przechowalniaLotow.length-1].wybraneImiona.nazwa;
        td[1].textContent = przechowalniaLotow[przechowalniaLotow.length-1].wybranaData.nazwa;
        td[2].textContent = przechowalniaLotow[przechowalniaLotow.length-1].wybraneMiasto.nazwa;
        td[3].textContent = przechowalniaLotow[przechowalniaLotow.length-1].wybranyBagaz.nazwa;
        document.querySelector('table').appendChild(clone);
		document.querySelector('table').lastElementChild.addEventListener('click', pokazWNowymOknie);
        let loty = JSON.stringify(przechowalniaLotow);
        localStorage.setItem('zapiszLoty', loty);
    }

    // reakcja na przycisk Usuń Lot, która usuwa ostatni lot z tabeli i aktualizuje localStorage
    usunLot() {
        przechowalniaLotow.pop();
        document.querySelector(".tr:last-child").remove();
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

// przypisanie metod, reagujących na zmiane w wybranych elementach i pokazywanie efektów na stronie
lot.wybraneImiona.metoda = function(){
    this.addEventListener('change', function() {
        lot.wybraneImiona.nazwa = document.querySelector<HTMLInputElement>("#imiona").value;
        app.pokazMessage();
    })
}
lot.wybranaData.metoda = function() {
    this.addEventListener('change', function() {
        lot.wybranaData.nazwa = document.querySelector<HTMLInputElement>("#data").value;
        app.pokazMessage();
    })
}
lot.wybraneMiasto.metoda = function() {
    this.addEventListener('change', function() {
        lot.wybraneMiasto.nazwa = document.querySelector<HTMLSelectElement>("#miasto").options[document.querySelector<HTMLSelectElement>("#miasto").selectedIndex].innerHTML;
        app.pokazMessage();
    })
}
lot.wybranyBagaz.metoda = function() {
    this.addEventListener('change', function() {
        lot.wybranyBagaz.nazwa = document.querySelector<HTMLInputElement>("#bagaz").checked.toString();
        app.pokazMessage();
    })
}

// wywołanie powyższych metod
app.zaladujZmiany()