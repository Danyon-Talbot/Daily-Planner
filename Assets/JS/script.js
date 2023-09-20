//Wraps the the code in a call to JQuery to ensure that the HTML elements load before running
$(function () {
  //Adds event listener on click to the saveBtn
  $(".saveBtn").on("click", function() {
    //Grabs the parent ID of the saveBtn and assigns it the hourID var
    var hourID = $(this).parent().attr("id");
    //Grabs the user input from the textanswer box and assigns it the userInput var
    var userInput = $(this).siblings(".user-input").val();

    //Assigns the userInput variable to an object
    var saveCalendar = {
      calInfo: userInput
    };

    //Saves the object using the hourID as it's title and saveCalendar as it's content
    localStorage.setItem(hourID, JSON.stringify(saveCalendar));
    
    //Displays confirmation message upon save
    $("#saveConfirmText").text("Calendar Saved!");

    //Removes confirmation message after 3 seconds
    setTimeout(function() {
      $("#saveConfirmText").text("");
    }, 3000);

  })


  //Grabs the "time-block" class and iterates over them
  $(".time-block").each(function() {
    //Grabs the current hour in 24hr format and parses it to ensure it is an integer
    var currentHour = parseInt(dayjs().format("H"));
    //calls to the "hour-x" id in the div element
    var divID = $(this).attr("id");

    //parses the string to return the integer
    var splitDivID = parseInt(divID.split("-")[1]);

      if (splitDivID === currentHour) {
        $(this).attr("class", "row time-block present");
      } else if (splitDivID < currentHour) {
        $(this).attr("class", "row time-block past");
      } else if (splitDivID > currentHour) {
        $(this).attr("class", "row timeblock future");
      } else {
        console.log("ERROR");
      }
  })

  //Grabs the user input textanwer box and iterates over them
  $(".user-input").each(function() {
    var key = $(this).parent().attr("id");
    var storedInfo = localStorage.getItem(key);

    //Checks for stored info, parses it, then displays it in the textanwer box
    if (storedInfo) {
      var pulledData = JSON.parse(storedInfo);
      var storedHourInfo = pulledData.calInfo;
      $(this).val(storedHourInfo);
    }
  })
  
  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();
  var currentDay = today.format("dddd, MMMM DD");
  $("#currentDay").text(currentDay);
});


