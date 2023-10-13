let incomeData;
let myIncome = [];
let baseLine = 0;

let consumData;
let myConsum = [];


let karte;

function preload() {
    incomeData = loadTable('data2/EinkommenEu2.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu3.csv', 'csv', 'header');
    karte = loadImage('MapChart_Map-2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i = 0;
    let t = 0;
    baseLine = height-500;

    console.log("total rows: " + incomeData.getRowCount());
    console.log("total columns: " + incomeData.getColumnCount() );

    // reading the rows
    let rowsInTable = incomeData.getRows();

    // firsts country musk get make by hand
    let isoCountryOld = "";

    let index = -1;
    for (let r = 0; r < rowsInTable.length; r++) {
        let isoCountryNew = rowsInTable[r].get('LOCATION'); //
        if (isoCountryOld !== isoCountryNew) {
            let currentCountry = new Country ();
            currentCountry.myCountryISO = isoCountryNew;
            myIncome.push(currentCountry);
            index++;
        }
        myIncome[index].arrayOfData.push(rowsInTable[r].get('INDEX'));
        isoCountryOld = isoCountryNew;
    }




    let rowsInTable2 = consumData.getRows();

    
    let index2 = -1;
    for (let r = 0; r < rowsInTable2.length; r++) {
        let isoCountryNew = rowsInTable2[r].get('geo'); //
        if (isoCountryOld !== isoCountryNew) {
            let currentCountry = new Country ();
            currentCountry.myCountryISO = isoCountryNew;
            myConsum.push(currentCountry);
            index2++;
        }
        myConsum[index2].arrayOfData2.push(rowsInTable2[r].get('OBS_VALUE'));
        isoCountryOld = isoCountryNew;
    }


    // const showCountry = myIncome.filter(checkCountry)

    // console.log(showCountry)
    // function checkCountry(){
    //     myIncome.myCountryISO === "DEU";
    // }


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

    


    // Consum der Eu Länder
    for (let myRow of consumData.rows) {
        let currentConsume = new Country();

        currentConsume.myValue = myRow.get('OBS_VALUE');
        currentConsume.myCountry = myRow.get('geo');
        currentConsume.myTime = myRow.get('TIME_PERIOD');
        currentConsume.mySize = map(currentConsume.myValue, 80, 150, 0, 500);

        if (currentConsume.myCountry === "DE:Germany" && currentConsume.myTime > 2011) {
            myConsum[i] = currentConsume;
            i++;
        }
    }
}

let selectedCountry1 = "DEU";

function draw() {
    background(241);

    for (let country = 0; country < myIncome.length; country++) {
        if (myIncome[country].myCountryISO === selectedCountry1) {
            myIncome[country].drawCountryGDP();
        }
    }

    for (let country = 0; country < myConsum.length; country++) {
        if (myConsum[country].myCountryISO === selectedCountry1) {
            myConsum[country].drawCountryGDP2();
        }
    }


    
    let currentX = 300;
    let currentY = windowHeight / 2 + 180;


    // for (let i = 0; i < myConsum.length; i++) {
    //     myConsum[i].display(currentX, currentY);
    //     currentX += myConsum[i].myWidth + 50;
    // }

    currentX = 270;
    karteX = 500;

    // Karte
    karteX = windowWidth / 2;

    karte.resize(0, windowHeight - 200)
    image(karte, karteX + 25, 100)


    // for (let t = 0; t < myIncome.length; t++) {
    //     myConsum[t].display2(currentX, currentY);
    //     currentX += myIncome[t].myWidth + 50;
    // }

    stroke(255, 0, 0);
    line(windowWidth / 2, windowHeight, windowWidth / 2, 0);
    noStroke()
    fill(200);

    textSize(18);
    // text ("Einkommen der Deutschen", 20, 300);
    // text ("Lebenshaltungskosten Deutschland", 700, 300);
    textSize(12);

    // noLoop();
}



