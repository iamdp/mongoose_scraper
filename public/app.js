document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {});
});

let card = document.querySelectorAll(".save-Post");

card.forEach(element => {
  element.addEventListener("click", function() {
    // Remove card from dom
    document
      .querySelector(".posts")
      .removeChild(this.parentElement.parentElement.parentElement);

    // Save post
    fetch(
      "/savePost/" +
        this.parentElement.parentElement.parentElement.getAttribute("data-id"),
      { method: "POST" }
    );
  });
});

document.querySelector("#scrape").addEventListener("click", function() {
  fetch("/scrape");
});

document.querySelectorAll(".save-note").forEach(element => {
  element.addEventListener("click", function() {
    fetch("/saveNote/" + this.parentElement.parentElement.getAttribute("id"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.parentElement.previousElementSibling.querySelector("#title")
          .value,
        body: this.parentElement.previousElementSibling.querySelector(
          "#notetextarea"
        ).value
      })
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  });
});
