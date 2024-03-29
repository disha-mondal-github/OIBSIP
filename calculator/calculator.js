let display = document.getElementById('display');
let entered = '';

function addToDisplay(value) {
  entered += value;
  display.value = entered;
}

function ans() {
  // Implement logic for 'ans' button if needed
}

function del() {
  entered = entered.slice(0, -1);
  display.value = entered;
}

function clr() {
  entered = '';
  display.value = '';
}

function toggleSign() {
  // Implement logic for plus/minus sign button if needed
}

function calculate() {
  try {
    let result = eval(entered);
    display.value = result;
    entered = '';
  } catch (error) {
    display.value = 'Error';
  }
}
