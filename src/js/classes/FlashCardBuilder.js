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
    var _self = this;
    this.cards = new Array();
    this.hiddenCards = new Array();
    this.display = '';
    this.cardDisplay = '';
    this.sideDisplay = '';
    this.currentCard = 0;

    /* EXTERNAL FUNCTIONS */
    this.Reset = function(){
        this.cards = new Array();
        this.hiddenCards = new Array();
        this.currentCard = 0;
    };
    
    this.Import = function(txt){

        //get array
        var lArray = CSV.TextToArray(txt);

        //create cards
        for (var i=0; i < lArray.length; i++){
            var newCard = new Card(lArray[i]);
            //console.log(newCard);
            this.cards.push(newCard);
        }

        if (this.Display != ''){
            this.ShowCurrent();
        }

        this.UpdateCardDisplay();
        this.UpdateSideDisplay();
    };

    this.UpdateCardDisplay = function(){
        if (this.cardDisplay.length > 0){
            $('#' + this.cardDisplay).html(
                this.currentCard + 1 + '/' + this.cards.length);
        }
    };

    this.UpdateSideDisplay = function(){
        if (this.sideDisplay.length > 0){
            $('#' + this.sideDisplay).html(
                this.cards[this.currentCard].currentSide + 1 + 
                '/' + this.cards[this.currentCard].Count());
        }
    };

    this.GetDisplayElement = function(txt){
        var spn = document.createElement('span');
        spn.setAttribute('class','middle');
        spn.innerHTML = '<span class="cardText">' + 
            txt + '</span>';
        return spn;
    };

    this.GetCount = function(){
        return this.cards.length;         
    };

    this.SetDisplay = function(displayId){
        this.display = displayId;
    };

    this.SetCardDisplay = function(displayId){
        this.cardDisplay = displayId;
    };

    this.SetSideDisplay = function(displayId){
        this.sideDisplay = displayId;
    };

    this.ShuffleDeck = function(){

    };

    this.ShowCurrent = function(movement){
        $('#' + this.display).html('');
        if (arguments.length == 0){
            $('#' + this.display).append(
                this.GetDisplayElement(
                  this.cards[this.currentCard].First()
                )
            );
        } else {
            if (movement == -1){
                $('#' + this.display).append(
                    this.GetDisplayElement(
                      this.cards[this.currentCard].GetPreviousSide()
                    )
                );
            } else if (movement == 1) {
                $('#' + this.display).append(
                    this.GetDisplayElement(
                      this.cards[this.currentCard].GetNextSide()
                    )
                );
            }
        }
        this.UpdateSideDisplay();
    };

    this.PreviousCard = function(){
        if (this.cards.length > 0 ){

            if (--this.currentCard < 0) {
                this.currentCard = this.cards.length -1;
            }

            var tmpCardText = this.cards[this.currentCard].First();

            if (this.Display != ''){
                this.ShowCurrent();
            }
            this.UpdateCardDisplay();
            this.UpdateSideDisplay();

            return tmpCardText;
        }
    };
    
    this.NextCard = function(){
        if (this.cards.length > 0 ){

            if (++this.currentCard >= this.cards.length) {
                this.currentCard = 0;
            }

            var tmpCardText = this.cards[this.currentCard].First();

            if (this.Display != ''){
                this.ShowCurrent();
            }
            this.UpdateCardDisplay();
            this.UpdateSideDisplay();

            return tmpCardText;
        }

    };

    this.PreviousSide = function(){
        this.ShowCurrent(-1);
    };
    
    this.NextSide = function(){
        this.ShowCurrent(1);
    };

    this.ListenForKeystrokes = function(){
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                    _self.PreviousCard();
                break;

                case 38: // up
                    _self.PreviousSide();
                break;

                case 39: // right
                    _self.NextCard();
                break;

                case 40: // down
                    _self.NextSide();
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
    this.Count = function(){
        return this.sides.length;
    };


    this.First = function(){
        this.currentSide = 0;
        return this.sides[0];
    };

    this.GetPreviousSide = function(){
        if (--this.currentSide < 0){
            this.currentSide = this.sides.length - 1;
        }
        return this.sides[this.currentSide];
    };

    this.GetNextSide = function(){
        if (++this.currentSide >= this.sides.length){
            this.currentSide = 0;
        }
        return this.sides[this.currentSide];
    };
    /* INTERNAL FUNCTIONS */

};

/**
  * END CLASS DEFINITIONS
 **/

