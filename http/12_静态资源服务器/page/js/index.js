let tds = document.querySelectorAll("td");
tds.forEach((td) => {
  td.onclick = function () {
    td.style.backgroundColor = "#000";
  };
});
