var form = document.querySelector("form");
var tip = 0.00;
var total = 0.00;
var percentage = .1;

var writeTip = function() {
  document.querySelector('#tip').value = '$' + tip.toFixed(2);
  document.querySelector('#total').value = '$' + (tip + total) + '.00';
};

var calculateCents = function() {
  tip = Math.ceil(total) - total;
};

var addDollars = function() {
  if (tip < total * percentage) {
    tip++;

    addDollars();
  }

  writeTip();
};

var calculateTip = function() {
  if (total) {
    calculateCents();
    addDollars();
  }
};

form.addEventListener("submit", function(event) {
  var data = new FormData(form);
  total = parseFloat(document.querySelector('#bill').value.replace('$', ''));

  for (var entry of data) {
    switch (entry[1]) {
      case 'great':
        percentage = .2;
        break;
      case 'good':
        percentage = .15;
        break;
      case 'okay':
      default:
        percentage = .1;
        break;
    }
  }

  calculateTip();

  event.preventDefault();
}, false);