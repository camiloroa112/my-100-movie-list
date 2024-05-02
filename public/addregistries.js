function addEntries(event) {
    event.preventDefault();

    // Get the selected rating
    var selectedRating = getRating();

    // Retrieve other form data
    var name = document.getElementById('name').value;
    var date = document.getElementById('date').value;
    var user = document.getElementById('user').value;

    // Log the selected rating for testing purposes
    console.log("Selected Rating: " + selectedRating);

    // Getting the Table whose ID is movie-list
    let table = document.getElementById('movie-list');

    // Retrieving row count
    let lastRow = table.rows.length;

    // Inserting new row
    let row = table.insertRow(lastRow);
    row.classList.add('table-info');

    // Introducing value in a cell
    let cell = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6); // New cell for delete option

    // Introducing value in new cell being what has been placed on input with a button
    cell.innerHTML = lastRow;
    cell.classList.add('align-middle');
    cell1.innerHTML = name;
    cell2.innerHTML = date;
    cell3.innerHTML = user;
    cell4.innerHTML = getStarRating(selectedRating); 
    cell5.innerHTML = ""; // Leave this empty for now
    cell6.innerHTML = '<button class="btn bg-primary text-white btn-delete">' + '<i class="fa-solid fa-trash-can"></i>' + '</button>';

    // Obtain the image file
    let imgInput = document.getElementById('img');
    let imgFile = imgInput.files[0];
    let imgName = imgFile ? imgFile.name : ""; // Get the file name if available

    // Display image in the table if available
    cell5.innerHTML = imgName ? `<img src="${URL.createObjectURL(imgFile)}" alt="${imgName}" style="max-width: 100px;">` : "";

    // Element for deleting a specific row
    row.querySelector('.btn-delete').addEventListener('click', deleteRow);
}

// Function to delete a specific row
function deleteRow(event) {
    let row = event.target.closest('tr');
    row.remove();
}

// Function to get the rating value
function getRating() {
    let stars = document.querySelectorAll('.ratings span');
    let rating = 0;
    for (let star of stars) {
        if (star.getAttribute('data-clicked')) {
            rating = star.dataset.rating;
            break;
        }
    }
    return rating;
}