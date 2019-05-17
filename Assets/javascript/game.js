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
    'http://designlike.com/wp-content/uploads/2011/12/Sagradafamilia00002482731-600x823.jpg',
    'https://cdn-images-1.medium.com/max/1600/0*89meqThuTSM7L0fL.jpg',
    'http://zee4u.files.wordpress.com/2011/03/petronis.jpg',
    'http://www.therichest.com/wp-content/uploads/5th.jpg',
    'https://oddstuffmagazine.com/wp-content/uploads/2012/04/1294.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/97/e6/6e/97e66e7cef48a4ebe73a113c31f373b5.jpg',
    'https://explorerspassage.com/wp-content/uploads/2016/11/Bridge.jpg',
    'http://www.bankableinsight.com/wp-content/uploads/2015/08/5389424262_af666a6f45_z.jpg',
    'https://3.bp.blogspot.com/-I-UYJWhrchA/Urs5pxZ1pZI/AAAAAAAAAvs/uKfQkJ7vyOM/s1600/bell-rock-in-sedona-306656hvvvvvv.jpg',
    'https://expatorama.files.wordpress.com/2015/04/img_4215-1.jpg',
    'http://www.visittnt.com/blog/wp-content/uploads/2016/06/o-TAJ-MAHAL-facebook.jpg',
    'http://www.vigoenfotos.com/paris/imagenes/paris/notre_dame/g_vigoenfotos_3404p.jpg',
    'https://www.casino.org/news/wp-content/uploads/2014/10/Tokyo-2020-Olympics-casino.jpg',
    'http://1.bp.blogspot.com/-fpl8BSpcznM/T_qcidqZwxI/AAAAAAAARmg/ZYx-PvO_vqk/s1600/Italy+2.jpg',
    'http://1.bp.blogspot.com/_I7rL3-gcB4Q/TJ266zh5bfI/AAAAAAAAAAw/6KNtm7ha9-M/s1600/76363-050-9741E61E.jpg',
];
var presidentUrlList = [
    'https://tse2.mm.bing.net/th?id=OIP.STWdg623tfIdcwNSfaMvbAHaE8&pid=Api&P=0&w=259&h=174',
    'https://i.dailymail.co.uk/i/pix/2017/05/14/15/404D44A500000578-4504038-New_French_President_Emmanuel_Macron_delivers_a_speech_during_hi-a-76_1494770439904.jpg',

] 
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
        }, 9000);




        
    })
})

