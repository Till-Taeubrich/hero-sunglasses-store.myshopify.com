// Function to check if the device is a mobile device
function isMobileDevice() {
    return /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
}

// Check if the device is a mobile device
if ( ! isMobileDevice()) {
    // Find the div element by its ID
    var elementToRemove = document.getElementById("price-template--21378226815268__main");

    // Check if the element exists
    if (elementToRemove) {
        // Remove the element from the document flow
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}



document.addEventListener('DOMContentLoaded', function() {
    // Your code here
// Function to handle attribute changes
function handleAttributeChanges(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        // Handle the attribute change, e.g., update the src attribute
        var nextImageElement = document.querySelector('.pswp__img');
        nextImageElement.setAttribute('src', "https://hero-sunglasses-store.myshopify.com/cdn/shop/files/121_OAKLEYPIC1.png?v=1699311391&width=1249");
      }
    });
  }
  
  // Configuration of the observer:
  var config = { attributes: true };
  
  // Select the target node
  var targetNode = document.querySelectorAll('.pswp__img')[1];
  
  // Check if the target node exists before observing
  if (targetNode) {
    // Create a new instance of MutationObserver
    var mutationObserver = new MutationObserver(handleAttributeChanges);
  
    // Start observing the target node for configured mutations
    mutationObserver.observe(targetNode, config);
  
    // Event listener for the next button click
    var nextButton = document.querySelector('.pswp__button--arrow--next');
    nextButton.addEventListener('click', function () {
      // Trigger a change in the src attribute to be observed by the Mutation Observer
      targetNode.setAttribute('src', 'new-image-source.jpg');
    });
  } else {
    console.error('Target node not found');
  }
});
  



document.addEventListener('DOMContentLoaded', function() {
  var variantButtons = document.querySelectorAll('.remove-drawer');

  variantButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Get the selected variant ID
      var variantId = this.getAttribute('data-variant-id');

      // Find the corresponding variant element and retrieve the media ID
      var variantElement = document.querySelector('.variant[data-media-id="' + variantId + '"]');
      var mediaId = variantElement.getAttribute('data-media-id');

      // Do something with the media ID, e.g., display an image
      console.log('Selected Media ID:', mediaId);
    });
  });
});