$(document).ready(function() {
    var difArray = ["easy", "medium", "hard"];
    var typeArray = ["multiple", "boolean"];
    var catArray = ["9", "17" , "21", "11", "12", "14", "31", "22", "23", "24", "25", "26", "27", "28"];

    $('#randomButton').on('click', function() {
        var randomIndex1 = Math.floor(Math.random() * 14);
        document.getElementById("categoryChosen").value = catArray[randomIndex1];
        var randomIndex2 = Math.floor(Math.random() * 3);
        document.getElementById("difChosen").value = difArray[randomIndex2];
        var randomIndex3 = Math.floor(Math.random() * 2);
        document.getElementById("typeChosen").value = typeArray[randomIndex3];
    });


    $('#createQuizButton').on('click', function () {

        var numQuestions = document.getElementById("numQuestionsInput").value;
        console.log(numQuestions);
        var categoryChosen = document.getElementById("categoryChosen").value;
        var difChosen = document.getElementById("difChosen").value;
        var typeChosen = document.getElementById("typeChosen").value;

        console.log(difChosen);
        console.log(typeChosen);
        console.log(categoryChosen);


        $.ajax({
            url: 'https://opentdb.com/api.php?amount=' + numQuestions + '&category=' + categoryChosen + '&difficulty=' + difChosen + '&type=' + typeChosen,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                myFunction(result, numQuestions, categoryChosen, difChosen, typeChosen);
                globalResult = result;
            },
            error: function () {
                alert('Failed!');
            }
        });
    });

    $('#finishQuizButton').on('click', function(){
        console.log(globalResult);
        gradeQuiz(globalResult);
    });
});

function myFunction(r, num, category, difficulty, type) {
    var triviaArray = r.results;
    if (num <= 50 && num > 0 && category != "selectCategory" && difficulty != "selectDifficulty" && type != "selectType") {
        var result = "<table id='triviaShown' cellpadding=10>";
        for (var i = 0; i < triviaArray.length; i++) {
            result += "<tr><td>" + (i+1) + ")   " + triviaArray[i].question + "</td></tr>";
            var questionsAnswersArray = randomizeAnswers(triviaArray[i].incorrect_answers, triviaArray[i].correct_answer);

            for(var j = 0; j < questionsAnswersArray.length; j++){
                result += "<tr><td><input type='radio' name='answer" + i + "' id='answer" + i + j + "'/><span id='answerText" + i + j  + "' correct='" + questionsAnswersArray[j].correct +"'>" + questionsAnswersArray[j].ans + "</span></td></tr>";
            }

            result += "<tr><td><br><br></td></tr>";

        }
        result += "</table>"
        document.getElementById("resultTable").innerHTML = result;
        document.getElementById("resultTable").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("finishQuizButton").style.display = "block";

    } else {
        document.getElementById("resultTable").style.display = "none";
        document.getElementById("error").innerHTML = "ERROR. Please select a category, question type, and difficulty to continue. Click here to exit.";
        $("#error").click(function(){
            $("#error").hide('fast');
        });
        $("#createQuizButton").click(function(){
            $("#error").show('fast');
        });

        document.getElementById("finishQuizButton").style.display = "none";
    }
}

function randomizeAnswers(incorrect, correct){
    var allAnswersArray = [];
    if(incorrect.length == 1){
        allAnswersArray.push({ans: incorrect, correct: false});
        allAnswersArray.push({ans: correct, correct: true});
    } else {
        allAnswersArray.push({ans: incorrect[0], correct: false});
        allAnswersArray.push({ans: incorrect[1], correct: false});
        allAnswersArray.push({ans: incorrect[2], correct: false});
        allAnswersArray.push({ans: correct, correct: true});
    }

    console.log(allAnswersArray);
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

function gradeQuiz(rObject){
    var triviaArray = rObject.results;
    console.log(triviaArray);
    var answersArray = [];

    for(var i = 0; i < triviaArray.length; i ++) {
        console.log(triviaArray[i].correct_answer);
        var answerName = "answer" + i.toString();
        console.log(answerName);
        var AN = document.getElementsByName(answerName);
        console.log(AN);

        //Finds the selected answer
        for (var j = 0; j < AN.length; j++) {
            // var CA = "";
            if (AN[j].checked == true) {
                console.log(AN[j]);
                console.log(AN[j].id);
                var answer = AN[j].id;
                var answerValue = answer.substring(6, answer.length);
                console.log(answerValue);
                var correctID = "answerText"+answerValue;
                console.log(correctID);
                console.log(document.getElementById(correctID));
                var actuallyTheAnswerSpan = document.getElementById(correctID);
                var WINNER = actuallyTheAnswerSpan.attributes[1].value;
                console.log(WINNER);

                // Is the selected question equal to the correct answer?
                if (WINNER == "true") {
                    answersArray.push("Correct");
                } else {
                    answersArray.push("Incorrect");
                }
            }
        }

    }

    var answers = "<table id='answersShown' cellpadding=10>";
    answers += "<tr><td><br><br></td></tr>";

    for(var i = 0; i < answersArray.length; i ++){
        answers += "<tr><td>" + "Question " + (i+1) + ": " + answersArray[i] + "</td></tr>";
        answers += "<tr><td><br><br></td></tr>";
    }

    document.getElementById("answersTable").innerHTML = answers;
    document.getElementById("answersTable").style.display = "block";
    document.getElementById("finishQuizButton").style.display = "block";
}
