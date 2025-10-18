//managing an array of quotes
let quotes = [
  {text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do or do not. There is no try.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" } 
];

//selecting DOM elements
const showQuoteBtn = document.getElementById("newQuote");
const displayQuote = document.getElementById("quoteDisplay");


// Load quotes from local storage if available
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
//function to show quotes
function showRandomQuote(){
  if (quotes.length === 0){
    displayQuote.textContent = "There is are no quotes to display";
    return;
  }
   const randomIndex = Math.floor(Math.random()*quotes.lenght);
   const quote = quotes[randomIndex];
}
//creating new quote element
const quoteText = document.createElement("p");
quoteText.textContent = `"${quote.text}"`;

const quoteCategory = document.createElement("small");
quoteCategory.innerHTML = `<em>Category: ${quote.category}</em>`;

  // Append to container
quoteDisplay.appendChild(quoteText);
quoteDisplay.appendChild(quoteCategory);
}

//function to add quotes
function createAddQuoteForm(){
  const newQuoteText = getElementById('newQuoteText').value.trim();
  const newQuoteCategory = getElementById('newQuoteCategory').value.trim();

   if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both a quote and a category!");
    return;
  }

  // Create new quote object and add to array
  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Update display with the new quote
  quoteDisplay.innerHTML = `
    <p>"${newQuote.text}"</p>
    <small><em>Category: ${newQuote.category}</em></small>
  `;

  console.log("Quote added:", newQuote);
  console.log("All quotes:", quotes);
}

addQuote.addEventListener("click", showRandomQuote);

// Initial display
showRandomQuote();
