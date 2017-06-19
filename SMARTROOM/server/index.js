var express = require('express');
var five = require('johnny-five');
var app = express();
// 
var board = new five.Board();
let value = 0;
// 
board.on("ready", function () {
    // 
    var button = new five.Button(2),
        blueLed = new five.Led(4),
        greenLed = new five.Led(3),
        redLed = new five.Led(5),
        myMotor = new five.Motor(6),
        lcd = new five.LCD({
            pins: [7, 8, 9, 10, 11, 12]
        }),
        myMotor;
    // 
    var ledon = false;
    lcd.useChar("sbox");
    // 
    var temp = new five.Temperature({
        pin: "A0",
        controller: "TMP36"
    });

    // "up" the button is released
    button.on("up", function () {
        console.log("Temperature en cours..");

        if (ledon) {
            // console.log('ledon', ledon);
            // Shutt Dwon 
            ledon = false;
            greenLed.off();
            blueLed.off();
            redLed.off();
            board.wait(5000, function () {
                myMotor.stop();
            });
            lcd.off();

        } else {
                        var switchOn =false;
                        var switchOff =false;
            ledon = true;
            greenLed.on();
            lcd.on();
            var readTemperature = function () {
                temp.once('data', function () {

                    if (ledon) {

                        app.get('/switchOff', function(req, res) {
                            switchOff=true;
                            // switchOn=true;
                            myMotor.stop();
                            console.log('switchOff',switchOff);
                            res.send('switch -> Off');
                        });
                        app.get('/switchOn', function(req, res) {
                            switchOn=true;
                            // switchOff=true;
                            myMotor.start();
                            console.log('switchOn',switchOn);
                            res.send('switch -> On');
                        });
                        var t = parseInt(this.celsius);
                        if (t >= 28) {
                            redLed.on();
                            blueLed.off();
                            if(switchOff==false){
                                myMotor.start();
                            }
                            // 

                        } else if (t < 28) {
                            redLed.off();
                            blueLed.on();
                            if(switchOn==false){
                                myMotor.stop();
                            }
                            // board.wait(2000, function () {
                                // myMotor.stop();
                            // });
                        }

                        if (ledon) {
                            value = t;
                            console.log("\ndata --------------> %j °c", t);
                            lcd.clear().print(t + " :sbox:c");

                        }
                    }

                });
            }

            setInterval(readTemperature, 5000);

        }

    });

});

// routes
// app.get('/tmp', function(req, res) {
//     if(value==0){
//         res.send('sensor does not fetch data :' + value);
//     }
//     res.send(value);

// });
app.get('/tmp', function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ val: value }));

});
// app.get('/switchOn', function(req, res) {
//       res.send('switch -> :' + value);
// });
// app.get('/switchOff', function(req, res) {
//       res.send('switch -> :' + value);
// });
// 
app.listen(3001);
console.log('Listening on port 3001...');