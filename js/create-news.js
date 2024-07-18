// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una referencia a la base de datos y a la autenticación
const db = getDatabase(app);
const auth = getAuth(app);

// Función para validar el formulario
function validateForm() {
    const title = document.getElementById("title").value.trim();
    const textIntro = document.getElementById("textIntro").value.trim();
    const body = document.getElementById("body").value.trim();
    const date = document.getElementById("date").value.trim();
    const imgIcon = document.getElementById("imgIcon").value.trim();

    if (!title || !textIntro || !body || !date || !imgIcon) {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "Por favor, complete todos los campos con texto.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          });
        return false;
    }

    // Verifica longitud mínima para el texto de introducción
    if (textIntro.length < 50) {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "El texto de la portada debe tener al menos 50 caracteres.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          });
        return false;
    }

    return { title, textIntro, body, date, imgIcon };
}

// Manejo del evento click en el botón "submit"
document.getElementById("submit").addEventListener('click', function(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
  
    // Verifica si el usuario está autenticado
    const user = auth.currentUser;
    if (!user) {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "Debes iniciar sesión con administrador.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          });
        return;
    }

    const formData = validateForm();
    if (!formData) {
        return;
    }

    // Guarda los datos en la base de datos
    const newNewsRef = push(ref(db, 'news')); // Genera una nueva clave para la noticia
    set(newNewsRef, {
        title: formData.title,
        textIntro: formData.textIntro,
        body: formData.body,
        dateTime: formData.date,
        imageIcon: formData.imgIcon,
        createdBy: user.uid  // Almacena el UID del usuario que creó la noticia
    })
    .then(() => {

        Swal.fire({
            toast: true,
            icon: "success",
            position: 'center',
            title: "¡Noticia creada con éxito!",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          }).then(function() {
                document.getElementById("create-news-form").reset(); // Limpia el formulario después de guardar
        window.location.href = "?section=news";
                });
    })
    .catch((error) => {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "Hubo un error al crear la noticia.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          });
    });
});

// Verifica el estado de autenticación del usuario al cargar la página
onAuthStateChanged(auth, (user) => {
    if (!user) {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "Debes iniciar sesión con administrador.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          }).then(function() {
                
                window.location.href = "?section=admin";
                });
    }
});
