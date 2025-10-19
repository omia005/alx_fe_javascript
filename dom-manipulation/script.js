<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Generator</title>
</head>
<body>

  <h1>Random Quote Generator</h1>

  <!-- Display Quote Area -->
  <div id="quoteDisplay"></div>

  <!-- Buttons -->
  <button id="newQuote">Show Random Quote</button>
  <button id="addQuote">Add Quote</button>

  <!-- Add Quote Form -->
  <div>
    <input type="text" id="newQuoteText" placeholder="Enter a new quote">
    <input type="text" id="newQuoteCategory" placeholder="Enter category">
  </div>

  <!-- ✅ Static Export/Import UI (Fix for your error) -->
  <button id="exportQuotes">Export Quotes</button>
  <input type="file" id="importQuotes" accept=".json">

  <script src="script.js"></script>
</body>
</html>


