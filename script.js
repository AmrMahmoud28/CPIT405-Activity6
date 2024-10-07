function filterByTeam() {
  let input = document.getElementById("searchBox");
  let word = input.value.toLowerCase();

  let rows = document.querySelectorAll("tbody tr");
  doFilter(rows, 1, word);
}

function filterByBroadcast() {
  let menuItem = document.getElementsByClassName("select_broadcasters")[0];
  let word = menuItem.value.toLowerCase();
  let rows = document.querySelectorAll("tbody tr");
  doFilter(rows, 2, word);
}

function doFilter(rows, column, word) {
  /* Loop through all table rows and hide rows
         that have cells that don't match the search query.
       */
  for (let i = 0; i < rows.length; i++) {
    let td = rows[i].getElementsByTagName("td")[column];
    let txtValue = td.innerText;
    if (txtValue.toLowerCase().indexOf(word) > -1) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

const sort = (element, tableIndex) => {
  let colIndex = element.cellIndex;
  const rows = table[tableIndex].querySelectorAll("tr");
  let headerRow = document.querySelectorAll("thead")[tableIndex];
  let rowsArray = [];

  for (let i = 1; i < rows.length; i++) {
    rowsArray.push(rows[i]);
  }

  rowsArray.sort((a, b) => {
    let aValue = a.cells[colIndex].innerText;
    let bValue = b.cells[colIndex].innerText;

    if (aValue < bValue) {
      return isAscending ? -1 : 1;
    }
    if (aValue > bValue) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });

  element.children[0].className = isAscending ? "desc" : "asc";

  isAscending = !isAscending;

  table[tableIndex].appendChild(headerRow);
  rowsArray.forEach((row) => table[tableIndex].appendChild(row));
}

let inputSearchElem = document.getElementById("searchBox");
inputSearchElem.addEventListener("keyup", filterByTeam);

let selectBroadcasterElem = document.getElementsByClassName(
  "select_broadcasters"
)[0];
selectBroadcasterElem.addEventListener("change", filterByBroadcast);

const table = document.querySelectorAll("table");
let isAscending = true;