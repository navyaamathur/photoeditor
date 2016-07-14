class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }
}

class RGBA{
    constructor(redValue, greenValue, blueValue, alphaValue){
      this.red = redValue;
      this.green = greenValue;
      this.blue = blueValue;
      this.alpha = alphaValue;
    }
  }

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function definitions here
function colourise(img, colour, level){
  var pixels = ImageUtils.getPixels(img);
  var all = pixels.data.length;
  var data = pixels.data;
  for (var i=0; i<all; i+=4){
    var original = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
    var modified=colourisePixel(original, colour, level);
    data[i]=modified.red;
    data[i+1]=modified.green;
    data[i+2]=modified.blue;
    data[i+3]=modified.alpha;
  }

  console.log(pixels);
  ImageUtils.putPixels(pixels, img.width, img.length);
}

function colourisePixel(original, colour, level){
  var modifiedRed = (1-level) * original.red + level * colour.red;
  var modifiedBlue = (1-level) * original.blue + level * colour.blue;
  var modifiedGreen = (1-level) * original.green + level * colour.green;
  var modifiedAlpha = original.alpha - ((original.alpha - colour.alpha) * level);
  return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, modifiedAlpha);
}

$(document).ready(function() {
    var img = new Image();
    img.src = "img/cat.jpg";
    //var pixels = ImageUtil.getPixels(img);
    var colour = new RGBA(213, 23, 88, 255);
    //console.log(colour);
    colourise(img, colour, 1);
});
