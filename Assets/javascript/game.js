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
var imgUrlList = [
    'https://expatorama.files.wordpress.com/2015/04/img_4215-1.jpg',
    'http://www.visittnt.com/blog/wp-content/uploads/2016/06/o-TAJ-MAHAL-facebook.jpg',
    'http://www.vigoenfotos.com/paris/imagenes/paris/notre_dame/g_vigoenfotos_3404p.jpg',
];
var imgUrlIndex = 0;
var analyzedData;
var currentImageQuest;

// making an api call to microsoft computer vision API 
function processRemoteImage(imgUrl) {
    var subscriptionKey = subKey.key;
    console.log("subscriptionKey : " + subscriptionKey);
    //console.log("imgUrl : " + imgUrl);
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
    // var sourceImageUrl = document.getElementById("inputImage").value;
    //var sourceImageUrl = imgUrl;
    //document.querySelector("#sourceImage").src = imgUrl;

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
        data: '{"url": ' + '"' + imgUrl + '"}',
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
            //return analyzedData;
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
    $('#analyzeImg').click(function () {
        var sourceImageUrl = $("#inputImage").val();

        document.querySelector("#sourceImage").src = sourceImageUrl;

        //invoke the processRemoteImage function
        processRemoteImage(sourceImageUrl);
        //wait for two seconds until the API call is completes
        setTimeout(function () {
            //console.log(analyzedData.landmark);
            //rendering the landmark of the image the API gives
            $("#landmark").text('Landmark: ' + analyzedData.landmark);
            //rendering the description of the image the API gives
            $("#description").text('Description: ' + analyzedData.description);
        }, 3000);
    });

    //handling click event for start game button
    $('.startGame-child').on('click', function () {
        $('#mainDiv').hide();
        $('#questId').show();
        $('#questId').css("display", "grid");
        $('#questId').height("800px");
        //retrieving the image url from the list 
        var currentImgUrl = imgUrlList[imgUrlIndex];
        console.log('currentImgUrl : ' + currentImgUrl);
        imgUrlIndex++;
        //sending a request to the api for the current image
        processRemoteImage(currentImgUrl);

        // waiting 3 seconds for the api call to finish
        setTimeout(function () {
            currentImageQuest = new GameQuestionAnswer(currentImgUrl, analyzedData.landmark);
            document.querySelector("#currentImage").src = currentImageQuest.questionImgUrl;
        }, 3000);

        // waiting 3 seconds to show the answer, which is temporary
        setTimeout(function () {
            $('.scoreChoice').html(currentImageQuest.answer);
        }, 3000);




        
    })
})

