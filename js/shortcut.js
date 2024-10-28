const focusInput = (event) => {
  if (document.activeElement == searchBoxInput) {
    return;
  }

  event.preventDefault();
  searchBoxInput.focus();
};

document.body.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "/":
      focusInput(event);
      break;
  }
});
