$(document).ready(function () {

    $("#submit-check-in").on("click", function (event) {
        //prevent form submission
        event.preventDefault();

        //assign a variable to our input
        var data = $("#check-in-form").val();

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
            url: "/api/workorders",
            data: dataObject
        }).then(function (result) {
            $("#check-in-script").html(result);
        })
    });

    $("#submit-check-out").on("click", function (event) {
        //prevent form submission
        event.preventDefault();

        //assign a variable to our input
        var data = $("#check-out-form").val();

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
            url: "/api/workorders",
            data: dataObject
        }).then(function (result) {
            $("#check-out-script").html(result);
        })
    });

})