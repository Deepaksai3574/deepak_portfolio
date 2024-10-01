// Smooth transition on specific navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);  // Get the section ID
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('d-none');  // Hide all sections
        });
        document.getElementById(target).classList.remove('d-none');  // Show the target section
    });
});

// Login functionality and animation
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if (username === "" || password === "") {
        alert("Username and password cannot be empty");
    } else {
        // Hide all sections first
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('d-none');
        });
        
        // Show the header with profile info
        document.getElementById('profileHeader').classList.remove('d-none');
        document.getElementById('profileHeader').classList.add('d-flex');
        
        // Set the fixed name in the header
        document.getElementById('profileName').textContent = "Bommala Deepak Kumar";
        
        // Show the dashboard
        document.getElementById('dashboard').classList.remove('d-none');
        
        // Optionally, you can still use the entered username elsewhere if needed
        document.getElementById('dashboardUsername').textContent = username;
        
        // Smooth scroll to the top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent the default form submission
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    if (name === "" || email === "" || message === "") {
        alert("All fields are required");
    } else {
        alert("Thank you for your message! We'll get back to you soon.");
        this.reset();  // Clear the form
    }
});

// Function to show a specific section and hide others
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(sectionId).classList.remove('d-none');
}

// Add event listeners for navigation
document.querySelector('a[href="#login"]').addEventListener('click', () => showSection('login'));
document.querySelector('a[href="#contact"]').addEventListener('click', () => showSection('contact'));

// Add this to your existing JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Get all project headers
    const projectHeaders = document.querySelectorAll('[data-toggle="collapse"]');

    // Add click event listener to each header
    projectHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle the chevron icon
            const chevron = this.querySelector('.fas');
            chevron.classList.toggle('fa-chevron-down');
            chevron.classList.toggle('fa-chevron-up');

            // Close other open dropdowns
            projectHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    const targetId = otherHeader.getAttribute('href');
                    const targetCollapse = document.querySelector(targetId);
                    if (targetCollapse.classList.contains('show')) {
                        targetCollapse.classList.remove('show');
                        const otherChevron = otherHeader.querySelector('.fas');
                        otherChevron.classList.remove('fa-chevron-up');
                        otherChevron.classList.add('fa-chevron-down');
                    }
                }
            });
        });
    });
});
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    const strengthBar = document.getElementById('passwordStrength');
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = getStrengthColor(strength);
});

function checkPasswordStrength(password) {
    // Implement password strength logic here
    // Return a number between 0 and 100
}

function getStrengthColor(strength) {
    if (strength < 30) return 'red';
    if (strength < 60) return 'orange';
    return 'green';
}

// Add this to your existing JavaScript file

// Todo List Functionality
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('#todo-filters button');
const validationMessage = document.getElementById('validation-message');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text} (Due: ${todo.dueDate})</span>
            <button class="delete-btn">Delete</button>
        `;
        li.classList.toggle('completed', todo.completed);
        li.addEventListener('click', () => toggleTodo(todo.id));
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });
        todoList.appendChild(li);
    });

    updateBackgroundImage();
}

function addTodo(text, dueDate) {
    const todo = {
        id: Date.now(),
        text,
        dueDate,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

function updateBackgroundImage() {
    const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
    document.body.classList.toggle('all-completed', allCompleted);
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    const dueDate = todoDate.value;

    if (!text || !dueDate) {
        validationMessage.textContent = 'Please enter both task description and due date.';
        return;
    }

    if (!isValidTaskDescription(text)) {
        validationMessage.textContent = 'Task description should be 3-50 characters long and contain only letters, numbers, and spaces.';
        return;
    }

    validationMessage.textContent = '';
    addTodo(text, dueDate);
    todoInput.value = '';
    todoDate.value = '';
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.id.split('-')[1];
        renderTodos(filter);
    });
});

function isValidTaskDescription(text) {
    const regex = /^[a-zA-Z0-9\s]{3,50}$/;
    return regex.test(text);
}

// Initial render
renderTodos();

// Add this to your existing navigation event listeners
document.querySelector('a[href="#todo"]').addEventListener('click', () => showSection('todolist'));

// Password strength checker
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    const strengthBar = document.querySelector('#passwordStrength .progress-bar');
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = getStrengthColor(strength);
});

function checkPasswordStrength(password) {
    // Implement a more robust password strength check
    let strength = 0;
    if (password.length > 6) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 20;
    return strength;
}

function getStrengthColor(strength) {
    if (strength < 30) return '#dc3545';
    if (strength < 70) return '#ffc107';
    return '#28a745';
}

// Owner login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check for owner credentials (replace with secure authentication in production)
    if (username === 'owner' && password === 'password123') {
        alert('Owner login successful!');
        showDashboard();
    } else {
        alert('Invalid credentials for owner login.');
    }
});

// Guest login
document.getElementById('guestLogin').addEventListener('click', function() {
    alert('Guest login successful!');
    showDashboard();
});

function showDashboard() {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show dashboard
    document.getElementById('dashboard').classList.remove('d-none');
    
    // Show profile header
    document.getElementById('profileHeader').classList.remove('d-none');
    document.getElementById('profileHeader').classList.add('d-flex');
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add this to your existing todo list functionality
function updateBackgroundImage() {
    const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
    if (allCompleted) {
        document.body.style.backgroundImage = "url('BL.EN.U4AIE21028/back1.jpg')";
    } else {
        document.body.style.backgroundImage = "none";
    }
}

// Call updateBackgroundImage after rendering todos
function renderTodos(filter = 'all') {
    // ... existing code ...
    updateBackgroundImage();
}

// Add CAPTCHA validation to contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const captchaInput = document.getElementById('captchaInput').value;
    // Replace this with actual CAPTCHA validation
    if (captchaInput === '12345') {
        alert('Message sent successfully!');
        this.reset();
    } else {
        alert('Invalid CAPTCHA. Please try again.');
    }
});