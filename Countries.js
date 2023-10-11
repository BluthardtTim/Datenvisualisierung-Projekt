/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class Country {
    constructor ( ){
        this.myCountry = "NaN";
        this.myValue = 0;
        this.myLocation = "NaN";
        this.myCountry2 = "NaN";
        this.myTime = 0;
        this.mySize = 0;
        this.myWidth = 25 ;
        this.myColorConsume = color(50,150,55);
        this.myColorIncome = color(150,50,55);
        this.estaEncima = false;
        this.arrayOfData = [];
    }


    display (myX, myY) {
        this.estaEncima = mouseX > myX  && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColorIncome);
        rect (myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            this.myColorConsume = color(50,150,55, 150);
            fill (200);
            text(this.myValue, myX, myY+30);
            text(this.myCountry, myX, myY +15);
            text(this.myCountryISO, myX +30, myY +15);
        } else {this.myColorConsume = color(50,150,55);}
    } // end of display



    display2 (myX, myY) {
        this.estaEncima = mouseX > myX  && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColorConsume);
        rect (myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            this.myColorIncome = color(150,50,55, 150);
            fill (200);
            text(this.myValue, myX, myY+30);
            text(this.myCountry, myX, myY +15);
            text(this.myCountryISO, myX +30, myY +15);
        } else{this.myColorIncome = color(150,50,55);}
    } // end of display

}  // end of class