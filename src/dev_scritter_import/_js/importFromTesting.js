
function processObfuscation(){

    var lValue = $('#txtInput').val();
    var aValues = lValue.split(/\n/);
    var returnText = '';

    var indef = true;
    var processedArray = [];

    for (var i = 0; i < aValues.length; i++) {
        returnText += aValues[i].substring(0, aValues[i].length - 1);
    };

    $('#txtInput').val(returnText);
}


function processSkritter(){
    var lValue = $('#txtInput').val();
    var aValues = lValue.split(/\n/);
    var returnText = '';

//console.log("a length: " + aValues.length);

    var indef = true;
    var processedArray = [];

    for (var i = 0; i < aValues.length; i++) {

        var sText = $.trim(aValues[i]);

        if (sText.length == 0){
            indef = true;
        } else if(indef){
            processedArray.push([sText]);
            indef = false;
        } else {
            processedArray[processedArray.length-1].push(sText);
        }
    };


    for (var i = 0; i < processedArray.length; i++) {
        for (var j = 0; j < processedArray[i].length; j++) {

            if (j == 0){
                returnText += processedArray[i][j] + '|';
            } else if (j != processedArray[i].length - 1){
                returnText += processedArray[i][j] + ' ';
            } else {
                returnText += processedArray[i][j] + '\n';
            }
        };
    };

    //console.log(processedArray);

    $('#txtInput').val(returnText);
}   