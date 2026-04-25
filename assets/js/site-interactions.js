(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js-enabled');

  function updateScrollProgress() {
    var progress = document.querySelector('.scroll-progress');
    if (!progress) {
      return;
    }

    var scrollTop = window.pageYOffset || doc.scrollTop || 0;
    var scrollHeight = doc.scrollHeight - doc.clientHeight;
    var percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = percent + '%';
  }

  function setupBackToTop() {
    var button = document.querySelector('.back-to-top');
    if (!button) {
      return;
    }

    function toggleButton() {
      button.classList.toggle('visible', window.pageYOffset > 480);
    }

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleButton, { passive: true });
    toggleButton();
  }

  function setupTopicFilters() {
    var buttons = document.querySelectorAll('.topic-filter-button');
    var posts = document.querySelectorAll('.post-preview[data-tags]');

    if (!buttons.length || !posts.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');

        buttons.forEach(function (item) {
          item.classList.toggle('active', item === button);
        });

        posts.forEach(function (post) {
          var tags = post.getAttribute('data-tags') || '';
          var shouldShow = filter === 'all' || tags.split(/\s+/).indexOf(filter) !== -1;
          post.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
  }

  function setupRevealMotion() {
    var items = document.querySelectorAll('.home-intro, .topic-filter, .featured-post, .post-preview, .profile-panel, .profile-timeline, .blog-post > *');

    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    items.forEach(function (item) {
      item.classList.add('revealable');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupBackToTop();
    setupTopicFilters();
    setupRevealMotion();
    updateScrollProgress();
  });

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
})();
