
// position the calculater in the middle of the screen
function middleSection() {
    var windowHeight = window.innerHeight;
    var section = document.getElementById('calculater');
    var sectionHeight = section.offsetHeight;
    section.style.marginTop = (windowHeight / 2) - (sectionHeight / 2) + "px";
  }
  
  window.onresize = function(e) {
    middleSection();
  }
  
  middleSection();
  
  // get variebles for each button/input
  var prev = "",
      current = "",
      domath = "",
      lastNum = "",
      resetCurrent = false,
      resetPrev = false,
      lastNumberMode = true,
      resetDomath = true,
      decimal = false,
      cEL = document.getElementById('btn-c'),
      ceEL = document.getElementById('btn-ce'),
      prevEl = document.getElementById('last-action'),
      currentEl = document.getElementById('current'),
      numbersSelector = document.querySelectorAll('.numbers'),
      divide = document.getElementById('btn-d'),
      multiple = document.getElementById('btn-t'),
      plus = document.getElementById('btn-p'),
      minus = document.getElementById('btn-m'),
      equal = document.getElementById('btn-e'),
      opArr = [divide, multiple, plus, minus, equal];
  
  // functions to update the display
  function lastNumber(element) {
    if (lastNumberMode === true) {
      lastNum += element;
    }
  }
  
  function addToPrev(element) {
    if (prevEl.style.display === "none" && resetPrev === false) {
      prev = lastNum + element;
      prevEl.style.display = "block";
      currentEl.style.marginTop = "2rem";
    } else if (prevEl.style.display === "none" && resetPrev === true) {
      lastNum = "";
      prev = element;
      prevEl.style.display = "block";
      currentEl.style.marginTop = "2rem";
    } else {
      prev += element;
    }
    prevEl.innerHTML = prev;
  }
  
  function showCurrent(element) {
    if (currentEl.innerHTML === "0" || resetCurrent === true) {
      current = element;
      currentEl.innerHTML = current;
      resetCurrent = false;
    } else {
      current += element;
      currentEl.innerHTML = current;
    }
  }
  
  function clearPrev() {
    prev = "";
    prevEl.style.display = "none";
    currentEl.style.marginTop = "3rem";
  }
  
  function clearCurrent() {
    current = "0";
    currentEl.innerHTML = current;
  }
  
  function doMaths() {
    if (domath === "divide") {
      current = Number(lastNum) / Number(current);
      afterMath();
    } else if (domath === "multiple") {
      current = Number(lastNum) * Number(current);
      afterMath();
    } else if (domath === "plus") {
      current = Number(lastNum) + Number(current);
      afterMath();
    } else if (domath === "minus") {
      current = Number(lastNum) - Number(current);
      afterMath();
    } else if (domath === "equal") {
      afterMath();
    }
  }
  
  function afterMath() {
    if (current % 1 !== 0 && current.toString().length > 8) {
      current = Number(current).toFixed(6);
    }
    lastNum = current.toString();
    showCurrent(lastNum);
    resetCurrent = true;
    resetDomath = true;
    domath = "";
  }
  
  // decide what to do when a button is clicked
  Array.prototype.forEach.call(numbersSelector, function(val) {
    val.onclick = function(e) {
      resetDomath = false;
      if (this.innerHTML !== ".") {
        addToPrev(this.innerHTML);
        showCurrent(this.innerHTML);
        lastNumber(this.innerHTML);
      } else if (this.innerHTML === "." && decimal === false) {
        addToPrev(this.innerHTML);
        showCurrent(this.innerHTML);
        lastNumber(this.innerHTML);
        decimal = true;
      }
    }
  });
  
  opArr.forEach(function(element) {
    element.onclick = function(e) {
      if (resetDomath === false) {
        resetDomath = true;
        resetPrev = false;
        decimal = false;
        addToPrev(this.innerHTML);
        lastNumberMode = false;
        resetCurrent = true;
        doMaths();
      } else if (resetDomath === true) {
        prev = prev.substr(0, prev.length - 1);
        addToPrev(this.innerHTML);
      }
  
      if (element === divide) {
        domath = "divide";
      } else if (element === multiple) {
        domath = "multiple";
      } else if (element === plus) {
        domath = "plus";
      } else if (element === minus) {
        domath = "minus";
      } else if (element === equal) {
        domath = "equal";
        clearPrev();
        prev = current;
        lastNum = current;
        resetDomath = false;
        resetPrev = true;
      }
  }
  });
  
  ceEL.onclick = function(e) {
    var rep = new RegExp(current + "$")
    prev = prev.replace(rep, "");
    prevEl.innerHTML = prev;
    clearCurrent();
  };
  
  cEL.onclick = function(e) {
    clearCurrent();
    clearPrev();
    lastNum = "";
  };
  