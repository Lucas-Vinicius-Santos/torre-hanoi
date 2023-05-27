function getRandomSoftColor() {
  var hue = Math.floor(Math.random() * 80) + 160; // Random hue value between 160 and 239 (green to blue range)
  var saturation = Math.floor(Math.random() * 40) + 60; // Random saturation value between 60 and 99
  var lightness = Math.floor(Math.random() * 20) + 40; // Random lightness value between 40 and 59
  var color = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  return color;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
