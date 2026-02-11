/* script.js - aprimorado: correção navegação/telas e botão Voltar + animações e drag-to-scroll no Explore */

(() => {
  'use strict';

  const DATA_KEY = 'ev_data_v2';
  const THEME_KEY = 'ev_theme_v1';
  const READ_KEY = 'ev_read_v1';

  // nodes
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menu-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const searchInput = document.getElementById('search');
  const menuEl = document.getElementById('menu');
  const home = document.getElementById('home');
  const contentScreen = document.getElementById('content');
  const contentTitle = document.getElementById('content-title');
  const contentBody = document.getElementById('content-body');
  const backBtn = document.getElementById('back-btn');
  const startBtn = document.getElementById('start-btn');
  const openMapCta = document.getElementById('open-map-cta');

  const exploreSection = document.getElementById('explore');
  const exploreGrid = document.getElementById('explore-grid');
  const exploreBack = document.getElementById('explore-back');

  const themeToggle = document.getElementById('theme-toggle');
  const readToggle = document.getElementById('read-toggle');
  const mapBtn = document.getElementById('map-btn');
  const mapModal = document.getElementById('map-modal');
  const mapContainer = document.getElementById('map-container');



  const mobileNav = document.getElementById('mobile-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileMapBtn = document.getElementById('mobile-map-btn');

  const loadingIndicator = document.getElementById('loading-indicator');

  const defaultData = [
    {
      "title": "💠 O que é a Energia Vital?",
      "kanji": "念",
      "translation": "Pensamento / Intenção",
      "rarity": "common",
      "relations": [1,6],
      "content": "<p>A Energia Vital (念) significa literalmente 'pensamento', 'atenção' ou 'intenção mental'. É a técnica de controlar e usar a Aura de forma consciente.</p><p>Todo ser vivo possui Aura, mas apenas quem desperta a Energia Vital consegue manipulá-la, moldá-la e transformá-la — para lutar, curar, se proteger ou criar habilidades únicas.</p><p><strong>➡️ Em resumo:</strong> Energia Vital = controle consciente da própria energia para realizar feitos fora do comum.</p>"
    },
    {
      "title": "⚙️ As 4 Técnicas Básicas da Energia Vital",
      "kanji": "",
      "translation": "",
      "rarity": "common",
      "relations": [2,3,4],
      "content": "<table><tr><th>Técnica</th><th>Kanji / Nome</th><th>Função</th><th>Como Funciona</th></tr><tr><td>Ten</td><td>纏 (envolver)</td><td>Manter a aura próxima ao corpo.</td><td>Cria uma camada protetora que impede o vazamento de energia e reduz o desgaste físico.</td></tr><tr><td>Zetsu</td><td>絶 (fechar)</td><td>Fechar o fluxo de aura.</td><td>Oculta a presença, mas deixa o usuário vulnerável por parar a circulação.</td></tr><tr><td>Ren</td><td>練 (intensificar)</td><td>Aumentar a aura ao redor do corpo.</td><td>Expande quantidade e intensidade de energia — base para ataques mais fortes.</td></tr><tr><td>Hatsu</td><td>発 (expressar)</td><td>Manifestar a aura individualmente.</td><td>Cada usuário expressa seu poder de acordo com sua natureza interior.</td></tr></table>"
    },
    {
      "title": "🔹 Técnicas Avançadas da Energia Vital",
      "kanji": "",
      "translation": "",
      "rarity": "rare",
      "relations": [4,5],
      "content": "<table><tr><th>Técnica</th><th>Kanji / Nome</th><th>Função</th><th>Como Funciona</th></tr><tr><td>Gyo</td><td>凝 (concentrar)</td><td>Focar aura em uma parte específica.</td><td>Aumenta força ou percepção naquela região.</td></tr><tr><td>En</td><td>圓 (círculo)</td><td>Expandir aura ao redor do corpo.</td><td>Cria um campo de detecção — percebe tudo dentro dele.</td></tr><tr><td>Shu</td><td>修 (revestir)</td><td>Envolver objetos com aura.</td><td>Transfere energia para objetos, tornando-os mais resistentes.</td></tr><tr><td>Ko</td><td>硬 (rigidez)</td><td>Concentrar toda aura em um ponto.</td><td>Cria ataques poderosos, porém arriscados.</td></tr><tr><td>Ken</td><td>堅 (fortalecer)</td><td>Manter aura densa e equilibrada.</td><td>Defesa e ataque balanceados para combates prolongados.</td></tr><tr><td>In</td><td>隠 (ocultar)</td><td>Esconder completamente a aura.</td><td>Oculta técnicas e presença espiritual.</td></tr><tr><td>Ryu</td><td>流 (fluxo)</td><td>Controlar o fluxo da aura dinamicamente.</td><td>Move a energia entre partes do corpo conforme a necessidade.</td></tr></table>"
    },
    {
      "title": "🧿 Conceitos e Técnicas Especiais",
      "kanji": "",
      "translation": "",
      "rarity": "rare",
      "relations": [5],
      "content": "<table><tr><th>Nome</th><th>Função</th><th>Como Funciona</th></tr><tr><td>Gengu (Juramento e Condição)</td><td>Fortalece a energia vital com restrições autoimpostas.</td><td>Quanto mais arriscada a condição, maior o ganho de poder.</td></tr><tr><td>In + Ko</td><td>Ataque invisível</td><td>Golpe oculto com poder concentrado, difícil de detectar sem percepção específica.</td></tr><tr><td>Shu + Gyo</td><td>Combinação de percepção</td><td>Permite analisar truques e armadilhas de aura, misturando revestimento e foco.</td></tr></table>"
    },
    {
      "title": "🔸 Os 6 Tipos da Energia Vital (Hatsu)",
      "kanji": "発",
      "translation": "Expressão / Manifestação",
      "rarity": "epic",
      "relations": [2,3],
      "content": "<table><tr><th>Tipo</th><th>Função</th><th>Como Funciona</th></tr><tr><td>Reforço (Enhancement)</td><td>Aumenta força e resistência.</td><td>Usa aura para fortalecer o corpo ou objetos.</td></tr><tr><td>Emissão (Emission)</td><td>Projeta aura à distância.</td><td>Permite lançar energia sem perder força do corpo principal.</td></tr><tr><td>Manipulação (Manipulation)</td><td>Controla objetos, animais ou pessoas.</td><td>Direciona aura para comandar movimentos externos.</td></tr><tr><td>Transmutação (Transmutation)</td><td>Muda propriedades da aura.</td><td>Faz a aura imitar outras substâncias ou efeitos (ex: eletricidade).</td></tr><tr><td>Conjuração (Conjuration)</td><td>Cria objetos de aura.</td><td>Materializa itens com propriedades próprias.</td></tr><tr><td>Especialização (Specialization)</td><td>Efeitos únicos e imprevisíveis.</td><td>Não se encaixa nas outras categorias; muito particular e variável.</td></tr></table>"
    },
    {
      "title": "🧭 Ordem de Aprendizado",
      "kanji": "",
      "translation": "",
      "rarity": "common",
      "relations": [],
      "content": "<ol><li>Abrir os poros da aura (iniciar o treinamento).</li><li>Dominar as 4 técnicas básicas (Ten, Zetsu, Ren, Hatsu).</li><li>Aprender as técnicas avançadas (Gyo, Shu, En, etc.).</li><li>Criar seu Hatsu pessoal.</li><li>Refinar com combinações e restrições (Gengu, Ryu, etc.).</li></ol>"
    },
    {
      "title": "💬 Resumo Geral",
      "kanji": "",
      "translation": "",
      "rarity": "common",
      "relations": [],
      "content": "<ul><li>Energia Vital → energia controlada conscientemente.</li><li>4 bases → Ten, Zetsu, Ren, Hatsu.</li><li>Técnicas avançadas → Gyo, En, Shu, Ko, Ken, In, Ryu.</li><li>Tipos → Reforço, Emissão, Manipulação, Transmutação, Conjuração, Especialização.</li></ul>"
    }
  ];

  let menuData = [];
  let activeItemIndex = null;
  let searchQuery = '';
  let previousScreen = 'home'; // track previous screen for back navigation

  /* debounce */
  function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /* ---------- Helper: show/hide screens reliably ---------- */
  function hideAllScreens() {
    home.classList.add('hidden');
    home.setAttribute('aria-hidden', 'true');
    home.style.display = 'none';

    exploreSection.classList.add('hidden');
    exploreSection.setAttribute('aria-hidden', 'true');
    exploreSection.style.display = 'none';

    contentScreen.classList.add('hidden');
    contentScreen.setAttribute('aria-hidden', 'true');
    contentScreen.style.display = 'none';
  }

  function showScreen(name) {
    hideAllScreens();
    if (name === 'home') {
      home.classList.remove('hidden');
      home.classList.add('active');
      home.setAttribute('aria-hidden', 'false');
      home.style.display = '';
    } else if (name === 'explore') {
      exploreSection.classList.remove('hidden');
      exploreSection.setAttribute('aria-hidden', 'false');
      exploreSection.style.display = '';
      // trigger grid fade-in and card cascade
      requestAnimationFrame(() => {
        // remove then re-add to retrigger animation reliably
        exploreGrid.classList.remove('fade-in');
        void exploreGrid.offsetWidth;
        exploreGrid.classList.add('fade-in');
        // also add cascade variable to each card (if built)
        document.querySelectorAll('.explore-card').forEach((c, i) => {
          c.style.setProperty('--i', i);
        });
      });
    } else if (name === 'content') {
      contentScreen.classList.remove('hidden');
      contentScreen.setAttribute('aria-hidden', 'false');
      contentScreen.style.display = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* loadData: prefer localStorage then fallback fetch or default */
  async function loadData() {
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    const local = localStorage.getItem(DATA_KEY);
    if (local) {
      try {
        menuData = JSON.parse(local);
        renderMenu(menuData);
        rebuildExplore();
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
        return;
      } catch (err) {
        console.warn('Erro parse local, fetch fallback', err);
      }
    }
    try {
      const res = await fetch('data.json');
      if (!res.ok) throw new Error('fetch ' + res.status);
      const data = await res.json();
      menuData = Array.isArray(data) ? data : [];
      localStorage.setItem(DATA_KEY, JSON.stringify(menuData));
      renderMenu(menuData);
      rebuildExplore();
    } catch (err) {
      console.error('Erro ao carregar data.json, usando dados padrão', err);
      menuData = defaultData;
      localStorage.setItem(DATA_KEY, JSON.stringify(menuData));
      renderMenu(menuData);
      rebuildExplore();
    }
    if (loadingIndicator) loadingIndicator.classList.add('hidden');
  }

  /* renderMenu */
  function clearMenu() { menuEl.innerHTML = ''; }
  function renderMenu(list = []) {
    clearMenu();
    if (!list || list.length === 0) {
      menuEl.innerHTML = '<p style="color:rgba(255,255,255,0.6)">Nenhuma seção encontrada.</p>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((sec, idx) => {
      const item = document.createElement('button');
      item.className = 'menu-item';
      item.type = 'button';
      item.setAttribute('role', 'menuitem');
      item.setAttribute('data-idx', idx);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.textContent = sec.title || 'Sem título';
      item.appendChild(titleDiv);

      const metaDiv = document.createElement('div');
      metaDiv.className = 'meta';
      const parts = [];
      if (sec.kanji) parts.push(sec.kanji);
      if (sec.translation) parts.push(sec.translation);
      if (sec.rarity) parts.push(sec.rarity);
      metaDiv.textContent = parts.join(' · ');
      if (parts.length) item.appendChild(metaDiv);

      item.addEventListener('click', () => {
        // remove selected from all
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        openContent(sec, idx);
        closeSidebar();
      });
      frag.appendChild(item);
    });
    menuEl.appendChild(frag);
    if (searchQuery) {
      menuEl.querySelectorAll('.menu-item').forEach(n => highlightNodeText(n, searchQuery));
    }
  }

  /* openContent */
  function openContent(section, idx) {
    activeItemIndex = idx != null ? idx : null;
    const metaPart = section.kanji || section.translation ? ` ${section.kanji ? section.kanji + ' — ' : ''}${section.translation || ''}` : '';
    contentTitle.textContent = `${section.title}${metaPart ? ' ' + metaPart : ''}`;
    contentBody.innerHTML = section.content || '<p>(Sem conteúdo)</p>';
    if (searchQuery) highlightTree(contentBody, searchQuery);

    if (!home.classList.contains('hidden')) {
      previousScreen = 'home';
    } else if (!exploreSection.classList.contains('hidden')) {
      previousScreen = 'explore';
    } else {
      previousScreen = 'home';
    }

    showScreen('content');
    // focus for accessibility
    setTimeout(() => contentBody.focus(), 100);
  }

  /* back handlers */
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (previousScreen === 'explore') {
        showScreen('explore');
      } else {
        showScreen('home');
      }
    });
  }

  /* sidebar */
  function openSidebar() { sidebar.classList.add('open'); sidebar.setAttribute('aria-hidden', 'false'); menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeSidebar() { sidebar.classList.remove('open'); sidebar.setAttribute('aria-hidden', 'true'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  closeSidebarBtn && closeSidebarBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && !(mobileMenuBtn && mobileMenuBtn.contains(e.target))) closeSidebar();
  });

  /* search */
  const handleSearch = debounce((e) => {
    const q = (e.target.value || '').trim().toLowerCase();
    searchQuery = q;
    if (!q) { renderMenu(menuData); return; }
    const filtered = menuData.filter(sec => {
      const t = (sec.title || '').toLowerCase();
      const k = (sec.kanji || '').toLowerCase();
      const tr = (sec.translation || '').toLowerCase();
      const c = (sec.content || '').replace(/<[^>]*>/g, ' ').toLowerCase();
      return t.includes(q) || k.includes(q) || tr.includes(q) || c.includes(q);
    });
    renderMenu(filtered);
  }, 260);
  searchInput.addEventListener('input', handleSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
  });

  /* highlight helpers */
  function highlightTree(root, query) {
    if (!query) return;
    const normalized = query.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const qLow = normalized.toLowerCase();
    nodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (!parent) return;
      const text = textNode.nodeValue;
      const lower = text.toLowerCase();
      const idx = lower.indexOf(qLow);
      if (idx >= 0) {
        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + normalized.length);
        const after = text.slice(idx + normalized.length);
        const frag = document.createDocumentFragment();
        if (before) frag.appendChild(document.createTextNode(before));
        const mark = document.createElement('mark');
        mark.textContent = match;
        frag.appendChild(mark);
        if (after) frag.appendChild(document.createTextNode(after));
        parent.replaceChild(frag, textNode);
      }
    });
  }
  function highlightNodeText(node, query) { if (!query) return; highlightTree(node, query); }

  /* theme & read mode */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem(THEME_KEY, theme);
  }
  function applyReadMode(enabled) {
    document.documentElement.setAttribute('data-read', enabled ? 'true' : 'false');
    readToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    localStorage.setItem(READ_KEY, enabled ? '1' : '0');
  }
  (function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved === 'light' ? 'light' : 'dark');
    const read = localStorage.getItem(READ_KEY) === '1';
    applyReadMode(read);
  })();
  themeToggle.addEventListener('click', () => { const cur = document.documentElement.getAttribute('data-theme'); applyTheme(cur === 'light' ? 'dark' : 'light'); });
  readToggle.addEventListener('click', () => { const cur = document.documentElement.getAttribute('data-read') === 'true'; applyReadMode(!cur); });



  /* Enhanced Map: build SVG with advanced features */
  function buildMap(container, data) {
    container.innerHTML = ''; // clear
    if (!data || data.length === 0) {
      container.innerHTML = '<p style="color:rgba(255,255,255,0.6)">Nenhum dado para renderizar no mapa.</p>';
      return;
    }

    // create controls panel - only legend toggle
    const controls = document.createElement('div');
    controls.className = 'map-controls';
    controls.innerHTML = `
      <button class="map-control-btn" id="toggle-legend" title="Mostrar/ocultar legenda">📋</button>
    `;
    container.appendChild(controls);

    // create legend
    const legend = document.createElement('div');
    legend.className = 'map-legend hidden';
    legend.innerHTML = `
      <div class="legend-item">
        <div class="legend-node central"></div>
        <span>Conceito Central</span>
      </div>
      <div class="legend-item">
        <div class="legend-node epic"></div>
        <span>Técnicas Épicas</span>
      </div>
      <div class="legend-item">
        <div class="legend-node rare"></div>
        <span>Técnicas Raras</span>
      </div>
      <div class="legend-item">
        <div class="legend-node common"></div>
        <span>Técnicas Comuns</span>
      </div>
      <div class="legend-item">
        <div class="legend-edge"></div>
        <span>Relações</span>
      </div>
    `;
    container.appendChild(legend);

    // create svg container with zoom/pan
    const svgContainer = document.createElement('div');
    svgContainer.className = 'map-svg-container';
    container.appendChild(svgContainer);

    // create svg
    const svgNS = 'http://www.w3.org/2000/svg';
    const width = 1200;
    const height = 800;
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.classList.add('map-svg');

    // add background pattern
    const defs = document.createElementNS(svgNS, 'defs');

    // background pattern
    const pattern = document.createElementNS(svgNS, 'pattern');
    pattern.setAttribute('id', 'backgroundPattern');
    pattern.setAttribute('x', '0');
    pattern.setAttribute('y', '0');
    pattern.setAttribute('width', '40');
    pattern.setAttribute('height', '40');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    const patternRect = document.createElementNS(svgNS, 'rect');
    patternRect.setAttribute('width', '40');
    patternRect.setAttribute('height', '40');
    patternRect.setAttribute('fill', 'rgba(255,255,255,0.01)');
    pattern.appendChild(patternRect);
    const patternCircle = document.createElementNS(svgNS, 'circle');
    patternCircle.setAttribute('cx', '20');
    patternCircle.setAttribute('cy', '20');
    patternCircle.setAttribute('r', '1');
    patternCircle.setAttribute('fill', 'rgba(182,107,255,0.1)');
    pattern.appendChild(patternCircle);
    defs.appendChild(pattern);

    // enhanced gradients
    const nodeGradients = [
      { id: 'centralGradient', colors: ['rgba(255,255,255,0.4)', 'rgba(182,107,255,0.2)', 'rgba(154,0,255,0.1)'] },
      { id: 'epicGradient', colors: ['rgba(255,182,193,0.3)', 'rgba(240,142,198,0.2)', 'rgba(255,20,147,0.1)'] },
      { id: 'rareGradient', colors: ['rgba(186,85,211,0.3)', 'rgba(176,91,255,0.2)', 'rgba(138,43,226,0.1)'] },
      { id: 'commonGradient', colors: ['rgba(147,112,219,0.3)', 'rgba(123,104,238,0.2)', 'rgba(106,90,205,0.1)'] }
    ];

    nodeGradients.forEach(({ id, colors }) => {
      const gradient = document.createElementNS(svgNS, 'radialGradient');
      gradient.setAttribute('id', id);
      gradient.setAttribute('cx', '30%');
      gradient.setAttribute('cy', '30%');
      colors.forEach((color, i) => {
        const stop = document.createElementNS(svgNS, 'stop');
        stop.setAttribute('offset', `${(i / (colors.length - 1)) * 100}%`);
        stop.setAttribute('stop-color', color);
        gradient.appendChild(stop);
      });
      defs.appendChild(gradient);
    });

    // curved edge gradient
    const edgeGradient = document.createElementNS(svgNS, 'linearGradient');
    edgeGradient.setAttribute('id', 'edgeGradient');
    const eStops = [
      { offset: '0%', color: 'rgba(182,107,255,0.1)' },
      { offset: '20%', color: 'rgba(154,0,255,0.3)' },
      { offset: '50%', color: 'rgba(138,43,226,0.5)' },
      { offset: '80%', color: 'rgba(154,0,255,0.3)' },
      { offset: '100%', color: 'rgba(182,107,255,0.1)' }
    ];
    eStops.forEach(({ offset, color }) => {
      const stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', color);
      edgeGradient.appendChild(stop);
    });
    defs.appendChild(edgeGradient);

    // particle effect filter
    const filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', 'glowFilter');
    const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'coloredBlur');
    filter.appendChild(feGaussianBlur);
    const feMerge = document.createElementNS(svgNS, 'feMerge');
    const feMergeNode1 = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode1.setAttribute('in', 'coloredBlur');
    const feMergeNode2 = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feMerge);
    defs.appendChild(filter);

    svg.appendChild(defs);

    // background
    const bgRect = document.createElementNS(svgNS, 'rect');
    bgRect.setAttribute('width', '100%');
    bgRect.setAttribute('height', '100%');
    bgRect.setAttribute('fill', 'url(#backgroundPattern)');
    svg.appendChild(bgRect);

    // improved layout with better spacing
    const center = { x: width / 2, y: height / 2 };
    const nodes = [];
    const nodeSpacing = 180;

    // central node
    nodes.push({
      idx: -1,
      x: center.x,
      y: center.y,
      data: { title: '🌀 Energia Vital', rarity: 'central' },
      connections: new Set()
    });

    // organize nodes in concentric circles with better distribution
    const connectedToCenter = new Set();
    data.forEach((d, i) => {
      if (Array.isArray(d.relations) && d.relations.includes(0)) connectedToCenter.add(i);
    });

    // first ring: directly connected to center
    const layer1 = Array.from(connectedToCenter);
    const layer1Radius = 200;
    layer1.forEach((idx, i) => {
      const angle = (i / layer1.length) * Math.PI * 2;
      nodes.push({
        idx,
        x: center.x + Math.cos(angle) * layer1Radius,
        y: center.y + Math.sin(angle) * layer1Radius,
        data: data[idx],
        connections: new Set(data[idx].relations || [])
      });
      nodes[0].connections.add(idx);
    });

    // second ring: remaining nodes
    const layer2 = data.map((_, i) => i).filter(i => !connectedToCenter.has(i));
    const layer2Radius = 350;
    layer2.forEach((idx, i) => {
      const angle = (i / layer2.length) * Math.PI * 2 + Math.PI / layer2.length;
      nodes.push({
        idx,
        x: center.x + Math.cos(angle) * layer2Radius,
        y: center.y + Math.sin(angle) * layer2Radius,
        data: data[idx],
        connections: new Set(data[idx].relations || [])
      });
    });

    // create curved edges with animation
    const edges = [];
    nodes.forEach((node, i) => {
      if (node.idx >= 0 && node.connections.size > 0) {
        node.connections.forEach(targetIdx => {
          const targetNode = nodes.find(n => n.idx === targetIdx);
          if (targetNode) {
            edges.push({ from: node, to: targetNode });
          }
        });
      }
    });

    // draw edges with curved paths and advanced animation
    edges.forEach((e, idx) => {
      const path = document.createElementNS(svgNS, 'path');

      // create curved path
      const dx = e.to.x - e.from.x;
      const dy = e.to.y - e.from.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const curvature = Math.min(distance * 0.3, 80);

      // control points for bezier curve
      const cp1x = e.from.x + dx * 0.5 - dy * (curvature / distance);
      const cp1y = e.from.y + dy * 0.5 + dx * (curvature / distance);
      const cp2x = e.to.x - dx * 0.5 - dy * (curvature / distance);
      const cp2y = e.to.y - dy * 0.5 + dx * (curvature / distance);

      const dAttr = `M ${e.from.x},${e.from.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${e.to.x},${e.to.y}`;
      path.setAttribute('d', dAttr);
      path.setAttribute('class', 'map-edge');
      path.style.stroke = 'url(#edgeGradient)';
      path.style.strokeWidth = '3';
      path.style.fill = 'none';
      path.style.opacity = '0';
      path.style.filter = 'url(#glowFilter)';
      path.style.animation = `edgeDraw 1.2s ease-out ${idx * 0.08}s forwards`;
      svg.appendChild(path);
    });

    // draw nodes with enhanced visuals
    nodes.forEach((nObj, idx) => {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'map-node');
      g.setAttribute('data-idx', nObj.idx);
      g.style.opacity = '0';
      g.style.animation = `nodeFadeIn 0.8s ease-out ${idx * 0.1}s forwards`;

      // outer glow ring
      const glowRing = document.createElementNS(svgNS, 'circle');
      glowRing.setAttribute('cx', nObj.x);
      glowRing.setAttribute('cy', nObj.y);
      glowRing.setAttribute('r', nObj.idx === -1 ? 65 : 38);
      glowRing.style.fill = 'none';
      glowRing.style.stroke = nObj.idx === -1 ? 'rgba(182,107,255,0.2)' :
                             (nObj.data.rarity === 'epic') ? 'rgba(255,20,147,0.15)' :
                             (nObj.data.rarity === 'rare') ? 'rgba(138,43,226,0.15)' : 'rgba(106,90,205,0.15)';
      glowRing.style.strokeWidth = '2';
      glowRing.style.filter = 'blur(4px)';
      g.appendChild(glowRing);

      // main circle with gradient
      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', nObj.x);
      c.setAttribute('cy', nObj.y);
      c.setAttribute('r', nObj.idx === -1 ? 55 : 32);
      c.setAttribute('class', 'map-node-circle');
      c.style.fill = `url(#${nObj.idx === -1 ? 'central' : nObj.data.rarity || 'common'}Gradient)`;
      c.style.stroke = nObj.idx === -1 ? 'rgba(255,255,255,0.3)' :
                      (nObj.data.rarity === 'epic') ? 'rgba(255,20,147,0.4)' :
                      (nObj.data.rarity === 'rare') ? 'rgba(138,43,226,0.4)' : 'rgba(106,90,205,0.4)';
      c.style.strokeWidth = '2';
      c.style.filter = 'url(#glowFilter)';
      g.appendChild(c);

      // inner highlight
      const highlight = document.createElementNS(svgNS, 'circle');
      highlight.setAttribute('cx', nObj.x - 8);
      highlight.setAttribute('cy', nObj.y - 8);
      highlight.setAttribute('r', nObj.idx === -1 ? 15 : 8);
      highlight.style.fill = 'rgba(255,255,255,0.3)';
      highlight.style.filter = 'blur(2px)';
      g.appendChild(highlight);

      // label with better typography
      if (nObj.data.title) {
        const t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', nObj.x);
        t.setAttribute('y', nObj.y + (nObj.idx === -1 ? 10 : 50));
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('class', `node-label ${nObj.idx === -1 ? 'central' : 'regular'}`);
        t.textContent = nObj.idx === -1 ? nObj.data.title : (nObj.data.title || '').replace(/[^\w\s]/g, '').substring(0, 18);
        t.style.fill = nObj.idx === -1 ? 'var(--accent)' : 'var(--text)';
        t.style.fontWeight = nObj.idx === -1 ? 'bold' : '500';
        t.style.fontSize = nObj.idx === -1 ? '16px' : '12px';
        g.appendChild(t);
      }

      // enhanced tooltip
      const tooltip = document.createElementNS(svgNS, 'title');
      const tooltipText = nObj.idx === -1 ? nObj.data.title :
                         `${nObj.data.title}\n${nObj.data.kanji || ''} ${nObj.data.translation || ''}\nRaridade: ${nObj.data.rarity || 'comum'}`;
      tooltip.textContent = tooltipText;
      g.appendChild(tooltip);

      // interaction with hover effects
      if (nObj.idx >= 0) {
        g.addEventListener('click', () => {
          if (Number.isFinite(nObj.idx) && menuData[nObj.idx]) {
            openContent(menuData[nObj.idx], nObj.idx);
            mapModal.classList.add('hidden');
            mapModal.setAttribute('aria-hidden', 'true');
          }
        });
        g.style.cursor = 'pointer';

        // hover effects - beautiful pulsing glow
        g.addEventListener('mouseenter', () => {
          c.style.animation = 'pulseGlow 2s ease-in-out infinite';
          c.style.filter = 'url(#glowFilter) brightness(1.3) saturate(1.2)';
          // highlight connected edges with golden glow
          edges.forEach(edge => {
            if (edge.from.idx === nObj.idx || edge.to.idx === nObj.idx) {
              edge.path.style.stroke = 'rgba(255,215,0,0.9)';
              edge.path.style.strokeWidth = '5';
              edge.path.style.filter = 'url(#glowFilter)';
            }
          });
        });

        g.addEventListener('mouseleave', () => {
          c.style.animation = '';
          c.style.filter = 'url(#glowFilter)';
          // reset edge colors
          edges.forEach(edge => {
            edge.path.style.stroke = 'url(#edgeGradient)';
            edge.path.style.strokeWidth = '3';
            edge.path.style.filter = 'url(#glowFilter)';
          });
        });
      }

      svg.appendChild(g);
    });

    // store edges reference for hover effects
    edges.forEach(edge => {
      edge.path = svg.querySelector(`.map-edge:nth-child(${Array.from(svg.children).indexOf(edge.path) + 1})`);
    });

    svgContainer.appendChild(svg);

    // controls functionality - only legend toggle remains
    document.getElementById('toggle-legend').addEventListener('click', () => {
      legend.classList.toggle('hidden');
    });
  }

  /* open map */
  mapBtn.addEventListener('click', () => {
    buildMap(mapContainer, menuData);
    mapModal.classList.remove('hidden'); mapModal.setAttribute('aria-hidden', 'false');
  });
  openMapCta?.addEventListener('click', () => {
    buildMap(mapContainer, menuData);
    mapModal.classList.remove('hidden'); mapModal.setAttribute('aria-hidden', 'false');
  });

  mapModal.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => {
    mapModal.classList.add('hidden'); mapModal.setAttribute('aria-hidden', 'true');
  }));
  mapModal.addEventListener('click', (e) => { if (e.target === mapModal) { mapModal.classList.add('hidden'); mapModal.setAttribute('aria-hidden', 'true'); } });

  /* Explore: build cards (adds --i custom property for stagger) */
  function rebuildExplore(list = menuData) {
    exploreGrid.innerHTML = '';
    if (!list || !list.length) {
      exploreGrid.innerHTML = '<p style="color:rgba(255,255,255,0.6)">Nenhuma técnica para explorar.</p>';
      return;
    }
    list.forEach((sec, idx) => {
      const card = document.createElement('div');
      card.className = `explore-card card-rarity ${sec.rarity || 'common'}`;
      card.setAttribute('role', 'listitem');
      card.style.setProperty('--i', idx);

      const head = document.createElement('div'); head.className = 'card-head';
      const icon = document.createElement('div'); icon.className = 'card-icon';
      const emojiMatch = (sec.title || '').match(/[\p{Emoji_Presentation}\p{Emoji}\u2600-\u27BF]/u);
      icon.textContent = emojiMatch ? emojiMatch[0] : (sec.title ? sec.title[0] : '✦');
      const title = document.createElement('div'); title.className = 'card-title'; title.textContent = sec.title || 'Sem título';
      const meta = document.createElement('div'); meta.className = 'card-meta'; meta.textContent = `${sec.kanji || ''} ${sec.translation || ''}`.trim();

      head.appendChild(icon); head.appendChild(title);

      const metaWrapper = document.createElement('div'); metaWrapper.style.marginLeft = 'auto'; metaWrapper.appendChild(meta);
      head.appendChild(metaWrapper);

      const body = document.createElement('div'); body.className = 'card-body';
      body.innerHTML = sec.content || '<p>(Sem conteúdo)</p>';
      body.classList.add('open'); // always show body

      const rels = document.createElement('div'); rels.style.marginTop = '8px'; rels.style.fontSize = '0.85rem';
      if (Array.isArray(sec.relations) && sec.relations.length) {
        const names = sec.relations.map(i => (menuData[i] ? menuData[i].title : `#${i}`)).join(', ');
        rels.textContent = `Relacionado: ${names}`;
      } else {
        rels.textContent = 'Relacionado: —';
      }
      body.appendChild(rels);

      title.addEventListener('click', () => {
        openContent(sec, idx);
      });

      card.appendChild(head);
      card.appendChild(body);
      exploreGrid.appendChild(card);
    });

    // ensure animation variables are set and trigger cascade
    requestAnimationFrame(() => {
      exploreGrid.querySelectorAll('.explore-card').forEach((c, i) => c.style.setProperty('--i', i));
      // retrigger fade-in
      exploreGrid.classList.remove('fade-in');
      void exploreGrid.offsetWidth;
      exploreGrid.classList.add('fade-in');
    });
  }

  startBtn.addEventListener('click', () => {
    showScreen('explore');
    rebuildExplore();
  });
  exploreBack.addEventListener('click', () => {
    showScreen('home');
  });

  /* mobile nav */
  mobileMenuBtn?.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  mobileSearchBtn?.addEventListener('click', () => { searchInput.focus(); openSidebar(); });
  mobileMapBtn?.addEventListener('click', () => { buildMap(mapContainer, menuData); mapModal.classList.remove('hidden'); mapModal.setAttribute('aria-hidden','false'); });

  /* ESC closes */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!mapModal.classList.contains('hidden')) { mapModal.classList.add('hidden'); mapModal.setAttribute('aria-hidden','true'); }
      if (sidebar.classList.contains('open')) closeSidebar();
    }
  });

  /* highlighting on input (rebuild explore / menu) */
  const highlightOnInput = debounce(() => {
    if (!searchQuery) { renderMenu(menuData); rebuildExplore(); return; }
    if (!contentScreen.classList.contains('hidden') && activeItemIndex != null) {
      contentBody.innerHTML = menuData[activeItemIndex].content || '<p>(Sem conteúdo)</p>';
      highlightTree(contentBody, searchQuery);
    }
    const filtered = menuData.filter(sec => {
      const t = (sec.title || '').toLowerCase();
      const k = (sec.kanji || '').toLowerCase();
      const tr = (sec.translation || '').toLowerCase();
      const c = (sec.content || '').replace(/<[^>]*>/g, ' ').toLowerCase();
      return t.includes(searchQuery) || k.includes(searchQuery) || tr.includes(searchQuery) || c.includes(searchQuery);
    });
    renderMenu(filtered);
    rebuildExplore(filtered);
    document.querySelectorAll('.explore-card').forEach(card => highlightNodeText(card, searchQuery));
  }, 180);

  searchInput.addEventListener('input', (e) => {
    searchQuery = (searchInput.value || '').trim().toLowerCase();
    handleSearch(e);
    highlightOnInput();
  });

  /* ========== Drag-to-scroll for exploreGrid ========== */
  (function enableDragToScroll() {
    if (!exploreGrid) return;
    let isDown = false;
    let startY, startX, scrollTop, scrollLeft;
    let lastMoveTime = 0;
    exploreGrid.addEventListener('pointerdown', (e) => {
      // only left click / touch
      if (e.button && e.button !== 0) return;
      // don't drag if clicking on title
      if (e.target.closest('.card-title')) return;
      isDown = true;
      exploreGrid.setPointerCapture(e.pointerId);
      startY = e.clientY;
      startX = e.clientX;
      scrollTop = exploreGrid.scrollTop;
      scrollLeft = exploreGrid.scrollLeft;
      exploreGrid.style.cursor = 'grabbing';
      exploreGrid.style.userSelect = 'none';
      lastMoveTime = Date.now();
    }, { passive: true });

    exploreGrid.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dy = e.clientY - startY;
      const dx = e.clientX - startX;
      // invert dy for natural dragging (drag up -> scroll down)
      exploreGrid.scrollTop = scrollTop - dy;
      exploreGrid.scrollLeft = scrollLeft - dx;
      lastMoveTime = Date.now();
    }, { passive: true });

    function release(e) {
      if (!isDown) return;
      isDown = false;
      try { exploreGrid.releasePointerCapture && exploreGrid.releasePointerCapture(e.pointerId); } catch (err) {}
      exploreGrid.style.cursor = 'grab';
      exploreGrid.style.removeProperty('user-select');
    }
    exploreGrid.addEventListener('pointerup', release, { passive: true });
    exploreGrid.addEventListener('pointercancel', release, { passive: true });
    exploreGrid.addEventListener('pointerleave', release, { passive: true });
  })();

  /* init */
  showScreen('home');
  loadData();

  // export global small helper
  window.openContentByIndex = (i) => { if (menuData[i]) openContent(menuData[i], i); };
})();
