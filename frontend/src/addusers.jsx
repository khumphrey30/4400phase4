import React from 'react'

const AddUser = () => {
    return (
        <div><form action="/action_page.php">
            <div class="mb-3 mt-3">
                <label for="username" class="form-label">Username:</label>
                <input 
                type="text" 
                class="form-control" 
                id="username" 
                placeholder="Enter username" 
                name="username" />
            </div>
            <div class="mb-3">
                <label for="fname" class="form-label">First Name:</label>
                <input 
                type="text" 
                class="form-control" 
                id="fname"
                placeholder="Enter first name "
                name="fname" />
            </div>
            <div class="mb-3">
                <label for="lname" class="form-label">Last Name:</label>
                <input 
                type="text" 
                class="form-control" 
                id="lname"
                placeholder="Enter last name"
                name="lname" />
            </div>
            <div class="mb-3">
                <label for="address" class="form-label">Address:</label>
                <input 
                type="text" 
                class="form-control" 
                id="address"
                placeholder="Enter address"
                name="address" />
            </div>
            <div class="mb-3">
                <label for="bdate" class="form-label">Birthdate:</label>
                <input 
                type="date" 
                class="form-control" 
                id="bdate"
                name="bdate" />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form></div>
    )
}


export default AddUser