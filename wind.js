
//import readline
const readline = require("readline");

//create interface
const rl = readline.createInterface( 
    {
        input: process.stdin,
        output: process.stdout
    }
)



const MAX_WIND_SPEED = 500;

//get speed
rl.question("Enter wind speed (km/h): ", function(speed) {  

    //validate speed
    speed = Number(speed);
    if (isNaN(speed) || speed < 0 || speed > MAX_WIND_SPEED) {
        console.log("Invalid wind speed.  Must be 0 - " + MAX_WIND_SPEED + " km/h.");
        rl.close();
        return;
    }

    //get direction
    rl.question("Enter wind direction (0-360°): ", function(direction) {


        //validate direction
        direction = Number(direction);
        if (isNaN(direction) || direction < 0 || direction > 360) {
            console.log("Invalid wind direction.  Must be 0 - 360°");
            rl.close();
            return;
        }

        //display data
        console.log("\nWind");
        console.log("\tspeed: " + speed + " km/h");
        console.log("\tdirection: " + direction);

        rl.close();
    })
})
