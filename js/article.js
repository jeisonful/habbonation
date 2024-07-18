import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

        // Function to get article ID from URL
        function getArticleId() {
            const params = new URLSearchParams(window.location.search);
            return params.get('article');
        }

        // Function to display the article
        function displayArticle(data) {
            const articleContainer = document.getElementById('article-container');
            articleContainer.innerHTML = `
                <div class="article-item">
                    <h4 class="titleItem">${data.title}</h4>
                    <br>
                    <br>
                    <p class="bodyItem">${data.body}</p>
                </div>
            `;
        }

        // Function to redirect to news page
        function redirectToNewsPage() {
            window.location.href = '?section=news';
        }

        document.addEventListener('DOMContentLoaded', async function () {
            const articleId = getArticleId();
            if (articleId) {
                const articleRef = ref(database, `news/${articleId}`);
                const snapshot = await get(articleRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    displayArticle(data);
                } else {
                    redirectToNewsPage();
                }
            } else {
                redirectToNewsPage();
            }
        });