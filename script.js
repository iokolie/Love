// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    /***** BACKGROUND MUSIC *****/
    // Create an audio element and start it automatically
    const audio = new Audio("Material/Hearts Dont Break Around Here.mp3"); // <-- Update this path
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch((err) => {
      console.log("Audio playback failed:", err);
    });
  
    // Create a mute/unmute button and position it at the top right
    const muteButton = document.createElement("button");
    muteButton.id = "muteButton";
    muteButton.textContent = "Mute";
    // Basic inline styling; you can move these styles to your CSS file
    muteButton.style.position = "fixed";
    muteButton.style.top = "10px";
    muteButton.style.right = "10px";
    muteButton.style.zIndex = "1000";
    document.body.appendChild(muteButton);
    muteButton.addEventListener("click", () => {
      audio.muted = !audio.muted;
      muteButton.textContent = audio.muted ? "Unmute" : "Mute";
    });
  
    /***** MESSAGES & BUTTONS SETUP *****/
    // Define your messages (replace with your own heartfelt messages)
    const messages = [
      "Hi Baby",
      "I have always thought about doing this, being a programmer and all but I never came around to",
      "I guess I have been a bit lazy about loving you.",
      "Enough time with myself made something very clear",
      "I don't do enough!!",
      "You are everything to me, every day I'm so grateful for you",
      "You gave me way more love than I thought I deserved",
      "You make me feel safe, confident, happy, appreciated, seen, and loved beyond my very imagination",
      "I just want to apologize for making you feel like a disturbance so often",
      "I love you so much baby",
      "Our love is young but it is powerful, powerful enough to see it through",
      "The effort you deserve is what you'll get",
      "That's a promise",
      "You've only made me happier since you came into my life",
      "Life is a lot more colorful with you in it",
      "The least I can do is reciprocate your thoughtfulness",
      "With all that said",
      "I'm always gonna be here. Waiting. You are so worth it.",
      "Love Ify"
      // Add more messages as needed
    ];
  
    // Get references to the key elements from your HTML
    const container = document.querySelector(".container");
    const buttonsContainer = container.querySelector(".buttons");
    const startButton = container.querySelector(".Start");
  
    let currentIndex = 0; // To keep track of which message is displayed
  
    startButton.addEventListener("click", () => {
      // Hide the original headings
      const headings = container.querySelectorAll("h1");
      headings.forEach((heading) => (heading.style.display = "none"));

      audio.play().catch((err) => {
        console.log("Audio playback failed:", err);
      });


      // Create a new element to hold the message text
      const messageEl = document.createElement("p");
      messageEl.id = "message";
      messageEl.textContent = messages[currentIndex];
  
      // Get the gif container (so the gif remains visible)
      const gifContainer = container.querySelector(".gif_container");
  
      // Remove the buttons container from its current position...
      container.removeChild(buttonsContainer);
      // ...insert the message before the gif and then reinsert the buttons container below the message
      container.insertBefore(messageEl, gifContainer);
      container.insertBefore(buttonsContainer, gifContainer);
  
      // Clear out the buttons container and create Back and Next buttons
      buttonsContainer.innerHTML = "";
  
      const backButton = document.createElement("button");
      backButton.id = "back";
      backButton.textContent = "Back";
      backButton.disabled = true; // No previous message initially
  
      const nextButton = document.createElement("button");
      nextButton.id = "next";
      nextButton.textContent = "Next";
  
      buttonsContainer.appendChild(backButton);
      buttonsContainer.appendChild(nextButton);
  
      // Function to update button states and text
      const updateButtons = () => {
        backButton.disabled = currentIndex === 0;
        if (currentIndex < messages.length - 1) {
          nextButton.disabled = false;
          nextButton.textContent = "Next";
        } else {
          // When the last message is reached, enable the next button and change its text to "Suprise"
          nextButton.disabled = false;
          nextButton.textContent = "Suprise";
        }
      };
  
      // Back button event: show previous message
      backButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          messageEl.textContent = messages[currentIndex];
          updateButtons();
        }
      });
  
      // Next button event: show next message or start the slideshow
      nextButton.addEventListener("click", () => {
        if (currentIndex < messages.length - 1) {
          currentIndex++;
          messageEl.textContent = messages[currentIndex];
          updateButtons();
        } else if (currentIndex === messages.length - 1) {
          // At the end of the messages, clicking "Suprise" triggers the slideshow
          startSlideshow();
        }
      });
  
      updateButtons(); // Initial button state
    });
  
    /***** SLIDESHOW FUNCTION *****/
    function startSlideshow() {
      // Hide the main container with the text and gif
      container.style.display = "none";
  
      // Create a full-screen slideshow container
      const slideshowContainer = document.createElement("div");
      slideshowContainer.id = "slideshow";
      // Style the container so it covers the entire viewport
      Object.assign(slideshowContainer.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999"
      });
  
      // Create an image element for displaying slides
      const imgElement = document.createElement("img");
      imgElement.id = "slideshowImage";
      imgElement.style.maxWidth = "100%";
      imgElement.style.maxHeight = "100%";
  
      slideshowContainer.appendChild(imgElement);
      document.body.appendChild(slideshowContainer);
  
      // Create an array for slideshow image paths
      const slideshowImages = [
        // Add your image paths here, for example:
        "Material/img1 .jpg",
        "Material/img2.jpg",
        "Material/img3.jpg",
        "Material/img4.jpg",
        "Material/img5.jpg",
        "Material/img6.jpg",
        "Material/img7.jpg",
      ];
  
      let slideIndex = 0;
      function showSlide() {
        if (slideshowImages.length > 0) {
          imgElement.src = slideshowImages[slideIndex];
          // Loop through images
          slideIndex = (slideIndex + 1) % slideshowImages.length;
        } else {
          slideshowContainer.textContent = "No images available for slideshow.";
        }
      }
  
      // Start the slideshow by showing the first slide and then changing slides every 3 seconds
      showSlide();
      setInterval(showSlide, 3000);
    }
  });
  