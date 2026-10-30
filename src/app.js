import './styles.css';

const museLink = 'https://muse.ai/s/spark-ai-matrix-canada-io6jcxxmx0xzf2/oiQCc4O9UGjVPtn-GEwdQapFx9VKh06NxOT7StSh1vQ';

const dimensions = [
  { key: 'learning', label: 'Accessible learning', short: 'Learning', color: 'coral', note: 'Plain-language instruction, assistive formats, and time to practice.' },
  { key: 'support', label: 'Human support', short: 'Support', color: 'violet', note: 'Trusted people who can explain, pause, correct, and escalate.' },
  { key: 'jobs', label: 'Disability-led jobs', short: 'Jobs', color: 'mint', note: 'Paid creator, evaluator, trainer, and local implementation roles.' },
  { key: 'guardrails', label: 'Safety guardrails', short: 'Guardrails', color: 'amber', note: 'No independent messaging or spending; human approval stays in the loop.' },
  { key: 'evidence', label: 'Evidence clarity', short: 'Evidence', color: 'blue', note: 'Claims labeled as measured, reported, or synthetic.' }
];

const presets = {
  baseline: { label: 'Baseline community', learning: 42, support: 35, jobs: 28, guardrails: 38, evidence: 32 },
  public: { label: 'Public service pilot', learning: 68, support: 74, jobs: 46, guardrails: 82, evidence: 76 },
  disability: { label: 'Disability-led pilot', learning: 78, support: 88, jobs: 86, guardrails: 72, evidence: 68 },
  risky: { label: 'Fast rollout, thin safeguards', learning: 74, support: 22, jobs: 18, guardrails: 16, evidence: 24 }
};

const perspectives = [
  ['Government', 'Public trust + accountable procurement', 'Can the public see who is responsible, what the system may do, and how to challenge it?'],
  ['Business', 'Worker agency + clear boundaries', 'Does adoption improve work without turning hidden risk into someone else’s unpaid labour?'],
  ['Education', 'Accessible learning + supported practice', 'Can a learner understand the tool, question an output, and get a human answer?'],
  ['Disability advocacy', 'Paid co-design + refusal rights', 'Are disabled people shaping the system, paid for their expertise, and able to say no?'],
  ['Community organizations', 'Local benefit + repair pathways', 'Where does value stay local, and what happens when the pilot causes harm?']
];

const state = { ...presets.baseline, activeLabel: presets.baseline.label };

function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }
function score() {
  const adoption = clamp(state.learning * 0.28 + state.support * 0.24 + state.jobs * 0.18 + state.evidence * 0.14 + state.guardrails * 0.16);
  const agency = clamp(state.support * 0.36 + state.guardrails * 0.32 + state.evidence * 0.22 + state.learning * 0.10);
  const benefit = clamp(state.jobs * 0.42 + state.learning * 0.22 + state.support * 0.18 + state.evidence * 0.18);
  const access = clamp(state.learning * 0.46 + state.support * 0.31 + state.jobs * 0.23);
  const risk = clamp(100 - (state.guardrails * 0.45 + state.evidence * 0.30 + state.support * 0.25));
  return { adoption, agency, benefit, access, risk };
}

function evidenceTag(type) {
  return `<span class="evidence-tag ${type}">${type}</span>`;
}

function metric(label, value, tone, detail) {
  return `<div class="metric-card"><div class="metric-label">${label}</div><div class="metric-value ${tone}">${value}<span>/100</span></div><div class="metric-detail">${detail}</div></div>`;
}

function render() {
  const s = score();
  document.querySelector('#app').innerHTML = `
    <header class="site-header">
      <div class="brand"><span class="brand-mark" aria-hidden="true">✦</span><span>SPARK / MATRIX</span></div>
      <nav aria-label="Primary navigation"><a href="#simulate">Simulate</a><a href="#breakdown">Breakdown</a><a href="#pilot">Pilot kit</a></nav>
      <a class="header-link" href="${museLink}" target="_blank" rel="noreferrer">Read proposal ↗</a>
    </header>

    <main id="main">
      <section class="hero section-wrap">
        <div class="hero-copy">
          <p class="eyebrow">A transparent prototype for community AI adoption</p>
          <h1>Build the conditions.<br /><em>Then</em> adopt the tool.</h1>
          <p class="hero-lede">The Spark AI Matrix asks a practical question: what changes when AI adoption is designed around human agency, disability leadership, local benefit, and evidence people can inspect?</p>
          <div class="hero-actions"><a class="button primary" href="#simulate">Run the simulation <span>↓</span></a><a class="text-link" href="#breakdown">See the research breakdown →</a></div>
        </div>
        <div class="hero-note"><span class="note-number">01</span><p>This is a <strong>prototype framework</strong>, not a prediction engine. Move the inputs, inspect the trade-offs, and decide what should be tested locally. The supplied portfolio’s pattern is simple: verify before speaking, fail closed, and keep a human in authority.</p><div class="signal-line"><span></span><span></span><span></span><span></span><span></span></div></div>
      </section>

      <section id="simulate" class="simulator section-wrap section-dark" aria-labelledby="simulate-title">
        <div class="section-kicker"><span>01 / SIMULATE</span><span>Client-side model · synthetic scores</span></div>
        <div class="section-heading"><div><h2 id="simulate-title">What conditions are you building?</h2><p>Adjust the sliders to explore how a community’s adoption profile might change. The score is an illustrative model, not measured evidence.</p></div><div class="preset-group" role="group" aria-label="Choose a scenario"><button data-preset="baseline" class="preset active">Baseline</button><button data-preset="public" class="preset">Public pilot</button><button data-preset="disability" class="preset">Disability-led</button><button data-preset="risky" class="preset">Fast rollout</button></div></div>
        <div class="perspective-lenses" aria-label="Perspective lenses">${perspectives.map(([audience, lens, question], index) => `<article class="perspective"><span class="perspective-index">0${index + 1}</span><div><strong>${audience}</strong><h3>${lens}</h3><p>${question}</p></div></article>`).join('')}</div>
        <div class="sim-grid">
          <div class="controls" aria-label="Simulation controls">${dimensions.map(d => `<label class="slider-row" for="${d.key}"><span class="slider-top"><span>${d.label}</span><output id="${d.key}-out">${state[d.key]}</output></span><input id="${d.key}" type="range" min="0" max="100" value="${state[d.key]}" /><span class="slider-note">${d.note}</span></label>`).join('')}</div>
          <div class="results" aria-live="polite"><div class="result-intro"><span class="result-label">SIMULATED COMMUNITY PROFILE</span><strong id="scenario-label">${state.activeLabel}</strong></div><div class="metrics">${metric('Adoption readiness', s.adoption, 'coral', 'Ability to start and sustain use')}${metric('Human agency', s.agency, 'violet', 'Ability to pause, question, and decide')}${metric('Community benefit', s.benefit, 'mint', 'Local work and creator pathways')}${metric('Accessible reach', s.access, 'blue', 'Learning and support reach')}${metric('Unmanaged risk', s.risk, 'amber', 'Higher means more exposure')}</div><div class="bar-chart"><div class="chart-title">Outcome shape <span>${evidenceTag('synthetic')}</span></div>${[['Agency',s.agency,'violet'],['Benefit',s.benefit,'mint'],['Access',s.access,'blue'],['Risk',s.risk,'amber']].map(([l,v,c]) => `<div class="bar-row"><span>${l}</span><div class="bar-track"><div class="bar-fill ${c}" style="width:${v}%"></div></div><b>${v}</b></div>`).join('')}</div></div>
        </div>
        <p class="model-footnote"><span class="dot"></span>Model logic is intentionally simple and inspectable. It does not establish causation, forecast outcomes, or replace community evaluation.</p>
      </section>

      <section id="breakdown" class="section-wrap breakdown" aria-labelledby="breakdown-title"><div class="section-kicker"><span>02 / BREAKDOWN</span><span>Claims → rationale → test</span></div><div class="section-heading"><div><h2 id="breakdown-title">Four commitments, made inspectable.</h2><p>Each part of the Matrix is a design commitment that can be challenged and tested. The labels show the evidence status of what you’re reading.</p></div></div><div class="commitments"><article class="commitment"><div class="commitment-num">A</div><div><div class="card-meta">ACCESS & CAPACITY ${evidenceTag('reported')}</div><h3>Learning needs a human on the other side.</h3><p>Accessible formats and plain-language instruction matter, but so does the ability to ask a trusted person for help when an output is confusing or harmful.</p><div class="test-line"><strong>Test it:</strong> Can a first-time user complete a real task, ask for help, and recover from a mistake?</div></div></article><article class="commitment"><div class="commitment-num">B</div><div><div class="card-meta">LOCAL ECONOMY ${evidenceTag('reported')}</div><h3>Adoption should create roles, not only reduce them.</h3><p>Disability-led creators, evaluators, trainers, and local support roles can make adoption more relevant while keeping value in the community.</p><div class="test-line"><strong>Test it:</strong> Who is paid to shape, teach, audit, and maintain the system?</div></div></article><article class="commitment"><div class="commitment-num">C</div><div><div class="card-meta">AGENCY & SAFETY ${evidenceTag('measured')}</div><h3>AI should not quietly cross a boundary.</h3><p>Messages, spending, commitments, and other consequential actions need explicit human approval. A useful pilot makes the boundary visible before harm occurs.</p><div class="test-line"><strong>Test it:</strong> Can a user see, stop, reverse, and escalate every consequential action?</div></div></article><article class="commitment"><div class="commitment-num">D</div><div><div class="card-meta">EVIDENCE ${evidenceTag('synthetic')}</div><h3>People deserve to know what a claim is made of.</h3><p>Separate measured results from participant reports and illustrative model outputs. Label the difference where the claim appears, not in a hidden appendix.</p><div class="test-line"><strong>Test it:</strong> Could a skeptical reader trace this claim to its source and limitations?</div></div></article></div></section>

      <section class="guardrails section-wrap" aria-labelledby="guardrails-title"><div class="guardrail-intro"><div class="section-kicker"><span>03 / GUARDRAILS</span><span>Human agency is a product requirement</span></div><h2 id="guardrails-title">A responsible pilot has brakes.</h2><p>The Matrix is compatible with established responsible-AI ideas: human-centred values, transparency, safety, accountability, and risk management. The supplied portfolio calls this <strong>epistemic engineering</strong>: build the check, refusal, and receipt into the system so it cannot quietly overclaim.</p><div class="source-stack"><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">NIST AI RMF ↗</a><a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noreferrer">OECD AI Principles ↗</a><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noreferrer">W3C WCAG ↗</a><a href="https://github.com/sparkainlp-x" target="_blank" rel="noreferrer">Supplied portfolio ↗</a></div></div><div class="guardrail-list"><div class="guardrail"><span class="guardrail-icon">01</span><div><h3>Approval before impact</h3><p>AI cannot independently send messages, spend money, or make commitments.</p></div><span class="status">required</span></div><div class="guardrail"><span class="guardrail-icon">02</span><div><h3>Pause is always available</h3><p>Users can stop an action, ask a person, or escalate a concern without penalty.</p></div><span class="status">required</span></div><div class="guardrail"><span class="guardrail-icon">03</span><div><h3>Evidence stays labelled</h3><p>Measured, reported, and synthetic claims are visually distinct and traceable.</p></div><span class="status">required</span></div><div class="guardrail"><span class="guardrail-icon">04</span><div><h3>Accessibility is tested with people</h3><p>Disabled people participate as paid co-designers, evaluators, and decision-makers.</p></div><span class="status">pilot test</span></div></div></section>

      <section id="pilot" class="pilot section-wrap"><div class="section-kicker"><span>04 / PILOT KIT</span><span>Questions before scale</span></div><div class="pilot-grid"><div><h2>From proposal to a responsible pilot.</h2><p>Use the Matrix as a conversation starter, then narrow it to one real setting with real people, a named decision owner, and a public record of what you learned.</p><a class="button dark" href="${museLink}" target="_blank" rel="noreferrer">Open the original proposal ↗</a></div><div class="pilot-prompts"><div><span>01</span><p>Which community outcome matters first?</p></div><div><span>02</span><p>Who can stop the system, and who gets paid to evaluate it?</p></div><div><span>03</span><p>What would count as failure, not just success?</p></div><div><span>04</span><p>What evidence will be measured, reported, or synthetic?</p></div></div></div><div class="disclaimer"><strong>Prototype note.</strong> This site is a research and simulation layer around the Spark AI Matrix proposal. Its scores are synthetic, its claims need local scrutiny, and its design does not prove that a community intervention will work.</div></section>
    </main>
    <footer class="site-footer"><span>SPARK / MATRIX</span><span>Designed for scrutiny, local testing, and shared responsibility.</span><a href="${museLink}" target="_blank" rel="noreferrer">Muse.ai source ↗</a></footer>
  `;
  bindInteractions();
}

function bindInteractions() {
  dimensions.forEach(d => {
    const input = document.querySelector(`#${d.key}`);
    input.addEventListener('input', (e) => { state[d.key] = Number(e.target.value); document.querySelector(`#${d.key}-out`).textContent = e.target.value; updateResults(); });
  });
  document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => { Object.assign(state, presets[button.dataset.preset], { activeLabel: presets[button.dataset.preset].label }); document.querySelectorAll('[data-preset]').forEach(b => b.classList.toggle('active', b === button)); dimensions.forEach(d => { document.querySelector(`#${d.key}`).value = state[d.key]; document.querySelector(`#${d.key}-out`).textContent = state[d.key]; }); updateResults(); }));
}
function updateResults() {
  const s = score();
  const values = [['Adoption readiness',s.adoption,'coral','Ability to start and sustain use'],['Human agency',s.agency,'violet','Ability to pause, question, and decide'],['Community benefit',s.benefit,'mint','Local work and creator pathways'],['Accessible reach',s.access,'blue','Learning and support reach'],['Unmanaged risk',s.risk,'amber','Higher means more exposure']];
  document.querySelector('.metrics').innerHTML = values.map(v => metric(...v)).join('');
  document.querySelector('#scenario-label').textContent = state.activeLabel;
  [['Agency',s.agency,'violet'],['Benefit',s.benefit,'mint'],['Access',s.access,'blue'],['Risk',s.risk,'amber']].forEach(([label,value]) => { const row = [...document.querySelectorAll('.bar-row')].find(r => r.firstElementChild.textContent === label); row.querySelector('.bar-fill').style.width = `${value}%`; row.querySelector('b').textContent = value; });
}
render();
