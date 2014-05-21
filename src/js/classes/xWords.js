/* xWords.js */
/* Dependencies JQuery */
var xWords = {
	/* CONSTANTS */

	
	/* VARIABLES */
    _self:this,
	Grid:new Array(),
	Words:new Array(),


	/* PUBLIC METHODS */
	// resets the grid and word list
	Clear: function(){
		this.Grid = new Array();
		this.Words = new Array();
	},


	Create: function(height, width, arrayOfWords){
        var newGrid = new Array(width);
        for (var i = 0; i < newGrid.length; i++){
            newGrid[i] = new Array(height);
        }

        for (var i = 0; i < newGrid.length; i++){
        	for (var j = 0; j < newGrid[0].length; j++){
            	newGrid[i][j] = '';
            }
        }

		this.Grid = newGrid;
		console.log(this.SortByLength(arrayOfWords));
		return this.Grid;
	},

	SortByLength: function(lArray){
		lArray.sort(function(a,b){
           return a.length < b.length
        });
		return lArray;
	},


	AddWord: function(newWord){

	},

	GetWords: function(){

	},

	GetTable: function(){

	},

	GetPopulatedTable: function(){

	},

	RunDisplayAnimation:function(){

	},

	SetUserInterface:function(btnAddWord, txtAddWord, elemHorizontal, elemVertical, elemUnsed, tblContainer, btnGenerate, elemWordList){

	}

	/* PRIVATE METHODS */



};