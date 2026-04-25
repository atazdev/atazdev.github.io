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

  function classifyResourceSection(text) {
    var value = text.toLowerCase();
    var topics = [];

    if (/(api|web|grpc|graphql|rest|http)/.test(value)) {
      topics.push('api');
    }
    if (/(database|storage|data|postgres|redis|kafka|queue)/.test(value)) {
      topics.push('database');
    }
    if (/(cache|caching|performance|latency|cdn|redis)/.test(value)) {
      topics.push('performance');
    }
    if (/(cloud|distributed|aws|azure|lambda|scalability|resiliency)/.test(value)) {
      topics.push('cloud');
    }
    if (/(security|auth|password|token|oauth|vpn|firewall)/.test(value)) {
      topics.push('security');
    }
    if (/(devops|ci\/cd|cicd|kubernetes|docker|terraform|sre)/.test(value)) {
      topics.push('devops');
    }
    if (/(interview|technical)/.test(value)) {
      topics.push('interviews');
    }
    if (/(getting started|book|education|youtube|talk|movie|documentary)/.test(value)) {
      topics.push('education');
    }
    if (/(broker|trading software)/.test(value)) {
      topics.push('brokers');
    }
    if (/(research|scanner|screener|idea generation|blog|forum|chat|twitter)/.test(value)) {
      topics.push('research');
    }
    if (/(calendar|earnings|dividend|economic)/.test(value)) {
      topics.push('calendars');
    }
    if (/(technical analysis|fundamental analysis|trade analysis)/.test(value)) {
      topics.push('analysis');
    }
    if (/(sec filing|halt|short selling|exchange)/.test(value)) {
      topics.push('filings');
    }
    if (/(youtube|talk|speech|movie|documentary|twitter)/.test(value)) {
      topics.push('media');
    }
    if (/(developer|algo|api)/.test(value)) {
      topics.push('developers');
    }

    return topics.length ? topics.join(' ') : 'general';
  }

  function getDirectChild(element, tagName) {
    var tag = tagName.toLowerCase();
    var children = element.children;

    for (var i = 0; i < children.length; i += 1) {
      if (children[i].tagName.toLowerCase() === tag) {
        return children[i];
      }
    }

    return null;
  }

  function isLegacyResourceHeading(element) {
    var text;

    if (!element || element.tagName.toLowerCase() !== 'p') {
      return false;
    }

    text = element.textContent.trim();
    return !!element.querySelector('a[id]') && /:$/.test(text) && text === text.toUpperCase();
  }

  function cleanResourceHeading(text) {
    return text.replace(/:$/, '').replace(/\s+/g, ' ').trim();
  }

  function enhanceLegacyResourceIndex(index, heading) {
    var nodes = [];
    var node = heading.nextElementSibling;
    var list = document.createElement('ul');
    var currentItem = null;
    var currentDetails = null;
    var currentBody = null;

    while (node) {
      nodes.push(node);
      node = node.nextElementSibling;
    }

    list.className = 'resource-index-list legacy-resource-index';
    heading.parentNode.insertBefore(list, heading.nextElementSibling);

    nodes.forEach(function (item) {
      var labelText;
      var details;
      var summary;
      var label;
      var count;
      var body;
      var topics;

      if (isLegacyResourceHeading(item)) {
        labelText = cleanResourceHeading(item.textContent);
        topics = classifyResourceSection(labelText);

        currentItem = document.createElement('li');
        details = document.createElement('details');
        summary = document.createElement('summary');
        label = document.createElement('span');
        count = document.createElement('em');
        body = document.createElement('div');

        details.className = 'resource-index-section';
        details.setAttribute('data-resource-topics', topics);
        label.textContent = labelText;
        count.textContent = '0 links';
        body.className = 'resource-index-body';

        summary.appendChild(label);
        summary.appendChild(count);
        details.appendChild(summary);
        details.appendChild(body);
        currentItem.appendChild(details);
        list.appendChild(currentItem);

        currentDetails = details;
        currentBody = body;
        item.remove();
        return;
      }

      if (!currentBody) {
        item.remove();
        return;
      }

      currentBody.appendChild(item);
      if (currentDetails) {
        currentDetails.querySelector('summary em').textContent = currentDetails.querySelectorAll('a[href]').length + ' links';
      }
    });
  }

  function setupResourceIndex() {
    var index = document.querySelector('.resource-index-post');
    var buttons = document.querySelectorAll('.resource-filter-button');

    if (!index) {
      return;
    }

    var resourceHeading = Array.prototype.filter.call(index.querySelectorAll('h2'), function (heading) {
      return /resource index/i.test(heading.textContent);
    })[0];
    var list = resourceHeading ? resourceHeading.nextElementSibling : index.querySelector('h2 + ul');

    if (resourceHeading && (!list || list.tagName.toLowerCase() !== 'ul')) {
      enhanceLegacyResourceIndex(index, resourceHeading);
      list = resourceHeading.nextElementSibling;
    }

    if (!list || list.tagName.toLowerCase() !== 'ul') {
      return;
    }

    list.classList.add('resource-index-list');

    Array.prototype.forEach.call(list.children, function (item, itemIndex) {
      if (item.tagName.toLowerCase() !== 'li') {
        return;
      }

      var title = getDirectChild(item, 'a');
      var nestedList = getDirectChild(item, 'ul');
      var existingDetails = getDirectChild(item, 'details');
      if (!title || !nestedList || existingDetails) {
        return;
      }

      var topics = classifyResourceSection(title.textContent);
      var details = document.createElement('details');
      details.className = 'resource-index-section';
      details.setAttribute('data-resource-topics', topics);

      var summary = document.createElement('summary');
      var label = document.createElement('span');
      var count = document.createElement('em');
      label.textContent = title.textContent;
      count.textContent = nestedList.querySelectorAll('a').length + ' links';
      summary.appendChild(label);
      summary.appendChild(count);

      var sectionLink = title.cloneNode(true);
      sectionLink.className = 'resource-section-link';
      sectionLink.textContent = 'Open category overview';

      title.remove();
      details.appendChild(summary);
      details.appendChild(sectionLink);
      details.appendChild(nestedList);
      item.appendChild(details);
    });

    if (!buttons.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-resource-filter');
        var sections = index.querySelectorAll('.resource-index-section');

        buttons.forEach(function (item) {
          item.classList.toggle('active', item === button);
        });

        sections.forEach(function (section) {
          var topics = section.getAttribute('data-resource-topics') || '';
          var visible = filter === 'all' || topics.split(/\s+/).indexOf(filter) !== -1;
          section.parentElement.classList.toggle('is-hidden', !visible);
          if (visible && filter !== 'all') {
            section.open = true;
          }
        });
      });
    });
  }

  function setupRevealMotion() {
    var items = document.querySelectorAll('.home-intro, .start-here, .recommended-strip, .topic-filter, .resource-start, .resource-featured, .resource-filter, .featured-post, .post-preview, .profile-panel, .profile-timeline, .resource-card, .project-card, .concept-grid section, .topic-section, .related-posts, .follow-block, .discussion-block, .not-found-panel, .blog-post > *');

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

  function slugify(text) {
    return text.toString().toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function setupArticleEnhancements() {
    var article = document.querySelector('.blog-post');
    var toc = document.querySelector('.article-toc');
    var tocList = document.querySelector('.article-toc-list');

    if (!article) {
      return;
    }

    var headings = article.querySelectorAll('h2, h3');
    var usedIds = {};

    if (!headings.length) {
      if (toc) {
        toc.remove();
      }
      return;
    }

    headings.forEach(function (heading) {
      if (heading.closest('.article-toc')) {
        return;
      }

      if (!heading.id) {
        heading.id = slugify(heading.textContent);
      }

      if (usedIds[heading.id]) {
        usedIds[heading.id] += 1;
        heading.id = heading.id + '-' + usedIds[heading.id];
      } else {
        usedIds[heading.id] = 1;
      }

      var anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = '#' + heading.id;
      anchor.setAttribute('aria-label', 'Copy link to ' + heading.textContent);
      anchor.textContent = '#';
      anchor.addEventListener('click', function () {
        var url = window.location.origin + window.location.pathname + '#' + heading.id;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url);
        }
      });
      heading.appendChild(anchor);

      if (tocList && heading.tagName.toLowerCase() === 'h2') {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.childNodes[0].textContent || heading.textContent;
        item.appendChild(link);
        tocList.appendChild(item);
      }
    });

    if (toc && tocList && !tocList.children.length) {
      toc.remove();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupBackToTop();
    setupTopicFilters();
    setupResourceIndex();
    setupArticleEnhancements();
    setupRevealMotion();
    updateScrollProgress();
  });

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
})();
