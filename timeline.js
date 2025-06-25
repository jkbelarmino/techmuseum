window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".exhibit-card");
  let currentYear = "";

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight * 0.4) {
      const yearText = card.querySelector(".year")?.textContent;
      const match = yearText?.match(/\d{4}/);
      if (match) currentYear = match[0];
    }
  });

  if (currentYear) {
    document.getElementById("year-indicator").textContent = currentYear;
  }
});

