document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages-container');
    const clearBtn = document.getElementById('clear-btn');

    // ==========================================
    // 1. KNOWLEDGE BASE (EXPANDED)
    // ==========================================

    const factDB = {
        "capital": {
            "india": "New Delhi",
            "telangana": "Hyderabad",
            "andhra pradesh": "Amaravati",
            "karnataka": "Bengaluru",
            "maharashtra": "Mumbai",
            "tamil nadu": "Chennai",
            "kerala": "Thiruvananthapuram",
            "usa": "Washington, D.C.",
            "uk": "London",
            "japan": "Tokyo",
            "france": "Paris",
            "germany": "Berlin",
            "russia": "Moscow",
            "china": "Beijing",
            "australia": "Canberra",
            "canada": "Ottawa",
            "brazil": "Brasília",
            "south africa": "Pretoria (Executive), Cape Town (Legislative)",
            "nepal": "Kathmandu",
            "srilanka": "Sri Jayawardenepura Kotte",
            "bangladesh": "Dhaka",
            "pakistan": "Islamabad",
            "italy": "Rome",
            "spain": "Madrid"
        },
        "leader": { // PMs and Presidents combined logic
            "india": "Prime Minister Narendra Modi",
            "usa": "President Joe Biden",
            "uk": "Prime Minister Rishi Sunak",
            "russia": "President Vladimir Putin",
            "china": "President Xi Jinping",
            "japan": "Prime Minister Fumio Kishida",
            "canada": "Prime Minister Justin Trudeau",
            "france": "President Emmanuel Macron",
            "nepal": "Prime Minister Pushpa Kamal Dahal (Prachanda)",
            "bangladesh": "Prime Minister Sheikh Hasina",
            "australia": "Prime Minister Anthony Albanese",
            "brazil": "President Luiz Inácio Lula da Silva"
        },
        "currency": {
            "india": "Indian Rupee (INR)",
            "usa": "United States Dollar (USD)",
            "uk": "British Pound (GBP)",
            "japan": "Japanese Yen (JPY)",
            "europe": "Euro (EUR)",
            "russia": "Russian Ruble (RUB)",
            "china": "Renminbi (CNY)"
        },
        "science": {
            "light speed": "The speed of light is approximately 299,792,458 meters per second.",
            "gravity": "The acceleration due to gravity on Earth is approximately 9.8 m/s².",
            "pi": "Pi (π) is approximately 3.14159.",
            "photosynthesis": "Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
            "dna": "DNA (Deoxyribonucleic acid) carries the genetic instructions for the development and function of living things."
        }
    };

    // ALGORITHM REPOSITORY (Multi-Language)
    const algoDB = {
        "prime": {
            "python": "def is_prime(n):\n    if n <= 1: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True",
            "c": "int isPrime(int n) {\n    if (n <= 1) return 0;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return 0;\n    }\n    return 1;\n}",
            "java": "static boolean isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}",
            "javascript": "function isPrime(n) {\n    if (n <= 1) return false;\n    for (let i = 2; i * i <= n; i++) {\n        if (n % i === 0) return false;\n    }\n    return true;\n}"
        },
        "factorial": {
            "python": "def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)",
            "c": "long long factorial(int n) {\n    return (n == 0) ? 1 : n * factorial(n - 1);\n}",
            "java": "static long factorial(int n) {\n    return (n == 0) ? 1 : n * factorial(n - 1);\n}"
        },
        "fibonacci": {
            "python": "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=' ')\n        a, b = b, a+b",
            "c": "void fib(int n) {\n    int a = 0, b = 1, next;\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", a);\n        next = a + b;\n        a = b;\n        b = next;\n    }\n}"
        },
        "bubble sort": {
            "python": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr",
            "c": "void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n}"
        },
        "binary search": {
            "python": "def binary_search(arr, x):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == x: return mid\n        elif arr[mid] < x: low = mid + 1\n        else: high = mid - 1\n    return -1",
            "java": "int binarySearch(int arr[], int x) {\n    int l = 0, r = arr.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}"
        }
        // Easy to add more here...
    };

    // ==========================================
    // 2. INTELLIGENT ROUTER
    // ==========================================

    function processQuery(input) {
        const lowerInput = input.toLowerCase().trim();

        // 1. RESTRICTIONS
        if (/generate\s*image|draw|create\s*picture/i.test(lowerInput)) {
            return "Image generation is available only for 1% privileged users of Swaroop AI.";
        }

        // 2. IDENTITY
        if (/who\s*created\s*you/.test(lowerInput)) return "I was created by Swaroop.";
        if (/who\s*are\s*you/.test(lowerInput)) return "I am Swaroop AI, your intelligent coding assistant and knowledge companion. I can help with Algorithms, Facts, and General Queries.";

        // 3. FACT ENGINE
        // Capitals
        if (lowerInput.includes("capital")) {
            for (const [place, cap] of Object.entries(factDB.capital)) {
                if (lowerInput.includes(place)) return `The capital of ${toTitleCase(place)} is ${cap}.`;
            }
        }
        // Leaders (PM/President)
        if (lowerInput.includes("prime minister") || lowerInput.includes("pm") || lowerInput.includes("president") || lowerInput.includes("leader")) {
            for (const [country, leader] of Object.entries(factDB.leader)) {
                if (lowerInput.includes(country)) return `The leader of ${toTitleCase(country)} is ${leader}.`;
            }
        }
        // Currencies
        if (lowerInput.includes("currency")) {
            for (const [country, curr] of Object.entries(factDB.currency)) {
                if (lowerInput.includes(country)) return `The currency of ${toTitleCase(country)} is ${curr}.`;
            }
        }
        // Science
        for (const [key, fact] of Object.entries(factDB.science)) {
            if (lowerInput.includes(key)) return fact;
        }

        // 4. ALGORITHM ENGINE
        if (/code|program|function|write|algorithm/.test(lowerInput) || Object.keys(algoDB).some(k => lowerInput.includes(k))) {
            // Language Detection
            let lang = "python"; // Default
            if (lowerInput.includes("java") && !lowerInput.includes("script")) lang = "java";
            else if (lowerInput.includes("c++") || lowerInput.includes("cpp")) lang = "cpp"; // map
            else if (lowerInput.includes(" c ") || lowerInput.endsWith(" c") || lowerInput.includes("in c")) lang = "c";
            else if (lowerInput.includes("javascript") || lowerInput.includes("js")) lang = "javascript";

            // Topic Detection
            let topic = null;
            if (lowerInput.includes("prime")) topic = "prime";
            if (lowerInput.includes("factorial")) topic = "factorial";
            if (lowerInput.includes("fibonacci")) topic = "fibonacci";
            if (lowerInput.includes("bubble")) topic = "bubble sort";
            if (lowerInput.includes("binary") && lowerInput.includes("search")) topic = "binary search";

            if (topic) {
                // Fallback mechanism if specific lang is missing for that topic
                const codeSnippet = algoDB[topic][lang] || algoDB[topic]["python"];
                const langLabel = lang === 'c' ? 'c' : lang; // for PrismJS highlighting naming

                let intro = `Here is the ${toTitleCase(lang)} implementation for ${toTitleCase(topic)}:`;
                if (!algoDB[topic][lang]) intro = `I have provided the solution in Python as I am currently updating my ${toTitleCase(lang)} database for this specific algorithm:`;

                return `${intro}\n\n<pre><code class='language-${langLabel}'>${codeSnippet}</code></pre>`;
            }
        }

        // 5. DOMAIN ENGINE (Conversational Fallbacks)
        if (lowerInput.includes("space") || lowerInput.includes("universe")) return "Space is the boundless three-dimensional extent in which objects and events have relative position and direction. It is a fascinating subject involving stars, galaxies, and black holes.";
        if (lowerInput.includes("thank")) return "You are welcome! Let me know if you need anything else.";
        if (lowerInput.includes("hi") || lowerInput.includes("hello")) return "Hello there! I am Swaroop AI. How can I assist you today? You can ask me about Coding, Capitals, or Science.";

        // Final Fallback
        return "I am constantly learning. I can currently help with Algorithms (Primes, Sorting), Capitals of countries, Leaders, and Science facts. Please ask a specific question!";
    }

    // Helper
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
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

            const typingId = showTypingIndicator();
            scrollToBottom();

            // Natural delay for "Thinking" feel
            setTimeout(() => {
                removeTypingIndicator(typingId);
                const response = processQuery(messageText);
                addMessage(response, 'system');
                scrollToBottom();
            }, 600 + Math.random() * 600);
        }
    });

    // Clear Chat
    clearBtn.addEventListener('click', () => {
        if (confirm("Start a new session?")) {
            resetChat();
        }
    });

    function resetChat() {
        messagesContainer.innerHTML = '';
        const welcomeMsg = `
        <div class="message system-message">
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="bubble">
                <p>Hello! I am <strong>Swaroop AI</strong>. I am here to help you with coding, studies, and general knowledge. How can I assist you today?</p>
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

        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message system-message';
        typingDiv.id = id;
        typingDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="typing-indicator">
                <div class="dot"></div><div class="dot"></div><div class="dot"></div>
            </div>`;
        messagesContainer.appendChild(typingDiv);
        return id;
    }

    function removeTypingIndicator(id) {
        const element = document.getElementById(id);
        if (element) element.remove();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
