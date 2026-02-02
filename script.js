document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages-container');
    const clearBtn = document.getElementById('clear-btn');

    // ==========================================
    // DATA ENGINE (Optimized for Direct Access)
    // ==========================================

    const factDB = {
        "capital": {
            "india": "New Delhi",
            "telangana": "Hyderabad",
            "andhra pradesh": "Amaravati",
            "karnataka": "Bengaluru",
            "maharashtra": "Mumbai",
            "tamil nadu": "Chennai",
            "nepal": "Kathmandu",
            "usa": "Washington, D.C.",
            "uk": "London",
            "japan": "Tokyo"
        },
        "pm": {
            "india": "Narendra Modi",
            "nepal": "Pushpa Kamal Dahal (Prachanda)",
            "uk": "Rishi Sunak",
            "canada": "Justin Trudeau"
        },
        "currency": {
            "india": "Indian Rupee (INR)",
            "usa": "US Dollar (USD)",
            "uk": "British Pound (GBP)",
            "japan": "Japanese Yen (JPY)",
            "europe": "Euro (EUR)"
        }
    };

    const algoDB = {
        "prime": {
            "python": "def is_prime(n):\n    if n <= 1: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True",
            "c": "int isPrime(int n) {\n    if (n <= 1) return 0;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return 0;\n    }\n    return 1;\n}",
            "java": "boolean isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}",
            "javascript": "function isPrime(n) {\n    if (n <= 1) return false;\n    for (let i = 2; i * i <= n; i++) {\n        if (n % i === 0) return false;\n    }\n    return true;\n}"
        },
        "factorial": {
            "python": "def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)",
            "c": "long long factorial(int n) {\n    return (n == 0) ? 1 : n * factorial(n - 1);\n}",
            "java": "long factorial(int n) {\n    return (n == 0) ? 1 : n * factorial(n - 1);\n}",
            "javascript": "function factorial(n) {\n    return (n === 0) ? 1 : n * factorial(n - 1);\n}"
        }
    };

    // ==========================================
    // LOGIC ROUTER (High Speed)
    // ==========================================

    function processQuery(input) {
        const lowerInput = input.toLowerCase().trim();

        // 1. RESTRICTIONS
        if (/generate\s*image|draw/i.test(lowerInput)) {
            return "Image generation available only for 1% privileged users.";
        }

        // 2. IDENTITY
        if (/who\s*created\s*you/.test(lowerInput)) return "I was created by Swaroop.";
        if (/who\s*are\s*you/.test(lowerInput)) return "Swaroop AI. B.Tech Data Science assistant.";

        // 3. FACTS (Direct Return)
        // Check Capital
        if (lowerInput.includes("capital")) {
            for (const [place, cap] of Object.entries(factDB.capital)) {
                if (lowerInput.includes(place)) return cap;
            }
        }
        // Check PM
        if (lowerInput.includes("prime minister") || lowerInput.includes("pm")) {
            for (const [country, name] of Object.entries(factDB.pm)) {
                if (lowerInput.includes(country)) return name;
            }
        }
        // Check Currency
        if (lowerInput.includes("currency")) {
            for (const [country, curr] of Object.entries(factDB.currency)) {
                if (lowerInput.includes(country)) return curr;
            }
        }

        // 4. ALGORITHMS (Code Only)
        if (/code|program|function|write/.test(lowerInput)) {
            // Language Detection
            let lang = "python"; // Default
            if (lowerInput.includes("java") && !lowerInput.includes("script")) lang = "java";
            else if (lowerInput.includes("c++") || lowerInput.includes("cpp")) lang = "cpp"; // map to c if needed
            else if (lowerInput.includes(" c ") || lowerInput.endsWith(" c")) lang = "c";
            else if (lowerInput.includes("javascript") || lowerInput.includes("js")) lang = "javascript";

            // Topic Detection
            let topic = null;
            if (lowerInput.includes("prime")) topic = "prime";
            if (lowerInput.includes("factorial")) topic = "factorial";

            if (topic) {
                const codeSnippet = algoDB[topic][lang] || algoDB[topic]["python"];
                const langLabel = lang === 'c' ? 'c' : lang;
                return `<pre><code class='language-${langLabel}'>${codeSnippet}</code></pre>`;
            }
        }

        // 5. DOMAIN / FALLBACK
        if (lowerInput.includes("space")) return "Space: The boundless three-dimensional extent in which objects and events have relative position and direction.";

        return "Query unclear. Specify topic (Algo/Fact) vs details.";
    }

    // ==========================================
    // UI HANDLERS
    // ==========================================

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = userInput.value.trim();

        if (messageText) {
            addMessage(messageText, 'user');
            userInput.value = '';

            // Fast response (minimal delay)
            setTimeout(() => {
                const response = processQuery(messageText);
                addMessage(response, 'system');
                scrollToBottom();
            }, 200); // 200ms latency for "instant" feel
        }
    });

    // Clear Chat
    clearBtn.addEventListener('click', () => {
        if (confirm("Reset session?")) {
            resetChat();
        }
    });

    function resetChat() {
        messagesContainer.innerHTML = '';
        const welcomeMsg = `
        <div class="message system-message">
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="bubble">
                <p>Swaroop AI Online. Ready.</p>
                <span class="timestamp">Now</span>
            </div>
        </div>`;
        messagesContainer.insertAdjacentHTML('beforeend', welcomeMsg);
    }

    function addMessage(text, type) {
        const isUser = type === 'user';
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'system-message'}`;
        const avatarIcon = isUser ? 'fa-user' : 'fa-robot';

        msgDiv.innerHTML = `
            <div class="avatar">
                <i class="fa-solid ${avatarIcon}"></i>
            </div>
            <div class="bubble">
                <div class="message-content">${text}</div>
                <span class="timestamp">${getCurrentTime()}</span>
            </div>
        `;

        // Remove emoji styles from Bubble if System (Professional look)
        if (!isUser) {
            // Optional: logic to keep it simple
        }

        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
