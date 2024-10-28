// Show or hide clear button visibility base on search input value
const handleInputChange = (event) => {
  // If Esc key is hit, hide history panel instead
  if (event && event.key == "Escape") {
    searchBox.classList.add("expanded-hidden");
    expandedPanel.classList.remove("show");
    return;
  }

  searchBox.classList.remove("expanded-hidden");
  expandedPanel.classList.add("show");

  const val = searchBoxInput.value;

  if (val) {
    clearBox.classList.add("show");
  } else {
    clearBox.classList.remove("show");
  }
};

const updateDateTime = () => {
  let timeStamp = new Date();
};

const fetchQuote = async () => {
  const baseAPI = "https://api.quotable.io";
  const searchAPI = "https://google.com";
  const params = {
    limit: 1,
    minLength: 100,
    maxLength: 200,
  };

  const quoteContainer = document.querySelector(".quotes");
  const quote = document.createElement("p");
  quote.setAttribute("id", "quote");
  const author = document.createElement("a");
  author.setAttribute("id", "author");

  const result = await fetch(
    `${baseAPI}/quotes/random?limit=${params.limit}&minLength=${params.minLength}&maxLength=${params.maxLength}`
  );
  const data = await result.json();

  if (result.ok) {
    quote.innerHTML = data[0].content;
    author.innerHTML = data[0].author;

    author.setAttribute("href", `${searchAPI}/search?q=${data[0].author}`);
  } else {
    quote.innerHTML = "An unexpected error occurred while fetching quote";
    author.innerHTML = "Please try again";
  }

  quoteContainer.appendChild(quote);
  quoteContainer.appendChild(author);

  fadeIn(quote);
  fadeIn(author);
};

const fadeIn = (el) => {
  el.style.opacity = 0;
  let fadeInTimer = setInterval(() => {
    if (parseFloat(el.style.opacity) < 1) {
      el.style.opacity = parseFloat(el.style.opacity) + 0.1;
    } else clearInterval(fadeInTimer);
  }, 100);
};
