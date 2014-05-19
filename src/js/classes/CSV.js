
/**
  * Class: CSV
  * File: CSV.js 
  *
  * Definition:
  *		Handles CSV data in javascript
  *
 **/
 var CSV = {

   	/* CLASS CONSTANTS */


    /* CLASS PROPERTIES */


    /* INITIALISERS */


	/* EXTERNAL FUNCTIONS */
    TextToArray: function(txt){
        var aValues = txt.split('\n');
        var resultArray = new Array();

        for (var i = 0; i < aValues.length; i++) {
            var newArray = aValues[i].split(',');
            resultArray.push(newArray);
        }
        return resultArray;
    }


	/* INTERNAL FUNCTIONS */


 };
 /**
  * END CLASS DEFINITION
 **/
