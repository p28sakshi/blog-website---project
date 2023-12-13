
document.querySelectorAll(".selNav").forEach((ele) =>
  ele.addEventListener("click", function (event) {
    // Remove the active class from all links
    document.querySelectorAll(".selNav").forEach((el) => el.classList.remove("active"));
    
    // Add the active class to the clicked link
    this.classList.add("active");

    // Allow the default behavior of the link (navigation to the specified page)
    const targetPage = this.getAttribute("href");
    if (targetPage) {
      window.location.href = targetPage;
    }
  })
);

function openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = ''; // Clear the input for file

    // Clear the existing image input if it exists
    var existingImageInput = document.querySelector('input[name="existingImage"]');
    if (existingImageInput) {
        existingImageInput.parentNode.removeChild(existingImageInput);
    }
}

 // Add this function to handle form submission and save data to local storage
function addPost(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var imageInput = document.getElementById('image');
    var imageFile = imageInput.files[0];

    if (name.trim() === '' || description.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Save the image file to local storage
    var imageUrl = saveImageLocally(imageFile);

    // Save other form data (excluding the image) to local storage
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ name, description, imageUrl });
    localStorage.setItem('posts', JSON.stringify(posts));

    closeModal();
    displayPosts();

    resetForm(); // Reset the form fields after adding a post
}


function saveImageLocally(imageFile) {
    if (imageFile) {
        var imageUrl = 'images/' + imageFile.name;
        localStorage.setItem(imageUrl, JSON.stringify(imageFile));
        return imageUrl;
    }
    return null;
}

function displayPosts() {

   // Check if the user is logged in
   let loggedIn = localStorage.getItem('loggedIn');

   // Check if the check has already been performed
   let checkPerformed = localStorage.getItem('loginCheckPerformed');

   // Only perform the check once
   if (!checkPerformed && (!loggedIn || loggedIn !== 'true')) {
       alert('You need to log in or register to access the blogs.');
       // Redirect the user to the login page or any other appropriate action
       window.location.href = 'login.html';

       // Set the flag to indicate the check has been performed
       localStorage.setItem('loginCheckPerformed', 'true');

       return;
   }

    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var boxContainer = document.querySelector('.box-container');
    boxContainer.innerHTML = '';

    // Default Post
    boxContainer.innerHTML += `
        <div class="box">
            <img src="images/place-1.jpg" alt="">
            <div class="content">
                <h3>Amazing Places</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, tenetur.</p>
                <a href="#" class="btn" onclick="showDescription(0)">see more</a>
            </div>
        </div>
    `;

    // Append Existing Posts Below Default Post
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        var box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = '<img src="' + post.imageUrl + '" alt="" />' +
                        '<div class="content">' +
                            '<h3>' + post.name + '</h3>' +
                            '<p>' + post.description + '</p>' +
                            '<a href="#" class="btn" onclick="showDescription(' + i + ')">see more</a>' +
                            '<div class="footer-icons">' +
                            '<i class="fas fa-trash" onclick="deletePost(' + i + ')"></i>' +
                            '<i class="fas fa-edit" onclick="editPost(' + i + ')"></i>' +
                        '</div>'
                        '</div>'
                        ;

        boxContainer.appendChild(box);
    }
}

// Function to display post details on description page
function showDescription(index) {
    // Save the selected post index to local storage
    localStorage.setItem('selectedPostId', index);
    // Redirect to the description page
    window.location.href = 'description.html';
}

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }


function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();

    resetForm(); // Reset the form fields after adding a post
}

function editPost(index) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var postToEdit = posts[index];

    // Populate the form with the data of the post to edit
    document.getElementById('name').value = postToEdit.name;
    document.getElementById('description').value = postToEdit.description;

    // Create a hidden input to store the existing image URL
    var hiddenImageInput = document.createElement('input');
    hiddenImageInput.type = 'hidden';
    hiddenImageInput.name = 'existingImage';
    hiddenImageInput.value = postToEdit.imageUrl;

    // Append the hidden input to the form
    document.getElementById('myForm').appendChild(hiddenImageInput);

    // Remove the post from the list
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Open the modal for editing
    openModal();
}
  displayPosts();
  

















