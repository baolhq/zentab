const handleInput = (event) => {
  // If Esc key is hit, hide history panel
  if (event && event.key == "Escape") {
    searchBox.classList.add("expanded-hidden");
    expandedPanel.classList.remove("show");
    return;
  }

  const val = searchBoxInput.value;
  const searchUrl = "https://google.com";
  if (event && event.key == "Enter" && val) {
    location.href = `${searchUrl}/search?q=${encodeURIComponent(val)}`;
  }

  searchBox.classList.remove("expanded-hidden");
  expandedPanel.classList.add("show");

  if (val) {
    clearBox.classList.add("show");
  } else {
    clearBox.classList.remove("show");
  }
};

const updateDateTime = () => {
  const timeStamp = new Date();

  const hourElem = document.querySelector(".hour");
  hourElem.innerHTML = timeStamp.getHours().toString().padStart(2, "0");
  const minElem = document.querySelector(".minute");
  minElem.innerHTML = timeStamp.getMinutes().toString().padStart(2, "0");
  const secElem = document.querySelector(".second");
  secElem.innerHTML = timeStamp.getSeconds().toString().padStart(2, "0");

  const dateElem = document.querySelector(".date");
  const weekDay = timeStamp.toLocaleDateString("en-US", { weekday: "long" });
  const month = timeStamp.toLocaleDateString("en-US", { month: "long" });
  const date = timeStamp.getDate();
  dateElem.innerHTML = `${weekDay}, ${month} ${date}${getDateNth(date)}`;
};

const getDateNth = (date) => {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const fetchQuote = async () => {
  const baseUrl = "https://api.quotable.io";
  const searchUrl = "https://google.com";
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

  let data = await fetchQuoteFromAPI(baseUrl, params);

  if (!data) {
    data = await fetchLocalQuotes();
  }

  author.setAttribute("href", `${searchUrl}/search?q=${data.author}`);
  quote.innerHTML = data.content;
  author.innerHTML = data.author;

  fadeIn(quoteContainer, quote);
  fadeIn(quoteContainer, author);
};

const fetchQuoteFromAPI = async (url, params) => {
  try {
    const result = await fetch(
      `${url}/quotes/random?limit=${params.limit}&minLength=${params.minLength}&maxLength=${params.maxLength}`
    );
    const data = await result.json();

    return data[0];
  } catch (e) {
    return false;
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const fetchLocalQuotes = async () => {
  const quotesPath = "/asset/quotes.json";
  const result = await fetch(quotesPath);
  const data = await result.json();

  return data[getRandomInt(0, data.length - 1)];
};

const fadeIn = (parent, child) => {
  parent.appendChild(child);

  child.style.opacity = 0;
  let fadeInTimer = setInterval(() => {
    if (parseFloat(child.style.opacity) < 1) {
      child.style.opacity = parseFloat(child.style.opacity) + 0.1;
    } else clearInterval(fadeInTimer);
  }, 100);
};
