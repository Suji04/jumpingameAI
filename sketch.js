const TOT = 250;
let bots = [];
let savedBots = [];
let bars = [];
let counter = 0;
let slider;
let gen = 0;
let maxScore = 0;
let genList = [];
let maxScoreList = [];

function setup() {
  createCanvas(windowWidth, 3*windowHeight/4);
  tf.setBackend('cpu');
  slider = createSlider(1, 10, 5);
  slider.position(windowWidth/2 - 150, 4*windowHeight/5);
  slider.addClass("slide");
  for (let i = 0; i < TOT; i++) {
    bots[i] = new Bot();
  }
}

function draw(){
  for (let n = 0; n < slider.value(); n++){

    if (counter % 70 == 0){
      pos = random(0,250);
      b = new Bar(pos);
      bars.push(b);
    }

    counter++;

    for (let i = bars.length - 1; i >= 0; i--){
      bars[i].update();
      for (let j = bots.length - 1; j >= 0; j--){
        if (bars[i].hits(bots[j])) {
          savedBots.push(bots.splice(j, 1)[0]);
        }
      }
      if (bars[i].offscreen()){
        bars.splice(i, 1);
      }
    }

    for (let i = bots.length - 1; i >= 0; i--){
      if(bots[i].hitGround()){
        bots[i].vy=0;
        bots[i].y=height - bots[i].r/2;
      }

      if (bots[i].offScreen()) {
        savedBots.push(bots.splice(i, 1)[0]);
      }
    }

    for (let bot of bots) {
      bot.think(bars);
      bot.update();
    }

    if (bots.length === 0) {
      counter = 0;
      nextGeneration();
      bars = [];
    }
  }

  background(21, 22, 36);
  textSize(25);
  noStroke();
  fill(180);
  text('max score:', 10, 30);
  text('generation:', 10, 85);

  maxScore = 0
  for (let bot of bots) {
    bot.show();
    maxScore = max(maxScore, bot.score);
  }
  
  stroke(235, 189, 23);
  fill(235, 189, 23, 100);
  text(str(gen), 10, 112);
  text(str(maxScore), 10, 55);

  for (let bar of bars) {
    bar.show();
  }
}

var data = {
  x: genList,
  y: maxScoreList,
  type: 'scatter'
};

// Define the layout
var layout = {
  title: 'Max Scores Over Generations',
  xaxis: {
    title: 'Generations',
    titlefont: {
      family: 'Arial, sans-serif',
      size: 18,
      color: 'black'
  }},
  yaxis: {
    title: 'Maximum Score',
    titlefont: {
      family: 'Arial, sans-serif',
      size: 18,
      color: 'black'
  }},
};

// Define the chart container
var container = document.getElementById('chart-container');

// Define the toggle button
var toggleButton = document.getElementById('toggle-chart');
var chartVisible = false;

// Define the plot function
function plotChart() {
  Plotly.newPlot(container, [data], layout);
  chartVisible = true;
}

// Define the hide function
function hideChart() {
  Plotly.purge(container);
  chartVisible = false;
}

// Attach the toggle button event listener
toggleButton.addEventListener('click', function() {
  if (chartVisible) {
    hideChart();
  } else {
    plotChart();
  }
});

