/** Business logic area **/

// constructor function ResponseModel
function ResponseModel(landmark, description) {
    this.landmark = landmark;
    this.description = description;
}

// constructor function for GameQuestionAnswer
function GameQuestionAnswer(questionImgUrl, answer, options) {
    this.questionImgUrl = questionImgUrl;
    this.answer = answer;
    this.options = options;
}

var analyzedData;
// making an api call to microsoft computer vision API 
function processRemoteImage() {
    var subscriptionKey = "4659af4d19134df99818457bbe631053";
    var landmark;
    var description;
  

    // You must use the same Azure region in your REST API method as you used to
    // get your subscription keys. For example, if you got your subscription keys
    // from the West US region, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the "westus" region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Make the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
    .done(function (data) {
            // Show formatted JSON on webpage.
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));

            if (data.description.captions.length > 0) {
                description = data.description.captions[0].text;
                //$("#description").html(description);
            }
            var landmarks = data.categories[0].detail.landmarks;
            console.log(landmarks);
            if (landmarks !== undefined && landmarks.length > 0) {
                landmark = landmarks[0].name;
            }
//debugger
            // console.log('landmarks: ' + landmarks);
            // console.log('landmark :' + landmark);
            // console.log('description : ' + description);

            //creating an instance of ResponseModel
            analyzedData = new ResponseModel(landmark, description);
           // console.log(analyzedData);
           //returning the ResponseModel instance
            return analyzedData;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " :
                errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" :
                jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
};

/** UI logic area **/
$(function () {
    console.log('hi');
    //handling the click event of analyeImg button
    $('#analyzeImg').click(function() {
      //invoke the processRemoteImage function
        processRemoteImage();
        //wait for two seconds until the API call is completes
        setTimeout(function(){
            console.log(analyzedData.landmark);
            //rendering the landmark of the image the API gives
            $("#landmark").text('Landmark: ' + analyzedData.landmark);
            //rendering the description of the image the API gives
            $("#description").text('Description: ' + analyzedData.description);
        }, 2000);
    });
})

// Timer function
var timeLeft = 20;
var runrun;

function loseTime() {

    timeLeft--;

    document.getElementById("displayTimeLeft").innerHTML = timeLeft;

    if (timeLeft < 1) { gameOver(); }
}

function gameLoad() {

    document.getElementById("startWrapper").style.display = "none";
    document.getElementById("gameWrapper").style.display = "block";

    runrun = setInterval(function () { loseTime(); }, 1000);
}
function gameOver() {

    clearInterval(runrun);
    document.getElementById("displayTimeLeft").innerHTML = "Loser!";

    document.getElementById("gameWrapper").innerHTML = t;
}