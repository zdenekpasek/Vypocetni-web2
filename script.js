window.onload = function(e) {
  nacti();
};

function nacti() {
  var xmlhttp;

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var jsn = JSON.parse(xmlhttp.responseText);

      var body = document.getElementsByTagName("body")[0];

      /* vlozeni divu container do body (container je v JSONU) */
      body.insertAdjacentHTML("afterend", jsn.obsah.HTMLkod);

      var container = document.getElementById("container");

      /* vlozeni veskereho UI pro operace do containeru (html) */
      container.insertAdjacentHTML("beforeend", jsn.unarni.HTMLkod);
      container.insertAdjacentHTML("beforeend", jsn.binarni.HTMLkod);
      container.insertAdjacentHTML("beforeend", jsn.textova.HTMLkod);

      /* tahani matematickych / textovych operaci
               z JSONU, kde jsou definovany jako "funkce" */
      binarni = new Function(jsn.binarni.funkce);
      unarni = new Function(jsn.unarni.funkce);
      textova = new Function(jsn.textova.funkce);
    }
  };
  xmlhttp.open("GET", "vypocty.json", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send();
}

/* Funkce buttonu pro binarni operace */
function spocti() {
  /* volani funkce binarni, ktera je implementovana v JSONU*/
  binarni();
}

/* Funkce buttonu pro unarni operace */
function spoctiUn() {
  /* volani funkce unarni, ktera je implementovana v JSONU*/
  unarni();
}

/* Funkce buttonu pro textove operace */
function spoctiTxt() {
  /* volani funkce textova, ktera je implementovana v JSONU*/
  textova();
}
