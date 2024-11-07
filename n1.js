document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parentLi = this.parentElement;
        const dropdown = parentLi.querySelector('.dropdown');

        if (dropdown) {
            const isActive = parentLi.classList.toggle('active');
            dropdown.style.display = isActive ? 'block' : 'none';
        }
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.sidebar')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
        document.querySelectorAll('.sidebar ul li').forEach(li => {
            li.classList.remove('active');
        });
    }
});

function hideVideoInHome() {
    const video = document.querySelector('.home video');
    if (video) {
        video.style.display = 'none'; // Hides the video
    }
}

function showVideoInHome(){
    const video = document.querySelector('.home video');
    if (video) {
        video.style.display = 'block'; // Shows the video
    }
}

// const header = document.querySelectorAll('.logo');
// header.forEach((logo) => {
//     logo.addEventListener('click', (event) => {
//         event.preventDefault(); // Prevent the default link behavior
//         showVideoInHome(); // Show the video
//         clearHomeDiv(); // Clear any images from the home div
//     });
// });

function clearHomeDiv() {
    const homeDiv = document.querySelector('.home');
    const imageContainer = homeDiv.querySelector('.workshown');

    if (imageContainer) {
        imageContainer.remove(); // Completely remove the image container
    }
}

fetch('art.json') // Update with your actual path to the JSON file
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
    })
    .then(data => {
        console.log('Fetched Data:', data);

        const projectLinks = document.querySelectorAll('.sidebar ul li a[class^="P"]');
        projectLinks.forEach((link, index) => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                hideVideoInHome(); // Hide the video
                clearHomeDiv(); // Clear the images from the home div

                const images = data.Projects[index].images[0]; // Get images for the clicked project
                const homeDiv = document.querySelector('.home');

                const imageContainer = document.createElement('div');
                imageContainer.className = 'workshown'; // Add class to identify the container
                imageContainer.style.display = 'flex';
                imageContainer.style.flexDirection = 'column'; // Stack images vertically
                imageContainer.style.gap = '20px'; // Space between images
                homeDiv.appendChild(imageContainer); // Add the container to the home div

                for (const key in images) {
                    if (images.hasOwnProperty(key)) {
                        const imgUrl = images[key];

                        const img = document.createElement('img');
                        img.src = imgUrl; // Set the source to the image URL
                        img.alt = 'Project Image'; // Add alt text for accessibility

                        img.style.width = '100%'; // Set width to 100%
                        img.style.height = 'auto'; // Maintain aspect ratio
                        img.style.objectFit = 'cover'; // Optionally, cover the area

                        imageContainer.appendChild(img);
                    }
                }
                imageContainer.style.display = 'flex'; // Show the image container
            });
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    const header = document.querySelectorAll('.logo a');
    header.forEach((logo) => {
        logo.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            showVideoInHome(); // Show the video
            clearHomeDiv(); // Clear any images from the home div
            scrollToTop(); // Scroll to the top of the page
        });
    });
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } 