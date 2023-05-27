canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const hastes = [];
const disks = [];
const qtdDisks = 8;
const towerWidth = 400;
const towerHeight = 40;
const towerColor = '#ccc';
const hasteWidth = 20;
const hasteHeight = 140;
const hasteColor = '#a2a2a2';
const diskBaseWidth = towerWidth / 4 - 5;
const diskBaseHeight = 20;
const delayMoveDisk = 1;

const tower = new Tower(
  { x: (canvas.width - towerWidth) / 2, y: canvas.height - towerHeight },
  { width: towerWidth, height: towerHeight },
  towerColor
);

for (let i of [1, 2, 3]) {
  hastes.push(
    new Haste(
      {
        x: tower.x - hasteWidth / 2 + (tower.width / 4) * i,
        y: tower.y - hasteHeight,
      },
      { width: hasteWidth, height: hasteHeight },
      hasteColor
    )
  );
}

for (let i = 0; i < qtdDisks; i++) {
  disks.push(
    new Disk(
      {
        x: 0,
        y: tower.y - diskBaseHeight * (i + 1),
      },
      {
        width: diskBaseWidth - diskBaseWidth * 0.1 * i,
        height: diskBaseHeight,
      },
      getRandomSoftColor(),
      hastes[0]
    )
  );
}
