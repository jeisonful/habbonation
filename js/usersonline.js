async function fetchOnlineUsersEs() {
    try {
        const response = await fetch('https://origins.habbo.es/api/public/origins/users');
        const data = await response.json();
        document.getElementById('online-es').innerHTML = `
            <img src="/images/online.gif" alt="Online">
            <span class="user-text">Usuarios conectados (España & Latinoamérica):</span>
            <span class="user-count">${data.onlineUsers}</span>
        `;
    } catch (error) {
        console.error('Error al obtener el número de usuarios en línea:', error);
        document.getElementById('online-es').innerHTML = `
            <img src="/images/online.gif" alt="Online">
            <span class="user-text">Error al cargar los usuarios en línea</span>
        `;
    }
}

async function fetchOnlineUsersEn() {
    try {
        const response = await fetch('https://origins.habbo.com/api/public/origins/users');
        const data = await response.json();
        document.getElementById('online-en').innerHTML = `
            <img src="/images/online.gif" alt="Online">
            <span class="user-text">Usuarios conectados (Anglosajón):</span>
            <span class="user-count">${data.onlineUsers}</span>
        `;
    } catch (error) {
        console.error('Error al obtener el número de usuarios en línea:', error);
        document.getElementById('online-en').innerHTML = `
            <img src="/images/online.gif" alt="Online">
            <span class="user-text">Error al cargar los usuarios en línea</span>
        `;
    }
}

async function fetchOnlineUsersBr() {
    try {
        const response = await fetch('https://origins.habbo.com.br/api/public/origins/users');
        const data = await response.json();
        document.getElementById('online-br').innerHTML = `
            <img src="/images/online.gif" alt="Online">
            <span class="user-text">Usuarios conectados (Brasil & Portugal):</span>
            <span class="user-count">${data.onlineUsers}</span>
        `;
    } catch (error) {
        console.error('Error al obtener el número de usuarios en línea:', error);
        document.getElementById('online-br').innerHTML = `
            <img src="/images/online.gif" alt="Online">
            <span class="user-text">Error al cargar los usuarios en línea</span>
        `;
    }
}

// Actualiza cada 5 segundos (5000 milisegundos)
setInterval(fetchOnlineUsersEs, 5000);
setInterval(fetchOnlineUsersEn, 5000);
setInterval(fetchOnlineUsersBr, 5000);

// Llama a las funciones inmediatamente al cargar la página
fetchOnlineUsersEs();
fetchOnlineUsersEn();
fetchOnlineUsersBr();
