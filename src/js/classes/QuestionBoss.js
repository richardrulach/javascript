
/* QuestionBoss.js */

var QB = function(){

	this.TestFunction = function(a,b,c){
		return a+b+c;
	}


	this.ScrambleLetters = function(text) {
        var newWords = '';
        var words = text.split(' ');
        for (var i = 0; i < words.length; i++) {
            var currentWord = words[i];
            var newWordArray = new Array();
            var newWord = '';
            for (var j = 0; j < currentWord.length; j++) {
                newWordArray.push(currentWord.substr(j, 1));
            }
            newWordArray = shuffleArray(newWordArray);
            for (var j = 0; j < newWordArray.length; j++) {
                newWord += newWordArray[j];
            }
            newWords += newWord + ' ';
        }
        return newWords;
    };

    this.CheckAnswer = function(iVal, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (iVal == myArray[i][0]) {
                return String.fromCharCode(97 + i);
            }
        }
    };

    this.ShuffleArray = function(array) {
        for (var i = array.length - 1; i > 0;  ) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i = i - 1;
        }
        return array;
    };


};