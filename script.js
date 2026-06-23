//select elements
let addBtn = document.querySelector("#addNote");
let notesContainer = document.querySelector("#notesContainer");

//create note
function createNote(text = "") {
   let note = document.createElement("div");
   note.classList.add("note");

   note.innerHTML = ` <textarea>${text}</textarea>
                      <button>Clear</button>`;
   
    let textarea = note.querySelector("textarea");
    let deleteBtn = note.querySelector("button");
    let pinBtn = document.createElement("button");
    pinBtn.innerText = "📌";

    let colorInput = document.createElement("input");
    colorInput.type = "color";

    let controls = document.createElement("div");
    controls.classList.add("note-controls");

//save while typing
textarea.addEventListener("input", saveNotes);

//delete notes
deleteBtn.addEventListener("click", () => {
    note.remove();
    saveNotes();
});

pinBtn.addEventListener("click", () => {
    note.classList.toggle("pinned");

    if (note.classList.contains("pinned")) {
        notesContainer.prepend(note); // move to top
    } else {
        notesContainer.appendChild(note); // move back
    }

    saveNotes();
});

//apply color
colorInput.addEventListener("input", () => {
    note.style.backgroundColor = colorInput.value;
    saveNotes();
});

note.appendChild(pinBtn);
note.appendChild(colorInput);
notesContainer.appendChild(note);

note.appendChild(controls);

}

addBtn.addEventListener("click", () => {
    createNote();
    saveNotes();
});

//save notes
function saveNotes() {
    let notes =[];

    document.querySelectorAll("textarea").forEach((note) => {
        let parent = note.parentElement;
        let text = note.value;
        let color = note.style.backgroundColor;
        let pinned = note.classList.contains("pinned");

        notes.push({ text, color, pinned });
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

//Load notes
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((n) => {
        createNote(n.text);

        let lastNote = notesContainer.lastChild;

    if (n.color) {
        lastNote.style.backgroundColor = n.color;
    }
        if (n.pinned) {
            lastNote.classList.add("pinned");
            notesContainer.prepend(lastNote);
        }
    });
}

// INITIAL LOAD
loadNotes();
