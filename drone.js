// Get the canvas element and its context for drawing
const canvas = document.getElementById('droneCanvas');
const ctx = canvas.getContext('2d');

// Drone class to manage the drone's state and behavior
class Drone {
  constructor(x, y) {
    // Initial position of the drone on the canvas
    this.x = x;
    this.y = y;

    // Dimensions of the drone
    this.width = 40;
    this.height = 20;

    // Color of the drone
    this.color = 'blue';

    // Initial speed, altitude, and yaw (rotation angle)
    this.speed = 0;
    this.altitude = 0;
    this.isFlying = false;
    this.yaw = 0; // Yaw is the rotation angle in degrees
  }

  // Method to take off the drone
  takeOff() {
    if (!this.isFlying) {
      this.isFlying = true;
      this.altitude = 10; // Set initial altitude on takeoff
      this.speed = 2; // Set initial speed
      console.log('Drone is taking off.');
    }
  }

  // Method to land the drone
  land() {
    if (this.isFlying) {
      this.isFlying = false;
      this.altitude = 0; // Reset altitude to 0
      this.speed = 0; // Stop the drone
      console.log('Drone is landing.');
    }
  }

  // Move the drone forward based on its yaw angle
  moveForward() {
    if (this.isFlying) {
      // Calculate the new position using trigonometry
      this.x += this.speed * Math.cos((this.yaw * Math.PI) / 180);
      this.y += this.speed * Math.sin((this.yaw * Math.PI) / 180);
      console.log(
        `Drone is moving forward. Position: (${this.x.toFixed(
          1
        )}, ${this.y.toFixed(1)})`
      );
    }
  }

  // Move the drone backward based on its yaw angle
  moveBackward() {
    if (this.isFlying) {
      // Calculate the new position using trigonometry
      this.x -= this.speed * Math.cos((this.yaw * Math.PI) / 180);
      this.y -= this.speed * Math.sin((this.yaw * Math.PI) / 180);
      console.log(
        `Drone is moving backward. Position: (${this.x.toFixed(
          1
        )}, ${this.y.toFixed(1)})`
      );
    }
  }

  // Move the drone left relative to its yaw angle
  moveLeft() {
    if (this.isFlying) {
      // Calculate the new position using trigonometry
      this.x += this.speed * Math.sin((this.yaw * Math.PI) / 180);
      this.y -= this.speed * Math.cos((this.yaw * Math.PI) / 180);
      console.log(
        `Drone is moving left. Position: (${this.x.toFixed(
          1
        )}, ${this.y.toFixed(1)})`
      );
    }
  }

  // Move the drone right relative to its yaw angle
  moveRight() {
    if (this.isFlying) {
      // Calculate the new position using trigonometry
      this.x -= this.speed * Math.sin((this.yaw * Math.PI) / 180);
      this.y += this.speed * Math.cos((this.yaw * Math.PI) / 180);
      console.log(
        `Drone is moving right. Position: (${this.x.toFixed(
          1
        )}, ${this.y.toFixed(1)})`
      );
    }
  }

  // Ascend the drone by increasing its altitude
  ascend() {
    if (this.isFlying) {
      this.altitude += 2;
      console.log(`Drone is ascending. Altitude: ${this.altitude} meters.`);
    }
  }

  // Descend the drone by decreasing its altitude
  descend() {
    if (this.isFlying && this.altitude > 0) {
      this.altitude -= 2;
      console.log(`Drone is descending. Altitude: ${this.altitude} meters.`);
    }
  }

  // Yaw (rotate) the drone to the left
  yawLeft() {
    if (this.isFlying) {
      this.yaw -= 5; // Rotate 5 degrees to the left
      console.log(`Drone is yawing left. Yaw: ${this.yaw} degrees.`);
    }
  }

  // Yaw (rotate) the drone to the right
  yawRight() {
    if (this.isFlying) {
      this.yaw += 5; // Rotate 5 degrees to the right
      console.log(`Drone is yawing right. Yaw: ${this.yaw} degrees.`);
    }
  }

  // Draw the drone on the canvas
  draw() {
    // Clear the canvas before drawing the drone
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the current context state
    ctx.save();

    // Move the origin to the center of the drone for proper rotation
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    // Rotate the drone according to its yaw angle
    ctx.rotate((this.yaw * Math.PI) / 180);

    // Set the drone's color and draw it as a rectangle
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Restore the context to its original state
    ctx.restore();
  }
}

// Create a new drone object at the starting position
const drone = new Drone(300, 200);

// Function to update the drone's position and redraw it
function update() {
  drone.draw();
  requestAnimationFrame(update); // Continuously update the canvas
}

// Event listeners for keyboard controls
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w': // Forward movement
      drone.moveForward();
      break;
    case 's': // Backward movement
      drone.moveBackward();
      break;
    case 'a': // Yaw left (rotate counterclockwise)
      drone.yawLeft();
      break;
    case 'd': // Yaw right (rotate clockwise)
      drone.yawRight();
      break;
    case 'ArrowUp': // Ascend (increase altitude)
      drone.ascend();
      break;
    case 'ArrowDown': // Descend (decrease altitude)
      drone.descend();
      break;
    case 'ArrowLeft': // Move left relative to yaw
      drone.moveLeft();
      break;
    case 'ArrowRight': // Move right relative to yaw
      drone.moveRight();
      break;
    case 't': // Takeoff
      drone.takeOff();
      break;
    case 'l': // Land
      drone.land();
      break;
  }
});

// Start the animation loop
update();
