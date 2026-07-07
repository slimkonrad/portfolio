// Lightweight: highlight the current section in the nav as you scroll.
// No animation libraries, no flashy page-load sequence — keeps the
// "notebook" feel calm rather than performative.

const sections = document.querySelectorAll('main .section, main .hero');
const navLinks = document.querySelectorAll('.nav a');

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--teal)' : '';
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((section) => {
    if (section.id) observer.observe(section);
  });
}


// ---------- POKÉDEX COMPONENT ----------
// Detail content keyed by data-detail id on each .pdx-entry button.
const pdxData = {
  colorwheel: {
    cat: 'CS Project',
    num: '#001',
    title: 'Color Wheel Clock',
    desc: 'An iOS app that rethinks how time is displayed — instead of numbers or hands, time is represented through a shifting color wheel, using hue, saturation, and brightness to convey the hour and minute visually. Later added an alarm feature and file upload support. Built for a CSPC course at CSUF.',
    stack: ['Swift', 'iOS', 'Xcode'],
    links: [{ label: 'Code →', href: 'https://github.com/slimkonrad/Color-Wheel-Clock' }]
  },
  'proj-add': {
    cat: 'CS Project',
    num: '#002',
    title: '[Next capture]',
    desc: 'Add your next class project or hackathon build here — swap this entry\'s data in script.js and its button in index.html.',
    stack: ['Add tools'],
    links: []
  },
  pfas: {
    cat: 'Internship / Research',
    num: '#001',
    title: 'PFAS Water Contamination Research',
    desc: 'Researched PFAS contamination levels to assess health and safety concerns for local water supplies. Pulled and cross-referenced data across multiple databases, then compiled findings into structured reports for faculty review.',
    stack: ['Data Analysis', 'Research', 'Documentation'],
    links: []
  },
  spa: {
    cat: 'Experience',
    num: '#001',
    title: 'Spa Advisor — South Coast Winery',
    desc: 'Resolved customer inquiries and product questions, consistently delivering efficient and positive service experiences. Maintained workspace cleanliness and organization standards. Adapted quickly to shifting priorities in a high-volume environment.',
    stack: ['Customer Service', 'Attention to Detail', 'Time Management'],
    links: []
  }
};

const pdxList = document.getElementById('pdxList');
const pdxDetailPanel = document.getElementById('pdxDetail');
const pdxTabs = document.querySelectorAll('.pdx-tab');
const pdxEntries = document.querySelectorAll('.pdx-entry');

function renderDetail(id) {
  const d = pdxData[id];
  if (!d) {
    pdxDetailPanel.innerHTML = '<p class="pdx-detail-empty">Select an entry to view its details.</p>';
    return;
  }
  const links = d.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
  pdxDetailPanel.innerHTML = `
    <div class="pdx-detail-head">
      <span class="pdx-detail-num">${d.num}</span>
      <span class="pdx-detail-cat">${d.cat}</span>
    </div>
    <h3 class="pdx-detail-title">${d.title}</h3>
    <p class="pdx-detail-desc">${d.desc}</p>
    <div class="pdx-detail-stack">${d.stack.map(s => `<span>${s}</span>`).join('')}</div>
    <div class="pdx-detail-links">${links}</div>
  `;
}

function selectEntry(entry) {
  pdxEntries.forEach(e => e.classList.remove('is-selected'));
  entry.classList.add('is-selected');
  renderDetail(entry.dataset.detail);
}

function showCategory(cat) {
  pdxTabs.forEach(t => t.classList.toggle('is-active', t.dataset.cat === cat));
  let firstVisible = null;
  pdxEntries.forEach(entry => {
    const match = entry.dataset.cat === cat;
    entry.hidden = !match;
    if (match && !firstVisible) firstVisible = entry;
  });
  if (firstVisible) selectEntry(firstVisible);
}

pdxTabs.forEach(tab => {
  tab.addEventListener('click', () => showCategory(tab.dataset.cat));
});

pdxEntries.forEach(entry => {
  entry.addEventListener('click', () => selectEntry(entry));
});

// Scroll-focus effect: entries nearer the vertical center of the list
// scale up more prominently, and the closest one auto-selects — echoing
// the in-game behavior where scrolling the list moves the selection cursor.
function updateScrollFocus() {
  if (!pdxList) return;
  const listRect = pdxList.getBoundingClientRect();
  const centerY = listRect.top + listRect.height / 2;
  let closestEntry = null;
  let closestDistance = Infinity;

  pdxEntries.forEach(entry => {
    if (entry.hidden) return;
    const rect = entry.getBoundingClientRect();
    const entryCenter = rect.top + rect.height / 2;
    const distance = Math.abs(centerY - entryCenter);
    const maxDistance = listRect.height / 2;
    const proximity = Math.max(0, 1 - distance / maxDistance);
    const scale = 1 + proximity * 0.14;
    entry.style.transform = `scale(${scale})`;

    if (distance < closestDistance) {
      closestDistance = distance;
      closestEntry = entry;
    }
  });

  if (closestEntry && !closestEntry.classList.contains('is-selected')) {
    selectEntry(closestEntry);
  }
}

if (pdxList) {
  pdxList.addEventListener('scroll', updateScrollFocus);
  window.addEventListener('resize', updateScrollFocus);
  // Initial paint
  showCategory('projects');
  updateScrollFocus();
}