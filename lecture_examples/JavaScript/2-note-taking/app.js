const noteInput = document.querySelector("#noteInput");
const addNoteBtn = document.querySelector("#addNoteBtn");
const notesList = document.querySelector("#notesList");
const searchInput = document.querySelector("#searchInput");
let notes; //declare notes for use elsewhere

document.addEventListener("DOMContentLoaded", () => {
    notes = JSON.parse(localStorage.getItem("notes")) || []; // Load notes from local storage

    // ----------------------------- //
    // uncommon the following AFTER testing it with regular interaction
    // to determine using basic fetching with async / await
    // fetchNotes();

    // add notes with local storage
    addNoteBtn.addEventListener("click", () => {
        const noteText = noteInput.value.trim();
        if (noteText === "") return;

        const note = {
            id: Date.now(),
            text: noteText
        };

        notes.push(note);
        saveNotes();
        renderNotes();
        noteInput.value = ""; // Clear input field
    });

    // Handle note actions (edit and delete) using event delegation
    notesList.addEventListener("click", (event) => {
        const target = event.target;
        const noteId = target.parentElement.dataset.id;

        if (target.classList.contains("delete")) {
            notes = notes.filter(note => note.id != noteId);
            saveNotes();
            renderNotes();
        } else if (target.classList.contains("edit")) {
            const newText = prompt("Edit your note:", target.parentElement.textContent);
            if (newText) {
                notes = notes.map(note => note.id == noteId ? { ...note, text: newText } : note);
                saveNotes();
                renderNotes();
            }
        }
    });

    //implement searching with regular expressions (through renderNotes function)
    searchInput.addEventListener("input", () => {
        renderNotes(searchInput.value);
    });
}); //end DOMContentLoaded

//render notes dynamically
function renderNotes(filter = "") {
    notesList.innerHTML = ""; // clear the list before re-rendering

    // If filter isn't nuil of empty (which is the default),
    // return the notes with the given filter
    // otherwise, return the notes without filtering
    // the "i" means "case-insensitive"
    const filteredNotes = filter
        ? notes.filter(note => new RegExp(filter, "i").text(note.text))
        : notes;

    filteredNotes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.text;
        li.dataset.id = note.id;
        li.classList.add("note");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
} //end renderNotes

// save the notes to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

//fetch fake notes from the JSONPlaceHolder API using async/await
async function fetchNotes() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await response.json();

        const fetchedNotes = data.map(post => ({
            id: post.id,
            text: post.title
        }));

        notes = [...fetchedNotes, ...notes];
        saveNotes();
        renderNotes();
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
}