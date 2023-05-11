// taken from The Coding Train

function nextGeneration() {
  genList.push(gen);
  maxScoreList.push(maxScore);
  gen++;
  maxScore=0;
  calculateFitness();
  for (let i = 0; i < TOT; i++) {
    bots[i] = pickOne();
  }
  for (let i = 0; i < TOT; i++) {
    savedBots[i].dispose();
  }
  savedBots = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBots[index].fitness;
    index++;
  }
  index--;
  let bot = savedBots[index];
  let child = new Bot(bot.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bot of savedBots) {
    sum += bot.score;
  }
  for (let bot of savedBots) {
    bot.fitness = bot.score / sum;
  }
}
