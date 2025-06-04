function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let truckX;
let truckY;
let truckSpeed;
let fruits = [];
let fruitCount;
let score;
let cityX;
let cityY;
let fieldX;
let fieldY;
let gameStarted;
let message;

function setup() {
  createCanvas(600, 400);
  truckX = 50;
  truckY = height / 2;
  truckSpeed = 3;
  fruitCount = 5;
  score = 0;
  cityX = width - 50;
  cityY = height / 2;
  fieldX = 50;
  fieldY = height / 2;
  gameStarted = false;
  message = "Pressione ESPAÇO para iniciar a entrega!";

  // Initialize fruits in the field area
  for (let i = 0; i < fruitCount; i++) {
    fruits.push(new Fruit(random(fieldX - 20, fieldX + 80), random(fieldY - 50, fieldY + 50)));
  }
}

function draw() {
  background(200);

  // Draw field
  fill(0, 150, 50);
  rect(0, 0, 150, height);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Campo", 75, height / 2);
  textAlign(LEFT, BASELINE);

  // Draw city
  fill(100);
  rect(width - 150, 0, 150, height);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Cidade", width - 75, height / 2);
  textAlign(LEFT, BASELINE);

  // Draw truck
  fill(50);
  rect(truckX - 20, truckY - 10, 40, 20); // Body
  fill(80);
  ellipse(truckX - 10, truckY + 10, 15, 15); // Wheel 1
  ellipse(truckX + 10, truckY + 10, 15, 15); // Wheel 2

  if (gameStarted) {
    // Truck movement
    if (keyIsDown(RIGHT_ARROW) && truckX < width - 70) {
      truckX += truckSpeed;
    }
    if (keyIsDown(LEFT_ARROW) && truckX > 70) {
      truckX -= truckSpeed;
    }
    if (keyIsDown(UP_ARROW) && truckY > 10) {
      truckY -= truckSpeed;
    }
    if (keyIsDown(DOWN_ARROW) && truckY < height - 10) {
      truckY += truckSpeed;
    }

    // Draw and check for fruit collection
    for (let i = fruits.length - 1; i >= 0; i--) {
      fruits[i].display();
      if (dist(truckX, truckY, fruits[i].x, fruits[i].y) < 25) {
        fruits.splice(i, 1);
        score++;
      }
    }

    // Display score
    fill(0);
    textSize(18);
    text("Frutas Coletadas: " + score + "/" + fruitCount, 20, 30);

    // Check if all fruits are collected and truck reached the city
    if (fruits.length === 0 && truckX > cityX - 50) {
      message = "Entrega Concluída! Conexão Festejada!";
      textSize(24);
      textAlign(CENTER);
      text(message, width / 2, height / 2);
      textAlign(LEFT, BASELINE);
      noLoop();
    } else if (fruits.length === 0) {
      fill(0);
      textSize(18);
      textAlign(CENTER);
      text("Pegue o caminhão para a cidade!", width / 2, 50);
      textAlign(LEFT, BASELINE);
    } else if (truckX > cityX - 50) {
      fill(0);
      textSize(18);
      textAlign(CENTER);
      text("Ainda há frutas no campo!", width / 2, 50);
      textAlign(LEFT, BASELINE);
    }
  } else {
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(message, width / 2, height / 2);
    textAlign(LEFT, BASELINE);
  }
}

function keyPressed() {
  if (keyCode === 32) { // Spacebar
    gameStarted = true;
    message = "";
  }
}

class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.color = color(255, 0, 0); // Red fruit
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}