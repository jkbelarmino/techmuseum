document.addEventListener("DOMContentLoaded", function () {
    // Hover effect: Highlight corresponding node when hovering over a timeline item
    document.querySelectorAll(".timeline-item").forEach(item => {
        item.addEventListener("mouseenter", function () {
            let year = this.querySelector(".timeline-year").textContent.trim();
            document.querySelectorAll(".timeline-node").forEach(node => {
                node.classList.remove("highlight"); // Reset highlights
                if (node.getAttribute("data-year") === year) {
                    node.classList.add("highlight"); // Highlight corresponding node
                }
            });
        });

        item.addEventListener("mouseleave", function () {
            document.querySelectorAll(".timeline-node").forEach(node => {
                node.classList.remove("highlight"); // Remove highlights on mouse leave
            });
        });
    });

    // Click effect: Show timeline item when clicking a node
    document.querySelectorAll(".timeline-node").forEach(node => {
        node.addEventListener("click", function () {
            let year = this.getAttribute("data-year");
            
            document.querySelectorAll(".timeline-item").forEach(item => {
                item.classList.remove("active"); // Hide all items
                if (item.querySelector(".timeline-year").textContent.trim() === year) {
                    item.classList.add("active"); // Show selected item
                    item.scrollIntoView({ behavior: "smooth", block: "center" }); // Smooth scroll effect
                }
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Automatically display the 1980s timeline item on page load
    document.querySelectorAll(".timeline-item").forEach(item => {
        if (item.querySelector(".timeline-year").textContent.trim() === "1980s") {
            item.classList.add("active");
        }
    });

    // Highlight the 1980s timeline node by default
    document.querySelectorAll(".timeline-node").forEach(node => {
        if (node.getAttribute("data-year") === "1980s") {
            node.classList.add("highlight");
        }
    });
});

document.querySelectorAll(".timeline-node").forEach(node => {
    node.addEventListener("click", function () {
        let year = this.getAttribute("data-year");

        // Remove highlight from all nodes
        document.querySelectorAll(".timeline-node").forEach(n => n.classList.remove("highlight"));

        // Add highlight (red color) to the clicked node
        this.classList.add("highlight");

        // Show the corresponding timeline item
        document.querySelectorAll(".timeline-item").forEach(item => {
            item.classList.remove("active");
            if (item.querySelector(".timeline-year").textContent.trim() === year) {
                item.classList.add("active");
                item.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
});

document.querySelectorAll(".timeline-node").forEach(node => {
    node.addEventListener("click", function () {
        // Remove highlight from all nodes
        document.querySelectorAll(".timeline-node").forEach(n => n.classList.remove("highlight", "clicked"));

        // Add highlight and 'clicked' state to the selected node
        this.classList.add("highlight", "clicked");
    });
});

document.querySelectorAll(".timeline-node").forEach(node => {
    node.addEventListener("click", function () {
        document.querySelectorAll(".timeline-node").forEach(n => n.classList.remove("clicked"));
        this.classList.add("clicked"); // Keep this node red
    });
});
