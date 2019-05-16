// TO DO LIST
// 1. Get the MSFT URL FROM ZIA
// 2. Fill in your FIRST API CALL - MSFT with the URL from ZIA
// 3. Make questions clickable (see the trivia solution files on github)
// 4. Figure out how to clear the question block / answers with jQuery .empty() (see prior activities)

// PUSH Code to GITHUB and slack Mini / Zia to approve pull request
// Done for now! :)





//initializes your variables for the correct and incorrect count
var incorrect = 0
var correct = 0
// sets these values back on the html file - the h1 for correct and the h1 for incorrect
$("#incorrect").attr("value", incorrect)
$("#correct").attr("value", correct)

// this is grabbing the question block out of the HTML and putting here in the javascript file for you to use
var questionBlock = $(".question-block")

//your API URLS will go here
var queryGEODB = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0";
// var queryMSFT = 'your url will go here'
var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";



// YOUR FIRST API CALL - MSFT
    
// DESCRIPTION OF MSFT - need to get the microsft url - API to get the city of the image uploaded
$.ajax({
    url: uriBase,
    method: "GET"
  }).then(function (response) { 

    for (var i = 0; i < 1; i++){

//         var city = response.<WHATEVER THE STRUCTURE OF THE DATA IS>
//         var correctQuestion = $("<button>").text(otherAPICall)
//         correctQuestion.addClass("right")
//         questionBlock.append(correctQuestion)
//     }

//       console.log(response)


//   })
//   $(".wrong").on("click", function(){
//     incorrect++

//     $("#incorrect").attr("value", incorrect)

//   })



// YOUR SECOND API CALL - GEODB

// DESCRIPTION OF GEODB - see http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0 - API to get random list of cities
$.ajax({
    url: queryGEODB,
    method: "GET"
}).then(function (response) { 
    
    
    
    for (var i = 0; i< 3; i++){
        
        var city = response.data[i].city
        var incorrectQuestion = $("<button>").text(city)
        incorrectQuestion.addClass("wrong")
        questionBlock.append(incorrectQuestion)
    }
    
    console.log(response)
    
})

$(".wrong").on("click", function(){
    incorrect++
    
    //will change the #incorrectcorrect h1 textContent to var correct number
    $("#incorrect").attr("value", incorrect)

    //.empty() on the question block to clear the existing question out and then get more cities
})

$(".right").on("click", function(){
    corrrect++
    
    //will change the #correct h1 textContent to var correct number
    //.empty() on the question block to clear the existing question out and then get more cities
    $("#incorrect").attr("value", incorrect)
    
})