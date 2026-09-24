/* ============================================================
   SkillVerse — app.js
   Vanilla JS, hash-based routing, localStorage persistence.
   No build step required — open index.html directly.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    progress: "skillverse_progress_v1",   // { [skillId]: { [taskId]: true } }
    profile:  "skillverse_profile_v1",    // { name, device, goal, dailyTarget }
    game:     "skillverse_game_v1",       // { xp, badges: [], streak, lastVisit }
    ui:       "skillverse_ui_v1"          // { openStages: {} }
  };

  // ---------- storage helpers ----------
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error("SkillVerse: failed to read", key, e);
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("SkillVerse: failed to save", key, e);
    }
  }

  let progress = load(STORAGE_KEYS.progress, {});
  let profile  = load(STORAGE_KEYS.profile, { name: "", device: "", goal: "", dailyTarget: "" });
  let game     = load(STORAGE_KEYS.game, { xp: 0, badges: [], streak: 0, lastVisit: null });
  let uiState  = load(STORAGE_KEYS.ui, { openStages: {} });

  function getSkillProgress(skillId) {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) return { done: 0, total: 0, pct: 0 };
    const doneMap = progress[skillId] || {};
    const total = skill.checklist.length;
    const done = skill.checklist.reduce((n, _, i) => n + (doneMap["t" + i] ? 1 : 0), 0);
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  function toggleTask(skillId, taskIndex) {
    const key = "t" + taskIndex;
    if (!progress[skillId]) progress[skillId] = {};
    const wasDone = !!progress[skillId][key];
    if (wasDone) {
      delete progress[skillId][key];
    } else {
      progress[skillId][key] = true;
      awardXP(10);
      maybeBumpStreak();
    }
    save(STORAGE_KEYS.progress, progress);
    checkBadges();
    return !wasDone;
  }

  function setAllTasks(skillId, value) {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) return;
    if (value) {
      progress[skillId] = {};
      skill.checklist.forEach((_, i) => (progress[skillId]["t" + i] = true));
    } else {
      progress[skillId] = {};
    }
    save(STORAGE_KEYS.progress, progress);
    checkBadges();
  }

  function totalCompletedTasks() {
    let n = 0;
    Object.keys(progress).forEach(sid => {
      n += Object.keys(progress[sid] || {}).length;
    });
    return n;
  }

  function awardXP(n) {
    game.xp += n;
    save(STORAGE_KEYS.game, game);
  }

  function maybeBumpStreak() {
    const today = new Date().toDateString();
    if (game.lastVisit !== today) {
      game.streak += 1;
      game.lastVisit = today;
      save(STORAGE_KEYS.game, game);
    }
  }

  const BADGE_DEFS = [
    { id: "first-step", name: "First Step", desc: "Complete your first task.", icon: "🌱",
      test: () => totalCompletedTasks() >= 1 },
    { id: "consistent-learner", name: "Consistent Learner", desc: "Complete five tasks.", icon: "🔥",
      test: () => totalCompletedTasks() >= 5 },
    { id: "skill-builder", name: "Skill Builder", desc: "Finish one learning roadmap.", icon: "🏗️",
      test: () => SKILLS.some(s => getSkillProgress(s.id).pct === 100) },
    { id: "skillverse-legend", name: "SkillVerse Legend", desc: "Complete all five skill roadmaps.", icon: "👑",
      test: () => SKILLS.every(s => getSkillProgress(s.id).pct === 100) }
  ];

  let newlyEarnedBadge = null;
  function checkBadges() {
    BADGE_DEFS.forEach(def => {
      if (!game.badges.includes(def.id) && def.test()) {
        game.badges.push(def.id);
        newlyEarnedBadge = def;
      }
    });
    save(STORAGE_KEYS.game, game);
  }

  // ---------- toast ----------
  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  // ---------- routing ----------
  function currentRoute() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const parts = hash.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "skills" && parts[1]) return { name: "skill", id: parts[1] };
    if (parts[0] === "dashboard") return { name: "dashboard" };
    if (parts[0] === "settings") return { name: "settings" };
    return { name: "home" };
  }

  function navigate(hash) {
    location.hash = hash;
  }

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", () => {
    maybeBumpStreak();
    render();
  });

  // ---------- small helpers ----------
  function esc(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function priceLabel(p) {
    if (p === "free") return { text: "Free", cls: "" };
    if (p === "freemium") return { text: "Freemium", cls: "" };
    if (p === "free to join") return { text: "Free to join", cls: "" };
    return { text: "Check current pricing", cls: "" };
  }

  // ---------- render root ----------
  function render() {
    const route = currentRoute();
    const app = document.getElementById("app");
    if (!app) return;
    if (route.name === "home") app.innerHTML = renderHome();
    else if (route.name === "skill") app.innerHTML = renderSkillPage(route.id);
    else if (route.name === "dashboard") app.innerHTML = renderDashboard();
    else if (route.name === "settings") app.innerHTML = renderSettings();
    else app.innerHTML = renderHome();

    renderNav(route);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    attachHandlers(route);

    if (newlyEarnedBadge) {
      toast("🎉 Badge earned: " + newlyEarnedBadge.name);
      newlyEarnedBadge = null;
    }
  }

  function renderNav(route) {
    const links = [
      { href: "#/", label: "Home", icon: "🏠", match: "home" },
      { href: "#/dashboard", label: "Dashboard", icon: "📊", match: "dashboard" },
      { href: "#/settings", label: "Settings", icon: "⚙️", match: "settings" }
    ];
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
      navLinks.innerHTML = links.map(l =>
        `<a href="${l.href}" class="${route.name === l.match ? "active" : ""}">${l.label}</a>`
      ).join("");
    }
    const bottomNav = document.getElementById("bottomNav");
    if (bottomNav) {
      bottomNav.innerHTML = links.map(l =>
        `<a href="${l.href}" class="${route.name === l.match ? "active" : ""}">
           <span class="bn-ico">${l.icon}</span><span>${l.label}</span>
         </a>`
      ).join("");
    }
  }

  // ============================================================
  // HOME PAGE
  // ============================================================
  function renderHome(query, activeFilters) {
    query = query || "";
    activeFilters = activeFilters || [];

    const filterDefs = [
      { id: "beginner", label: "Beginner friendly" },
      { id: "android", label: "Android friendly" },
      { id: "laptop", label: "Laptop recommended" },
      { id: "free", label: "Free resources" },
      { id: "freelance", label: "Freelance-ready" }
    ];

    const buildExamples = [
      { text: "A personal website", skill: "website-development" },
      { text: "A business landing page", skill: "website-development" },
      { text: "A YouTube thumbnail", skill: "graphic-design" },
      { text: "An edited Instagram reel", skill: "video-editing" },
      { text: "A 3D-printable phone stand", skill: "3d-modelling" },
      { text: "A freelance portfolio", skill: "freelancing" }
    ];

    return `
    <div class="page-shell">
      <section class="hero container">
        <span class="eyebrow">Built for students learning from home</span>
        <h1>SKILL<span class="grad">VERSE</span></h1>
        <p class="lead">Improve Your Skills. Build Your Future.</p>
        <p class="lead">Discover new skills, learn from free resources, follow structured learning paths, and track your progress — all in one place.</p>
        <div class="hero-cta">
          <button class="btn btn-primary" id="startLearningBtn">Start Learning</button>
          <a class="btn btn-ghost" href="#/dashboard">View my dashboard</a>
        </div>
        <div class="search-wrap">
          <span class="s-ico">🔎</span>
          <input type="text" id="searchInput" placeholder="Search skills, tools, or learning resources..." value="${esc(query)}" />
        </div>
        <div class="filters" id="filterChips">
          ${filterDefs.map(f => `<button class="chip ${activeFilters.includes(f.id) ? "active" : ""}" data-filter="${f.id}">${f.label}</button>`).join("")}
        </div>
      </section>

      <section class="section container" id="pathsSection">
        <div class="section-head">
          <h2>Choose your learning path</h2>
          <p>Pick a skill to open its dedicated learning page, roadmap, and resources.</p>
        </div>
        <div id="skillGrid"></div>
      </section>

      <section class="section container">
        <div class="section-head">
          <h2>What can you build?</h2>
          <p>Real things students build after working through these paths.</p>
        </div>
        <div class="build-list">
          ${buildExamples.map(b => `
            <a class="build-item" href="#/skills/${b.skill}">
              <span>${esc(b.text)}</span><span class="arrow">→</span>
            </a>
          `).join("")}
        </div>
      </section>

      <footer class="container">
        SkillVerse — a self-paced learning companion. Progress is stored on this device only.
      </footer>
    </div>`;
  }

  function skillMatchesQuery(skill, q) {
    if (!q) return true;
    const hay = [
      skill.name, skill.tagline, skill.include,
      ...skill.resources.map(r => r.name + " " + r.desc)
    ].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function skillMatchesFilters(skill, filters) {
    return filters.every(f => {
      if (f === "beginner") return true; // all paths have a beginner stage
      if (f === "android") return skill.android.toLowerCase().includes("friendly");
      if (f === "laptop") return skill.laptop.toLowerCase().includes("recommend");
      if (f === "free") return skill.resources.some(r => r.price === "free");
      if (f === "freelance") return true; // every path feeds into freelancing use-cases
      return true;
    });
  }

  function renderSkillGrid(query, activeFilters) {
    const list = SKILLS.filter(s => skillMatchesQuery(s, query) && skillMatchesFilters(s, activeFilters));
    const grid = document.getElementById("skillGrid");
    if (!grid) return;
    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-state">No skills match your search yet.<br>Try a different keyword or clear your filters.</div>`;
      return;
    }
    grid.innerHTML = `<div class="grid grid-5">` + list.map(s => {
      const p = getSkillProgress(s.id);
      return `
      <button class="skill-card" data-nav="#/skills/${s.id}">
        <div class="ico">${s.icon}</div>
        <h3>${esc(s.name)}</h3>
        <p class="desc">${esc(s.tagline)}</p>
        <div class="meta-row">
          <span class="tag time">⏱ ${esc(s.estTime)}</span>
          <span class="tag">${esc(s.android)}</span>
        </div>
        ${p.done > 0 ? `<div class="mini-progress"><i style="width:${p.pct}%"></i></div>` : ""}
        <div class="cta-row">
          <span class="text-faint" style="font-size:.75rem">${p.done > 0 ? p.done + "/" + p.total + " tasks" : "Not started"}</span>
          <span class="go">Explore →</span>
        </div>
      </button>`;
    }).join("") + `</div>`;
  }

  // ============================================================
  // SKILL PAGE
  // ============================================================
  function renderSkillPage(skillId) {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) {
      return `<div class="page-shell container section">
        <div class="empty-state">This skill page doesn't exist.<br><a class="btn btn-ghost mt-3" href="#/">Back to home</a></div>
      </div>`;
    }
    const p = getSkillProgress(skillId);

    const stages = [
      { key: "beginner", label: "Beginner", items: skill.roadmap.beginner },
      { key: "intermediate", label: "Intermediate", items: skill.roadmap.intermediate },
      { key: "projects", label: "Practical Projects", items: skill.roadmap.projects }
    ];

    return `
    <div class="page-shell container">
      <a href="#/" class="back-link">← Back to all skills</a>

      <div class="skill-banner">
        <div class="ico-lg">${skill.icon}</div>
        <h1>${esc(skill.name)}</h1>
        <p>${esc(skill.tagline)}</p>
        <p class="text-faint mt-2" style="font-size:.83rem">Includes: ${esc(skill.include)}</p>
        <div class="meta-row">
          <span class="tag time">⏱ ${esc(skill.estTime)}</span>
          <span class="tag">📱 ${esc(skill.android)}</span>
          <span class="tag">💻 ${esc(skill.laptop)}</span>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h4>WHAT YOU WILL LEARN</h4>
          <ul>${skill.whatYouLearn.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
        <div class="info-card">
          <h4>EXAMPLE PROJECTS YOU CAN BUILD</h4>
          <ul>${skill.projects.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </div>

      <section class="section">
        <div class="section-head">
          <h2>Can I learn this on my phone?</h2>
          <p>Android Friendly · Laptop Recommended · Desktop Required for certain tasks</p>
        </div>
        <div class="device-list">
          ${skill.canLearnOnPhone.map(d => `
            <div class="device-row ${d.ok ? "ok" : "no"}">
              <span class="dot">${d.ok ? "✓" : "!"}</span>
              <span>${esc(d.text)}</span>
            </div>`).join("")}
        </div>
      </section>

      ${skill.id === "freelancing" ? `
      <section class="section" style="padding-top:0">
        <div class="info-card" style="border-color:rgba(251,191,36,.35)">
          <h4 style="color:var(--amber)">⚠ SAFETY NOTE</h4>
          <p class="text-dim" style="font-size:.85rem">${esc(SAFETY_NOTE)}</p>
        </div>
      </section>` : ""}

      <section class="section" style="padding-top:0">
        <div class="section-head">
          <h2>Learning roadmap</h2>
          <p>Work through each stage. Check off topics as you complete them — this updates your progress below.</p>
        </div>
        ${stages.map(stage => renderStage(skill, stage)).join("")}
      </section>

      <section class="section" style="padding-top:0">
        <div class="section-head">
          <h2>Learning websites and resources</h2>
          <p>Trusted, real resources. Tap "Open resource" to visit the official site in a new tab.</p>
        </div>
        <div class="grid">
          ${skill.resources.map(r => renderResourceCard(r)).join("")}
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="progress-panel" id="progressPanel" data-skill="${skill.id}">
          ${renderProgressPanelInner(skill)}
        </div>
      </section>
    </div>`;
  }

  function renderStage(skill, stage) {
    const openKey = skill.id + ":" + stage.key;
    const isOpen = uiState.openStages[openKey] !== false; // default open
    const doneMap = progress[skill.id] || {};
    // Map roadmap item order to checklist index roughly 1:1 per stage-group boundaries is hard;
    // roadmap items track their own "done" via a synthetic key based on item id, separate from the
    // simple checklist. This keeps the required checklist formula exact while roadmap stays detailed.
    return `
    <div class="roadmap-stage" data-stage-wrap="${openKey}">
      <div class="stage-head ${isOpen ? "open" : ""}" data-stage-toggle="${openKey}">
        <div>
          <h3>${stage.label}</h3>
          <div class="stage-sub">${stage.items.length} topics</div>
        </div>
        <span class="chev">▾</span>
      </div>
      <div class="stage-body ${isOpen ? "open" : ""}">
        ${stage.items.map(item => renderTopic(skill, item, doneMap)).join("")}
      </div>
    </div>`;
  }

  function renderTopic(skill, item, doneMap) {
    const done = !!doneMap["rm_" + item.id];
    const resNames = (item.resources || []).map(rid => {
      const r = skill.resources.find(x => x.id === rid);
      return r ? r.name : rid;
    });
    return `
    <div class="topic-card">
      <div class="topic-top">
        <button class="topic-check ${done ? "done" : ""}" data-roadmap-toggle="${skill.id}|${item.id}" aria-label="Mark topic complete">
          ${done ? "✓" : ""}
        </button>
        <div style="flex:1">
          <div class="flex items-center gap-2" style="justify-content:space-between">
            <div class="topic-title ${done ? "done" : ""}">${esc(item.title)}</div>
            <div class="topic-time">${esc(item.time)}</div>
          </div>
          <div class="topic-explain">${esc(item.explain)}</div>
          <div class="topic-skills">
            ${item.skills.map(s => `<span class="tag">${esc(s)}</span>`).join("")}
          </div>
          <div class="topic-assignment"><b>Assignment:</b> ${esc(item.assignment)}</div>
          ${resNames.length ? `<div class="topic-resources">${resNames.map(n => `<span class="res-pill">${esc(n)}</span>`).join("")}</div>` : ""}
        </div>
      </div>
    </div>`;
  }

  function renderResourceCard(r) {
    const price = priceLabel(r.price);
    return `
    <div class="resource-card">
      <div class="resource-top">
        <h4>${esc(r.name)}</h4>
        <span class="tag">${r.android ? "📱 Android OK" : "💻 Desktop only"}</span>
      </div>
      <p class="desc">${esc(r.desc)}</p>
      <p class="learn"><b>You'll learn:</b> ${esc(r.learn)}</p>
      <div class="resource-tags">
        <span class="tag">${esc(price.text)}</span>
        <span class="tag">${esc(r.type)}</span>
      </div>
      <div class="resource-actions">
        <a class="btn btn-sm btn-ghost" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
          Open resource ↗
        </a>
      </div>
    </div>`;
  }

  function renderProgressPanelInner(skill) {
    const p = getSkillProgress(skill.id);
    const doneMap = progress[skill.id] || {};
    return `
      <div class="progress-top">
        <div>
          <div class="progress-pct">${p.pct}%</div>
          <div class="progress-count">${p.done} / ${p.total} TASKS COMPLETED</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">MY LEARNING PROGRESS</div>
          <div class="text-faint" style="font-size:.78rem; max-width:220px">Complete each lesson and project to track your progress from 0% to 100%.</div>
        </div>
      </div>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${p.pct}%"></div></div>

      <div class="mt-3" style="display:flex; flex-direction:column; gap:8px">
        ${skill.checklist.map((task, i) => `
          <label class="flex items-center gap-2" style="font-size:.88rem; cursor:pointer">
            <input type="checkbox" data-checklist="${skill.id}|${i}" ${doneMap["t" + i] ? "checked" : ""} style="width:18px;height:18px; accent-color:#8b5cf6" />
            <span style="${doneMap["t" + i] ? "text-decoration:line-through; color:var(--text-faint)" : ""}">${esc(task)}</span>
          </label>
        `).join("")}
      </div>

      ${p.pct === 100 ? `<div class="celebrate">🎉 You completed the ${esc(skill.name)} roadmap! Great work.</div>` : ""}

      <div class="progress-actions">
        <button class="btn btn-sm btn-ghost" data-mark-all="${skill.id}">Mark all complete</button>
        <button class="btn btn-sm btn-danger" data-reset="${skill.id}">Reset checklist</button>
      </div>
    `;
  }

  function refreshProgressPanel(skillId) {
    const skill = SKILLS.find(s => s.id === skillId);
    const panel = document.getElementById("progressPanel");
    if (panel && skill) panel.innerHTML = renderProgressPanelInner(skill);
  }

  // ============================================================
  // DASHBOARD
  // ============================================================
  function renderDashboard() {
    const rows = SKILLS.map(s => ({ skill: s, p: getSkillProgress(s.id) }));
    const totalDone = rows.reduce((n, r) => n + r.p.done, 0);
    const totalTasks = rows.reduce((n, r) => n + r.p.total, 0);
    const overallPct = totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0;
    const started = rows.filter(r => r.p.done > 0).length;

    return `
    <div class="page-shell container">
      <section class="hero" style="padding-top:30px; text-align:left">
        <span class="eyebrow">Your dashboard</span>
        <h2 style="font-size:1.6rem">My Skill Dashboard</h2>
        <p class="text-dim mt-2">Progress is saved on this device and browser only, and may not sync automatically to another device.</p>
      </section>

      <div class="dash-summary">
        <div class="dash-stat"><div class="num">${overallPct}%</div><div class="lbl">Overall progress</div></div>
        <div class="dash-stat"><div class="num">${totalDone}/${totalTasks}</div><div class="lbl">Tasks completed</div></div>
        <div class="dash-stat"><div class="num">${started}/${SKILLS.length}</div><div class="lbl">Skills started</div></div>
        <div class="dash-stat"><div class="num">${game.xp}</div><div class="lbl">XP earned</div></div>
      </div>

      <section class="section">
        <div class="section-head">
          <h2>Streak &amp; badges</h2>
          <p>Streak counts days you've completed at least one task on SkillVerse.</p>
        </div>
        <div class="dash-card">
          <div class="dash-card-top">
            <div class="ico">🔥</div>
            <div>
              <div style="font-weight:700">${game.streak} day streak</div>
              <div class="text-faint" style="font-size:.8rem">Keep it going by completing one task a day.</div>
            </div>
          </div>
          <div class="badge-row">
            ${BADGE_DEFS.map(b => `
              <div class="badge ${game.badges.includes(b.id) ? "earned" : ""}" title="${esc(b.desc)}">
                <span>${b.icon}</span><span>${esc(b.name)}</span>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="section-head">
          <h2>My skills</h2>
        </div>
        <div class="grid">
          ${rows.map(({ skill, p }) => `
            <div class="dash-card">
              <div class="dash-card-top">
                <div class="ico">${skill.icon}</div>
                <div style="flex:1">
                  <div style="font-weight:700">${esc(skill.name)}</div>
                  <div class="text-faint" style="font-size:.78rem">${p.done}/${p.total} lessons complete</div>
                </div>
                <div style="font-weight:800; color:var(--cyan)">${p.pct}%</div>
              </div>
              <div class="mini-progress"><i style="width:${p.pct}%"></i></div>
              <a class="btn btn-sm btn-primary" href="#/skills/${skill.id}">Continue learning</a>
            </div>
          `).join("")}
        </div>
        <a class="btn btn-ghost mt-3" href="#/">+ Add a skill</a>
      </section>

      <footer>SkillVerse — a self-paced learning companion.</footer>
    </div>`;
  }

  // ============================================================
  // SETTINGS
  // ============================================================
  function renderSettings() {
    const devices = ["Android", "Tablet", "Laptop"];
    const goals = ["School", "Freelancing", "Personal projects", "Career"];
    const targets = ["15", "30", "45", "60"];

    return `
    <div class="page-shell container">
      <section class="hero" style="padding-top:30px; text-align:left">
        <span class="eyebrow">Your profile</span>
        <h2 style="font-size:1.6rem">Settings</h2>
        <p class="text-dim mt-2">Only used to personalize recommendations on this device. We never ask for your real name, address, school, phone number, or date of birth.</p>
      </section>

      <div class="dash-card">
        <div class="form-row">
          <label for="nicknameInput">Display name or nickname</label>
          <input type="text" id="nicknameInput" placeholder="e.g. CodeNinja99" value="${esc(profile.name || "")}" />
        </div>

        <div class="form-row">
          <label>Device type</label>
          <div class="opt-row">
            ${devices.map(d => `<button class="opt-btn ${profile.device === d ? "active" : ""}" data-set-profile="device|${d}">${d}</button>`).join("")}
          </div>
        </div>

        <div class="form-row">
          <label>Main goal</label>
          <div class="opt-row">
            ${goals.map(g => `<button class="opt-btn ${profile.goal === g ? "active" : ""}" data-set-profile="goal|${g}">${g}</button>`).join("")}
          </div>
        </div>

        <div class="form-row">
          <label>Daily learning target</label>
          <div class="opt-row">
            ${targets.map(t => `<button class="opt-btn ${profile.dailyTarget === t ? "active" : ""}" data-set-profile="dailyTarget|${t}">${t} min</button>`).join("")}
          </div>
        </div>
      </div>

      <section class="section" style="padding-top:22px">
        <div class="section-head">
          <h2>Data &amp; privacy</h2>
          <p>All progress and settings are stored locally in this browser using localStorage. Nothing is uploaded anywhere.</p>
        </div>
        <div class="dash-card">
          <div class="flex items-center" style="justify-content:space-between">
            <div>
              <div style="font-weight:700">Clear all progress</div>
              <div class="text-faint" style="font-size:.8rem">Resets every skill's checklist and roadmap. Cannot be undone.</div>
            </div>
            <button class="btn btn-sm btn-danger" id="clearAllBtn">Clear all</button>
          </div>
        </div>
      </section>

      <footer>SkillVerse — a self-paced learning companion.</footer>
    </div>`;
  }

  // ============================================================
  // EVENT HANDLERS
  // ============================================================
  function showConfirm(title, msg, onConfirm) {
    const wrap = document.createElement("div");
    wrap.className = "modal-overlay";
    wrap.innerHTML = `
      <div class="modal-box">
        <h3>${esc(title)}</h3>
        <p>${esc(msg)}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost btn-block" id="modalCancel">Cancel</button>
          <button class="btn btn-danger btn-block" id="modalConfirm">Confirm</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector("#modalCancel").onclick = () => wrap.remove();
    wrap.addEventListener("click", e => { if (e.target === wrap) wrap.remove(); });
    wrap.querySelector("#modalConfirm").onclick = () => { wrap.remove(); onConfirm(); };
  }

  let homeQuery = "";
  let homeFilters = [];

  function attachHandlers(route) {
    // Global: any element with data-nav
    document.querySelectorAll("[data-nav]").forEach(el => {
      el.addEventListener("click", () => navigate(el.getAttribute("data-nav").replace("#", "")));
    });

    if (route.name === "home") {
      renderSkillGrid(homeQuery, homeFilters);
      const startBtn = document.getElementById("startLearningBtn");
      if (startBtn) startBtn.onclick = () => document.getElementById("pathsSection").scrollIntoView({ behavior: "smooth" });

      const search = document.getElementById("searchInput");
      if (search) {
        search.addEventListener("input", () => {
          homeQuery = search.value;
          renderSkillGrid(homeQuery, homeFilters);
        });
      }
      document.querySelectorAll("[data-filter]").forEach(chip => {
        chip.addEventListener("click", () => {
          const f = chip.getAttribute("data-filter");
          if (homeFilters.includes(f)) homeFilters = homeFilters.filter(x => x !== f);
          else homeFilters.push(f);
          chip.classList.toggle("active");
          renderSkillGrid(homeQuery, homeFilters);
        });
      });
    }

    if (route.name === "skill") {
      // Stage accordion
      document.querySelectorAll("[data-stage-toggle]").forEach(head => {
        head.addEventListener("click", () => {
          const key = head.getAttribute("data-stage-toggle");
          const body = head.nextElementSibling;
          const nowOpen = !head.classList.contains("open");
          head.classList.toggle("open", nowOpen);
          body.classList.toggle("open", nowOpen);
          uiState.openStages[key] = nowOpen;
          save(STORAGE_KEYS.ui, uiState);
        });
      });

      // Roadmap topic toggles (detailed tracking, separate from the required checklist)
      document.querySelectorAll("[data-roadmap-toggle]").forEach(btn => {
        btn.addEventListener("click", () => {
          const [skillId, itemId] = btn.getAttribute("data-roadmap-toggle").split("|");
          const key = "rm_" + itemId;
          if (!progress[skillId]) progress[skillId] = {};
          if (progress[skillId][key]) delete progress[skillId][key];
          else progress[skillId][key] = true;
          save(STORAGE_KEYS.progress, progress);
          render(); // re-render whole page to keep things simple & consistent
        });
      });

      // Checklist checkboxes -> the graded progress bar
      document.querySelectorAll("[data-checklist]").forEach(box => {
        box.addEventListener("change", () => {
          const [skillId, idx] = box.getAttribute("data-checklist").split("|");
          toggleTask(skillId, parseInt(idx, 10));
          refreshProgressPanel(skillId);
          renderNav(route);
          if (newlyEarnedBadge) {
            toast("🎉 Badge earned: " + newlyEarnedBadge.name);
            newlyEarnedBadge = null;
          }
        });
      });

      const markAllBtn = document.querySelector("[data-mark-all]");
      if (markAllBtn) {
        markAllBtn.addEventListener("click", () => {
          const skillId = markAllBtn.getAttribute("data-mark-all");
          setAllTasks(skillId, true);
          refreshProgressPanel(skillId);
          toast("All tasks marked complete 🎉");
          if (newlyEarnedBadge) {
            setTimeout(() => toast("🎉 Badge earned: " + newlyEarnedBadge.name), 900);
            newlyEarnedBadge = null;
          }
        });
      }

      const resetBtn = document.querySelector("[data-reset]");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          const skillId = resetBtn.getAttribute("data-reset");
          showConfirm("Reset checklist?", "This clears all completed tasks for this skill. This can't be undone.", () => {
            setAllTasks(skillId, false);
            refreshProgressPanel(skillId);
            toast("Checklist reset.");
          });
        });
      }
    }

    if (route.name === "settings") {
      const nickname = document.getElementById("nicknameInput");
      if (nickname) {
        nickname.addEventListener("input", () => {
          profile.name = nickname.value.slice(0, 40);
          save(STORAGE_KEYS.profile, profile);
        });
      }
      document.querySelectorAll("[data-set-profile]").forEach(btn => {
        btn.addEventListener("click", () => {
          const [field, value] = btn.getAttribute("data-set-profile").split("|");
          profile[field] = profile[field] === value ? "" : value;
          save(STORAGE_KEYS.profile, profile);
          render();
        });
      });
      const clearAll = document.getElementById("clearAllBtn");
      if (clearAll) {
        clearAll.addEventListener("click", () => {
          showConfirm("Clear all progress?", "This resets every skill's checklist, roadmap progress, XP, and badges on this device. This can't be undone.", () => {
            progress = {};
            game = { xp: 0, badges: [], streak: 0, lastVisit: null };
            save(STORAGE_KEYS.progress, progress);
            save(STORAGE_KEYS.game, game);
            toast("All progress cleared.");
            render();
          });
        });
      }
    }
  }
})();
