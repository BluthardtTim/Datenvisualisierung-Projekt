let incomeData;
let myIncome = [];
let baseLine = 0;

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
    incomeData = loadTable('data2/EinkommenEu2.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu3.csv', 'csv', 'header');
    karte = loadImage('MapChart_Map-2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i = 0;
    let t = 0;
    baseLine = height - 200;

    console.log("total rows: " + incomeData.getRowCount());
    console.log("total columns: " + incomeData.getColumnCount());

    // reading the rows
    let rowsInTable = incomeData.getRows();

    // firsts country musk get make by hand
    let isoCountryOld = "";

    let index = -1;
    for (let r = 0; r < rowsInTable.length; r++) {
        let isoCountryNew = rowsInTable[r].get('LOCATION'); //
        if (isoCountryOld !== isoCountryNew) {
            let currentCountry = new Country();
            currentCountry.myCountryISO = isoCountryNew;
            myIncome.push(currentCountry);
            index++;
        }
        myIncome[index].arrayOfData.push(rowsInTable[r].get('INDEX'));
        isoCountryOld = isoCountryNew;

    }
    // myRadius = map(currentCountry2.myCountryArea, 20000, 80000, 5, 200);

    let rowsInTable2 = consumData.getRows();


    let index2 = -1;
    for (let r = 0; r < rowsInTable2.length; r++) {
        let isoCountryNew = rowsInTable2[r].get('geo'); //
        if (isoCountryOld !== isoCountryNew) {
            let currentCountry = new Country();
            currentCountry.myCountryISO = isoCountryNew;
            myConsum.push(currentCountry);
            index2++;
        }
        myConsum[index2].arrayOfData2.push(rowsInTable2[r].get('OBS_VALUE'));
        isoCountryOld = isoCountryNew;
    }


    // just checking if all data are in objets
    for (let c = 0; c < myIncome.length; c++) {
        // console.log("myCountry name: " + myIncome [c].myCountryISO );
        // console.log("data: " + myIncome [c].arrayOfData );
    }


    for (let country = 0; country < myIncome.length; country++) { // countries
        //calculates the pixel position of each year in the country
        myIncome[country].calculatePoints(baseLine);

    }

    for (let country = 0; country < myConsum.length; country++) { // countries
        //calculates the pixel position of each year in the country
        myConsum[country].calculatePoints2(baseLine);

    }


}

let selectedCountry1 = "DEU";
xBorder = 25;


function draw() {
    background(41);

    let country1;
    let country2;

    // Slider erstellen und positionieren
    slider = createSlider(0, 10, sliderValue);
    slider.position(windowWidth / 2 + 250, windowHeight / 2 + 480);
    slider.style('width', '500px');

    // Label für den Slider erstellen und näher an den Slider positionieren
    sliderLabel = createP('Jahr: 2012'); // Standardbeschriftung
    sliderLabel.position(slider.x + slider.width + 10, slider.y - 10); // Näher am Slider positionieren
    sliderLabel.style('color', 'white');
    sliderLabel.style('font-size', '18px');

    for (let country = 0; country < myIncome.length; country++) {
        if (myIncome[country].myCountryISO === selectedCountry1) {
            myIncome[country].drawCountryGDP();
            country1 = myIncome[country];
        }
    }

    for (let country = 0; country < myConsum.length; country++) {
        if (myConsum[country].myCountryISO === selectedCountry1) {
            myConsum[country].drawCountryGDP2();
            country2 = myConsum[country];
        }
    }



    // Zeichne X- und Y-Achsen
    line(xBorder, baseLine, width / 2 - 100, baseLine); // X-Achse
    line(xBorder, baseLine, xBorder, 200); // X-Achse



    noStroke()
    fill(0, 255, 0, 50);
    beginShape();
    for (let i = 0; i < country1.arrayOfpoints.length; i++) {
        // if (country1.arrayOfpoints[i].y < country2.arrayOfpoints2[i].y) {
        //     fill(0, 255, 0, 50); // Grün, wenn Graf 1 oben ist
        // } else {
        //     fill(255, 0, 0, 50); // Rot, wenn Graf 2 oben ist
        // }
        vertex(country1.arrayOfpoints[i].x, country1.arrayOfpoints[i].y);
    }
    for (let i = country2.arrayOfpoints2.length - 1; i >= 0; i--) {
        vertex(country2.arrayOfpoints2[i].x, country2.arrayOfpoints2[i].y);
    }
    endShape(CLOSE);






    karteX = 500;

    // Karte
    karteX = windowWidth / 2;

    karte.resize(0, windowHeight - 200)
    image(karte, karteX + 25, 100)


    stroke(255, 0, 0);
    line(windowWidth / 2, windowHeight, windowWidth / 2, 0);
    noStroke()
    fill(200);

    textSize(18);
    textSize(12);

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
