class Bar{
  constructor(pos){
    this.top = random(height/6, (2/3) * height);
    this.x = width + pos;
    this.w = 80;
    this.speed = 8;
  }

  hits(bot){
    if (bot.y > height-this.top){
      if (bot.x > this.x && bot.x < this.x + this.w){
        return true;
      }
    }
    return false;
  }

  show(){
    stroke(240, 38, 95);
    fill(240, 38, 95);
    rectMode(CORNER);
    rect(this.x, height-this.top, this.w, this.top);
  }

  update(){
    this.x -= this.speed;
  }

  offscreen(){
    if (this.x < -this.w) {
      return true;
    } 
    return false;
  }
}
