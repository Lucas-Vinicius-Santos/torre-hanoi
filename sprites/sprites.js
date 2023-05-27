class Sprite {
  constructor(position, dimension, color) {
    this.x = position.x;
    this.y = position.y;
    this.width = dimension.width;
    this.height = dimension.height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }

  halfWidth() {
    return this.width / 2;
  }

  halfHeight() {
    return this.height / 2;
  }

  centerX() {
    return this.x + this.halfWidth();
  }

  centerY() {
    return this.y + this.halfHeight();
  }
}

class Tower extends Sprite {
  constructor(position, dimension, color) {
    super(position, dimension, color);
  }
}

class Haste extends Sprite {
  constructor(position, dimension, color) {
    super(position, dimension, color);
    this.disks = [];
  }
}

class Disk extends Sprite {
  constructor(position, dimension, color, haste) {
    super(position, dimension, color);

    this.acc = 20;
    this.haste = haste;
  }

  setup() {
    this.haste = hastes.find(
      (haste) => haste.disks.filter((disk) => disk === this).length > 0
    );

    this.x = this.haste.x + this.haste.width / 2 - this.width / 2;
    this.y = tower.y - this.height * (this.haste.disks.indexOf(this) + 1);
    this.draw();
  }

  update() {
    if (isNoAnimate) {
      this.haste = hastes.find(
        (haste) => haste.disks.filter((disk) => disk === this).length > 0
      );

      this.x = this.haste.x + this.haste.width / 2 - this.width / 2;
      this.y = tower.y - this.height * (this.haste.disks.indexOf(this) + 1);
    }
    this.draw();
  }
}
