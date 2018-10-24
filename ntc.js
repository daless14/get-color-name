const NAMES = require('./config/NAMES.constants').NAMES;

const ntc = {
  init: function() {
    var color, rgb, hsl;
    for(var i = 0; i < NAMES.length; i++)
    {
      color = "#" + NAMES[i][0];
      rgb = ntc.rgb(color);
      hsl = ntc.hsl(color);
      NAMES[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  },

  name: function(color) {

    color = color.toUpperCase();
    var rgb = ntc.rgb(color),
      hsl = ntc.hsl(color);
    let badColor = (isNaN(rgb[0]) || isNaN(rgb[0]) || isNaN(rgb[0]));
    if (badColor || color.length < 3 || color.length > 7)
      return ["#000000", "Invalid Color: " + color, false];
    if (color.length % 3 == 0)
      color = "#" + color;
    if (color.length == 4)
      color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);
    var rgb = ntc.rgb(color);
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsl = ntc.hsl(color);
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var ndf1 = 0; ndf2 = 0; ndf = 0;
    var cl = -1, df = -1;
    for (var i = 0; i < NAMES.length; i++)
    {
      if (color == "#" + NAMES[i][0]) {
        const splitName = NAMES[i][1].split(' ');
        return ["#" + NAMES[i][0], NAMES[i][1], splitName[0].toLowerCase()+splitName.slice(1).join(''), true];
      }
      ndf1 = Math.pow(r - NAMES[i][2], 2) + Math.pow(g - NAMES[i][3], 2) + Math.pow(b - NAMES[i][4], 2);
      ndf2 = Math.pow(h - NAMES[i][5], 2) + Math.pow(s - NAMES[i][6], 2) + Math.pow(l - NAMES[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      if (df < 0 || df > ndf)
      {
        df = ndf;
        cl = i;
      }
    }
    const splitClName = NAMES[cl][1].split(' ');
    return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : [color, NAMES[cl][1], splitClName[0].toLowerCase()+splitClName.slice(1).join(''), true]);
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function (color) {

    var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    h = 0;
    if(delta > 0)
    {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += (2 + (b - r) / delta);
      if (max == b && max != r) h += (4 + (r - g) / delta);
      h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
  },
}

exports.ntc = ntc;

