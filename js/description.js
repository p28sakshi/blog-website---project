// Function to display post details on description page
function displayDescription() {
    // Get the selected post index from local storage
    var postId = localStorage.getItem('selectedPostId');
    
    if (postId !== null) {
        // Retrieve the selected post from local storage
        var posts = JSON.parse(localStorage.getItem('posts')) || [];
        var selectedPost = posts[postId];

        // Display the post data on the description page
        var descriptionContainer = document.getElementById('description-container');
        if (selectedPost) {
            descriptionContainer.innerHTML = `
                <img src="${selectedPost.imageUrl}" alt="" />
                <div class="content">
                    <h3>${selectedPost.name}</h3>
                    <p>${selectedPost.description}</p>
                </div>
            `;
        } else {
            descriptionContainer.innerHTML = '<p>Post not found.</p>';
        }
    } else {
        // Handle the case where no post is selected
        var descriptionContainer = document.getElementById('description-container');
        descriptionContainer.innerHTML = '<p>No post selected.</p>';
    }
}

// Call the displayDescription function when the page loads
displayDescription();


// =======================================

// Function to display post details on description page
// function displayDescription() {
//     // Get the selected post index from local storage
//     var postId = localStorage.getItem('selectedPostId');
    
//     if (postId !== null) {
//       // Retrieve the selected post from local storage
//       var posts = JSON.parse(localStorage.getItem('posts')) || [];
//       var selectedPost = posts.find(post => post.id === postId);
  
//       // Display the post data on the description page
//       var descriptionContainer = document.getElementById('description-container');
//       if (selectedPost) {
//         descriptionContainer.innerHTML = `
//           <img src="${selectedPost.imageUrl}" alt="" />
//           <div class="content">
//             <h3>${selectedPost.name}</h3>
//             <p>${selectedPost.description}</p>
//           </div>
//         `;
//       } else {
//         descriptionContainer.innerHTML = '<p>Post not found.</p>';
//       }
//     } else {
//       // Handle the case where no post is selected
//       var descriptionContainer = document.getElementById('description-container');
//       descriptionContainer.innerHTML = '<p>No post selected.</p>';
//     }
//   }
  
//   // Call the displayDescription function when the page loads
//   displayDescription();
  