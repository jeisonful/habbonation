// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Configuración de Firebase
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
const auth = getAuth(app);

// Chequea si ya hay un usuario logueado al cargar la página
auth.onAuthStateChanged((user) => {
    if (user) {
        Swal.fire({
            toast: true,
            icon: "success",
            position: 'center',
            title: "Ya estás logueado.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
          }).then(function() {
        window.location.href = "/";
        });
    }
});

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario y agrega un event listener para el submit
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se recargue la página

        // Obtiene los valores de correo electrónico y contraseña
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        // Inicia sesión con Firebase Authentication
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                console.log(user);          
                Swal.fire({
                    toast: true,
                    icon: "success",
                    position: 'center',
                    title: "Has iniciado sesión como administrador",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 1500
                  }).then(function() {
                window.location.href = "/";
                });
            })
            .catch((error) => {
                // Manejo de errores
                console.error("Error al iniciar sesión:", error);
                let errorMessage = "Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.";
                if (error.code === "auth/user-not-found") {
                    errorMessage = "Usuario no encontrado. Verifica tu correo electrónico.";
                } else if (error.code === "auth/wrong-password") {
                    errorMessage = "Contraseña incorrecta. Verifica tu contraseña.";
                }
                Swal.fire({
                    toast: true,
                    icon: "error",
                    position: 'center',
                    title: errorMessage,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 1500
                  });
            });
    });
});