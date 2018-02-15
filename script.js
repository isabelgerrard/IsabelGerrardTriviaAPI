$(document).ready(function(){
    var difArray = ["easy", "medium", "hard"];
    var typeArray = ["multiple", "boolean"];
    $('#createQuizButton').on('click', function(){
        $('#randomButton').on('click', function()){
            var categoryChosen = Math.floor(Math.random() * (32 - 9 + 1)) + 9;
            var randomIndex = Math.floor(Math.random() * 3);
            var difChosen = difArray[randomIndex];
            var randomIndex2 = Math.floor(Math.random() * 2);
            var typeChosen = typeArray[randomIndex2];
        } else {
            var numberOfQuestions = document.getElementById("numQuestionsInput").value;
            console.log(numberOfQuestions);
            var categoryChosen = document.getElementById("categoryChosen").value;
            var difChosen = document.getElementById("difChosen").value;
            var typeChosen = document.getElementById("typeChosen").value;

        }

        console.log(categoryChosen);
        console.log(difChosen);
        console.log(typeChosen);

        $.ajax({
            url: 'https://opentdb.com/api.php?amount=' + numberOfQuestions + '&category=' + categoryChosen + '&difficulty=' + difChosen + '&type=' + typeChosen,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                myFunction(result, numberOfQuestions, categoryChosen, difChosen, typeChosen);
            },
            error: function () {
                alert('Failed!');
            }
        });
        console.log()
    });
})

function myFunction(r, num, category, difficulty, type) {
    var triviaArray = r.results;
    if (num <= 50 && num > 0 && category != "selectCategory" && difficulty != "selectDifficulty" && type != "selectType") {
        var result = "<table id='triviaShown' cellpadding=15>";
        for (var i = 0; i < triviaArray.length; i++) {
            result += "<tr><td>" + triviaArray[i].question + "</td></tr>";
            var questionsAnswersArray = randomizeAnswers(triviaArray[i].incorrect_answers, triviaArray[i].correct_answer);

            for(var j = 0; j < questionsAnswersArray.length; j++){
                result += "<tr><td>" + questionsAnswersArray[j] + "</td></tr>";
            }

            result += "<tr><td><br><br></td></tr>";
            // result += "<td>" + "<img src=" + itunesArray[i].artworkUrl100 + "></td>";

        }
        result += "</table>"
        document.getElementById("resultTable").innerHTML = result;
        document.getElementById("resultTable").style.display = "block";
        document.getElementById("finishQuizButton").style.display = "block";

    } else {
        document.getElementById("resultTable").style.display = "none";
        document.getElementById("error").innerHTML = "ERROR. Please select a category, question type, and difficulty to continue. Click here to exit.";
    }
}

function randomizeAnswers(incorrect, correct){
    var allAnswersArray = [];
    if(incorrect.length == 1){
        allAnswersArray.push(incorrect);
        allAnswersArray.push(correct);
    } else {
        allAnswersArray.push(incorrect[0]);
        allAnswersArray.push(incorrect[1]);
        allAnswersArray.push(incorrect[2]);
        allAnswersArray.push(correct);
    }

    console.log(allAnswersArray);
    // while(allAnswersArray.indexOf("undefined") != -1){
    //     arr.splice(allAnswersArray.indexOf("undefined"), 1);
    // }

    return shuffle(allAnswersArray);
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

