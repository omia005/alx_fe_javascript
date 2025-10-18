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

//function to show quotes
function showRandomQuote(){
  if (quotes.length === 0){
    displayQuote.textContent = "There is are no quotes to display";
    return;
  }
  const randomIndex = math.floor(math.random()*quotes.lenght);
  
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p>
  <small><em>Category: ${quote.category}</em></small> `;

}

//function to add quotes
function addQuote(){
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
