document.addEventListener('DOMContentLoaded', function () {
    const newNoteBtn = document.getElementById('new-note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeBtn = document.querySelector('.close-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const noteText = document.getElementById('note-text');
    const noteDate = document.getElementById('note-date');
    const notesContainer = document.getElementById('notes-container');
    const notification = document.getElementById('notification');

    // Cargar notas desde localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const today = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
        notesContainer.innerHTML = '';

        notes.forEach(note => {
            if (note.date <= today) {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.textContent = `${note.text} (Publicada el: ${note.date})`;
                notesContainer.appendChild(noteElement);
            } else {
                notification.classList.remove('hidden');
            }
        });
    }

    // Abrir el modal para agregar una nueva nota
    newNoteBtn.addEventListener('click', function () {
        noteModal.style.display = 'block';
    });

    // Cerrar el modal
    closeBtn.addEventListener('click', function () {
        noteModal.style.display = 'none';
    });

    // Guardar la nueva nota
    saveNoteBtn.addEventListener('click', function () {
        const note = {
            text: noteText.value,
            date: noteDate.value
        };

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        noteModal.style.display = 'none';
        noteText.value = '';  // Limpiar el textarea
        noteDate.value = '';  // Limpiar el campo de fecha
    });

    // Cargar notas al iniciar
    loadNotes();

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target == noteModal) {
            noteModal.style.display = 'none';
        }
    });
});
