const fallbackQuotes = [
    {
        content: "La vie est soit une grande aventure ou rien.",
        author: "Helen Keller"
    },
    {
        content: "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.",
        author: "Winston Churchill"
    },
    {
        content: "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
        author: "Steve Jobs"
    },
    {
        content: "La créativité, c'est l'intelligence qui s'amuse.",
        author: "Albert Einstein"
    },
    {
        content: "Le plus grand plaisir dans la vie est de réaliser ce que les autres vous pensent incapable de réaliser.",
        author: "Walter Bagehot"
    }
];

let currentQuote = null;

const quoteBox = document.getElementById('quoteBox');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const themeToggle = document.getElementById('themeToggle');

async function fetchQuote() {
    showLoading();
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        currentQuote = { content: data.content, author: data.author };
    } catch (error) {
        console.error('Utilisation des citations locales:', error);
        currentQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
    displayQuote();
}

function showLoading() {
    quoteBox.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    `;
}

function displayQuote() {
    quoteBox.innerHTML = `
        <p class="quote-content">"${currentQuote.content}"</p>
        <p class="quote-author">- ${currentQuote.author}</p>
    `;
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

function shareQuote(platform) {
    const quoteText = `"${currentQuote.content}" - ${currentQuote.author}`;
    const encodedQuote = encodeURIComponent(quoteText);

    const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodedQuote}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedQuote}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedQuote}`,
        telegram: `https://t.me/share/url?url=${window.location.href}&text=${encodedQuote}`
    };

    window.open(shareUrls[platform], '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', fetchQuote);
themeToggle.addEventListener('click', toggleTheme);

document.querySelector('.whatsapp').addEventListener('click', () => shareQuote('whatsapp'));
document.querySelector('.facebook').addEventListener('click', () => shareQuote('facebook'));
document.querySelector('.twitter').addEventListener('click', () => shareQuote('twitter'));
document.querySelector('.telegram').addEventListener('click', () => shareQuote('telegram'));

// Initial quote fetch
fetchQuote();