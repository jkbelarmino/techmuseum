window.addEventListener('DOMContentLoaded', () => {
  const floatingYear = document.getElementById("floating-year");
  const eraItems = document.querySelectorAll(".era-item");
  const inputs = {
    searchInput: document.getElementById('searchInput'),
    searchInputMobile: document.getElementById('searchInputMobile')
  };
  const icons = {
    searchInput: document.getElementById('noMatchIcon'),
    searchInputMobile: document.getElementById('noMatchIconMobile')
  };

  // Prevent search form submission
  document.querySelectorAll('form[role="search"]').forEach(form => {
    form.addEventListener('submit', e => e.preventDefault());
  });

  // Create and inject "No results" message
  const noResults = document.createElement('div');
  noResults.id = 'noResults';
  noResults.textContent = 'No exhibits match your search.';
  noResults.style.cssText = 'display: none; padding: 1rem; text-align: center; color: #888; font-weight: bold;';
  document.body.appendChild(noResults);

  // 🔍 Search logic
  const handleSearch = (inputEl, iconEl) => {
    const query = inputEl.value.toLowerCase();
    let found = false;
    let firstVisible = null;

    document.querySelectorAll('.card-era-single').forEach(card => {
      const section = card.closest('section.era-item');
      const match = card.textContent.toLowerCase().includes(query);
      section.style.display = match ? '' : 'none';
      if (match && !firstVisible) firstVisible = section;
      if (match) found = true;
    });

    if (firstVisible && query) {
      firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    noResults.style.display = query && !found ? 'block' : 'none';
    iconEl.classList.toggle('d-none', query === '' || found);
  };

  // Bind search inputs and clear buttons
  Object.entries(inputs).forEach(([key, inputEl]) => {
    const iconEl = icons[key];
    if (!inputEl || !iconEl) return;

    inputEl.addEventListener('input', () => handleSearch(inputEl, iconEl));
    iconEl.addEventListener('click', () => {
      inputEl.value = '';
      handleSearch(inputEl, iconEl);
    });
  });

  // 🕰 Floating year visibility + year tracking
  window.addEventListener("scroll", () => {
    let anyVisible = false;
    let closestItem = null;
    let closestOffset = Infinity;

    eraItems.forEach(item => {
      const rect = item.getBoundingClientRect();

      // Show if any timeline item is on screen
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        anyVisible = true;
      }

      // Track closest item for updating year
      const offset = Math.abs(rect.top - window.innerHeight * 0.3);
      if (offset < closestOffset && rect.bottom > 0) {
        closestOffset = offset;
        closestItem = item;
      }
    });

    floatingYear.classList.toggle("visible", anyVisible);

    if (closestItem) {
      const yearText = closestItem.querySelector("h4")?.textContent;
      const match = yearText?.match(/\d{4}/);
      if (match) {
        floatingYear.textContent = match[0];
      }
    }
  });
});
