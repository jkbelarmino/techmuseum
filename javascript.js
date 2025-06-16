document.addEventListener("DOMContentLoaded", function () {
    const timelineNodes = document.querySelectorAll(".timeline-node");
    const timelineItems = document.querySelectorAll(".timeline-item");

    // Ensure only the 1980s timeline item is visible at the start
    timelineItems.forEach(item => {
        item.classList.remove("active"); // Hide all items
        if (item.querySelector(".timeline-year").textContent.trim() === "1980s") {
            item.classList.add("active");
        }
    });

    timelineNodes.forEach(node => {
        // Highlight the default 1980s node
        if (node.getAttribute("data-year") === "1980s") {
            node.classList.add("highlight", "clicked");
        }

        // Click effect: Show matching timeline item and stop previous video
        node.addEventListener("click", function () {
            let year = this.getAttribute("data-year");

            // Stop currently playing YouTube videos
            document.querySelectorAll(".timeline-video iframe").forEach(iframe => {
                iframe.src = iframe.src; // Reloads iframe to stop playback
            });

            // Hide all timeline items before displaying the correct one
            timelineItems.forEach(item => item.classList.remove("active"));

            // Find and activate the matching timeline item
            timelineItems.forEach(item => {
                if (item.querySelector(".timeline-year").textContent.trim() === year) {
                    item.classList.add("active");
                }
            });

            // Remove highlights from all nodes except the clicked one
            timelineNodes.forEach(n => {
                if (n !== this) {
                    n.classList.remove("highlight", "clicked");
                }
            });

            this.classList.add("highlight", "clicked");
        });

        // Hover effect for timeline nodes
        node.addEventListener("mouseenter", function () {
            this.classList.add("highlight");
        });

        node.addEventListener("mouseleave", function () {
            if (!this.classList.contains("clicked")) {
                this.classList.remove("highlight");
            }
        });
    });
});

const scrollingTrack = document.querySelector('.scrolling-track');

document.querySelectorAll('.scrolling-track img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        scrollingTrack.style.animationPlayState = 'paused'; // Stops scrolling
        img.style.transform = 'scale(1.7)'; // Enlarges image
        img.style.zIndex = '10'; // Moves the image above others
    });

    img.addEventListener('mouseleave', () => {
        scrollingTrack.style.animationPlayState = 'running'; // Resumes scrolling
        img.style.transform = 'scale(1)';
        img.style.zIndex = '1'; // Resets stacking order
    });
});

function flipCard(card) {
    card.classList.toggle("flipped");

    // Flip back when the mouse leaves after a delay
    card.addEventListener("mouseleave", () => {
        setTimeout(() => {
            card.classList.remove("flipped");
        }, 500); // Adjust delay as needed
    });
}

document.querySelectorAll('.exhibit-card').forEach(card => {
    card.addEventListener("click", function () {
        if (!this.classList.contains("flipped")) {
            this.classList.add("flipped");
            this.style.zIndex = "10";
        } else {
            this.classList.remove("flipped");
            this.style.zIndex = "1";
        }
    });
});
