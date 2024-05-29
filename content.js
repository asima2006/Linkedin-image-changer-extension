// Function to replace profile pictures
function replaceProfilePictures() {
    chrome.storage.local.get('newImageUrl', function(result) {
        const newImageUrl = result.newImageUrl || null; // Set image URL to null if none is set
        console.log('Using image URL:', newImageUrl);
        const profilePictures = document.querySelectorAll('img');
        profilePictures.forEach(picture => {
            if (newImageUrl !== null) {
                picture.src = newImageUrl;
                picture.srcset = newImageUrl;
                console.log('Replaced profile picture:', picture);
            } else {
                console.log('Reset profile picture:', picture);
                // Optionally reload the image to get the original URL from LinkedIn
                picture.src = picture.src; // This triggers image reload
                picture.srcset = ''; // Clear srcset to prevent using other resolutions
            }
        });
    });
}

// Replace profile pictures when the page loads
window.addEventListener('load', replaceProfilePictures);

// Replace profile pictures whenever new content is loaded (LinkedIn dynamically loads new posts)
const observer = new MutationObserver(replaceProfilePictures);
observer.observe(document.body, { childList: true, subtree: true });
