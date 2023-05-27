async function start(event) {
  event.preventDefault();

  isNoAnimate = !document.getElementById('cbAnimatedMov').checked;
  qtdDisks = document.getElementById('qtdDisk').value;

  qtdDisks = Number(qtdDisks) == 0 ? 2 : Number(qtdDisks);

  btnStart.disabled = true;

  setup();
  await sleep(1000);
  await solveHanoiTower();
}

async function updateTower() {
  ctx.fillStyle = '#233a3d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  tower.draw();
  hastes.forEach((haste) => haste.draw());
  disks.forEach((disk) => disk.update());

  if (isNoAnimate) {
    await sleep(100);
  }
}

async function setup() {
  await setupTower();
  await setupHastes();
  await setupDisks();

  hastes[0].disks = [...disks];

  ctx.fillStyle = '#233a3d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  tower.draw();
  hastes.forEach((haste) => haste.draw());
  disks.forEach((disk) => disk.setup());
}

function solveHanoiTower() {
  recursiveHanoiSolve(qtdDisks, hastes[0], hastes[1], hastes[2]);

  async function recursiveHanoiSolve(
    qtdDisks,
    hasteOrigin,
    hasteAux,
    hasteDest
  ) {
    if (qtdDisks === 0) {
      return;
    }

    await recursiveHanoiSolve(qtdDisks - 1, hasteOrigin, hasteDest, hasteAux);
    hasteDest.disks.push(hasteOrigin.disks.pop());

    if (isNoAnimate) {
      await updateTower();
    } else {
      hasteDest.disks[hasteDest.disks.length - 1].haste = hasteDest;
      await moveDiskForDest(hasteDest);
    }

    await recursiveHanoiSolve(qtdDisks - 1, hasteAux, hasteOrigin, hasteDest);
  }
}

async function moveDiskForDest(hasteDest) {
  let disk = hasteDest.disks[hasteDest.disks.length - 1];
  let haste = disk.haste;

  const catX = disk.centerX() - haste.centerX();
  const targetYPosition = tower.y - disk.height * haste.disks.length;

  if (catX == 0 && disk.y == targetYPosition) {
    return;
  }

  await moveDiskToTop(disk, 160);
  await moveDiskToXPosition(disk);
  await dowGravityToYPosition(disk, targetYPosition);

  await moveDiskForDest(hasteDest);
}

async function moveDiskToTop(disk, targetHeight) {
  if (disk.y <= targetHeight) {
    disk.y = targetHeight;
    return;
  }

  disk.y -= disk.acc;

  updateTower();
  await sleep(delayMoveDisk);
  await moveDiskToTop(disk, targetHeight);
}

async function moveDiskToXPosition(disk) {
  targetXPosition = disk.haste.x + disk.haste.halfWidth() - disk.halfWidth();

  if (disk.x == targetXPosition) {
    return;
  }

  if (disk.x - targetXPosition < 0) {
    disk.x += disk.acc;

    if (disk.x - targetXPosition >= 0) {
      disk.x = targetXPosition;
    }
  } else {
    disk.x -= disk.acc;

    if (disk.x - targetXPosition <= 0) {
      disk.x = targetXPosition;
    }
  }

  updateTower();
  await sleep(delayMoveDisk);
  await moveDiskToXPosition(disk);
}

async function dowGravityToYPosition(disk, targetYPosition) {
  if (disk.y >= targetYPosition) {
    disk.y = targetYPosition;
    return;
  }

  disk.y += disk.acc;

  updateTower();
  await sleep(delayMoveDisk);
  await dowGravityToYPosition(disk, targetYPosition);
}
