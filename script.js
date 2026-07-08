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
  globegrid: {
    cat: 'CS Project',
    num: '#002',
    title: 'Globe-Grid',
    location: 'Hackathon — Team The Jons',
    duration: '2026',
    desc: 'An AI-generated 3D voxel world you fly through in real time. A theme (typed by the player) gets painted as a 2D top-down concept map by Gemini\'s image model, a second Gemini call reads that painting to assign terrain heights, and Godot extrudes the result into an explorable 3D landscape with a matching generated soundtrack. Built with 3 teammates (Fabian Osegueda, Sophia Beker, Kevin Fuentes).',
    stack: ['Python', 'Godot', 'GDScript', 'Gemini API', 'Lyria 3'],
    links: [{ label: 'Code →', href: 'https://github.com/slimkonrad/Build-With-Gemini' }]
  },
  pfas: {
    cat: 'Internship / Research',
    num: '#001',
    title: 'PFAS Water Contamination Research',
    location: 'CSUF - Engineering Department',
    duration: 'Sept 2022 - Apr 2023',
    desc: 'Researched PFAS contamination levels to assess health and safety concerns for local water supplies. Pulled and cross-referenced data across multiple databases, then compiled findings into structured reports for faculty review.',
    stack: ['Data Analysis', 'Research', 'Documentation'],
    links: []
  },
  spa: {
    cat: 'Experience',
    num: '#001',
    title: 'Spa Advisor — South Coast Winery',
    duration: 'June 2025 - Present',
    desc: 'Resolved customer inquiries and product questions, consistently delivering efficient and positive service experiences. Maintained workspace cleanliness and organization standards. Adapted quickly to shifting priorities in a high-volume environment.',
    stack: ['Customer Service', 'Attention to Detail', 'Time Management'],
    links: []
  },
  unknown: {
    cat: '???',
    num: '#???',
    title: 'Not yet captured',
    desc: 'This entry is still out there. Filler slot for scroll-testing — swap it out once a real project lands here.',
    stack: [],
    links: []
  }
};

const pdxList = document.getElementById('pdxList');
const pdxDetailPanel = document.getElementById('pdxDetail');
const pdxTabs = document.querySelectorAll('.pdx-tab');
const pdxEntries = document.querySelectorAll('.pdx-entry');
const pdxSpacerTop = document.getElementById('pdxSpacerTop');
const pdxSpacerBottom = document.getElementById('pdxSpacerBottom');

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
    <p class="pdx-detail-location">${d.location || ''}</p>
    <p class="pdx-detail-duration">${d.duration || ''}</p>
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

function centerEntry(entry) {
  if (!entry || !pdxList) return;
  const listRect = pdxList.getBoundingClientRect();
  const entryRect = entry.getBoundingClientRect();
  const offset = (entryRect.top + entryRect.height / 2) - (listRect.top + listRect.height / 2);
  pdxList.scrollTop += offset;
}

// Size the top/bottom spacers so the FIRST and LAST real entries can also
// be scrolled all the way to the visual center — without this, an entry
// at either end of the list could never truly reach center, which is what
// caused the selected entry and the "enlarged" entry to disagree.
function setupSpacers() {
  if (!pdxList || !pdxSpacerTop || !pdxSpacerBottom) return;
  const sample = pdxList.querySelector('.pdx-entry:not([hidden])');
  const entryHeight = sample ? sample.offsetHeight : 46;
  const half = Math.max(0, (pdxList.clientHeight - entryHeight) / 2);
  pdxSpacerTop.style.height = `${half}px`;
  pdxSpacerBottom.style.height = `${half}px`;
}

function showCategory(cat) {
  pdxTabs.forEach(t => t.classList.toggle('is-active', t.dataset.cat === cat));
  let firstVisible = null;
  pdxEntries.forEach(entry => {
    const match = entry.dataset.cat === cat;
    entry.hidden = !match;
    if (match && !firstVisible) firstVisible = entry;
  });
  if (firstVisible) {
    selectEntry(firstVisible);
    centerEntry(firstVisible);
  }
}

pdxTabs.forEach(tab => {
  tab.addEventListener('click', () => showCategory(tab.dataset.cat));
});

pdxEntries.forEach(entry => {
  entry.addEventListener('click', () => {
    selectEntry(entry);
    centerEntry(entry);
  });
});

// Scroll-focus effect: entries nearer the vertical center scale up and
// fade in more; the entry closest to center also becomes the selected
// entry (red, shown in the detail panel) — so "enlarged" and "selected"
// are always describing the same entry, never two different ones.
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
    const scale = 0.88 + proximity * 0.32;
    const opacity = 0.45 + proximity * 0.55;
    entry.style.transform = `scale(${scale})`;
    entry.style.opacity = opacity;

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
  let scrollFrame = null;
  pdxList.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      updateScrollFocus();
      scrollFrame = null;
    });
  });
  window.addEventListener('resize', () => {
    setupSpacers();
    updateScrollFocus();
  });
  // Initial paint: size spacers first so the first entry can truly sit at
  // center, then select + center it, then compute the curve once.
  setupSpacers();
  showCategory('projects');
  updateScrollFocus();

  // Step navigation: instead of free mouse-wheel scrolling (which moves a
  // fixed pixel distance per notch and can overshoot past more than one
  // entry), each wheel notch moves the selection exactly one entry at a
  // time — closer to how the in-game list steps deliberately.
  let wheelLocked = false;
  pdxList.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;

    const visible = Array.from(pdxEntries).filter(en => !en.hidden);
    const currentIndex = visible.findIndex(en => en.classList.contains('is-selected'));
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = Math.min(visible.length - 1, Math.max(0, currentIndex + direction));
    const nextEntry = visible[nextIndex];

    if (nextEntry) {
      selectEntry(nextEntry);
      centerEntry(nextEntry);
    }

    setTimeout(() => { wheelLocked = false; }, 220);
  }, { passive: false });
}