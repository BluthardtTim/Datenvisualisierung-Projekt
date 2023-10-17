let incomeData;
let myIncome = [];
let baseLine = 0;

let data = [];

let consumData;
let myConsum = [];

let coordinates;
let karte;

let sliderValue = 0;

let circleSize1;
let distance1;

let selectedCountry = "platzhalter";
let xBorder = 100;

let currentYear;
let myButton;


let backgroundColor = 30;
let playbuttonVisible = true;
// Erstellen Sie ein leeres Array, um die Jahre und Werte zu speichern
let dataArray = [];


function preload() {
    incomeData = loadTable('data2/EinkommenEu3.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu4-exp.csv', 'csv', 'header');
    karte = loadImage('karte.png');
    coordinates = loadTable('data2/Koordinaten.csv', 'csv', 'header')
    playbutton = loadImage('playbutton.svg');
    pausebutton = loadImage('pausebutton.svg');
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

    
    myButton = new Button(xBorder, height - 105, 55, "Abspielen");


}





function draw() {
    background(backgroundColor);
    // sliderValue = slider.value();

    frameRate(20);
    if (myButton.selected && frameCount % 10 === 0) {
        if (sliderValue < 11) { sliderValue++; console.log(sliderValue); }
        else sliderValue = 0;
    }
    
    fill(255);

    noStroke();
    // text('Jahr: ' + ( 2011 + sliderValue),xBorder, baseLine + 100);

    // Karte
    karteX = windowWidth / 2 - 200;
    karte.resize(0, windowHeight)
    image(karte, karteX + 25, 0)
    strokeWeight(0.5)
    stroke(255)


    if(selectedCountry != 'platzhalter'){
    // Zeichne X- und Y-Achsen
    line(xBorder, baseLine, width / 2 - 100, baseLine); // X-Achse
    line(xBorder, baseLine, xBorder, 200); // X-Achse
    }



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
            let countryData = getCountryData(myConsum[country].myCountryISO); // Länderdaten abrufen
            if (countryData) {
                let countryName = countryData.obj.Name; // Vollständiger Ländername aus den Länderdaten abrufen
                myConsum[country].drawCountryGDP2();
                fill(255);
                noStroke();
                if (selectedCountry != 'platzhalter') {
                    textSize(18)
                    text(countryName, xBorder + 20, baseLine - 450); 
                }
            }
            country2 = myConsum[country];
        }
    }
    


    noStroke()
    fill(255, 0, 0, 0);
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

    // Draw circles for each country
    for (let i = 0; i < myIncome.length; i++) {
        let country = myIncome[i];
        let countryData = getCountryData(country.myCountryISO);

        if (countryData) {
            let x = karteX + 20 + windowHeight * countryData.obj.X; // X-Koordinate des Landes
            let y = windowHeight * countryData.obj.Y; // Y-Koordinate des Landes

            let value1 = country.arrayOfData[sliderValue]; // Wert aus dem Datenarray des Einkommens
            let value2 = myConsum[i].arrayOfData2[sliderValue]; // Wert aus dem Datenarray des Verbrauchs

            let circleSize1 = map(value1, 70, 400, 10, 300); // Größe der Ellipse basierend auf Wert 1
            let circleSize2 = map(value2, 70, 400, 10, 300); // Größe der Ellipse basierend auf Wert 2

            if (sliderValue == 4) {
                strokeWeight(2);
                stroke(200)
                fill(100); 
                ellipse(x, y, circleSize2, circleSize2);
            }
            else {

                if (circleSize1 < circleSize2) {
                    noStroke();
                    if (dist(mouseX, mouseY, x, y) < circleSize2 / 2) {
                        fill(250, 92, 148, 255); // helleres Rot beim Hovern
                    } else {
                        strokeWeight(2);
                        stroke(250, 92, 148)
                        fill(250, 92, 148, 180); // rot
                    }
                    ellipse(x, y, circleSize2, circleSize2);

                    if (dist(mouseX, mouseY, x, y) < circleSize1 / 2) {
                        fill(220, 245, 139, 255); // helleres Grün beim Hovern
                    } else {
                        strokeWeight(2);
                        stroke(220, 245, 139)
                        fill(220, 245, 139, 180); // grün
                    }
                    ellipse(x, y, circleSize1, circleSize1);
                } else {
                    noStroke();
                    if (dist(mouseX, mouseY, x, y) < circleSize1 / 2) {
                        fill(220, 245, 139, 255); // helleres Grün beim Hovern
                    } else {
                        strokeWeight(2);
                        stroke(220, 245, 139)
                        fill(220, 245, 139, 180); // grün
                    }
                    ellipse(x, y, circleSize1, circleSize1);

                    if (dist(mouseX, mouseY, x, y) < circleSize2 / 2) {
                        fill(250, 92, 148, 255); // helleres Rot beim Hovern
                    } else {
                        strokeWeight(2);
                        stroke(250, 92, 148)
                        fill(250, 92, 148, 180); // rot
                    }
                    ellipse(x, y, circleSize2, circleSize2);
                }
            }
        }
    }
    fill(200);
    textSize(12);
    // text(frameRate().toFixed(2), 20, height - 30);

    // Starttext nach (Re-)load
    let textHead = "Einkommen\n" +
                    "vs. Verbraucherpreise"
    let textSubhead = "How is the standard of living in the EU?"
    let textIntro = "Events and factors point to significant changes in the economy. One challenge arising\n"
                    + "from this recent economic situation is a sharp increase in the cost of living.\n"
                    + "This raises the question: How much does this economic shift truly affect our standard of living in Europe?\n"
                    + "The answer is complex. However, a key aspect is the income development in relation to cost increases.\n"
                    + "Are some European countries successfully countering the rising costs by adequately increasing salaries,\n" 
                    + "thus ensuring the current standard of living?"
    let textInteract = "For more information interact with the map..."
    let textNamen = "Tim Bluthardt, Aaron Illing, Devon Hoeltzli, Moritz Nussbaumer"


    if (selectedCountry === "platzhalter") {
        fill(255);
        //header
        textSize(50);
        text(textHead, xBorder, 100);
        //Subheader
        textSize(18);
        text(textSubhead, xBorder, 250);
        //intro
        textSize(12);
        text(textIntro, xBorder, 300)
        //zur Interaktion auffordern
        textSize(18);
        text(textInteract, xBorder, 500)
        //footer
        textSize(12);
        text(textNamen, xBorder, height - 50);
    }

    if (selectedCountry != "platzhalter") {
            //header
            fill(255);
            textSize(32);
            text(textHead, xBorder, 100);

        // legende
            colorMode(RGB);
             //einkommen linie
            stroke(220, 245, 139);
            strokeWeight(5);
            line(xBorder,baseLine + 52, xBorder + 20, baseLine + 52);
            //preise linie
            stroke(250, 92, 148);
            strokeWeight(5);
            line(xBorder + 110, baseLine + 52, xBorder + 130, baseLine + 52);

            noStroke();
            textSize(12);
            text("ø income", xBorder + 30, baseLine + 55 );
            text("ø consumer prices", xBorder + 140, baseLine + 55);

            text("2015 = 100", xBorder + 265, baseLine + 56);

            //playbutton
            if(selectedCountry != 'platzhalter'){
                myButton.display();
                }
            
                if (playbuttonVisible) {
                    image(playbutton, xBorder, height - 100, 42, 42);
                }
    
    }


}


function getCountryData(iso) {
    for (let i = 0; i < coordinates.getRowCount(); i++) {
        let isoCode = coordinates.getString(i, 'ISO');
        if (isoCode === iso) {
            let countryName = coordinates.getString(i, 'Name'); // Vollständiger Name des Landes aus der CSV-Datei abrufen
            let x = coordinates.getNum(i, 'X');
            let y = coordinates.getNum(i, 'Y');
            return { obj: { X: x, Y: y, Name: countryName, Iso: iso } }; // Verwenden Sie countryName, um den vollständigen Ländernamen zu speichern
        }
        noStroke();
        fill(255);
    }
    return null;
}

let LaenderName;
function mouseReleased() {
    myButton.releasedOverMe();
    for (let i = 0; i < myIncome.length; i++) {
        let country = myIncome[i];
        let countryData = getCountryData(country.myCountryISO);

        if (countryData) {
            let x = karteX+ 20 + windowHeight * countryData.obj.X; // X-Koordinate des Landes
            let y = windowHeight * countryData.obj.Y; // Y-Koordinate des Landes

            let value1 = country.arrayOfData[sliderValue]; // Wert aus dem Datenarray des Einkommens
            let value2 = myConsum[i].arrayOfData2[sliderValue]; // Wert aus dem Datenarray des Verbrauchs

            let circleSize1 = map(value1, 80, 150, 10, 100); // Größe der Ellipse basierend auf Wert 1
            let circleSize2 = map(value2, 80, 150, 10, 100); // Größe der Ellipse basierend auf Wert 2

            let distance1 = dist(mouseX, mouseY, x, y);
            let distance2 = dist(mouseX, mouseY, x, y);

            
            
            if (distance2 < (circleSize2/2)|| distance1 < (circleSize1/2)) {
                selectedCountry = country.myCountryISO;
                console.log("Selected Country ISO: " + selectedCountry);

            }
        }
    }

}


