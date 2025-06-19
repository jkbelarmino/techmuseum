document.addEventListener("DOMContentLoaded", function () {
  // TIMELINE YEAR ITEM HANDLING
  const timelineNodes = document.querySelectorAll(".timeline-node");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const videoContainer = document.querySelector(".video-container iframe");
  const videoCreditContainer = document.querySelector(".video-container p");

  // Initially activate 1980s node
  timelineItems.forEach(item => {
    item.classList.remove("active");
    if (item.querySelector(".timeline-year").textContent.trim() === "1980s") {
      item.classList.add("active");
    }
  });

  timelineNodes.forEach(node => {
    // Highlight 1980s by default
    if (node.getAttribute("data-year") === "1980s") {
      node.classList.add("highlight", "clicked");
    }

    // Click interaction
    node.addEventListener("click", function () {
      const year = this.getAttribute("data-year");

      // Stop any playing YouTube videos
      document.querySelectorAll(".timeline-video iframe").forEach(iframe => {
        iframe.src = iframe.src;
      });

      // Activate matching year item
      timelineItems.forEach(item => {
        item.classList.remove("active");
        if (item.querySelector(".timeline-year").textContent.trim() === year) {
          item.classList.add("active");

          // Sync video and credit
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

      // Highlight clicked node
      timelineNodes.forEach(n => n.classList.remove("highlight", "clicked"));
      this.classList.add("highlight", "clicked");
    });

    // Desktop hover effect
    node.addEventListener("mouseenter", function () {
      this.classList.add("highlight");
    });

    node.addEventListener("mouseleave", function () {
      if (!this.classList.contains("clicked")) {
        this.classList.remove("highlight");
      }
    });
  });

  // FLIP CARD BEHAVIOR
  const cards = document.querySelectorAll(".flip-card");
  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  if (isTouchDevice) {
    // Tap-to-flip for mobile/tablet
    cards.forEach(card => {
      card.addEventListener("click", function () {
        this.classList.toggle("flipped");
      });
    });
  } else {
    // Hover-to-flip for desktop (already handled in CSS)
    // Optional: reset flip on mouseleave if manually toggled
    cards.forEach(card => {
      card.addEventListener("mouseleave", function () {
        this.classList.remove("flipped");
      });
    });
  }

  // SCROLLING TRACK HOVER EFFECT
  const scrollingTrack = document.querySelector(".scrolling-track");

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
});
