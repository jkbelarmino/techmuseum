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

  // Create "No results" message
  const noResults = document.createElement('div');
  noResults.id = 'noResults';
  noResults.textContent = 'No exhibits match your search.';
  noResults.style.cssText =
    'display: none; padding: 1rem; text-align: center; font-weight: bold; color: #888;';
  document.body.appendChild(noResults);

  // Core search logic
  const handleSearch = (inputEl, iconEl) => {
    const query = inputEl.value.toLowerCase();
    let matchFound = false;
    let firstVisible = null;

    document.querySelectorAll('.card-era-single').forEach(card => {
      const section = card.closest('section.era-item');
      const text = card.textContent.toLowerCase();
      const isMatch = text.includes(query);

      section.style.display = isMatch ? '' : 'none';
      if (isMatch && !firstVisible) firstVisible = section;
      if (isMatch) matchFound = true;
    });

    // Scroll to match
    if (firstVisible && query) {
      firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Toggle "No results"
    noResults.style.display = matchFound || !query ? 'none' : 'block';

    // Toggle icon visibility
    iconEl.classList.toggle('d-none', query === '' || matchFound);
  };

  // Set up listeners for both inputs
  Object.entries(inputs).forEach(([id, inputEl]) => {
    const iconEl = icons[id];

    inputEl.addEventListener('input', () => handleSearch(inputEl, iconEl));

    // Allow red X to clear the input and reset results
    iconEl.addEventListener('click', () => {
      inputEl.value = '';
      handleSearch(inputEl, iconEl);
    });
  });
});
