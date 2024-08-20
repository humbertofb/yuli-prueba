document.addEventListener('DOMContentLoaded', function () {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password-input');
    const authError = document.getElementById('auth-error');

    const correctPassword = 'tuContraseñaSecreta'; // Cambia esto por la contraseña que quieras

    loginBtn.addEventListener('click', function () {
        if (passwordInput.value === correctPassword) {
            authContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
        } else {
            authError.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
        }
    });
});
