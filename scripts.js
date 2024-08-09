document.getElementById('menuIcon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

document.getElementById('surpriseBtn').addEventListener('click', function() {
    alert('¡Te quiero muchísimo, no olvides lo especial que eres para mí!');
});
