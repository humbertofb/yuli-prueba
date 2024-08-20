import { db } from './firebase-config.js';
import { collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";

document.addEventListener('DOMContentLoaded', function () {
    const newNoteBtn = document.getElementById('new-note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeBtn = document.querySelector('.close-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const noteText = document.getElementById('note-text');
    const noteDate = document.getElementById('note-date');
    const notesContainer = document.getElementById('notes-container');
    const notification = document.getElementById('notification');

    const notesRef = collection(db, "notes");

    // Cargar notas desde Firestore
    function loadNotes() {
        const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const q = query(notesRef, where("date", "<=", today));

        onSnapshot(q, (querySnapshot) => {
            notesContainer.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const note = doc.data();
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.textContent = `${note.text} (Publicada el: ${note.date})`;
                notesContainer.appendChild(noteElement);
            });

            // Notificación de nuevas notas futuras
            const futureNotesQuery = query(notesRef, where("date", ">", today));
            getDocs(futureNotesQuery).then(snapshot => {
                if (!snapshot.empty) {
                    notification.classList.remove('hidden');
                }
            });
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

    // Guardar la nueva nota en Firestore
    saveNoteBtn.addEventListener('click', async function () {
        const note = {
            text: noteText.value,
            date: noteDate.value
        };

        try {
            await addDoc(notesRef, note);
            loadNotes();
            noteModal.style.display = 'none';
            noteText.value = '';  // Limpiar el textarea
            noteDate.value = '';  // Limpiar el campo de fecha
        } catch (e) {
            console.error("Error al agregar el documento: ", e);
        }
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
