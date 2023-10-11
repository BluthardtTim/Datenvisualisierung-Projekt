let table;
let myIncome = [];

let consumData;
let myConsum = [];

let data = [];

let karte

function preload() {
    table = loadTable('data2/EinkommenEu2.csv', 'csv', 'header');
    consumData = loadTable('data2/konsumpreisindex_eu.csv', 'csv', 'header');
    karte = loadImage('MapChart_Map-2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let i = 0;
    let t = 0;

    // // Einkommen der Eu Länder
    // for (let myRow of incomeData.rows) {
    //     let currentIncome = new Country();

    //     currentIncome.myValue = myRow.get('INDEX');
    //     currentIncome.myLocation = myRow.get('LOCATION');
    //     currentIncome.myTime = myRow.get('TIME');
    //     currentIncome.mySize = map(currentIncome.myValue, 80, 150, 0, 500);

    //     if (currentIncome.myLocation === "GRC" && currentIncome.myTime > 2011) {
    //         myIncome[t] = currentIncome;
    //         t++;
    //     }


    //         let year = myRow.getNum('TIME')
    //         let income = myRow.getNum('INDEX')

    //         let currentPaar = [year, income]
    //         data.push([currentPaar])

    //         // let currentPaar = createVector (year,income);
    //         // // arrayOfData.push(currentPaar)
    //     console.log(data)
    // }


    for (let row of table.rows) {
        let location = row.get('LOCATION');
        let year = row.getNum('TIME');
        let value = row.getNum('Value');
    
        // Überprüfe, ob das Land bereits im Daten-Array existiert
        let countryIndex = -1;
        for (let i = 0; i < data.length; i++) {
          if (data[i][0] === location) {
            countryIndex = i;
            break;
          }
        }
    
        // Wenn das Land nicht gefunden wurde, füge es hinzu
        if (countryIndex === -1) {
          data.push([location, []]);
          countryIndex = data.length - 1;
        }
    
        // Füge das Jahr und den Wert zum entsprechenden Land hinzu
        data[countryIndex][1].push({ year, value });
      }
    console.log(data);



    


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


function draw() {
    background(41);


    let currentX = 300;
    let currentY = windowHeight / 2 + 180;



    for (let i = 0; i < myConsum.length; i++) {
        myConsum[i].display(currentX, currentY);
        currentX += myConsum[i].myWidth + 50;
    }

    currentX = 270;
    karteX = 500;

    // Karte
    karteX = windowWidth / 2;

    karte.resize(0, windowHeight - 200)
    image(karte, karteX + 25, 100)


    for (let t = 0; t < myIncome.length; t++) {
        myIncome[t].display2(currentX, currentY);
        currentX += myIncome[t].myWidth + 50;
    }

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