const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const searchElement = document.getElementById('search');

function getTime() {
    setInterval(() => {
        timeElement.innerText = dayjs().format('HH:mm');
    }, 1000);
}

function getDate() {
    setInterval(() => {
        dateElement.innerText = dayjs().format('DD/MM/YYYY');
    }, 1000);
}

async function getQuote() {
    const data = await fetch('./assets/quotes.json');
    const quotes = await data.json()
    const number = Math.floor(Math.random() * (quotes.length + 1));
    quoteElement.innerText = `"${quotes[number]['text']}"`;
    authorElement.innerText = `- ${quotes[number]['author'] ?? 'Unknown'}`;
}

function search() {
    searchElement.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            const queryInfo = {
                disposition: 'CURRENT_TAB',
                text: searchElement.value
            };
            chrome.search.query(queryInfo);
        }
    });
}

async function main() {
    getTime();
    getDate();
    await getQuote();
    search();
}

main().then();