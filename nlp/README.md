<h1>NLP Module (RescueLens)</h1>

<p>
This folder contains the <b>Natural Language Processing (NLP)</b> logic used to analyze text and detect disaster-related information.
</p>

<hr>

<h2>📌 What This Module Does</h2>

<p>
It takes raw text (like social media posts) and extracts:
</p>

<ul>
<li>Disaster type (flood, fire, earthquake, accident)</li>
<li>City/location</li>
<li>Confidence level</li>
</ul>

<hr>

<h2>⚙️ How It Works (Step-by-Step)</h2>

<ol>
<li><b>Clean the text</b> → remove noise, convert to lowercase</li>
<li><b>Detect disaster</b> → match keywords</li>
<li><b>Detect location</b> → find city name</li>
<li><b>Assign confidence</b> → based on keyword count</li>
</ol>

<hr>

<h2>📂 Files Explained</h2>

<h3>cleaner.py</h3>
<p>
Preprocesses input text:
</p>
<ul>
<li>Converts text to lowercase</li>
<li>Removes URLs</li>
<li>Removes special characters</li>
</ul>

<h3>classifier.py</h3>
<p>
Detects disaster type using keyword matching.
</p>
<ul>
<li>Checks for disaster-related words</li>
<li>Counts how many matches are found</li>
<li>Returns disaster type and score</li>
</ul>

<h3>location.py</h3>
<p>
Extracts city from text.
</p>
<ul>
<li>Matches predefined city names</li>
<li>Returns detected city or "unknown"</li>
</ul>

<h3>scorer.py</h3>
<p>
Converts score into confidence level:
</p>
<ul>
<li>High → strong signal</li>
<li>Medium → moderate signal</li>
<li>Low → weak signal</li>
<li>None → no disaster</li>
</ul>

<h3>__init__.py</h3>
<p>
Marks this folder as a Python package so modules can be imported.
</p>

<hr>

<h2>🧪 Example</h2>

<pre>
Input:
"Heavy rain causing flooding in Mumbai"

Output:
Disaster: flood
City: mumbai
Confidence: high
</pre>

<hr>

<h2>🧠 Key Idea</h2>

<p>
This is a <b>rule-based NLP system</b>:
</p>

<ul>
<li>Fast and simple</li>
<li>No external dependencies</li>
<li>Easy to understand and modify</li>
</ul>

<hr>

<h2>⚠️ Limitations</h2>

<ul>
<li>Does not understand context (e.g., sarcasm)</li>
<li>Relies on keywords</li>
<li>Limited to predefined cities</li>
</ul>

<hr>

<h2>🚀 Future Scope</h2>

<ul>
<li>Use ML models (BERT, NLP embeddings)</li>
<li>Improve location detection (NER)</li>
<li>Handle spelling mistakes</li>
</ul>

<hr>

<p>
This module is designed to be <b>simple, modular, and upgradeable</b>.
</p>

