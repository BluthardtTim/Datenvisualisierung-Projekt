let incomeData;
let myIncome = [];
let baseLine = 0;

let data = [];

let consumData;
let myConsum = [];

let coordinates;
let karte;

let sliderValue = 0;

let selectedCountry = "DEU";
let xBorder = 100;

let currentYear;
let myButton;


let backgroundColor = 50;

// Erstellen Sie ein leeres Array, um die Jahre und Werte zu speichern
let dataArray = [];


function preload() {
    incomeData = loadTable('data2/EinkommenEu2.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu3.csv', 'csv', 'header');
    karte = loadImage('europa_map_02.svg');
    coordinates = loadTable('data2/Koordinaten.csv', 'csv', 'header')
}

function setup() {
    createCanvas(windowWidth, windowHeight);


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

    for (let country = 0; country < myConsum.length; country++) {
        myConsum[country].calculatePoints2(baseLine);
    }

    myButton = new Button(40, 70, 20, "Abspielen");
}





function draw() {
    background(backgroundColor);
    // sliderValue = slider.value();

    frameRate(20);
    if (myButton.selected && frameCount % 10 === 0) {
        if (sliderValue < 11) { sliderValue++; console.log(sliderValue); }
        else sliderValue = 0;
    }

    myButton.display();
    fill(255);

    noStroke();
    text('Jahr: ' + ( 2011 + sliderValue), windowWidth / 2 + 150, height - 40);

    // Karte
    karteX = windowWidth / 2 - 200;
    karte.resize(0, windowHeight)
    image(karte, karteX + 25, 0)
    strokeWeight(0.5)
    stroke(255)


    // Zeichne X- und Y-Achsen
    line(xBorder, baseLine, width / 2 - 100, baseLine); // X-Achse
    line(xBorder, baseLine, xBorder, 200); // X-Achse



    let country1;
    let country2;

    for (let country = 0; country < myIncome.length; country++) {
        if (myIncome[country].myCountryISO === selectedCountry) {
            myIncome[country].drawCountryGDP();
            country1 = myIncome[country];
        }
    }

    for (let country = 0; country < myConsum.length; country++) {
        if (myConsum[country].myCountryISO === selectedCountry) {
            myConsum[country].drawCountryGDP2();
            country2 = myConsum[country];
        }
    }



    noStroke()
    fill(255, 0, 0, 10);
    beginShape();
    for (let i = 0; i < country1.arrayOfpoints.length; i++) {
        // if (country1.arrayOfpoints[i].y < country2.arrayOfpoints2[i].y) {
        //     fill(255, 0, 0, 50); // Grün, wenn Graf 1 oben ist
        // } else {
        //     fill(0, 255, 0, 50); // Rot, wenn Graf 2 oben ist
        // }
        vertex(country1.arrayOfpoints[i].x, country1.arrayOfpoints[i].y);
    }
    for (let i = country2.arrayOfpoints2.length - 1; i >= 0; i--) {
        vertex(country2.arrayOfpoints2[i].x, country2.arrayOfpoints2[i].y);
    }
    endShape(CLOSE);



    // stroke(255, 0, 0);
    // line(windowWidth / 2, windowHeight, windowWidth / 2, 0);
    noStroke()
    fill(200);

    textSize(18);
    textSize(12);
    // text ("2015 = 100", 220, baseLine - 150);


    // Draw circles for each country
    for (let i = 0; i < myIncome.length; i++) {
        let country = myIncome[i];
        let countryData = getCountryData(country.myCountryISO);

        if (countryData) {
            let x = windowWidth / 2 + 20 + countryData.obj.X; // X-Koordinate des Landes
            let y = countryData.obj.Y + 150; // Y-Koordinate des Landes

            let value1 = country.arrayOfData[sliderValue]; // Wert aus dem Datenarray des Einkommens
            let value2 = myConsum[i].arrayOfData2[sliderValue]; // Wert aus dem Datenarray des Verbrauchs

            let circleSize1 = map(value1, 80, 150, 10, 100); // Größe der Ellipse basierend auf Wert 1
            let circleSize2 = map(value2, 80, 150, 10, 100); // Größe der Ellipse basierend auf Wert 2

            if (circleSize1 < circleSize2) {
                noStroke();
                if (dist(mouseX, mouseY, x, y) < circleSize2 / 2) {
                    fill(255, 100, 100, 200); // helleres Rot beim Hovern
                } else {
                    strokeWeight(2);
                    stroke(250, 92, 148)
                    fill(250,92,148); // rot
                }
                ellipse(x, y, circleSize2, circleSize2);

                if (dist(mouseX, mouseY, x, y) < circleSize1 / 2) {
                    fill(100, 255, 100, 200); // helleres Grün beim Hovern
                } else {
                    strokeWeight(2);
                    stroke(220, 245, 139)
                    fill(220,245,139); // grün
                }
                ellipse(x, y, circleSize1, circleSize1);
            } else {
                noStroke();
                if (dist(mouseX, mouseY, x, y) < circleSize1 / 2) {
                    fill(100, 255, 100, 200); // helleres Grün beim Hovern
                } else {
                    fill(220,245,139); // grün
                }
                ellipse(x, y, circleSize1, circleSize1);

                if (dist(mouseX, mouseY, x, y) < circleSize2 / 2) {
                    fill(255, 100, 100, 200); // helleres Rot beim Hovern
                } else {
                    fill(250,92,148); // rot
                }
                ellipse(x, y, circleSize2, circleSize2);
            }
        }
    }
    fill(200);
    textSize(12);
    text(frameRate().toFixed(2), 20, height - 30);

}


function getCountryData(iso) {
    for (let i = 0; i < coordinates.getRowCount(); i++) {
        let isoCode = coordinates.getString(i, 'ISO');
        if (isoCode === iso) {
            let x = coordinates.getNum(i, 'X');
            let y = coordinates.getNum(i, 'Y');
            return { obj: { X: x, Y: y } };
        }
    }
    return null;
}


function mouseReleased() {
    myButton.releasedOverMe();
    for (let i = 0; i < myIncome.length; i++) {
        let country = myIncome[i];
        let countryData = getCountryData(country.myCountryISO);

        if (countryData) {
            let x = windowWidth / 2 + 20 + countryData.obj.X; // X-Koordinate des Landes
            let y = countryData.obj.Y + 150; // Y-Koordinate des Landes

            let value1 = country.arrayOfData[sliderValue]; // Wert aus dem Datenarray des Einkommens
            let value2 = myConsum[i].arrayOfData2[sliderValue]; // Wert aus dem Datenarray des Verbrauchs

            let circleSize1 = map(value1, 80, 150, 10, 100); // Größe der Ellipse basierend auf Wert 1
            let circleSize2 = map(value2, 80, 150, 10, 100); // Größe der Ellipse basierend auf Wert 2

            let distance1 = dist(mouseX, mouseY, x, y);
            let distance2 = dist(mouseX, mouseY, x, y);

            if (circleSize1 < circleSize2) {
                if (distance2 < circleSize2 / 2) {
                    selectedCountry = country.myCountryISO;
                    console.log("Selected Country ISO: " + selectedCountry);
                }
            } else {
                if (distance1 < circleSize1 / 2) {
                    selectedCountry = country.myCountryISO;
                    console.log("Selected Country ISO: " + selectedCountry);
                }
            }
        }
    }

}


