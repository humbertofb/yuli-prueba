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

//// Configuración de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyBfGBf5Zmp1hEZHT9aKIhTRcXjULD-jbGw",
            authDomain: "mi-web-5402c.firebaseapp.com",
            databaseURL: "https://mi-web-5402c-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "mi-web-5402c",
            storageBucket: "mi-web-5402c.appspot.com",
            messagingSenderId: "31272724190",
            appId: "1:31272724190:web:51fcc8750c51abf783844f"
        };

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Autenticación anónima
firebase.auth().signInAnonymously()
    .catch((error) => {
        console.error("Error al autenticar:", error);
    });

// Referencia a Firestore
const db = firebase.firestore();

// Guardar una nueva nota
function saveNote(note) {
    db.collection("notes").add({
        text: note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Nota guardada!");
    }).catch((error) => {
        console.error("Error al guardar la nota:", error);
    });
}

// Recuperar notas
function loadNotes() {
    db.collection("notes").orderBy("timestamp").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            notes.push(doc.data().text);
        });
        displayNote();
    }).catch((error) => {
        console.error("Error al cargar las notas:", error);
    });
}

// Llama a loadNotes al cargar la página
loadNotes();

const responseText = document.getElementById('response-text');
const sendResponseButton = document.getElementById('send-response');

sendResponseButton.addEventListener('click', () => {
    const response = responseText.value;
    if (response) {
        saveResponse(response);
        responseText.value = '';
    }
});

function saveResponse(response) {
    db.collection("responses").add({
        text: response,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Respuesta guardada!");
    }).catch((error) => {
        console.error("Error al guardar la respuesta:", error);
    });
}
