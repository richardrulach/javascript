/**
  * Class: xWords
  * File: xWords.js 
  *
  * Definition:
  *		Creates and manages a crossword.
  *
  * Dependencies:
  * 	jQuery
 **/
var xWords = {
   	/* CLASS CONSTANTS */

    /* CLASS PROPERTIES */
    _self:this,
	Grid:new Array(),
	Words:new Array(),


	/* PUBLIC METHODS */
	// resets the grid and word list
	Reset: function(){
		this.Grid = new Array();
		this.Words = new Array();
	},


	Create: function(height, width, arrayOfWords){
		this.Reset();
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

		this.SortByLength(arrayOfWords);

		//console.log(this.SortByLength(arrayOfWords));

		for (var x=0; x < arrayOfWords.length; x++){
			 this.AddWord(arrayOfWords[x]);
		}
		// console.log(this.Grid);
		return this.Grid;
	},

	SortByLength: function(lArray){
		lArray.sort(function(a,b){
           return a.length < b.length
        });
		return lArray;
	},


	AddWord: function(newWord){
		console.log("nw:" + newWord);
		var positions = this.GetPositions(newWord);

		if (positions.length > 0){

			var choice = -1;

			// CHOOSE THE FIRST ONE WITH A CROSSING POINT
			// IF IT IS THERE
			for (var iCount = 0; iCount < positions.length; iCount++){
				if (positions[iCount].crossingPoint == 1){
					choice = iCount;
				}
			}

			if (choice == -1){
				choice = Math.floor(
					(Math.random() * positions.length));
			}

			// WRITE THE WORD INTO THE ARRAY
			var newPos = positions[choice];
			//console.log(newPos);

			// LOOP THROUGH THE WORD PLACING IT IN THE GRID
			for (var count = 0; count < newWord.length; count++){
				if (newPos.direction == 1){
					this.Grid[newPos.x + count][newPos.y] = 
						newWord.charAt(count);
				} else if (newPos.direction == -1){
					this.Grid[newPos.x][newPos.y + count] = 
						newWord.charAt(count);
				}
			}
		}
	},

	GetPositions: function(newWord){
		var positionArray = new Array();

		for (var x = 0; x < this.Grid.length; x++){
			for (var y = 0; y < this.Grid[0].length; y++){
				
				var newPos = this.TestPosition(newWord,x,y,1);
				if (newPos !== undefined) positionArray.push(newPos);

				newPos = this.TestPosition(newWord,x,y,-1);
				if (newPos !== undefined) positionArray.push(newPos);

				// if (this.TestPosition(newWord,x,y,1)){
				// 	positionArray.push(new Position(x,y,1));
				// }
				// if (this.TestPosition(newWord,x,y,-1)){
				// 	positionArray.push(new Position(x,y,-1));
				// }
			}
		}
		//console.log(newWord + ' pos' + positionArray.length);
		return positionArray;
	},

	TestPosition: function(newWord,x,y,direction){

		var crossingPoint = 0;

		if (this.CharBeforeFirstLetter(x,y,direction))
			return;

		if (this.CharAfterLastLetter(newWord.length,x,y,direction))
			return;


		if (direction == 1){

			if (x + newWord.length > this.Grid.length)
				return;

			for (var count = 0; count < newWord.length; count++){
				if ((this.Grid[x + count][y].length > 0)&&
					(this.Grid[x + count][y] != 
						newWord.charAt(count))){
					return;
				} else if (this.Grid[x + count][y] == 
						newWord.charAt(count).toString()){
					crossingPoint = 1;
					// console.log("newWord:" + newWord );
					// console.log("x:" + x );
					// console.log("y:" + y );
					// console.log("direction:" + direction );
				} else if (this.SidesHaveChars(x+count,y,direction)){
					return;
				} 
			}

		} else if (direction == -1){

			if (y + newWord.length > this.Grid[0].length)
				return;

			for (var count = 0; count < newWord.length; count++){
				if ((this.Grid[x][y + count].length > 0)&&
					(this.Grid[x][y + count] != 
						newWord.charAt(count))) 
					return;
				else if (this.Grid[x][y + count] == 
						newWord.charAt(count).toString()){
					crossingPoint = 1;
				} else if (this.SidesHaveChars(x,y+count,direction)){
					return;
				} 
			}

		}

		// If no problems - return the details!!!
		return new Position(x,y,direction,crossingPoint);
	},


	CharAfterLastLetter: function(len,x,y,direction){
		var bCharAfterLastLetter = false;

		if (direction == 1){
			if (x + len < this.Grid.length){
				if (this.Grid[x + len][y].length > 0) return true;
			}
		} else if (direction == -1){
			if (y + len < this.Grid[0].length){
				if (this.Grid[x][y + len].length > 0) return true;
			}
		}

		return bCharAfterLastLetter;
	},

	CharBeforeFirstLetter: function(x,y,direction){
		var bCharBeforeFirstLetter = false;

		if (direction == 1){
			if (x-1 > 0){
				if (this.Grid[x-1][y].length > 0) return true;
			}
		} else if (direction == -1){
			if (y-1 > 0){
				if (this.Grid[x][y-1].length > 0) return true;
			}
		}

		return bCharBeforeFirstLetter;
	},


	SidesHaveChars: function(x,y,direction){
		var bHasChars = false;

		if (direction == 1){
			if (y-1 > 0){
				if (this.Grid[x][y-1].length > 0) return true;
			}
			if (y+1 < this.Grid[0].length){
				if (this.Grid[x][y+1].length > 0) return true;
			}
		} else if (direction == -1){
			if (x-1 > 0){
				if (this.Grid[x-1][y].length > 0) return true;
			}
			if (x+1 < this.Grid.length){
				if (this.Grid[x+1][y].length > 0) return true;
			}
		}

		return bHasChars;
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
 /**
  * END CLASS DEFINITION
  **/

// Direction: 
//  1 indicates horizontal
// -1 indicates vertical
function Position(x,y,direction,crossingPoint){
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.crossingPoint = crossingPoint;
}
