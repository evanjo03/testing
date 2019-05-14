//reference the location of the 'one' button
var x = 1047        //2330;
var y = 310        //311;

//scale of buttons (px)
var right = 80;
var down = 40;

//our button array
var numberButtons = [
    zero = {
        coords: `${x + right}, ${y + 3 * down}`
    },
    one = {
        coords: `${x}, ${y}`
    },
    two = {
        coords: `${x + right}, ${y}`
    },
    three = {
        coords: `${x + 2 * right}, ${y}`
    },
    four = {
        coords: `${x}, ${y + down}`
    },
    five = {
        coords: `${x + right}, ${y + down}`
    },
    six = {
        coords: `${x + 2 * right}, ${y + down}`
    },
    seven = {
        coords: `${x}, ${y + 2 * down}`
    },
    eight = {
        coords: `${x + right}, ${y + 2 * down}`
    },
    nine = {
        coords: `${x + 2 * right}, ${y + 2 * down}`
    }
]

//all other buttons
var mscButtons = {
    callStart : {
        coords: `106, 227`//`1400, 230`
    },
    hash : {
        coords: `1215, 425`//`2500, 430`
    },
    call : {
        coords:  `1045, 473` //`2330, 475`
    },
    keypad : {
        coords: `543, 226`//`1800, 230`
    },
    end : {
        coords: `1232, 231` //`2496, 224`
    }
}

var buttons = {
    numberButtons,
    mscButtons
};

module.exports = buttons;