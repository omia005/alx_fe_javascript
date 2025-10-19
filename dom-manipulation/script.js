let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do or do not. There is no try.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
];

const showQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const importInput = document.getElementById("importQuotes");
const exportButton = document.getElementById("exportQuotes");

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes and filter state from storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

// Populate category dropdown from quotes
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))]; // unique values

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

// Show random quote (filtered)
function showRandomQuote() {
  let filteredQuotes = quotes;
  const selectedCategory = categoryFilter.value;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small><em>Category: ${quote.category}</em></small>
  `;
}

// Add new quote and update category dropdown dynamically
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes(); 
  populateCategories();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}

// Filter quotes when category changes
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();

  await sendToServer(newQuote);
}

// Export quotes as JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
}

// Import quotes from JSON
function importQuotes(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes = importedQuotes;
        saveQuotes();
        populateCategories();
        showRandomQuote();
      } else {
        alert("Invalid file format.");
      }
    } catch {
      alert("Error reading file.");
    }
  }
  reader.readAsText(file);
}
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; 

// Sync interval (10 seconds)
const SYNC_INTERVAL = 10000;

// Fetch quotes from server
async function syncQuotes() {
  try {
    const response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error("Server fetch failed");

    const serverQuotes = await response.json();

    // Merge with local quotes (server takes precedence)
    mergeQuotes(serverQuotes);

    // Notify user
    showNotification(" Quotes synced with server!");
  } catch (error) {
    console.error("Error syncing with server:", error);
  }
}

// Send new quote to the server when added
async function sendToServer(newQuote) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuote)
    });
  } catch (error) {
    console.error("Failed to send quote to server:", error);
  }
}

// Merge local & server data (server wins conflicts)
function mergeQuotes(serverQuotes) {
  const localQuotes = quotes;

  // Create a map of server quotes using 'text' + 'category' as key
  const serverMap = new Map(
    serverQuotes.map(q => [`${q.text}-${q.category}`, q])
  );

  // Merge: add local quotes that aren’t on the server
  localQuotes.forEach(localQuote => {
    const key = `${localQuote.text}-${localQuote.category}`;
    if (!serverMap.has(key)) {
      serverMap.set(key, localQuote);
    }
  });

  // Save merged to local storage
  quotes = Array.from(serverMap.values());
  saveQuotes();
  populateCategories();
}

// Notification UI (simple)
function showNotification(message) {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.position = "fixed";
  note.style.bottom = "10px";
  note.style.right = "10px";
  note.style.padding = "10px";
  note.style.background = "lightgreen";
  note.style.border = "1px solid #333";
  document.body.appendChild(note);

  setTimeout(() => note.remove(), 3000);
}

// Event listeners
categoryFilter.addEventListener("change", filterQuotes);
showQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
exportButton.addEventListener("click", exportQuotes);
importInput.addEventListener("change", importQuotes);


loadQuotes();
populateCategories();
showRandomQuote();


