$( document ).ready(function() {
  });



var body = document.body

// *********************************************************************Home page
// Home elements

var homeTitle = $("<header id='title'>Coding Quiz Challenge</header>")
var welcomeText = $("<p id = 'welcomeText'>Welcome to the Coding Quiz Challenge, click the button below to start the quiz.</p>")
var startBut = $("<button id='start'>Start Quiz!</button>")
var viewScores = $("<button id='viewScores' class = 'offset-md-3' onclick = 'scoreboardLoad()'>View Highscores</button>")
var clearScores = $("<button id='clearScores' onclick = 'localStorage.clear(); location.reload()'>Clear Scores</button>")
function loadHome () {
  document.body.innerHTML = "";
  $(body).append(viewScores)
  $(body).append(homeTitle)
  $(body).append(welcomeText)
  $(body).append(startBut)
}
loadHome()
$("button").addClass("btn btn-primary")

homeBut = $("<button id='home' class = 'offset-md-3'>Home</button>").on("click", function () {
  loadHome()
})

// ********************************************************************Quiz start
// Start quiz and timer upon clicking the start button

startBut.on("click", function() {
document.body.innerHTML = "";
$(body).append(viewScores)
$(body).append("<p id = 'timerDisplay' class = 'offset-md-3'>Time left:    <span id='countdowntimer'>    </span></p>")
runQuiz (myQASets)
startTimer()

$(body).append("<hr class ='col-md-6 offset-md-3' ><p id = 'feedback'></p>")

});

// Timer function
// Setting play duration to 180 seconds (3 minutes)
function startTimer(){
  time = 180;
  console.log('timer suppose to go')
  var timerDisplay = document.getElementById("countdowntimer")
  var timer = setInterval(function(){
      time--;
      var minutes = parseInt(time / 60, 10);
      var seconds = parseInt(time % 60, 10);
      timerDisplay.innerHTML = minutes + ":" +seconds;
      console.log("DFAFDSAFDAS")
      if (seconds < 10) {
        timerDisplay.innerHTML = minutes + ":" + "0" + seconds;
      } else {
        timerDisplay.innerHTML = minutes + ":" +seconds;
      }
      if (time <= 0) {
          clearInterval(timer);
          alert("Time is up!")
          document.body.innerHTML = "";
          nameAndScore(score)
      }
      $(".lastAns").on("click", function () {
        clearInterval(timer);
        document.body.innerHTML = "";
          nameAndScore(score)
        
     })
  }, 1000);
}

// Quiz questions    
var myQASets= [ {
  question: "1. The following expression : 'typeof(3);' will return:",
  answers: {
    1: "string",
    2: "number",
    3: "true"
  },
  correctAnswer: "number"
},
{
  question: "2. The following expression : 'NaN === NaN;' will return:",
  answers: {
    1: "NaN",
    2: "true",
    3: "false"
  },
  correctAnswer: "false"
},
{
  question: "3. The following expression : 'Math.pow(3,3);' will return:",
  answers: {
    1: "6",
    2: "27",
    3: "3.3",
    4: "9"
  },
  correctAnswer: "27"
},
{
  question: "4. Which of the following tags is used to insert a blank line?",
  answers: {
    1: "<br>",
    2: "<h1>",
    3: "<hr>",
    4: "<p>"
  },
  correctAnswer: "<br>"
},
{
  question: "5. The ___ tag set provides information to the browser about your webpage including the author name and keywords.",
  answers: {
    1: "<html></html>",
    2: "<body></body>",
    3: "<style></style>",
    4: "<meta></meta>"
  },
  correctAnswer: "<meta></meta>"
},
{
  question: "6. What does CSS stand for?",
  answers: {
    1: "Custom Style Sheets",
    2: "Customizable Style Sheets",
    3: "Cascading Style Sheets",
    4: "Computer Style Sheets"
  },
  correctAnswer: "Cascading Style Sheets"
},
{
  question: "7. The # symbol specifies that the selector is?",
  answers: {
    1: "id",
    2: "tag",
    3: "class",
  },
  correctAnswer: "id"
},
{
  question:  "8. Which of the following is true about variable naming conventions in JavaScript??",
  answers: {
    1: "You should not use any of the JavaScript reserved keyword as variable name",
    2: "JavaScript variable names should not start with a numeral (0-9)",
    3: "Both of the above",
    4: "None of the above"
  },
  correctAnswer: "Both of the above"
}];

// Score
var score = 0;
// Create question and answer option diplay (after clicking on the start button)
function runQuiz(quiz) {
// var answerList = [];
// for (var i =0; i <= currentSet.answers; i++) {
//   answerList [i] = currentSet.answers.[i]
// }

  var s = 0;
  currentSet = quiz [s]
  var questionDisplay = $("<div class = 'offset-md-4'>")
  questionDisplay.text (currentSet.question)
  $(body).append(questionDisplay)
  var answersOptions = $("<div class = 'offset-md-4'> <div>")
  $(body).append(answersOptions)

//Create a button for each option
  // for (var i = 0; i <= currentSet.answers; i++) {
  //   console.log("sdsadadddddd")

  displaySet()
  function displaySet (){
    currentSet = quiz [s]
    questionDisplay.text (currentSet.question)
    $.each(currentSet.answers, function (x,y) {
      var optionBut = $("<button>").text(y)
      var ansContainer = $("<div></div>")
      $(optionBut).on("click", function () {
        var feedbackMessage = $("#feedback")
        if ( y === currentSet.correctAnswer) {
          feedbackMessage.text("Correct!")
          score += 10
        } else {
          feedbackMessage.text("Incorrect!")
          time -= 40;
        }
      })
      ansContainer.append(optionBut)
      answersOptions.append(ansContainer)
      
      console.log(y)
      console.log(currentSet.correctAnswer)
      if (y !== currentSet.correctAnswer) {
        $(optionBut).attr("class", "wrongChoice")
      }
      optionBut.on("click", function () {nextQ()})
      if (s == quiz.length - 1) {
        $(optionBut).attr("class","wrongChoice lastAns")
      }
      }
    )
  }
 



  function nextQ() {
    if (s < quiz.length - 1) { 
    s++
    currentSet = quiz [s]
    answersOptions.empty()
    displaySet()
    console.log(currentSet.correctAnswer)
    
  }
}
}



// Submit button
console.log(localStorage.length)
var playerName = "";
if (localStorage.length == 0) {
var nameOrder = localStorage.length;
var scoreOrder = localStorage.length;
} else {
  nameOrder = localStorage.length-1;
  scoreOrder = localStorage.length;
}

function nameAndScore () {
  var getName = $("<input id = 'nameInput'></input>")
  getName.attr("value", "")
  var subm = $("<button id = 'submitPlay'>Submit Result</button>")
  var yourScore =  $("<p class = 'offset-md-4'> Your final score is: " + score + "</p>")
  $(body).append (yourScore)
  $(body).append ("<span class = 'offset-md-4'></span>")
  $("span").append("Enter initials: ").append(getName)
  $(body).append (subm)
  console.log("dafdafdsafdsa")
  $("#submitPlay").on("click", function () { 
    console.log(nameOrder)
    console.log(scoreOrder)
    if (getName.val() === "") {
      getName.val("-")
    }
    var playerName = getName.val()
    nameOrder == 0 ? nameOrder +=1 : nameOrder +=2; 
    scoreOrder += 2
    console.log(nameOrder)
    console.log(scoreOrder)
    localStorage.setItem (nameOrder,playerName)
    localStorage.setItem (scoreOrder,score)
    scoreboardLoad()
    score = 0;
  } )

}

// Scoreboard
function scoreboardLoad() {
  document.body.innerHTML = "";
//Button to return home page
  $(body).append(homeBut)
  $(body).append(clearScores)
  $(body).append ("<table id = 'scoreboard' class= 'table table-striped offset-md-3' ></table>");
  var scoreboard = $("#scoreboard");
  var thead = $("<thead>")
  var tbody = $("<tbody>")
  var headerRow = $("<tr></tr>");
  var userName = $("<th>Name</th>");
  var userScore = $("<th>Score</th>");
  
  $(scoreboard).append (thead)
  $(scoreboard).append (tbody)
  $(thead).append (headerRow)
  $(headerRow).append(userName);
  $(headerRow).append(userScore);
  for (i=1; i<=localStorage.length;i += 2) {
    var row = $("<tr class = 'resultRow' scope='row'></tr>")
    $(tbody).append (row);
    var storedName = $("<td class = 'storedName'>" + localStorage.getItem (i) + "</td>")
    var storedScore = $("<td class = 'storedScore'>"+ localStorage.getItem (i+1) + "</td>")
    row.append(storedName)
    row.append(storedScore)
    
  }
}

// Clear scoreboard

// Show answer contents on buttons
// QA set count/index
var setCount = 0;

// Function setting QA set count to zero
function setToZero() {
  startBut.addEventListener("click", function(){setCount = 0});
}

// Next question
// var i = 0
// var currentSet = ""

// // Function to check answer
// $("[class*='choice']").click(function() {
//   var selection = $(this).val();
//   console.log(selection)
// })



// x = document.getElementsByClassName("choice")
// $.each(currentSet.answers, function(index, value) {
//   if (currentSet.correctAnswer === value) {
//     alert("CORRECT")
//   }
// })


