document.addEventListener('DOMContentLoaded', () => {
    const notes = [
        "Te amo más que a nada en este mundo.",
        "Eres mi sol en los días nublados.",
        "Cada día contigo es un regalo."
    ];
    let currentNoteIndex = 0;

    const noteContainer = document.getElementById('note-container');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    function displayNote() {
        noteContainer.textContent = notes[currentNoteIndex];
    }

    prevButton.addEventListener('click', () => {
        if (currentNoteIndex > 0) {
            currentNoteIndex--;
            displayNote();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentNoteIndex < notes.length - 1) {
            currentNoteIndex++;
            displayNote();
        }
    });

    displayNote();
});
