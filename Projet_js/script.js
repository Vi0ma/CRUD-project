// Ensure the welcome section is active on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('section-title').textContent = 'Welcome to Your Dashboard';
});

// Sidebar Navigation
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Deactivate all sections
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        
        // Activate the corresponding section
        const sectionId = e.target.dataset.section;
        document.getElementById(sectionId).classList.add('active');
        
        // Update the title
        document.getElementById('section-title').textContent = e.target.textContent;
    });
});

// Function to render lists with document and image support
function renderList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name || 'Unnamed Item'}</strong>`;
        
        if (item.file) {
            // Handle image and document display
            const fileType = item.file.type;
            if (fileType.includes('image')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(item.file);
                img.alt = 'Image';
                img.style.maxWidth = '100px';
                li.appendChild(img);
            } else {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(item.file);
                link.textContent = 'View Document';
                link.target = '_blank';
                li.appendChild(link);
            }
        }
        //Add update and delete buttons
        li.innerHTML += `
            <button class="update" onclick="updateItem(${index}, '${listId}')">Update</button>
            <button class="delete" onclick="deleteItem(${index}, '${listId}')">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Add Function for Name and File
function addItem(inputId, fileInputId, list, listId) {
    const input = document.getElementById(inputId);
    const fileInput = document.getElementById(fileInputId);
    const newItem = { name: input.value.trim() || 'Unnamed Item' };

    if (fileInput.files.length > 0) {
        newItem.file = fileInput.files[0];
        fileInput.value = '';
    }

    if (!newItem.name && !newItem.file) {
        alert('Please enter a valid name or select a file.');
        return;
    }

    input.value = '';
    list.push(newItem);
    renderList(listId, list);
}

// Function to add a new item to the list
function addItem(inputId, fileInputId, list, listId) {
    // Get the input element by its ID
    const input = document.getElementById(inputId);
    // Get the file input element by its ID
    const fileInput = document.getElementById(fileInputId);
    // Trim the input value to remove leading and trailing whitespace
    const trimmedName = input.value.trim();

    // Check if the input is empty and no file is selected
    if (!trimmedName && fileInput.files.length === 0) {
        // Show an alert if both are empty
        alert('Please enter a valid name or select a file.');
        return;
    }

    // Create a new item with the trimmed name or 'Unnamed Item'
    const newItem = { name: trimmedName || 'Unnamed Item' };

    // If a file is selected, add it to the new item
    if (fileInput.files.length > 0) {
        newItem.file = fileInput.files[0];
        // Clear the file input value
        fileInput.value = '';
    }

    // Clear the input field value
    input.value = '';
    // Add the new item to the list
    list.push(newItem);
    // Display the updated list
    renderList(listId, list);
}

// Function to update an existing item in the list
function updateItem(index, listId) {
    // Get the list by its ID
    const list = getListById(listId);
    // Prompt the user to edit the name of the item
    const newName = prompt('Edit name:', list[index].name || 'Unnamed Item').trim();
    // If a new name is provided, update the item's name
    if (newName) list[index].name = newName;

    // Create a new file input element
    const newFileInput = document.createElement('input');
    // Set the type of the file input to 'file'
    newFileInput.type = 'file';
    // Add an onchange event to the file input
    newFileInput.onchange = () => {
        // If a new file is selected, update the item's file
        if (newFileInput.files.length > 0) {
            list[index].file = newFileInput.files[0];
        }
        // Display the updated list
        renderList(listId, list);
    };
    // Trigger a click event on the file input to open the file selector
    newFileInput.click();
}

// Function to delete an item from the list
function deleteItem(index, listId) {
    // Get the list by its ID
    const list = getListById(listId);
    // Remove the item at the specified index from the list
    list.splice(index, 1);
    // Render the updated list
    renderList(listId, list);
}


// Helper function to get the list by its ID
function getListById(listId) {
    switch (listId) {
        case 'projectList':
            return projects;
        case 'apiList':
            return apis;
        case 'snippetList':
            return snippets;
        case 'bugList':
            return bugs;
        default:
            return [];
    }
}

// Projects
let projects = [];
function addProject() {
    addItem('projectInput', 'projectFileInput', projects, 'projectList');
}

// APIs
let apis = [];
function addAPI() {
    addItem('apiInput', 'apiFileInput', apis, 'apiList');
}

// Snippets
let snippets = [];
function addSnippet() {
    addItem('snippetInput', 'snippetFileInput', snippets, 'snippetList');
}

// Bugs
let bugs = [];
function addBug() {
    addItem('bugInput', 'bugFileInput', bugs, 'bugList');
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    alert('Logged out!');
    window.location.href = 'login.html';
});