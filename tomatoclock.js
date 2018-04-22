var set;
var setInt;
var setDec;
var setIntDec;
var DEG = 90;
var side = true;
var startTime = undefined;
var defaultTime = "25:00";
var defaultBreak = "05:00";

//Switches in the start/stop/reset buttons
function replace() {
  if(document.getElementById("outer").innerHTML.includes("info")) {
    start();
    document.getElementById("outer").innerHTML = "<button class='btn btn-warning' onclick='replace()' id='stop'>STOP</button>";
  } else if(document.getElementById("outer").innerHTML.includes("warning")) {
    stop();
    document.getElementById("outer").innerHTML = "<button class='btn btn-danger' onclick='replace()' id='reset'>RESET</button>";
  } else if(document.getElementById("outer").innerHTML.includes("danger")) {
    reset();
    document.getElementById("outer").innerHTML = "<button class='btn btn-info' onclick='replace()' id='start'>START</button>";
  }
}

function start() {
  $("#timeDec").prop('disabled', true);
  $("#timeInc").prop('disabled', true);
  $("#breakDec").prop('disabled', true);
  $("#breakInc").prop('disabled', true);
  set = setInterval(function () {
    var arr = document.getElementById("time").innerHTML.split(':');
    if(arr[0] == '' && parseInt(arr[1]) <= 1) {
      stopAll();
    }
    if(arr[0] == '' && parseInt(arr[1]) <= 1) return;
    if(arr[1] === "00") {
      arr[1] = "59";
      if(parseInt(arr[0]) <= 10) {
        arr[0] = '0' + String(parseInt(arr[0]) - 1);
      } else {
      arr[0] = String(parseInt(arr[0]) - 1);
      }
    } else {
      if(parseInt(arr[1]) <= 10) {
        arr[1] = '0' + String(parseInt(arr[1]) - 1);
      } else {
        arr[1] = String(parseInt(arr[1]) - 1);
      }
    }
    document.getElementById("time").innerHTML = (arr[0] + ':' + arr[1]);
  }, 1000); // set = setInterval(function () {
  var ms = (getTimeSec("time") / 360) * 1000;
  setInt = setInterval(inc, ms);
}

//Decrements the work timer
$("#timeDec").click(function() {
  var arr = document.getElementById("time").innerHTML.split(':');
  if(parseInt(arr[0]) <= 1) return;
  if(parseInt(arr[0]) <= 10) { //It'll be < 10 next...
    arr[0] = '0' + String(parseInt(arr[0]) - 1);
  } else {
    arr[0] = String(parseInt(arr[0]) - 1);
  }
  document.getElementById("time").innerHTML = (arr[0] + ':' + arr[1]);
});

//Decrements the break timer
$("#breakDec").click(function() {
  var arr = document.getElementById("break").innerHTML.split(':');
  if(parseInt(arr[0]) <= 1) return;
  if(parseInt(arr[0]) <= 10) { //It'll be < 10 next...
    arr[0] = '0' + String(parseInt(arr[0]) - 1);
  } else {
    arr[0] = String(parseInt(arr[0]) - 1);
  }
  document.getElementById("break").innerHTML = (arr[0] + ':' + arr[1]);
});

//Increments the break timer
$("#breakInc").click(function() {
  var arr = document.getElementById("break").innerHTML.split(':');
  if(parseInt(arr[0]) >= 99) return;
  if(parseInt(arr[0]) < 9) {
    arr[0] = '0' + String(parseInt(arr[0]) + 1);
  } else {
    arr[0] = String(parseInt(arr[0]) + 1);
  }
  document.getElementById("break").innerHTML = (arr[0] + ':' + arr[1]);
});

//Increments the work timer
$("#timeInc").click(function() {
  var arr = document.getElementById("time").innerHTML.split(':');
  if(parseInt(arr[0]) >= 999) return;
  if(parseInt(arr[0]) < 9) {
    arr[0] = '0' + String(parseInt(arr[0]) + 1);
  } else {
    arr[0] = String(parseInt(arr[0]) + 1);
  }
  document.getElementById("time").innerHTML = (arr[0] + ':' + arr[1]);
});

//Resets everything to defaults
function reset() {
  document.getElementById("time").innerHTML = defaultTime;
  document.getElementById("break").innerHTML = defaultBreak;
  $("#main").css({'background-image': 'linear-gradient(90deg, transparent 50%, #e7eacc 50%), linear-gradient(90deg, #e7eacc 50%, transparent 50%)'});
  DEG = 90;
  side = true;
  clearButtons();
}

//Wrapper for stopAll
function stop() {
  stopAll();
}

//Stops the clock
function stopAll() {
  clearInterval(set);
  clearInterval(setInt);
  clearInterval(setDec);
  clearInterval(setIntDec);
  set = undefined;
  setInt = undefined;
  setDec = undefined;
  setIntDec = undefined;
  document.getElementById("time").innerHTML = "--";
}

//Re-enable all the buttons
function clearButtons() {
  $("#timeDec").prop('disabled', false);
  $("#timeInc").prop('disabled', false);
  $("#breakDec").prop('disabled', false);
  $("#breakInc").prop('disabled', false);
}

//Increments the pie chart background
function inc() {
  DEG++;
  if(DEG > 270) {
    DEG = 90;
    side = false;
  }
  //set the new background angle
  if(side) {
    var css = 'linear-gradient(' + DEG + 'deg, transparent 50%, #e7eacc 50%), linear-gradient(90deg, #e7eacc 50%, transparent 50%)';
  } else {
    var css = 'linear-gradient(' + DEG + 'deg, transparent 50%, #eacfcc 50%), linear-gradient(90deg, #e7eacc 50%, transparent 50%)';
    if(DEG >= 270) {
      side = true;
      stopAll();
      doBreak();
    }
  }
  //apply the change
  $("#main").css({'background-image': css});
}

//Starts the break timer and runs the background backwards
function doBreak() {
  setDec = setInterval(function () {
    var arr = document.getElementById("break").innerHTML.split(':');
    if(arr[0] == '' && parseInt(arr[1]) <= 1) {
      stopAll();
    }
    if(arr[0] == '' && parseInt(arr[1]) <= 1) return;
    if(arr[1] === "00") {
      arr[1] = "59";
      arr[0] = String(parseInt(arr[0]) - 1);
    } else {
      if(parseInt(arr[1]) <= 10) {
        arr[1] = '0' + String(parseInt(arr[1]) - 1);
      } else {
        arr[1] = String(parseInt(arr[1]) - 1);
      }
    }
    document.getElementById("break").innerHTML = (arr[0] + ':' + arr[1]);
  }, 1000); //  setDec = setInterval(function () {
  var ms = (getTimeSec("break") / 360) * 1000;
  setIntDec = setInterval(dec, ms);
}

//This handles running the pie chart timer backwards
function dec() {
  DEG--;
  if(DEG < 90) {
    DEG = 270;
    side = false;
  }
  if(side) {
    var css = 'linear-gradient(' + DEG + 'deg, transparent 50%, #eacfcc 50%), linear-gradient(90deg, #e7eacc 50%, transparent 50%)';
  } else {
    var css = 'linear-gradient(' + DEG + 'deg, transparent 50%, #e7eacc 50%), linear-gradient(90deg, #e7eacc 50%, transparent 50%)';
    if(DEG <= 90) {
      side = true;
      stopAll();
      document.getElementById("break").innerHTML = "--";
      if(document.getElementById("outer").innerHTML.includes("warning")) {
        stop();
        document.getElementById("outer").innerHTML = "<button class='btn btn-danger' onclick='replace()' id='reset'>RESET</button>";
      }
    }
  }
  $("#main").css({'background-image': css});
}


function getTimeSec(str) {
  var arr = document.getElementById(str).innerHTML.split(':');
  return (arr[0] * 60) + parseInt(arr[1]);
}
