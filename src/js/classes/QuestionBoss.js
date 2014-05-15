
/* QuestionBoss.js */

var QB = {

	TestFunction:function(a,b,c){
		return a+b+c;
	},
	/* Core functions */
    Activity_MultipleChoice:function(source){

    },
    Activity_Anagrams:function(sourceData, questionElement, answersElement){
            var rawData = sourceData;
            var aValues = rawData.split('\n');

            var sourceArray = new Array();
            var questionArray = new Array();

            for (var i = 0; i < aValues.length; i++) {
                var newArray = aValues[i].split(',');
                if (newArray.length == 2) {
                    sourceArray.push(newArray);
                }
            }

            for (var i = 0; i < sourceArray.length; i++) {
                questionArray.push(this.ScrambleLetters(sourceArray[i][0]));
            }


            var sQuestion = '<table>';
            var sAnswers = '<table>';
            for (var i = 0; i < questionArray.length; i++) {
                var sNumber = i + 1;
                sQuestion += '<tr><td>';
                sQuestion += sNumber.toString() + '. ' +
                                questionArray[i].replace(/\s/g, '&nbsp;&nbsp;&nbsp;').replace(/\_/g, '&nbsp;_').replace(/_([^&])/g, '_ $1');
                sQuestion += '</td><td>';
                sQuestion += sourceArray[i][1];
                sQuestion += '</td></tr>';

                sAnswers += '<tr><td style="padding-left:10px">';
                sAnswers += sNumber.toString() + '. ' + sourceArray[i][0];
                sAnswers += '</td></tr>';
            }
            sQuestion += '</table>';
            sAnswers += '</table>';

            $('#' + questionElement).html(sQuestion);
            $('#' + answersElement).html(sAnswers);

            //console.log(questionArray);
            $('html, body').animate({
                    scrollTop: $("#" + questionElement).offset().top
                }, 1000);

	},

	Activity_MissingLetters:function(sourceData, questionElement, answersElement){
            var rawData = sourceData;
            var aValues = rawData.split('\n');
            var sourceArray = new Array();
            var questionArray = new Array();

            for (var i = 0; i < aValues.length; i++) {
                var newArray = aValues[i].split(',');
                if (newArray.length == 2) {
                    sourceArray.push(newArray);
                }
            }

            for (var i = 0; i < sourceArray.length; i++) {
                questionArray.push(this.GetGappedLetters(sourceArray[i][0]));
            }


            var sQuestion = '<table>';
            var sAnswers = '<table>';
            for (var i = 0; i < questionArray.length; i++) {
                var sNumber = i + 1;
                sQuestion += '<tr><td>';
                sQuestion += sNumber.toString() + '. ' +
                                questionArray[i].replace(/\s/g, '&nbsp;&nbsp;&nbsp;').replace(/\_/g, '&nbsp;_').replace(/_([^&])/g, '_ $1');
                sQuestion += '</td><td style="padding-left:10px">';
                sQuestion += sourceArray[i][1];
                sQuestion += '</td></tr>';

                sAnswers += '<tr><td>';
                sAnswers += sNumber.toString() + '. ' + sourceArray[i][0];
                sAnswers += '</td></tr>';
            }
            sQuestion += '</table>';
            sAnswers += '</table>';

            $('#' + questionElement).html(sQuestion);
            $('#' + answersElement).html(sAnswers);

            //console.log(questionArray);
            $('html, body').animate({
                    scrollTop: $("#" + questionElement).offset().top
                }, 1000);

	},

	Activity_MatchDefinitions:function(sourceData, questionElement, answersElement){
            var rawData = sourceData;
            var aValues = rawData.split('\n');
            var sourceArray = new Array();
            var questionArray = new Array();
            var answerArray = new Array();

            var questionTable = new Array();
            var answerTable = new Array();


            // GET THE SOURCE DATA
            for (var i = 0; i < aValues.length; i++) {
                var newArray = aValues[i].split(',');
                if (newArray.length == 2) {
                    sourceArray.push(newArray);
                }
            }

            // SEPARATE INTO QUESTION AND ANSWER ARRAYS                    
            for (var i = 0; i < sourceArray.length; i++) {
                questionArray.push(new Array(i, sourceArray[i][0]));
                answerArray.push(new Array(i, sourceArray[i][1]));
            }

            // SHUFFLE THE ANSWER ARRAY
            answerArray = this.ShuffleArray(answerArray);

            for (var i = 0; i < sourceArray.length; i++) {
                var qNumber = i + 1;
                var qLetter = String.fromCharCode(97 + i);
                questionTable.push(new Array(
                                qNumber.toString() + '. ' + questionArray[i][1],
                                qLetter + '. ' + answerArray[i][1]
                                ));
                answerTable.push(
                                qNumber.toString() + ' - ' +
                                this.CheckAnswer(questionArray[i][0], answerArray)
                                );
            }

            var sQuestion = '<table>';
            var sAnswers = '<div>';
            for (var i = 0; i < questionTable.length; i++) {
                sQuestion += '<tr><td>';
                sQuestion += questionTable[i][0];
                sQuestion += '</td><td style="padding-left:10px">';
                sQuestion += questionTable[i][1];
                sQuestion += '</td></tr>';

                if (i > 0) sAnswers += ', ';
                sAnswers += answerTable[i];
            }
            sQuestion += '</table>';
            sAnswers += '</div>';

            $('#' + questionElement).html(sQuestion);
            $('#' + answersElement).html(sAnswers);

            $('html, body').animate({
                    scrollTop: $("#" + questionElement).offset().top
                }, 1000);

	},

	Activity_ScrambleSentences:function(sourceData, questionElement, answersElement){
            var sourceArray = sourceData.split('\n');
            var questionArray = new Array();

            for (var i = 0; i < sourceArray.length; i++) {
                questionArray.push(this.ScrambleSentence(sourceArray[i]));
            }


            var sQuestion = '<table>';
            var sAnswers = '<table>';
            for (var i = 0; i < questionArray.length; i++) {
                var sNumber = i + 1;
                sQuestion += '<tr><td>';
                sQuestion += sNumber.toString() + '. ' +
                                questionArray[i];
                sQuestion += '</td></tr>';

                sAnswers += '<tr><td style="padding-left:10px">';
                sAnswers += sNumber.toString() + '. ' + sourceArray[i];
                sAnswers += '</td></tr>';
            }
            sQuestion += '</table>';
            sAnswers += '</table>';

            $('#' + questionElement).html(sQuestion);
            $('#' + answersElement).html(sAnswers);

            //console.log(questionArray);
            $('html, body').animate({
                    scrollTop: $("#" + questionElement).offset().top
                }, 1000);

	},


	ResetObject:function(){
		this.QuestionsAsArray = new Array();
		this.AnswersAsArray = new Array();
	},


	/* Functions for accessing the output */
	QuestionsAsTable:function(){},
	AnswersAsTable:function(){},
	QuestionsAsArray:new Array(),
	AnswersAsArray:new Array(),


	/* Core internal functions */
    ScrambleSentence: function(text) {
        var newWords = '';
        var words = text.split(' ');
        words = this.ShuffleArray(words);
        for (var i = 0; i < words.length; i++) {
            newWords += words[i];
            if (i != words.length - 1) {
                newWords += ' / ';
            }
        }
        return newWords;
    },

    GetGappedLetters: function(text) {
        var newWords = '';
        var words = text.split(' ');
        for (var i = 0; i < words.length; i++) {
            var currentWord = words[i];
            if (currentWord.length < 2) {
                if (newWords.length > 0) newWords += ' ';
                newWords += currentWord;
            } else if (currentWord.length < 5) {
                if (newWords.length > 0) newWords += ' ';
                for (var j = 0; j < currentWord.length; j++) {
                    if ((j == 0) || (j == currentWord.length - 1)) {
                        newWords += currentWord.substr(j, 1);
                    } else {
                        newWords += "_";
                    }
                }
            } else if (currentWord.length < 8) {
                if (newWords.length > 0) newWords += ' ';
                for (var j = 0; j < currentWord.length; j++) {
                    if ((j == 0) || (j == currentWord.length - 1) || (currentWord.charCodeAt(j) < 97) || (currentWord.charCodeAt(j) > 122)) {
                        newWords += currentWord.substr(j, 1)
                    } else if (j == 1) {
                        newWords += "_";
                    } else {
                        if (Math.random() < 0.75) {
                            newWords += currentWord.substr(j, 1);
                        } else {
                            newWords += "_";
                        }
                    }
                }
            } else {
                if (newWords.length > 0) newWords += ' ';
                for (var j = 0; j < currentWord.length; j++) {
                    if ((j == 0) || (j == currentWord.length - 1) || (currentWord.charCodeAt(j) < 97) || (currentWord.charCodeAt(j) > 122)) {
                        newWords += currentWord.substr(j, 1)
                    } else {
                        if (Math.random() < 0.5) {
                            newWords += currentWord.substr(j, 1);
                        } else {
                            newWords += "_";
                        }
                    }
                }
            }
        }
        return newWords;
    },


	ScrambleLetters:function(text) {
        var newWords = '';
        var words = text.split(' ');
        for (var i = 0; i < words.length; i++) {
            var currentWord = words[i];
            var newWordArray = new Array();
            var newWord = '';
            for (var j = 0; j < currentWord.length; j++) {
                newWordArray.push(currentWord.substr(j, 1));
            }
            newWordArray = this.ShuffleArray(newWordArray);
            for (var j = 0; j < newWordArray.length; j++) {
                newWord += newWordArray[j];
            }
            newWords += newWord + ' ';
        }
        return newWords;
    },

    CheckAnswer:function(iVal, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (iVal == myArray[i][0]) {
                return String.fromCharCode(97 + i);
            }
        }
    },

    ShuffleArray:function(array) {
        for (var i = array.length - 1; i > 0;  ) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i = i - 1;
        }
        return array;
    }
};