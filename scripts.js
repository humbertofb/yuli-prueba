document.getElementById('menu-icon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

document.body.addEventListener('click', function(e) {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block' && !e.target.closest('#menu') && !e.target.closest('#menu-icon')) {
        menu.style.display = 'none';
    }
});
