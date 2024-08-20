import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

document.addEventListener('DOMContentLoaded', function () {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const authError = document.getElementById('auth-error');

    // Autenticación de usuario
    loginBtn.addEventListener('click', function () {
        const email = emailInput.value;
        const password = passwordInput.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authContainer.classList.add('hidden');
                appContainer.classList.remove('hidden');
            })
            .catch((error) => {
                authError.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
            });
    });

    // Cerrar sesión
    logoutBtn.addEventListener('click', function () {
        signOut(auth).then(() => {
            appContainer.classList.add('hidden');
            authContainer.classList.remove('hidden');
        });
    });
});
