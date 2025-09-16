let myShader;
let showAnimation = true;
let fireworks = [];
let fireworkInterval = 5; // Create a new firework every 60 frames
let frameSinceLastFirework = 0;


function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("shader.vert", "shader.frag");
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  textScreen = createGraphics(windowWidth,windowHeight)
  textScreen.fill('white');  
  textScreen.textSize(50);
  textScreen.textFont('Lobster')
  textScreen.textAlign(CENTER, CENTER);  

  textScreen.text("KEITH IS THE BEST", textScreen.width / 2, textScreen.height / 2);

  const params = new URLSearchParams(window.location.search);
  const name = params.get('name'); // 'name' should match the query parameter

  if (name) {
    alert('Welcome ' + name);
  }
}

function draw() {
  if (showAnimation) {
    background(0);
    shader(myShader);
    myShader.setUniform("uFrameCount", frameCount);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.005);
    sphere(width / 5, 200, 200);
    textScreen.text("", width / 2, height / 2)
  } else {
    background(0);
     push(); //isolating transformations
    translate(-width / 2, -height / 2); //Adjusting for WEBGL's center coordinate system
    image(textScreen, 0, 0);
    pop();

    //Disabling depth test to ensure particles render on top of the text
    drawingContext.disable(drawingContext.DEPTH_TEST);
    if (frameSinceLastFirework >= fireworkInterval) {
        fireworks.push(new Firework(random(width), random(height * 0.5)));
        frameSinceLastFirework = 0; // Reset counter
      } else {
        frameSinceLastFirework++;
      }
    updateFireworks();

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    showAnimation = !showAnimation;
    if (!showAnimation) {
        //Resets fireworks generation when switching to text and fireworks view
        frameSinceLastFirework = fireworkInterval; // Immediate firework on switch
      }
}

function updateFireworks() {
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].display();
      if (fireworks[i].isDone()) {
        fireworks.splice(i, 1);
      }
    }
  }

  //Defines a simple Firework class using p5.js
  class Firework {
    constructor(x, y) {
      this.position = createVector(x - width / 2, y - height / 2);
      this.particles = [];
      for (let i = 0; i < 100; i++) {
        this.particles.push(new Particle(this.position));
      }
    }

    update() {
      this.particles.forEach(p => p.update());
    }

    display() {
      this.particles.forEach(p => p.display());
    }

    isDone() {
      return this.particles.every(p => p.isDead());
    }
  }

  class Particle {
    constructor(position) {
      this.position = position.copy();
      this.velocity = p5.Vector.random2D().mult(random(1, 5));
      this.lifespan = 255;
    }

    update() {
      this.position.add(this.velocity);
      this.velocity.mult(0.95); // Simulate some air resistance
      this.lifespan -= 4;
    }

    display() {
      push();
      translate(this.position.x, this.position.y);
      noStroke();
      fill(255, this.lifespan);
      circle(0, 0, 8);
      pop();
    }

    isDead() {
      return this.lifespan < 0;
    }
  }
