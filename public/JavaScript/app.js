$(document).ready(function () {

    $("#submit-option").on("click", function (event) {
        //prevent form submission
        event.preventDefault();

        var $option = $("#type").val();
        var pathVar = "";

        if ($option === "Check-In and Check-Out") {
            pathVar = "inOut";
        } else if ($option === "Check-Out") {
            pathVar = "out";
        } else {
            console.log("Error, incorrect value");
        }

        //assign a variable to our input
        var data = $("#number-form").val();

        //add each work order to the array
        var dataArray = data.split("\n");

        //create object to send
        var dataObject = {
            data: dataArray
        }

        console.log(dataObject.data)
        //send the array to our server
        $.ajax({
            method: "POST",
            url: "/api/workorders/" + pathVar,
            data: dataObject
        }).then(function (result) {
            $("#check-in-script").text(result);

        })
    });

})