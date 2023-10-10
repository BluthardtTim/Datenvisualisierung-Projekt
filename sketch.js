let incomeData;
let myIncome = [];

let consumData;
let myConsum = [];

let karte

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
        let currentIncome = new Country();

        currentIncome.myValue = myRow.get('Value');
            currentIncome.myLocation = myRow.get('LOCATION');
            currentIncome.myTime = myRow.get('TIME');
            currentIncome.mySize = map(currentIncome.myValue, 20000, 80000, 0, 300); // [17 098 250,50]

            if (currentIncome.myLocation === "DEU" && currentIncome.myTime > 2011) {
                myIncome[t] = currentIncome;
                t++;
            }
    }

    // Consum der Eu Länder
    for (let myRow of consumData.rows) {
        let currentConsume = new Country();

        currentConsume.myValue = myRow.get('OBS_VALUE');
            currentConsume.myCountry = myRow.get('geo');
            currentConsume.myTime = myRow.get('TIME_PERIOD');
            currentConsume.mySize = map(currentConsume.myValue, 80, 150, 0, -500); // [17 098 250,50]

            if (currentConsume.myCountry === "DE:Germany" && currentConsume.myTime > 2011) {
            myConsum[i] = currentConsume;
            i++;
            }
        }   
}


function draw() {
    background(41);
  

    let currentX = 150;
    let currentY = 450;



    for (let i = 0; i < myConsum.length; i++) {
        myConsum[i].display(currentX, currentY);
        currentX += myConsum[i].myWidth + 8;
    }

    currentX = 150;
    karteX = 500;

    // Karte
    karteX = windowWidth/2;
    
    karte.resize(0, windowHeight-200)
    image(karte, karteX+25, 100)

 
    for (let t = 0; t < myIncome.length; t++) {
        myIncome[t].display2(currentX, currentY);
        currentX += myIncome[t].myWidth + 8;
    }

    stroke(255,0,0);
    line(windowWidth/2, windowHeight, windowWidth/2, 0);
    noStroke()
    fill (200);

    textSize(18);
    // text ("Einkommen der Deutschen", 20, 300);
    // text ("Lebenshaltungskosten Deutschland", 700, 300);
    textSize(12);
    text("frameRate:   " + Math.round(frameRate()), 20, height - 10);

    // noLoop();
}