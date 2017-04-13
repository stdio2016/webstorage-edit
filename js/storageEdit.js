var theStorage = localStorage;
var addButton = document.getElementById('addButton');
function loadStorage() {
  var len = localStorage.length;
  var count = 0;
  var keys = [];
  function loop1() {
    for (var i = count; i < len && i < count + 1000; i++) {
      var key = theStorage.key(i);
      keys.push(key);
    }
    console.log(i);
    count = i;
    if (i < len) {
      setTimeout(loop1, 50);
    }
    else {
      count = 0;
      keys.sort();
      loop2();
    }
  }
  function loop2() {
    for (var i = count; i < len && i < count + 1000; i++) {
      var newRow = keyValueTable.insertRow(-1);
      var keyCell = newRow.insertCell(0);
      var valueCell = newRow.insertCell(1);
      keyCell.appendChild(new Text(keys[i]));
      valueCell.appendChild(new Text(theStorage.getItem(keys[i])));
    }
    console.log(i);
    count = i;
    if (i < len) {
      setTimeout(loop2, 50);
    }
  }
  loop1();
}
loadStorage();

function storageAdd() {
  var newRow = keyValueTable.insertRow(-1);
  var keyCell = newRow.insertCell(0);
  var valueCell = newRow.insertCell(1);
  var input = document.createElement('input');
  var ok = document.createElement('button');
  ok.innerHTML = 'OK';
  var key = '';
  function keyComplete() {
    key = input.value;
    if (key === '') return input.onblur();
    keyCell.removeChild(input);
    keyCell.removeChild(ok);
    keyCell.appendChild(new Text(key));
    input.value = '';
    valueCell.appendChild(input);
    valueCell.appendChild(ok);
    input.onblur = null;
    input.focus();
    ok.onclick = valueComplete;
  }
  function valueComplete() {
    var value = input.value;
    valueCell.removeChild(input);
    valueCell.removeChild(ok);
    valueCell.appendChild(new Text(value));
    theStorage.setItem(key, value);
    endInput();
  }
  function endInput() {
    addButton.style.display = '';
  }
  ok.onclick = keyComplete;
  input.onblur = function () {
    if (input.value === '') {
      input.onblur = null;
      keyValueTable.deleteRow(-1);
      endInput();
    }
  };
  addButton.style.display = 'none';
  keyCell.appendChild(input);
  keyCell.appendChild(ok);
  input.focus();
}
