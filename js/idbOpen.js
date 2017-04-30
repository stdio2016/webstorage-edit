if (!window.indexedDB) {
  if (window.webkitIndexedDB) {
    window.indexedDB = window.webkitIndexedDB;
    alert('The browser support of indexedDB is experimental');
  }
  else if (window.mozIndexedDB) {
    window.indexedDB = window.mozIndexedDB;
    alert('The browser support of indexedDB is experimental');
  }
  else {
    alert('Your browser does not support indexedDB');
  }
}

var currentOpenDB = null;

function tryOpenDB() {
  var dbname = formDBName.dbName.value;
  var req = indexedDB.open(dbname);
  var exists = true;
  req.onupgradeneeded = function() {
    exists = false;
  };
  req.onsuccess = function() {
    if (exists) {
      currentOpenDB = req.result;
    }
    else {
      indexedDB.deleteDatabase(dbname);
      alert('This database does not exist');
    }
  };
}
