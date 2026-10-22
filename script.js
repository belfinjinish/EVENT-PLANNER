// Event Planner - Main JavaScript File
// This file contains the application logic.

// ========================================================
// Step 1: Select DOM Elements
// ========================================================
// We grab references to HTML elements we need to interact with.

const addEventBtn = document.getElementById("add-event-btn");
const formContainer = document.getElementById("event-form-container");
const cancelBtn = document.getElementById("cancel-btn");
const eventForm = document.getElementById("event-form");
const eventsContainer = document.getElementById("events-container");
const formMessage = document.getElementById("form-message");

// Select each form input field
const eventNameInput = document.getElementById("event-name");
const eventDateInput = document.getElementById("event-date");
const eventTimeInput = document.getElementById("event-time");
const eventLocationInput = document.getElementById("event-location");
const eventCategoryInput = document.getElementById("event-category");
const eventDescriptionInput = document.getElementById("event-description");

// ========================================================
// Step 2: Create an Array to Store Events
// ========================================================
// This array will hold all the event objects created by the user.
// Each event is a JavaScript object with properties like name, date, etc.

const events = [];

// ========================================================
// Step 3: Define Helper Functions
// ========================================================

/**
 * showForm() — Makes the form visible by removing the "hidden" class.
 */
function showForm() {
    formContainer.classList.remove("hidden");
    hideMessage(); // Clear any old messages when re-opening
}

/**
 * hideForm() — Hides the form by adding the "hidden" class.
 */
function hideForm() {
    formContainer.classList.add("hidden");
    hideMessage();
}

/**
 * showMessage(text, type) — Displays a validation message to the user.
 * @param {string} text - The message to show.
 * @param {string} type - Either "error" or "success".
 */
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type; // Replaces all classes
}

/**
 * hideMessage() — Hides the validation message.
 */
function hideMessage() {
    formMessage.textContent = "";
    formMessage.className = "form-message hidden";
}

/**
 * clearForm() — Resets all form inputs back to their default empty state.
 */
function clearForm() {
    eventForm.reset(); // Built-in method that clears all fields in a <form>
}

/**
 * formatDate(dateString) — Converts "2026-10-25" into "October 25, 2026".
 * @param {string} dateString - A date in YYYY-MM-DD format from the date input.
 * @returns {string} A human-readable date string.
 */
function formatDate(dateString) {
    const dateObj = new Date(dateString + "T00:00:00"); // Avoid timezone issues
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return dateObj.toLocaleDateString("en-US", options);
}

/**
 * formatTime(timeString) — Converts "14:30" into "02:30 PM".
 * @param {string} timeString - A time in HH:MM format from the time input.
 * @returns {string} A human-readable time string.
 */
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ========================================================
// Step 4: Function to Create an Event Card (DOM Element)
// ========================================================

/**
 * createEventCard(event) — Builds a card element from an event object
 * and returns it. This card matches the design of the sample cards.
 *
 * @param {object} event - An event object with name, date, time, etc.
 * @returns {HTMLElement} An <article> element representing the event card.
 */
function createEventCard(event) {
    // Create the outer <article> element
    const card = document.createElement("article");
    card.classList.add("event-card");

    // Build the inner HTML of the card
    card.innerHTML = `
        <div class="card-category-tag category-${event.category}">${event.category}</div>
        <div class="card-body">
            <h3 class="card-title">${event.name}</h3>
            <ul class="card-details">
                <li class="card-detail">
                    <span class="detail-icon">📆</span>
                    <span>${formatDate(event.date)}</span>
                </li>
                <li class="card-detail">
                    <span class="detail-icon">🕐</span>
                    <span>${formatTime(event.time)}</span>
                </li>
                <li class="card-detail">
                    <span class="detail-icon">📍</span>
                    <span>${event.location}</span>
                </li>
            </ul>
            <p class="card-description">${event.description || "No description provided."}</p>
        </div>
        <div class="card-actions">
            <button class="btn-edit" type="button">✏️ Edit</button>
            <button class="btn-delete" type="button">🗑️ Delete</button>
        </div>
    `;

    return card;
}

// ========================================================
// Step 5: Function to Display a New Event Card
// ========================================================

/**
 * displayEvent(event) — Takes an event object, creates a card,
 * and inserts it at the TOP of the events container so the
 * newest event appears first.
 *
 * @param {object} event - The event object to display.
 */
function displayEvent(event) {
    const card = createEventCard(event);

    // Insert the new card at the beginning (before existing cards)
    eventsContainer.insertBefore(card, eventsContainer.firstChild);
}

// ========================================================
// Step 6: Handle Form Submission
// ========================================================

/**
 * handleFormSubmit(e) — Runs when the user clicks "Create Event".
 *
 * It does the following:
 * 1. Prevents the page from reloading (default form behavior).
 * 2. Reads the values from each input field.
 * 3. Validates required fields (name and date).
 * 4. Creates an event object.
 * 5. Adds the object to the events array.
 * 6. Displays the new card.
 * 7. Clears and hides the form.
 *
 * @param {Event} e - The submit event object provided by the browser.
 */
function handleFormSubmit(e) {
    // --- 6a. Prevent default behavior ---
    // Without this, the browser would reload the page when the form is submitted.
    e.preventDefault();

    // --- 6b. Read input values ---
    // .value gets the text the user typed or selected.
    // .trim() removes extra spaces from the start and end.
    const name = eventNameInput.value.trim();
    const date = eventDateInput.value;
    const time = eventTimeInput.value;
    const location = eventLocationInput.value.trim();
    const category = eventCategoryInput.value;
    const description = eventDescriptionInput.value.trim();

    // --- 6c. Validate required fields ---
    if (name === "") {
        showMessage("⚠️ Please enter an event name.", "error");
        eventNameInput.focus(); // Move cursor to the empty field
        return; // Stop here — do not create the event
    }

    if (date === "") {
        showMessage("⚠️ Please select a date.", "error");
        eventDateInput.focus();
        return;
    }

    // --- 6d. Create an event object ---
    // A JavaScript object groups related data together with named keys.
    const newEvent = {
        name: name,
        date: date,
        time: time || "00:00",       // Default if no time selected
        location: location || "TBD", // Default if no location entered
        category: category || "other",
        description: description,
    };

    // --- 6e. Add to the events array ---
    events.push(newEvent);
    console.log("Event created:", newEvent);
    console.log("All events:", events);

    // --- 6f. Display the new event card ---
    displayEvent(newEvent);

    // --- 6g. Show success, clear form, then hide it ---
    showMessage("✅ Event created successfully!", "success");

    clearForm();

    // Hide the form after a short delay so the user can see the success message
    setTimeout(function () {
        hideForm();
    }, 1000);
}

// ========================================================
// Step 7: Attach Event Listeners
// ========================================================

// When the "Add Event" button is clicked → show the form
addEventBtn.addEventListener("click", showForm);

// When the "Cancel" button is clicked → hide the form
cancelBtn.addEventListener("click", hideForm);

// When the form is submitted → handle creation
eventForm.addEventListener("submit", handleFormSubmit);

console.log("Event Planner app loaded successfully!");
