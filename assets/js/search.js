(function() {
  let searchData = null;
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  // 1. Fetch Search Index
  async function initSearch() {
    try {
      const response = await fetch('/assets/data/search.json');
      searchData = await response.json();
    } catch (err) {
      console.error('Failed to initialize search:', err);
    }
  }

  // 2. Open/Close Modal
  function toggleModal(show) {
    if (show) {
      modal.style.display = 'flex';
      input.focus();
      document.body.style.overflow = 'hidden';
      if (!searchData) initSearch();
    } else {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      input.value = '';
      resultsContainer.innerHTML = '<div class="search-empty-state">TYPE_TO_INITIALIZE_SCAN...</div>';
    }
  }

  // 3. Perform Search
  function performSearch(query) {
    if (!searchData || !query) {
      resultsContainer.innerHTML = '<div class="search-empty-state">TYPE_TO_INITIALIZE_SCAN...</div>';
      return;
    }

    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.summary.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div class="search-empty-state">NO_MATCHING_TRANSMISSIONS_FOUND...</div>';
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <a href="${item.url}" class="search-result-item">
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-summary">${item.summary}</div>
      </a>
    `).join('');
  }

  // 4. Event Listeners
  window.addEventListener('keydown', (e) => {
    // Ctrl+K to open
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleModal(true);
    }
    // ESC to close
    if (e.key === 'Escape') {
      toggleModal(false);
    }
  });

  const searchTrigger = document.getElementById('nav-search-link');
  if (searchTrigger) {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleModal(true);
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal(false);
  });

  input.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

})();
