function processSkritter(){
    var lValue = $('#txtInput').val();
    var aValues = lValue.split(/\n/);
    var returnText = '';

console.log("a length: " + aValues.length);
    for (var i = 0; i < aValues.length; i++) {

        var sText = $.trim(aValues[i].replace(',',''));
        var n = sText.indexOf(' ');
        sText = sText.substr(0,n) + ',' + sText.substring(n+1, sText.length);

        var m = sText.indexOf(':');
        sText = sText.substr(0,m) + ',' + sText.substring(m+1, sText.length);

        returnText += sText + '\n';
    };

    $('#txtInput').val(returnText);
}   