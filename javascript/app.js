var topics = ["cat", "dog", "elephant"];
for (var i = 0; i < topics.length; i++) {
  console.log(topics[i]);
  appendButton(i);
}
for (var i = 0; i < topics.length; i++) {
  bindButtonClick(i);
}
$("#searchButton").on("click", function(e) {
  var newSearchItem = $("#animal-input")
    .val()
    .trim();
  console.log("newSearchItem =" + newSearchItem);

  topics.push(newSearchItem);
  appendButton(topics.length - 1);
  bindButtonClick(topics.length - 1);
});
function appendButton(arrayIndex) {
  $("#topicsButton").append(
    "<button id='buttonId_" +
      arrayIndex +
      "'  data-topicname='" +
      topics[arrayIndex] +
      "'  >" +
      topics[arrayIndex] +
      "</button>"
  );
  // var a = $("<button>");
  // a.addId("buttonID");
  // a.attr("");
} //end appendButton fn
function renderTopic(topicName) {
  console.log("topicName 1.1 =" + topicName);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=h2h7Of7jv8OXaipzmvwnTI9y0BcAsv1B&limit=10&q=" +
    topicName;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.dir(response);
    var objectArray = response.data;
    for (var i = 0; i < objectArray.length; i++) {
      var topicData = objectArray[i];
      // console.log("first item = " + topicData.slug);
      $("#imagesDiv").prepend(
        "<img onclick='swapImage(this)' src='" +
          topicData.images.downsized_still.url +
          "' data-nonstill='" +
          topicData.images.downsized.url +
          "' data-still='" +
          topicData.images.downsized_still.url +
          "' data-state='still'  >"
      );
      console.log(this);
      $("#imagesDiv").prepend("<p>Rating: " + topicData.rating + "</p>");
    }
  }); //End API cal
} //End fn

function bindButtonClick(arrayIndex) {
  $("#buttonId_" + arrayIndex).on("click", function(e) {
    var btnObj = e.currentTarget;
    var selectedTopicName = $(btnObj).attr("data-topicname");
    console.log("button data-topicname=" + selectedTopicName);
    renderTopic(selectedTopicName);
  });
}

function swapImage(imgObject) {
  console.dir(imgObject);
  var state = $(imgObject).attr("data-state");

  if (state === "still") {
    $(imgObject).attr("src", $(imgObject).attr("data-nonstill"));
    $(imgObject).attr("data-state", "nonstill");
  } else {
    $(imgObject).attr("src", $(imgObject).attr("data-still"));
    $(imgObject).attr("data-state", "still");
  }
} //end swapImage fn

//
// 4
//
// undefined
//
