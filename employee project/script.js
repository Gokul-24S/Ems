let employees = [];
let nextEmpID = 1;  // This will hold the next unique numeric employee ID
let editingIndex = -1;  // Variable to track if we are editing an existing employee

// Add or Update employee in the table and store in employees array
function addEmployee() {
    const name = document.getElementById('name').value.trim();
    const Age = document.getElementById('Age').value.trim();
     const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const designation = document.getElementById('designation').value.trim();
    const DOJ = document.getElementById('DOJ').value.trim();


    // Validate form input
    if (name &&Age && email && phone && designation && DOJ) {
        if (editingIndex === -1) {
            // Adding new employee
            const empID = nextEmpID++;  // Generate unique numeric Employee ID
            const employee = { empID, name,Age, email, phone, designation,DOJ };
            employees.push(employee);
        } else {
            // Editing existing employee, keep the same Employee ID
            employees[editingIndex] = { empID: employees[editingIndex].empID, name,Age,email, phone, designation,DOJ };
        }
        displayEmployees();
        clearForm();

        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
        if (modal) modal.hide();
    } else {
        alert("Please fill out all fields.");
    }
}

// Display employees in the table
function displayEmployees() {
    const tableBody = document.getElementById('employeeTable');
    tableBody.innerHTML = '';  // Clear table body before updating

    employees.forEach((employee, index) => {
        const row = `
            <tr>
                <td>${employee.empID}</td>
                <td>${employee.name}</td>
                 <td>${employee.Age}</td>
                 <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.designation}</td>
                <td>${employee.DOJ}</td>

                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Edit employee data
function editEmployee(index) {
    const employee = employees[index];
    
    // Fill form fields with the selected employee's data
    document.getElementById('name').value = employee.name;
    document.getElementById('Age').value = employee.Age;
    document.getElementById('email').value = employee.email;
    document.getElementById('phone').value = employee.phone;
    document.getElementById('designation').value = employee.designation;
    document.getElementById('DOJ').value = employee.DOJ;


    editingIndex = index;  // Set editing index to the current employee being edited
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
    modal.show();
}

// Delete employee
function deleteEmployee(index) {
    employees.splice(index, 1);  // Remove employee from the array
    displayEmployees();  // Update the table display
    clearForm();
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple client-side validation
    if (username === 'admin' && password === 'gokul123') {
        window.location.href = 'index.html';  // Redirect to the Employee Management System page
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password!';
    }
});

// Handle sign out
function signOut() {
    // Redirect to login page on sign out
    window.location.href = 'login.html';
}

// Clear form
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('Age').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('designation').value = '';
    document.getElementById('DOJ').value = '';

    editingIndex = -1;  // Reset the editing index after form is cleared
}
