// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAldNScIrt21pLLf6Q4-y1mN88--bYhYCY",
    authDomain: "habbos-68e47.firebaseapp.com",
    databaseURL: "https://habbos-68e47-default-rtdb.firebaseio.com",
    projectId: "habbos-68e47",
    storageBucket: "habbos-68e47.appspot.com",
    messagingSenderId: "617135519302",
    appId: "1:617135519302:web:ccd6d60f01220fc0923c47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const ITEMS_PER_PAGE = 4; // Número de noticias por página
let currentPage = 1; // Página actual

// Verifica el estado de autenticación del usuario al cargar la página
onAuthStateChanged(auth, (user) => {
    const createNewsBtn = document.getElementById("create-news-btn");
    if (user) {
        // Si hay un usuario autenticado, muestra el botón de crear noticia
        createNewsBtn.style.display = "block";
        // Añade el manejador de eventos al botón
        createNewsBtn.addEventListener('click', () => {
            window.location.href = "?section=create-news";
        });
    } else {
        // Si no hay un usuario autenticado, oculta el botón de crear noticia
        createNewsBtn.style.display = "none";
    }
});

// Reference to the "news" node in your Firebase database
const newsRef = ref(database, 'news');

// Function to handle click event
function handleItemClick(id) {
    window.location.href = `?article=${id}`;
}

// Function to create a news element
function createNewsItem(id, data) {
    const newsContainer = document.getElementById('news-container');

    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    const img = document.createElement('img');
    img.className = 'imageIcon';
    img.src = data.imageIcon;
    img.alt = '';
    img.addEventListener('click', () => handleItemClick(id)); // Add click event to image

    const h4 = document.createElement('h4');
    h4.className = 'titleItem';
    h4.textContent = data.title;

    const p = document.createElement('p');
    p.className = 'introItem';
    p.innerHTML = data.textIntro.length > 60 ? data.textIntro.substring(0, 60) + '...' : data.textIntro;

    const date = document.createElement('p');
    date.className = 'dateItem';
    date.innerHTML = `<i class="far fa-clock"></i> ${data.dateTime}`;

    const readMoreButton = document.createElement('a');
    readMoreButton.className = 'read-more-button';
    readMoreButton.textContent = 'Leer más';
    readMoreButton.href = `?article=${id}`; // Set the URL to the article page with the article ID

    newsItem.appendChild(img);
    newsItem.appendChild(h4);
    newsItem.appendChild(p);
    newsItem.appendChild(readMoreButton);
    newsItem.appendChild(date);

    newsContainer.appendChild(newsItem);
}

// Function to display news items in reverse order
function displayNewsItems(data) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing news items

    const keys = Object.keys(data);
    const totalPages = Math.ceil(keys.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = keys.slice().reverse().slice(startIndex, endIndex);

    for (const key of currentItems) {
        const item = data[key];
        createNewsItem(key, item); // Pass the key (ID) and data to createNewsItem
    }

    // Update pagination
    updatePagination(totalPages);
}

// Function to update pagination buttons
function updatePagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination buttons

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'page-button';
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            // Fetch data again to update displayed items
            onValue(newsRef, (snapshot) => {
                const data = snapshot.val();
                displayNewsItems(data);
            });
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Fetch data from Firebase and create news items
onValue(newsRef, (snapshot) => {
    const data = snapshot.val();
    displayNewsItems(data);
});
