$(document).ready(function () {

    //button starts the macro
    $("#submit-option").on("click", function (event) {
        //prevent form submission
        event.preventDefault();

        //which type of IVR is to be completed?
        var $option = $("#type").val();

        //path to add to routing
        var pathVar = "";

        //setting pathVar
        if ($option === "Check-In and Check-Out") {
            pathVar = "inOut";
        } else if ($option === "Check-Out") {
            pathVar = "out";
        } else {
            alert("Please fill out the entire form.")
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
        if (!data) {
            alert("Please enter in WO numbers.");
        } else {

            $.ajax({
                method: "POST",
                url: "/api/workorders/" + pathVar,
                data: dataObject
            }).then(function (result) {
                console.log(result);
            });
        }
    });

})