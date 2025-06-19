document.addEventListener("DOMContentLoaded", function () {
  // --- TIMELINE YEAR HANDLING ---
  const timelineNodes = document.querySelectorAll(".timeline-node");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const videoContainer = document.querySelector(".video-container iframe");
  const videoCreditContainer = document.querySelector(".video-container p");

  // Activate 1980s by default
  timelineItems.forEach(item => {
    item.classList.remove("active");
    if (item.querySelector(".timeline-year").textContent.trim() === "1980s") {
      item.classList.add("active");
    }
  });

  timelineNodes.forEach(node => {
    const year = node.getAttribute("data-year");

    if (year === "1980s") {
      node.classList.add("highlight", "clicked");
    }

    node.addEventListener("click", function () {
      document.querySelectorAll(".timeline-video iframe").forEach(iframe => {
        iframe.src = iframe.src;
      });

      timelineItems.forEach(item => {
        item.classList.remove("active");

        if (item.querySelector(".timeline-year").textContent.trim() === year) {
          item.classList.add("active");

          const selectedVideo = item.querySelector(".timeline-video iframe");
          const selectedCredit = item.querySelector(".timeline-video p");

          if (selectedVideo && videoContainer) {
            videoContainer.src = selectedVideo.src;
          }

          if (selectedCredit && videoCreditContainer) {
            videoCreditContainer.innerHTML = selectedCredit.innerHTML;
          }
        }
      });

      timelineNodes.forEach(n => n.classList.remove("highlight", "clicked"));
      this.classList.add("highlight", "clicked");
    });

    node.addEventListener("mouseenter", function () {
      this.classList.add("highlight");
    });

    node.addEventListener("mouseleave", function () {
      if (!this.classList.contains("clicked")) {
        this.classList.remove("highlight");
      }
    });
  });

  // --- FLIP CARD BEHAVIOR ---
  const flipCards = document.querySelectorAll(".flip-card");
  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  if (isTouchDevice) {
    flipCards.forEach(card => {
      card.addEventListener("click", function (e) {
        // Ensure clicks from both front and back sides toggle flip
        const innerFront = this.querySelector(".flip-card-front");
        const innerBack = this.querySelector(".flip-card-back");

        if (innerFront.contains(e.target) || innerBack.contains(e.target)) {
          this.classList.toggle("flipped");
        }
      });
    });
  } else {
    // Optional: reset flip on mouseleave for desktop
    flipCards.forEach(card => {
      card.addEventListener("mouseleave", function () {
        this.classList.remove("flipped");
      });
    });
  }

  // --- SCROLLING TRACK IMAGE EFFECT ---
  const scrollingTrack = document.querySelector(".scrolling-track");

  if (scrollingTrack) {
    document.querySelectorAll(".scrolling-track img").forEach(img => {
      img.addEventListener("mouseenter", () => {
        scrollingTrack.style.animationPlayState = "paused";
        img.style.transform = "scale(1.7)";
        img.style.zIndex = "10";
      });

      img.addEventListener("mouseleave", () => {
        scrollingTrack.style.animationPlayState = "running";
        img.style.transform = "scale(1)";
        img.style.zIndex = "1";
      });
    });
  }
});
