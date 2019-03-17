let issAvgSpeed = 7.66; // taken from wikipedia.com (en)
let issInitialTimestamp = 911630999; // 1998-11-21 06:49:59 taken from isstracker.com

let distanceCalc = function (timestamp) {
    issDistance = (((timestamp - issInitialTimestamp) * issAvgSpeed)/1000).toFixed(2);
}