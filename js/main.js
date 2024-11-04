const searchBox = document.querySelector(".search-box");
const searchBoxInput = document.querySelector(".search-input");
const expandedPanel = document.querySelector(".expanded");
const historyItem = document.querySelectorAll(".history .item");
const clearBox = document.querySelector(".clear-box");
const clearBtn = document.querySelector("#clear-btn");
const searchBoxPlaceholder = document.querySelector(".search-box .placeholder");

searchBox.addEventListener("focusin", () => {
  searchBox.classList.remove("expanded-hidden");
  expandedPanel.classList.add("show");
});

searchBox.addEventListener("focusout", () => {
  expandedPanel.classList.remove("show");
});

searchBoxInput.addEventListener("keyup", (event) => handleInput(event));

clearBtn.addEventListener("click", () => {
  searchBoxInput.value = "";
  handleInput();
  searchBoxInput.focus();
});

historyItem.forEach((el) => {
  const actionBtn = el.querySelector(".action");

  el.addEventListener("mouseover", () => {
    actionBtn.classList.add("show");
  });

  el.addEventListener("mouseout", () => {
    actionBtn.classList.remove("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  fetchQuote();
});
