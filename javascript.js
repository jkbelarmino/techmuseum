document.addEventListener("DOMContentLoaded", function () {
    const timelineNodes = document.querySelectorAll(".timeline-node");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const displayArea = document.getElementById("timeline-display");

    // Auto-display the 1980s timeline item
    timelineItems.forEach(item => {
        if (item.querySelector(".timeline-year").textContent.trim() === "1980s") {
            item.classList.add("active");
        }
    });

    timelineNodes.forEach(node => {
        // Highlight the default 1980s node
        if (node.getAttribute("data-year") === "1980s") {
            node.classList.add("highlight");
        }

        // Click effect: Show corresponding timeline item and stop previous video
        node.addEventListener("click", function () {
            let year = this.getAttribute("data-year");

            // Stop any currently playing YouTube videos
            document.querySelectorAll(".timeline-video iframe").forEach(iframe => {
                iframe.src = iframe.src; // Reloads the iframe to stop playback
            });

            // Find and display the correct timeline item
            const selectedItem = Array.from(timelineItems).find(item => 
                item.querySelector(".timeline-year").textContent.trim() === year
            );

            if (selectedItem) {
                displayArea.innerHTML = selectedItem.outerHTML;
            }

            // Remove highlights from all nodes, then add to clicked one
            timelineNodes.forEach(n => n.classList.remove("highlight", "clicked"));
            this.classList.add("highlight", "clicked");
        });

        // Hover effect for timeline nodes
        node.addEventListener("mouseenter", function () {
            node.classList.add("highlight");
        });

        node.addEventListener("mouseleave", function () {
            node.classList.remove("highlight");
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
        this.classList.toggle("flipped");

        // Ensure flip card stacks properly
        this.style.zIndex = this.classList.contains("flipped") ? "10" : "1";

        // Flip back after leaving
        this.addEventListener("mouseleave", () => {
            this.classList.remove("flipped");
            this.style.zIndex = "1"; // Restore stacking order
        });
    });
});
