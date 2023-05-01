function nextGeneration() {
    // DE/Best/1
    gen++;
    maxScore=0;
    calculateFitness();
    let beta = 0.5;
    // Get the best individual as the parent
    let parent = pickOne();
    // Get the parent's weights as a vector
    let parentWeights = parent.brain.model.getWeights();
    // Get two random individuals
    let random1 = random(savedBots);
    let random2 = random(savedBots);
    // Get their weights as vectors
    let weights1 = random1.brain.model.getWeights();
    let weights2 = random2.brain.model.getWeights();
    // Substract the two vectors
    let diff1 = weights1.map((x, i) => x.sub(weights2[i]));
    // Multiply the difference by a beta value
    let diff2 = diff1.map(x => x.mul(beta));
    // Add the parent's weights to the difference. This is the unit vector
    let u = diff2.map((x, i) => x.add(parentWeights[i]));
    // Create a new bot with the unit vector as weights
    let child = new Bot();
    child.brain.model.setWeights(u);
    // Crossover u with the rest of the saved bots
    for (let i = 0; i < TOT; i++) {
        bots[i] = pickOneAndCrossover(child);
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

  function pickOneAndCrossover(u) {
    let bot = random(savedBots);
    let child = new Bot(bot.brain);
    child.crossover(0.2,u.brain);
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