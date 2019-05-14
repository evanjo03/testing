//bring in our button object
var buttons = require("../buttons");
const { exec } = require("child_process");
var fs = require("fs");
var text = "";


//function that converts a number to script
function convert(number) {
    var macroText = "";
    for (var i = 0; i < number.length; i++) {
        switch (number[i]) {
            case '0':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[0].coords}, 1, 0)\r\n`
                break;
            case '1':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[1].coords}, 1, 0)\r\n`
                break;
            case '2':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[2].coords}, 1, 0)\r\n`
                break;
            case '3':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[3].coords}, 1, 0)\r\n`
                break;
            case '4':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[4].coords}, 1, 0)\r\n`
                break;
            case '5':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[5].coords}, 1, 0)\r\n`
                break;
            case '6':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[6].coords}, 1, 0)\r\n`
                break;
            case '7':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[7].coords}, 1, 0)\r\n`
                break;
            case '8':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[8].coords}, 1, 0)\r\n`
                break;
            case '9':
                macroText += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[9].coords}, 1, 0)\r\n`
                break;
        }
    }
    return macroText;
}

//this function has the initial script variables and sets up the initial segment of the call
function initial() {
    text +=
        `#include <AutoItConstants.au3>\r\nHotKeySet("{ESC}", "Terminate")\r\n
        Func Terminate()\r\n
        Exit\r\n
        EndFunc   ;==>Terminate\r\n`
}

//start the call
function makeCall() {
    //define our numbers for calling and entering pin
    var callNumber = convert("15165007776");
    var pin = convert("38883");

    //call button
    text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.callStart.coords}, 1, 0)\r\n`

    //wait for call
    sleep(1000);

    //dial ivr number
    text += callNumber;

    //hit call button
    text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.call.coords}, 1, 0)\r\n`

    //when call starts, select keypad button
    sleep(3500);
    text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.keypad.coords}, 1, 0)\r\n`

    //enter pin
    sleep(1500);
    hash();
    sleep(1500);
    text += pin;
    hash();
    sleep(1500);
    hash();
    sleep(1500);
    hash();
}


//=====================================functions to convert commonly used AutoIT methods==============
//wait a given amount of time (num = ms)
function sleep(num) {
    text += `Sleep(` + num + `)\r\n`;
}

//press the pound key
function hash() {
    text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.hash.coords}, 1, 0)\r\n`
}

//function to handle initial check in of work orders
function checkIn() {
    sleep(600);
    hash();
    sleep(3400);
    hash();
    sleep(2400);
    hash();
};

//function to handle checkout of work orders
function checkOut() {
    sleep(600);
    hash();
    sleep(2800);
    hash();
    sleep(1400);
    text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[1].coords}, 1, 0)\r\n`
    sleep(1300);
    hash();
    sleep(1300)
    hash();
    sleep(1300);
    text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.numberButtons[1].coords}, 1, 0)\r\n`
    sleep(3250);
    hash();
    sleep(2300);
    hash();
}

//====================================================================================================

//here is our actual routing
module.exports = function (app) {

    app.post("/api/workorders/:type", function (req, res) {

        //variable stores method (out or in/out)
        var method = req.params.type;
        
        //define our array
        var workOrders = req.body['data[]'];
        sleep(3000);
        //do our logic to turn the work orders into macro code
        initial();

        switch(method) {
            case "inOut":
            for (var i = 0; i < workOrders.length; i++) {
                makeCall();
                text += (convert(workOrders[i]));
                checkIn();
                text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.end.coords}, 1, 0)\r\n`
                sleep(3000);
                makeCall();
                text += (convert(workOrders[i]))
                checkOut();
                text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.end.coords}, 1, 0)\r\n`
                sleep(3000)
            }
    
            //return the instructions to the frontend
            fs.writeFile("test.au3", text, function (error) {
                if (error) throw error;
                console.log("You added to test.au3");
                exec("test.au3").unref();
                text = "";
            });
            break;
            case "out":
            for (var i = 0; i < workOrders.length; i++) {
                makeCall();
                text += (convert(workOrders[i]))
                checkOut();
                text += `MouseClick ( $MOUSE_CLICK_LEFT, ${buttons.mscButtons.end.coords}, 1, 0)\r\n`
                sleep(3000)
            }
            //return the instructions to the frontend
            fs.writeFile("test.au3", text, function (error) {
                if (error) throw error;
                console.log("You added to test.au3");
                exec("test.au3").unref();
                text = "";
            });
            break;
            default: 
            console.log("Error");
        }

        
    })
}