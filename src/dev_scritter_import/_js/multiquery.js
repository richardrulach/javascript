
var sourceArray = [];
var groupArray = [];


function importValues(){
    var lValue = $('#txtInput').val();
    var aValues = lValue.split(/\n/);
    var returnText = '';

    // console.log("a length: " + aValues.length);

    var currentItem = -1;
    for (var i = 0; i < aValues.length; i++) {

        if (aValues[i].substring(0,1) == "*"){
            groupArray.push([aValues[i].substring(1)]);            
        } else {
            groupArray[groupArray.length-1].push(aValues[i]);
        }
    };


    console.log(groupArray);

    GenerateQuestion();
    GenerateAnswers();

} 

var answerItem = -1;
var answerText = '';

function GenerateQuestion(){

    var selectedGroup = Math.floor(Math.random() * groupArray.length);
    var selectedItem = Math.floor(Math.random() * (groupArray[selectedGroup].length-1));

    console.log(groupArray[selectedGroup][selectedItem + 1]);

    answerItem = selectedGroup;
    answerText = groupArray[selectedGroup][selectedItem + 1];
    $('#questionArea').html(answerText);
}

function GenerateAnswers(){
    for (var i = 0; i < groupArray.length; i++) {
        $('#answerArea').append('<div id="answerItem' + i + '" class="answerItem">' + groupArray[i][0] + '</div>');
    };    

    $('.answerItem').click(function(){

        var res = /\d{1,}/.exec(this.id)[0];
        if (answerItem == parseInt(res)){
            //console.log('correct:' + res);
            $('#answerItem' + answerItem).append(
                '<div class="correctAnswer">' + answerText + '</div>');
            GenerateQuestion();
        } else {
            $('#questionArea').effect('shake');
        }
    });

}
