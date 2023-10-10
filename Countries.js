/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class Country {
    constructor ( ){
        this.myCountry = "NaN";
        this.myCountryArea = 0;
        this.myLocation = "NaN";
        this.myCountry2 = "NaN";
        this.myTime = 0;
        this.myCountryArea2 = 0;
        this.myCountryISO2 = "NaN";
        this.mySize = 0;
        this.myWidth = 15 ;
        this.myColor = color(50,150,55);
        this.myColor2 = color(150,50,55);
        this.estaEncima = false;
    }


    display (myX, myY) {
        this.estaEncima = mouseX > myX  && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColor);
        rect (myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            this.myColor = color(50,150,55, 150);
            fill (200);
            text(this.myCountryArea, myX, myY+30);
            text(this.myCountry, myX, myY +15);
            text(this.myCountryISO, myX +30, myY +15);
        } else {this.myColor = color(50,150,55);}
    } // end of display

    display2 (myX, myY) {
        this.estaEncima = mouseX > myX  && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColor2);
        rect (myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            this.myColor2 = color(150,50,55, 150);
            fill (200);
            text(this.myCountryArea, myX, myY+30);
            text(this.myCountry, myX, myY +15);
            text(this.myCountryISO, myX +30, myY +15);
        } else{this.myColor2 = color(150,50,55);}
    } // end of display

}  // end of class