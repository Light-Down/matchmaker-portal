(function () {
  const base = {
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    award: '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5"/>',
    'bar-chart-2': '<path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>',
    'book-open': '<path d="M12 7v14"/><path d="M3 5a7 7 0 0 1 9 2 7 7 0 0 1 9-2v14a7 7 0 0 0-9 2 7 7 0 0 0-9-2z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    camera: '<path d="M14.5 4 13 2h-2L9.5 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="4"/>',
    car: '<path d="M5 17h14l-1.5-6A3 3 0 0 0 14.6 9H9.4a3 3 0 0 0-2.9 2L5 17Z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 13h14"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-5"/>',
    'check-circle2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-5"/>',
    'chevrons-down': '<path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    coffee: '<path d="M4 8h14v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M18 9h1a3 3 0 0 1 0 6h-1"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/>',
    cookie: '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 1-4-4 4 4 0 0 1-2-2Z"/><circle cx="8" cy="15" r="1"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="16" r="1"/>',
    crown: '<path d="m3 8 4 4 5-8 5 8 4-4-2 10H5Z"/><path d="M5 20h14"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    gem: '<path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M2 9h20"/><path d="m12 21 4-12-4-6-4 6Z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    layers: '<path d="m12 2 10 6-10 6L2 8Z"/><path d="m2 14 10 6 10-6"/><path d="m2 11 10 6 10-6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'message-circle': '<path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5Z"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
    play: '<polygon points="8,5 19,12 8,19"/>',
    quote: '<path d="M3 21c3-1 5-4 5-8V5H3v8h3c0 3-1 5-3 6Z"/><path d="M14 21c3-1 5-4 5-8V5h-5v8h3c0 3-1 5-3 6Z"/>',
    'shield-alert': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/>',
    shirt: '<path d="M20 7 16 3h-3a2 2 0 0 1-2 0H8L4 7l3 3v10h10V10Z"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
    sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'trending-up': '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><path d="M15 9 9 15"/><path d="m9 9 6 6"/>',
    'x-octagon': '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86Z"/><path d="M15 9 9 15"/><path d="m9 9 6 6"/>',
    zap: '<path d="M13 2 3 14h8l-1 8 11-14h-8Z"/>',
  };

  function createIcons() {
    document.querySelectorAll('[data-lucide]').forEach((node) => {
      const name = node.getAttribute('data-lucide');
      const paths = base[name] || base.info;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', name === 'play' ? 'currentColor' : 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.setAttribute('aria-hidden', 'true');
      svg.className.baseVal = node.getAttribute('class') || '';
      svg.innerHTML = paths;
      node.replaceWith(svg);
    });
  }

  window.lucide = { createIcons };
})();

