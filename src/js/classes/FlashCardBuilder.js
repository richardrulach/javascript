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
    this.CurrentDeck = new Array();


    /* EXTERNAL FUNCTIONS */
    this.Import = function(txt){

        //get array
        var lArray = CSV.TextToArray(txt);

        //create cards
        for (var i=0; i < lArray.length; i++){
            var newCard = new Card(lArray[i]);
            console.log(newCard);
            this.CurrentDeck.push(newCard);
        }
    };

    this.GetCount = function(){
        return this.CurrentDeck.length;         
    };

    this.ShuffleDeck = function(){

    }
    /* INTERNAL FUNCTIONS */


};

function Card(lArray){

    this.sides = lArray;

    /* CLASS PROPERTIES */
    this.views = 0;
    this.correct = 0;
    this.incorrect = 0;

    /* EXTERNAL FUNCTIONS */
    this.count = function(){
        return this.sides.length;
    };

    /* INTERNAL FUNCTIONS */

};

  /**
  * END CLASS DEFINITIONS
 **/