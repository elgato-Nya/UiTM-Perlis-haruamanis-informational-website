document.addEventListener("DOMContentLoaded", function () {
    let zIndexCounter = 10;
  
    document.querySelectorAll("div.card").forEach((card) => {
      card.addEventListener("click", function (event) {
        event.preventDefault();
  
        const cardsContainer = document.querySelector("div.cards");
        const isCardAlreadyShowing = this.classList.contains("show");
  
        if (cardsContainer.classList.contains("showing")) {
          // Remove 'show' class from the currently visible card
          document.querySelectorAll("div.card.show").forEach((card) => {
            card.classList.remove("show");
          });
  
          if (isCardAlreadyShowing) {
            // Reset the grid if the clicked card was already showing
            cardsContainer.classList.remove("showing");
          } else {
            // Show the clicked card
            this.style.zIndex = zIndexCounter;
            this.classList.add("show");
          }
  
          zIndexCounter++;
        } else {
          // Show the clicked card when no cards are currently visible
          cardsContainer.classList.add("showing");
          this.style.zIndex = zIndexCounter;
          this.classList.add("show");
  
          zIndexCounter++;
        }
      });
    });
});
