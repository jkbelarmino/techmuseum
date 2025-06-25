window.addEventListener('DOMContentLoaded', () => {
  const inputs = {
    searchInput: document.getElementById('searchInput'),
    searchInputMobile: document.getElementById('searchInputMobile')
  };

  const icons = {
    searchInput: document.getElementById('noMatchIcon'),
    searchInputMobile: document.getElementById('noMatchIconMobile')
  };

  // Prevent form submission
  document.querySelectorAll('form[role="search"]').forEach(form => {
    form.addEventListener('submit', e => e.preventDefault());
  });

  // "No results" message
  const noResults = document.createElement('div');
  noResults.id = 'noResults';
  noResults.textContent = 'No exhibits match your search.';
  noResults.style.cssText =
    'display: none; padding: 1rem; text-align: center; color: #888; font-weight: bold;';
  document.body.appendChild(noResults);

  // Shared search logic
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

  Object.entries(inputs).forEach(([id, inputEl]) => {
    const iconEl = icons[id];
    if (!inputEl || !iconEl) return;

    inputEl.addEventListener('input', () => handleSearch(inputEl, iconEl));
    iconEl.addEventListener('click', () => {
      inputEl.value = '';
      handleSearch(inputEl, iconEl);
    });
  });
});


const floatingYear = document.getElementById("floating-year");

window.addEventListener("scroll", () => {
  const timelineItems = document.querySelectorAll(".era-item");
  let anyVisible = false;

  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      anyVisible = true;
    }
  });

  floatingYear.classList.toggle("visible", anyVisible);
});
