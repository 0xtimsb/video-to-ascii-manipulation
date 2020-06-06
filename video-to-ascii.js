window.onload = () => {
  processor.doLoad();
};

const ascii = [` `,`.`,`'`,`"`,`*`,`+`,`#`,`&`,`%`,`$`,`@`];
let size = 3;
let gap = 3;

var processor = {  
  timerCallback: function() {  
    if (this.video.paused || this.video.ended) {  
      return;  
    }  
    this.computeFrame();  
    var self = this;  
    setTimeout(function () {  
      self.timerCallback();  
    }, 16); // roughly 60 frames per second  
  },

  doLoad: function() {
    this.video = document.getElementById("video");
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");
    var self = this;  
    this.video.addEventListener("play", function() {
      self.width = self.video.width;  
      self.height = self.video.height;  
      self.timerCallback();
    }, false);
  },  

  computeFrame: function() {
    this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
    this.rawData = this.ctx.getImageData(0, 0, this.width, this.height).data;
    this.k = 0;
    this.data = [];
    for (let j = 0; j < this.height; j++) {
      this.data.push([]);
      for (let i = 0; i < this.width; i++) {
        this.color = [];
        for (let c = 0; c < 4; c++) {
          this.color.push(this.rawData[this.k]);
          this.k++;
        }
        this.data[j].push(this.color);
      }
    }
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = `${size}px Arial`;
    for (let j = 0; j < this.height; j += gap) {
      for (let i = 0; i < this.width; i += gap) {
        // For color-ascii
        //this.ctx.fillStyle = `rgb(${this.data[j][i][0]}, ${this.data[j][i][1]}, ${this.data[j][i][2]})`;
        const sum = this.data[j][i][0] + this.data[j][i][1] + this.data[j][i][2];
        this.ctx.fillText(ascii[Math.floor((sum / (255 * 3)) * ascii.length)], i, j);
      }
    }

    return;
  }
};  