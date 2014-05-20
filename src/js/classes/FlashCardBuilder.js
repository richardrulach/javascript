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
    this.DISPLAY_ELEMENT_CLASS = 'cardText';
    this.DISPLAY_OUTER_ELEMENT_CLASS = 'middle';

    /* CLASS PROPERTIES */
    var _self = this;
    this.cards = new Array();
    this.hiddenCards = new Array();
    this.display = '';
    this.cardDisplay = '';
    this.sideDisplay = '';
    this.currentCard = 0;
    this.scaleText = true;
    this.shuffleOnIteration = false;

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

    this.ScaleDisplay = function(){
        if (this.scaleText){
            var size = 12;
            while (($('.' + this.DISPLAY_ELEMENT_CLASS).height() < 320)&& 
                   ($('.' + this.DISPLAY_ELEMENT_CLASS).width() < 480)){
                $('.' + this.DISPLAY_ELEMENT_CLASS).css({fontSize:size});
                size += 1;
            }

            while (($('.' + this.DISPLAY_OUTER_ELEMENT_CLASS).height() > 320)|| 
                   ($('.' + this.DISPLAY_OUTER_ELEMENT_CLASS).width() > 480)){
                $('.' + this.DISPLAY_ELEMENT_CLASS).css({fontSize:size});
                size -= 1;
            }
        }
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
        spn.innerHTML = '<span class="' + 
            this.DISPLAY_ELEMENT_CLASS + '">' + 
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
        for (var i = this.cards.length - 1; i > 0;  ) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
            i = i - 1;
        }
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
        this.ScaleDisplay();
        this.UpdateSideDisplay();
    };

    this.PreviousCard = function(){
        if (this.cards.length > 0 ){

            if (--this.currentCard < 0) {
                this.currentCard = this.cards.length -1;
                if (this.shuffleOnIteration){
                    this.ShuffleDeck();
                }
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
                if (this.shuffleOnIteration){
                    this.ShuffleDeck();
                }
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

    this.HideCard = function(movement){
        this.hiddenCards.push(this.cards.splice(this.currentCard,1));
        if (movement == 1){
            if (this.currentCard >= this.cards.length){
                this.currentCard = 0;
            }
            this.ShowCurrent();
        } else if (movement == -1) {
            if (--this.currentCard < 0){
                this.currentCard = this.cards.length - 1;
            }
            this.ShowCurrent();
        }
    };

    this.SetDifficult = function(){
        this.cards[this.currentCard].incorrect++;
    };

    this.ListenForKeystrokes = function(){
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                    if (e.ctrlKey) {
                        _self.HideCard(-1);
                    } else if (e.altKey){
                        _self.SetDifficult();
                        _self.PreviousCard();
                    } else {
                        _self.PreviousCard();
                    }
                break;

                case 38: // up
                    _self.NextSide();
                break;

                case 39: // right
                    if (e.ctrlKey) {
                        _self.HideCard(1);
                    } else if (e.altKey){
                        _self.SetDifficult();
                        _self.NextCard();
                    } else {
                        _self.NextCard();
                    }
                break;

                case 40: // down
                    _self.PreviousSide();
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

