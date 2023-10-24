/*
Aaron Illing, Devon Hoeltzli, Moritz Nussbaumer, Tim Bluthardt
Quellen:
https://data.oecd.org/earnwage/average-wages.htm
https://ec.europa.eu/eurostat/databrowser/view/TEC00027/default/table?lang=en
https://stats.oecd.org/Index.aspx?DataSetCode=AV_AN_WAGE
https://data-explorer.oecd.org/vis?pg=0&bp=true&snb=10&tm=wage&hc[Measure]=Wages&vw=tb&df[ds]=dsDisseminateFinalDMZ&df[id]=DSD_EARNINGS@AV_AN_WAGE&df[ag]=OECD.ELS.SAE&df[vs]=1.0&pd=2000,&dq=TUR....Q..&ly[rw]=UNIT_MEASURE&ly[cl]=TIME_PERIOD&to[TIME_PERIOD]=false
 */

class Button {
    constructor ( _x,_y, _sZ, _tl ){
        this.myX = _x;
        this.myY = _y;
        this.mySize = _sZ;
        this.myTitle = _tl;
        this.myColor = color(128);
        this.myOverMeColor = color(200);
        this.myStrokeColor = color(0);
        this.mouseOverMe = false;
        this.selected = false;
        this.playbuttonVisible = true;
        this.pausebuttonVisible = false;
        // this.xButton = height - 100;
        this.myTextSize = 18;
        this.playbutton = loadImage('playbutton.svg');
        this.playbuttonHover = loadImage('playbutton_hover.svg');
        this.pausebutton = loadImage('pausebutton.svg');
        this.pausebuttonHover = loadImage('pausebutton_hover.svg');
        //this.xButton = height - 100;
    }

    display () {
        

    //Playbutton svg einfügen;
        // image(playbutton,xBorder + 5, height - 100, 42, 42);

        //ellipse (this.myX, this.myY, 5,5);

        this.mouseOverMe = mouseX > this.myX  && mouseX < this.myX + this.mySize &&
            mouseY > this.myY  && mouseY < this.myY + this.mySize ;

        // if (this.playbuttonVisible) {
        //     image(this.playbutton, xBorder + 5, height - 100, 42, 42);
        // }

        // if (this.pausebuttonVisible) {
        //     image(this.pausebutton,xBorder + 5, height - 100, 42, 42);
        // }

        if (this.mouseOverMe) {
        // image(this.playbuttonHover, xBorder + 5, height - 100, 42, 42);x
        // fill(255, 0, 0);
        // strokeWeight(1);
        // stroke(this.myStrokeColor);
        // rect(this.myX, this.myY, this.mySize, this.mySize);

        // fill(255);
        // noStroke();
        // textAlign(LEFT);
        // textSize(this.myTextSize);
        // text(this.myTitle, this.myX + this.mySize + this.myTextSize, this.myY + this.myTextSize);
        }
        if(this.selected){
            console.log('test');
            playbuttonVisible = false;
            // this.pausebuttonVisible = true;
        // pause button svg einfügen
            image(this.pausebutton,xBorder, height - 100, 20, 20);

            // if(this.mouseOverMe) {
            // image(this.pausebuttonHover,xBorder + 5, height - 100, 42, 42) 
            // }
            
            // strokeWeight(4);
            // noFill();
            // stroke(this.myStrokeColor);
            // rect(this.myX, this.myY, this.mySize, this.mySize);
            // image(pausebutton,xBorder, xButton, 42, 42);
        } else{
            playbuttonVisible = true;
        }
        
    }

    releasedOverMe () {
        if (this.mouseOverMe) this.selected = !this.selected;

    }

} // end of class