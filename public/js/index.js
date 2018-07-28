let modal = document.getElementById("modal");
let btn = document.getElementById("add");
let spanner = document.getElementById("close");

btn.onclick = function() {
  modal.style.display = "flex";
};

spanner.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    console.log("working");

    modal.style.display = "none";
  }
};
