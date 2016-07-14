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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function definitions here

//pixels[((i*pixels.width + j)*4)+n]
//i is the row, j is the column, n is the rgba so 0-3

function makeBlue(pixels, adjust){
  var length = pixels.data.length;
  var data = pixels.data;
  for(var i = 0; i < length; i+=4){
    data[i+2]+=adjust;
  }
  return pixels;
}

function makeRed(pixels, adjust){
  var length = pixels.data.length;
  var data = pixels.data;
  for(var i = 0; i < length; i+=4){
    data[i]+=adjust;
  }
  return pixels;
}

function makeGreen(pixels, adjust){
  var length = pixels.data.length;
  var data = pixels.data;
  for(var i = 0; i < length; i+=4){
    data[i+1]+=adjust;
  }
  return pixels;
}

function makeBright(pixels, adjust){
  var length = pixels.data.length;
  var data = pixels.data;
  for(var i = 0; i < length; i+=4){
    data[i]+=adjust;
    data[i+1]+=adjust;
    data[i+2]+=adjust;
  }
  return pixels;
}

function invert(pixels){
  var length = pixels.data.length;
  var data = pixels.data;
  for(var i = 0; i < length; i+=4){
    data[i]=255-data[i];
    data[i+1]=255-data[i+1];
    data[i+2]=255-data[i+2];
  }
  return pixels;
}

function noisemaker(pixels){
  var length = pixels.data.length;
  var data = pixels.data;
  for(var i = 0; i < length; i+=4){
    var adjust=getRandomInt(-80, 80);
    data[i]+=adjust;
    data[i+1]+=adjust;
    data[i+2]+=adjust;
  }
  return pixels;
}

function makeVaguelyTrippy(pixels){
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i=0; i<length/2; i+=2){
    var temp = data[i];
    data[i] = data[length-i];
    data[length-i] = temp;
  }
  return pixels;
}

function rotate(pixels){
  var length = pixels.data.length;
  var data = pixels.data;
  //move pixel by pixel not value by value
  for (var i=0; i<length/2; i+=4){
    var temp = [data[i], data[i+1], data[i+2], data[i+3]];
    //swap entire pixel
    for(var j=0; j<4; j++){
      data[i+j]=data[(length-i)+j];
      data[(length-i)+j]=temp[j];
    }
  }
  return pixels;
}

$(document).ready(function() {
    var img = new Image();
    img.src = "img/cat.jpg";
    var rawPixels = ImageUtils.getPixels(img);
    var noisePixels = noisemaker(rawPixels);
    var pixels = rotate(noisePixels);
    ImageUtils.putPixels(pixels, pixels.width, pixels.height);
  }
);
