let img = new Image();
img.src = 'some-image-in-root.png';
let w, h;
let data = [];
let ctx;
const ascii = [` `,`.`,`'`,`"`,`*`,`+`,`#`,`&`,`%`,`$`,`@`];

let size = 4;
let gap = 4;


window.onload = function() {
  let c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  let rawData = ctx.getImageData(0, 0, w, h).data;
  let k = 0;
  for (let j = 0; j < h; j++) {
    data.push([]);
    for (let i = 0; i < w; i++) {
      let color = [];
      for (let c = 0; c < 4; c++) {
        color.push(rawData[k]);
        k++;
      }
      data[j].push(color);
    }
  }
  drawASCII();
};

function drawASCII() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.font = `${size}px Arial`;
  for (let j = 0; j < h; j += gap) {
    for (let i = 0; i < w; i += gap) {
      // For color-ascii
      //ctx.fillStyle = `rgb(${data[j][i][0]}, ${data[j][i][1]}, ${data[j][i][2]})`;
      const sum = data[j][i][0] + data[j][i][1] + data[j][i][2];
      ctx.fillText(ascii[Math.floor((sum / (255 * 3)) * ascii.length)], i, j);
    }
  }
}