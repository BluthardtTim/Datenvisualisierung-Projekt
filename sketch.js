let incomeData;
let myIncome = [];

let data = [];

let consumData;
let myConsum = [];

let karte;
let myRadius;

let slider;
let sliderValue = 10; // Standardwert für den Slider
let sliderLabel;


// Erstellen Sie ein leeres Array, um die Jahre und Werte zu speichern
let dataArray = [];

function preload() {
    incomeData = loadTable('data2/EinkommenEu.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu.csv', 'csv', 'header');
    karte = loadImage('MapChart_Map-2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i = 0;
    let t = 0;

    // Einkommen der Eu Länder
    for (let myRow of incomeData.rows) {
        let currentCountry2 = new Country();

        currentCountry2.myCountryArea = myRow.get('Value');
        currentCountry2.myLocation = myRow.get('LOCATION');
        currentCountry2.myYear = myRow.get('TIME');
        currentCountry2.mySize = map(currentCountry2.myCountryArea, 20000, 80000, 0, 200);
        myRadius = map(currentCountry2.myCountryArea, 20000, 80000, 5, 200);

        let year = myRow.getNum('TIME')
        let income = myRow.getNum('Value')
        // Füge [Year, Income] als Array zur data-Variable hinzu
        data.push([year, income]);
        
        if (currentCountry2.myLocation === "DEU") {
            myIncome[t] = currentCountry2;
            t++;
        }

      
    }

    // Consum der Eu Länder
    for (let myRow of consumData.rows) {
        let currentCountry = new Country();

        currentCountry.myCountryArea = myRow.get('OBS_VALUE');
        currentCountry.myCountry = myRow.get('geo');
        currentCountry.myYear = myRow.get('TIME');
        currentCountry.mySize = map(currentCountry.myCountryArea, 80, 150, 0, 200);
        myRadius2 = map(currentCountry.myCountryArea, 20000, 80000, 5, 200);

        //for (let year = 2012; year < 2022; year++) {
        //    let currentIncome = incomeData.getString(r, index);
          //  let currentPaar = createVector (year,currentGDP); // small array with [year,GDP]
          //  arrayOfCountries[country].arrayOfData.push(currentPaar);
          //  index++;
        //}
    
        //this.arrayOfData = [];
        //this.arrayOfpoints = [];


        if (currentCountry.myCountry === "DE:Germany") {
            myConsum[i] = currentCountry;
            i++;
        }
    }

    // Slider erstellen und positionieren
    slider = createSlider(0, 10, sliderValue);
    slider.position(windowWidth / 2 + 250, windowHeight / 2 + 480);
    slider.style('width', '500px');

    // Label für den Slider erstellen und näher an den Slider positionieren
    sliderLabel = createP('Jahr: 2012'); // Standardbeschriftung
    sliderLabel.position(slider.x + slider.width + 10, slider.y - 10); // Näher am Slider positionieren
    sliderLabel.style('color', 'white');
    sliderLabel.style('font-size', '18px');
}

function draw() {
    background(41);

    let currentX = 20;
    let currentY = 350;

    for (let i = 0; i < myConsum.length; i++) {
        myConsum[i].display(currentX, currentY);
        currentX += myConsum[i].myWidth + 3;
    }

    currentX = 500;
    karteX = 500;

    // Karte
    karteX = windowWidth / 2;

    karte.resize(0, windowHeight - 200)
    image(karte, karteX + 25, 100)

    for (let t = 0; t < myIncome.length; t++) {
        myIncome[t].display2(currentX, currentY);
        currentX += myIncome[t].myWidth + 3;
    }

    stroke(255, 0, 0);
    line(windowWidth / 2, windowHeight, windowWidth / 2, 0);
    noStroke()
    fill(200);

    textSize(18);
    textSize(12);
    text("frameRate:   " + Math.round(frameRate()), 20, height - 10);

    // Den Wert des Sliders aktualisieren
    sliderValue = slider.value();
    sliderLabel.html('Jahr: ' + (2012 + sliderValue)); // Aktualisiere die Beschriftung basierend auf dem Slider-Wert

    // Einkommen
    fill(0, 255, 0, 255);
    ellipse(windowWidth / 2 + 390, windowHeight / 2 + 100, myRadius);

    // Lebenshaltungskosten
    fill(255, 0, 0, 255);
    ellipse(windowWidth / 2 + 390, windowHeight / 2 + 100, myRadius2);

    // noLoop();
}
