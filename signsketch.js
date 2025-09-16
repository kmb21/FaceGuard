let video;
let canvas;
let input;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    input = createInput('');
    input.position(20, 65); // Position it just below the canvas
    input.size(200, 30);
    input.attribute('placeholder', 'Enter your name here');
}

function draw() {
    background(200);
    let x = (width - video.width) / 2;
    let y = (height - video.height) / 2;

    image(video, x, y, video.width, video.height);  // Display the current video frame
    push();
    fill('red');
    textSize(30);
    text("Press s to save photo", 20, 30);
    pop();
    
}

function keyPressed() {
    if (key === 's' || key === 'S'){
        if (input.value().trim().length <= 0) { 
        alert("Please enter a valid value for name")
         
        }else{
            // This saves the current canvas as an image
            saveCanvas(canvas, input.value().trim(), 'png');
            }
        }

}
