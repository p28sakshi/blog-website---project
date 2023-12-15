let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let searchBtn = document.querySelector("#search-btn");
let searchBar = document.querySelector(".search-bar-container");

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  };
});

// =============fetching places.html====================

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("places-container");
  let slideTimeout;

  // Fetch places content from places.html
  fetch("places.html")
    .then((response) => response.text())
    .then((html) => {
      // Create a temporary container element
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = html;

      // Extract the places content
      const placesContent = Array.from(tempContainer.querySelectorAll(".swiper-slide")).map((place, index) => {
        const image = place.querySelector("img").src;
        const title = place.querySelector("h3").innerText;
        const description = Array.from(place.querySelectorAll("p")).map((p) => p.innerText).join(" ");
        // const articleId = `article${index + 1}`; // Generate unique ID for the article
        const articleId = place.id;
        return { image, title, description, articleId };
      });

      // Create and append cards to the container
      placesContent.forEach((place) => {
        const card = createCard(place);
        container.appendChild(card);

        // Add click event listener to each card
        card.addEventListener("click", function () {
          // Redirect to the corresponding article page
          window.location.href = `places.html#${place.articleId}`;
        });
      });

      // Enable the card slider if there are more than 4 cards
      if (placesContent.length > 4) {
        enableCardSlider();
      }
    })
    .catch((error) => {
      console.error("Error fetching places:", error);
    });

  // Function to create a card for each place
  function createCard(place) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${place.image}" alt="${place.title}" />
      <div class="card-content">
        <h3>${place.title}</h3>
        <p>${place.description}</p>
      </div>
    `;

    return card;
  }

  // Function to enable card slider
  function enableCardSlider() {
    let slideIndex = 0;

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("card");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length - 3) { 
        slideIndex = 1;
      }
      for (i = slideIndex - 1; i < slideIndex + 3; i++) {
        slides[i].style.display = "block";
      }
      slideTimeout = setTimeout(showSlides, 2000); // Change card display every 2 seconds
    }

    // Add event listeners to stop sliding on hover
    container.addEventListener("mouseenter", function () {
      clearTimeout(slideTimeout);
    });

    container.addEventListener("mouseleave", function () {
      slideTimeout = setTimeout(showSlides, 2000);
    });

    // Start the initial sliding
    showSlides();
  }
});




// =============fetching blogs.html====================

// Add this function to fetch blog data from localStorage
function fetchBlogsData() {
  var blogs = JSON.parse(localStorage.getItem('posts')) || [];
  return blogs;
}

// Add this function to display blogs on the homepage
function displayBlogsOnHomepage() {
  var blogs = fetchBlogsData();
  var blogsContainer = document.getElementById('blogs-container');

  // Clear existing content
  blogsContainer.innerHTML = '';

  // Create HTML elements for each blog and append them to the container
  blogs.forEach(function (blog, index) {
    var blogElement = document.createElement('div');
    blogElement.className = 'box';
    blogElement.innerHTML = `
      <img src="${blog.imageUrl}" alt="" />
      <div class="content">
        <h3>${blog.name}</h3>
        <p>${blog.description}</p>
        <a href="#" class="btn" onclick="showDescription(zz)">see more</a>
      </div>
    `;

    // Add click event listener to each blog card
    blogElement.addEventListener('click', function () {
      // Store the selected post id in local storage
      localStorage.setItem('selectedPostId', blog.id);
      // Redirect to the description page
      window.location.href = 'description.html';
    });

    blogsContainer.appendChild(blogElement);
  });
}

// Call the displayBlogsOnHomepage function to initially display blogs
displayBlogsOnHomepage();

