/**
  * Classes: FlashCard, Deck
  * File: FlashCardBuilder.js 
  *
  * Definition:
  *
  * Version: 0.1
  *
  * Dependencies:  
  *   Requires CSV class
 **/
function Deck(){

    /* CLASS CONSTANTS */


    /* CLASS PROPERTIES */
    this.Cards = new Array();
    this.Display = '';

    /* EXTERNAL FUNCTIONS */
    this.Import = function(txt){

        //get array
        var lArray = CSV.TextToArray(txt);

        //create cards
        for (var i=0; i < lArray.length; i++){
            var newCard = new Card(lArray[i]);
            console.log(newCard);
            this.Cards.push(newCard);
        }

        if (this.Display != ''){
            var spn = document.createElement('span');
            spn.setAttribute('class','middle');
            spn.innerHTML = '<span>this and thant and <br>that or ' + this.Cards[0].GetView() + '</span>';
            $('#' + this.Display).append(spn);
        }
    };

    this.GetCount = function(){
        return this.CurrentDeck.length;         
    };

    this.SetDisplay = function(displayId){
        this.Display = displayId;
    };

    this.ShuffleDeck = function(){

    };

    this.PreviousCard = function(){

    };
    
    this.NextCard = function(){

    };

    this.PreviousSide = function(){

    };
    
    this.NextSide = function(){

    };

    this.ListenForKeystrokes = function(){
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                  console.log('left');
                break;

                case 38: // up
                  console.log('up');
                break;

                case 39: // right
                  console.log('right');
                break;

                case 40: // down
                  console.log('down');
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); 
        });
    };

    /* INTERNAL FUNCTIONS */


};

function Card(lArray){

    this.sides = lArray;

    /* CLASS PROPERTIES */
    this.views = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.currentSide = 0;

    /* EXTERNAL FUNCTIONS */ 
    this.count = function(){
        return this.sides.length;
    };


    this.GetView = function(){
        return this.sides[this.currentSide];
    };

    this.GetPreviousSide = function(){
        if (--this.currentSide < 0){
            this.currentSide = this.sides.length - 1;
        }
        return this.sides[this.currentSide];
    };

    this.GetNextSide = function(){
        if (++this.currentSide < 0){
            this.currentSide = 0;
        }
        return this.sides[this.currentSide];
    };
    /* INTERNAL FUNCTIONS */

};

/**
  * END CLASS DEFINITIONS
 **/

