// Mostrar/Ocultar el Menú
document.getElementById('menu-icon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

// Cerrar el Menú al hacer clic fuera del menú o al seleccionar un enlace
document.body.addEventListener('click', function(e) {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block' && !e.target.closest('#menu') && !e.target.closest('#menu-icon')) {
        menu.style.display = 'none';
    }
});

// Cerrar el menú al seleccionar un enlace
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu').style.display = 'none';
    });
});

// Scroll a secciones
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Función para cuenta regresiva
function startCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "¡Ya estamos juntos!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Ejemplo: Fecha objetivo
const targetDate = new Date("Dec 31, 2024 23:59:59").getTime();
startCountdown(targetDate);

// Enviar Mensajes
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message').value;
    if (message.trim() !== "") {
        const messageDisplay = document.getElementById('messageDisplay');
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        messageDisplay.appendChild(newMessage);
        document.getElementById('message').value = ""; // Limpiar textarea
    }
});
