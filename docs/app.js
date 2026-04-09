/* ═══════════════════════════════════════════════════════════════
   EA Council — Application Logic
   Page rendering, navigation, and interactions
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── DOM REFS ───
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    const breadcrumb = document.getElementById('breadcrumb');
    const menuToggle = document.getElementById('menu-toggle');

    // ─── STATE ───
    let currentPage = 'dashboard';

    // ─── NAVIGATION ───
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            navigateTo(page);
        });
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        toggleOverlay();
    });

    function toggleOverlay() {
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }
        overlay.classList.toggle('active', sidebar.classList.contains('open'));
    }

    function navigateTo(page) {
        currentPage = page;

        // Update nav active state
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Close mobile sidebar
        sidebar.classList.remove('open');
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) overlay.classList.remove('active');

        // Render page
        renderPage(page);

        // Scroll to top
        contentArea.scrollTop = 0;
    }

    // ─── PAGE ROUTER ───
    function renderPage(page) {
        let html = '';
        let title = '';

        if (page === 'dashboard') {
            title = 'Dashboard';
            html = renderDashboard();
        } else if (page === 'council') {
            title = 'Council Configuration';
            html = renderCouncilConfig();
        } else if (page === 'chief-architect') {
            title = 'Orchestration › Chief Architect';
            html = renderChiefArchitect();
        } else if (page === 'deliberation') {
            title = 'Orchestration › Deliberation Protocol';
            html = renderDeliberation();
        } else if (page === 'routing') {
            title = 'Orchestration › Routing Rules';
            html = renderRouting();
        } else if (page === 'escalation') {
            title = 'Orchestration › Escalation Matrix';
            html = renderEscalation();
        } else if (page === 'principles') {
            title = 'Knowledge › Architecture Principles';
            html = renderPrinciples();
        } else if (page === 'tech-radar') {
            title = 'Knowledge › Tech Radar';
            html = renderTechRadar();
        } else if (page === 'glossary') {
            title = 'Knowledge › Glossary';
            html = renderGlossary();
        } else if (page === 'connectors') {
            title = 'Knowledge › Connectors';
            html = renderConnectors();
        } else if (page.startsWith('agent-')) {
            const agentId = page.replace('agent-', '');
            const agent = AGENTS.find(a => a.id === agentId);
            if (agent) {
                title = `${agent.type === 'crosscut' ? 'Cross-Cut' : agent.type === 'challenge' ? 'Challenge' : 'Domain'} Agent › ${agent.name}`;
                html = renderAgentDetail(agent);
            }
        }

        breadcrumb.textContent = title;
        contentArea.innerHTML = `<div class="page-enter">${html}</div>`;

        // Attach tab listeners
        attachTabListeners();
        // Attach topo agent click listeners
        attachTopoClickListeners();
    }

    // ═══════════════════════════════════════════════════
    // DASHBOARD
    // ═══════════════════════════════════════════════════
    function renderDashboard() {
        const domainCount = AGENTS.filter(a => a.type === 'domain').length;
        const crossCutCount = AGENTS.filter(a => a.type === 'crosscut').length;
        const challengeCount = AGENTS.filter(a => a.type === 'challenge').length;

        return `
            <div class="page-header">
                <h1>Enterprise Architecture Council</h1>
                <p>A multi-agent AI system that simulates a functioning EA Board — with a Chief Architect orchestrator and ${AGENTS.length} specialist domain agents delivering structured, evidence-based architectural decisions.</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Agents</div>
                    <div class="stat-value accent">${AGENTS.length + 1}</div>
                    <div class="stat-desc">Including Chief Architect</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Domain Agents</div>
                    <div class="stat-value domain">${domainCount}</div>
                    <div class="stat-desc">Advisory specialists</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Cross-Cut Agents</div>
                    <div class="stat-value crosscut">${crossCutCount}</div>
                    <div class="stat-desc">Governance (veto/escalation)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Challenge Agent</div>
                    <div class="stat-value challenge">${challengeCount}</div>
                    <div class="stat-desc">Red Team adversarial review</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Principles</div>
                    <div class="stat-value accent">${PRINCIPLES.length}</div>
                    <div class="stat-desc">Enterprise architecture principles</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Deliberation Phases</div>
                    <div class="stat-value accent">${DELIBERATION_PHASES.length}</div>
                    <div class="stat-desc">Structured council process</div>
                </div>
            </div>

            <div class="topology-section">
                <div class="section-title"><span class="icon">⬡</span> Agent Topology</div>
                <div class="topology-visual">
                    <div class="topo-orchestrator">
                        <div class="topo-chief" data-page="chief-architect">
                            <span class="icon">♛</span>
                            <div>
                                <div class="label">Chief Architect Agent</div>
                                <div class="sublabel">Orchestrator · Final Synthesis · Escalation</div>
                            </div>
                        </div>
                    </div>
                    <div class="topo-connector"></div>
                    <div class="topo-agents-container">
                        <div class="topo-group">
                            <div class="topo-group-title domain">Domain Agents</div>
                            ${AGENTS.filter(a => a.type === 'domain').map(a => `
                                <div class="topo-agent" data-page="${a.page}">
                                    <span class="dot domain"></span>
                                    <span>${a.name}</span>
                                    <span class="tag advisory">Advisory</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="topo-group">
                            <div class="topo-group-title crosscut">Cross-Cut Agents</div>
                            ${AGENTS.filter(a => a.type === 'crosscut').map(a => `
                                <div class="topo-agent" data-page="${a.page}">
                                    <span class="dot crosscut"></span>
                                    <span>${a.name}</span>
                                    <span class="tag governance">${a.id === 'security' ? 'Veto' : 'Escalation'}</span>
                                </div>
                            `).join('')}
                            ${AGENTS.filter(a => a.type === 'challenge').map(a => `
                                <div class="topo-agent" data-page="${a.page}">
                                    <span class="dot challenge"></span>
                                    <span>${a.name}</span>
                                    <span class="tag veto">Challenge</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="topo-shared">
                        <div class="topo-shared-title">Shared Knowledge Layer</div>
                        <div class="shared-items">
                            <span class="shared-item" data-page="principles">Architecture Principles</span>
                            <span class="shared-item" data-page="tech-radar">Tech Radar</span>
                            <span class="shared-item" data-page="glossary">Glossary</span>
                            <span class="shared-item" data-page="connectors">LeanIX (MCP)</span>
                            <span class="shared-item" data-page="connectors">ServiceNow (API)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-title"><span class="icon">⟳</span> Decision Impact Levels</div>
            <div class="flow-grid">
                ${IMPACT_LEVELS.map(il => `
                    <div class="flow-card">
                        <div class="flow-level ${il.level.toLowerCase()}">${il.level}</div>
                        <div class="flow-desc">${il.desc}</div>
                        <div class="flow-agents"><strong>Agents:</strong> ${il.agents}</div>
                        <div class="flow-output">${il.output}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // COUNCIL CONFIG
    // ═══════════════════════════════════════════════════
    function renderCouncilConfig() {
        return `
            <div class="page-header">
                <h1>Council Configuration</h1>
                <p>Global configuration for the Enterprise Architecture Council — composition, authority model, veto rules, data sources, and operating principles.</p>
            </div>

            <div class="content-section">
                <h2>⬡ Council Composition</h2>
                <table class="content-table">
                    <thead>
                        <tr><th>Role</th><th>Type</th><th>Authority</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Chief Architect</td><td>Orchestrator</td><td>Final synthesis, escalation</td></tr>
                        ${AGENTS.map(a => `
                            <tr>
                                <td>${a.name}</td>
                                <td>${a.type === 'domain' ? 'Domain Agent' : a.type === 'crosscut' ? 'Cross-Cut Agent' : 'Cross-Cut Agent'}</td>
                                <td>${a.authority}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="content-section">
                <h2>🔐 Authority Model</h2>
                <ul>
                    <li><strong>Advisory agents</strong> provide recommendations; they cannot block decisions</li>
                    <li><strong>Governance agents</strong> (Security, Risk & Compliance) can <strong>flag</strong>, <strong>escalate</strong>, or <strong>veto</strong></li>
                    <li><strong>Red Team</strong> challenges but cannot veto — findings are addressed by the Chief Architect</li>
                    <li><strong>Chief Architect</strong> makes the final synthesized recommendation</li>
                    <li><strong>Human sponsors</strong> are the ultimate authority; the council escalates unresolved conflicts</li>
                </ul>
            </div>

            <div class="content-section">
                <h2>⛔ Veto Rules</h2>
                <p>A veto can only be issued when:</p>
                <ol>
                    <li>A proposal violates a <span class="badge mandatory">MANDATORY</span> security or compliance policy</li>
                    <li>The vetoing agent provides specific evidence (policy reference + impact)</li>
                    <li>The Chief Architect acknowledges the veto and either remediates or escalates to humans</li>
                </ol>
            </div>

            <div class="content-section">
                <h2>🔌 Data Sources</h2>
                <table class="content-table">
                    <thead><tr><th>System</th><th>Protocol</th><th>Primary Use</th></tr></thead>
                    <tbody>
                        <tr><td>SAP LeanIX</td><td><code>MCP (GraphQL)</code></td><td>Application landscape, capabilities, tech stack, data objects, interfaces</td></tr>
                        <tr><td>ServiceNow</td><td><code>REST API</code></td><td>CMDB CIs, change management, incidents, GRC risk register</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="content-section">
                <h2>📐 Operating Principles</h2>
                <ol>
                    <li><strong>Evidence over opinion</strong> — ground every recommendation in data</li>
                    <li><strong>Principles over preferences</strong> — apply architecture principles consistently</li>
                    <li><strong>Transparency</strong> — every recommendation must trace to a principle, policy, or standard</li>
                    <li><strong>Conflict is healthy</strong> — disagreement between agents produces better outcomes</li>
                    <li><strong>Bias for action</strong> — recommend a clear path, don't just list options</li>
                    <li><strong>Proportional depth</strong> — match analysis depth to decision impact</li>
                </ol>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // CHIEF ARCHITECT
    // ═══════════════════════════════════════════════════
    function renderChiefArchitect() {
        return `
            <div class="agent-header orchestrator">
                <div class="agent-avatar orchestrator">♛</div>
                <div class="agent-info">
                    <h1>Chief Architect Agent</h1>
                    <div class="agent-type orchestrator">Orchestrator</div>
                    <div class="agent-desc">You are the integrator, synthesizer, and final voice of the council. You bring together domain expertise, challenge it, resolve conflicts, and produce decisions that are coherent, principled, and actionable.</div>
                </div>
            </div>

            <div class="content-section">
                <h2>📋 Mandate</h2>
                <ol>
                    <li>Receive and interpret architectural requests from human sponsors</li>
                    <li>Triage requests and determine the appropriate council response</li>
                    <li>Orchestrate the deliberation process</li>
                    <li>Synthesize domain inputs into a unified recommendation</li>
                    <li>Resolve conflicts between agents — or escalate when unresolvable</li>
                    <li>Produce the final Architecture Decision Record (ADR)</li>
                    <li>Ensure decisions are written back to LeanIX/ServiceNow where applicable</li>
                </ol>
            </div>

            <div class="content-section">
                <h2>⚙️ Behaviour Rules</h2>
                <h3>Triage</h3>
                <ul>
                    <li>Classify every incoming request by type (strategy, design, review, assessment, decision)</li>
                    <li>Determine impact level (Minor / Standard / Major / Critical)</li>
                    <li>Identify which domain and cross-cut agents are needed</li>
                    <li>State your triage decision explicitly before proceeding</li>
                </ul>
                <h3>Orchestrating Domain Agents</h3>
                <ul>
                    <li>Provide each agent with: the full request, their specific sub-question, and relevant data</li>
                    <li>Do not pre-answer before consulting agents — avoid confirmation bias</li>
                    <li>Allow each agent to respond independently before synthesis</li>
                </ul>
                <h3>Synthesis Rules</h3>
                <ul>
                    <li>Identify points of consensus and note them</li>
                    <li>Identify conflicts and resolve them using architecture principles</li>
                    <li>Security vetoes must be addressed — you cannot override them unilaterally</li>
                    <li>When you override a non-security recommendation, explain why</li>
                </ul>
            </div>

            <div class="content-section">
                <h2>🚫 What You Do NOT Do</h2>
                <ul>
                    <li>You do not make detailed domain-specific recommendations without consulting the relevant agent</li>
                    <li>You do not suppress agent findings that are inconvenient</li>
                    <li>You do not approve a decision that has an outstanding security veto</li>
                    <li>You do not produce a recommendation without grounding it in data or principles</li>
                </ul>
            </div>

            <div class="content-section">
                <h2>🔧 Tool Access</h2>
                <ul>
                    <li><strong>LeanIX MCP</strong> — query application portfolio, capabilities, interfaces, tech stack</li>
                    <li><strong>ServiceNow API</strong> — query CMDB, change records, GRC risk register</li>
                    <li><strong>Sub-agent invocation</strong> — call domain and cross-cut agents with structured prompts</li>
                </ul>
            </div>

            <div class="content-section">
                <h2>📝 Example Triage Output</h2>
                <div class="code-block">Request received: [summary]

Triage assessment:
- Type: [strategy / design / review / assessment / decision]
- Impact level: [Minor / Standard / Major / Critical]
- Domains engaged: [list]
- Cross-cut agents engaged: [list]
- Rationale for scope: [brief explanation]

Proceeding to Phase 2: Parallel Domain Assessment.</div>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // DELIBERATION
    // ═══════════════════════════════════════════════════
    function renderDeliberation() {
        return `
            <div class="page-header">
                <h1>Deliberation Protocol</h1>
                <p>Every council session follows a structured six-phase process. The Chief Architect drives each phase. Agents do not freelance — they respond to structured prompts from the orchestrator.</p>
            </div>

            <div class="phase-timeline">
                ${DELIBERATION_PHASES.map(p => `
                    <div class="phase-step">
                        <div class="phase-num">Phase ${p.num}</div>
                        <h3>${p.name}</h3>
                        <p><strong>Driver:</strong> ${p.driver}</p>
                        <p>${p.desc}</p>
                    </div>
                `).join('')}
            </div>

            <div class="content-section" style="margin-top: 32px;">
                <h2>⚖️ Conflict Resolution Hierarchy</h2>
                <ol>
                    <li><strong>Mandatory policies</strong> — if one option violates a [MANDATORY] policy, it is eliminated</li>
                    <li><strong>Architecture principles</strong> — apply in order from EP-001 to EP-012</li>
                    <li><strong>Evidence weight</strong> — prefer the position with stronger LeanIX/ServiceNow data</li>
                    <li><strong>Impact and reversibility</strong> — prefer the more reversible option under uncertainty</li>
                    <li><strong>Escalate</strong> — if still unresolved, escalate to human sponsors</li>
                </ol>
            </div>

            <div class="content-section">
                <h2>📊 Session Types</h2>
                <table class="content-table">
                    <thead><tr><th>Type</th><th>Phases Used</th><th>Duration</th></tr></thead>
                    <tbody>
                        <tr><td>Quick Query</td><td>1, 2 (1 agent), 6 (summary)</td><td>Minutes</td></tr>
                        <tr><td>Standard Review</td><td>1–3, 5–6</td><td>1 deliberation cycle</td></tr>
                        <tr><td>Full Council</td><td>1–6</td><td>Full deliberation cycle</td></tr>
                        <tr><td>Critical Decision</td><td>1–6 + human review</td><td>Multiple cycles</td></tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // ROUTING
    // ═══════════════════════════════════════════════════
    function renderRouting() {
        return `
            <div class="page-header">
                <h1>Routing Rules</h1>
                <p>Guides the Chief Architect in selecting which agents to consult for a given request. Engaging unnecessary agents wastes cycles; missing a relevant agent risks blind spots.</p>
            </div>

            <div class="content-section">
                <h2>📋 Primary Routing Table</h2>
                <table class="content-table">
                    <thead><tr><th>Request Topic</th><th>Domain Agents</th><th>Cross-Cut Agents</th></tr></thead>
                    <tbody>
                        ${ROUTING_TABLE.map(r => `
                            <tr><td>${r.topic}</td><td>${r.domain}</td><td>${r.crosscut}</td></tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="content-section">
                <h2>🧮 Routing Logic</h2>
                <div class="code-block">IF impact = Minor:
    → Consult 1–2 most relevant domain agents only
    → Skip cross-cut agents unless topic is security-sensitive

IF impact = Standard:
    → Consult all relevant domain agents
    → Always include Security
    → Include Risk & Compliance if regulatory/risk keywords present

IF impact = Major:
    → Consult all relevant domain agents
    → Always include Security + Risk & Compliance
    → Consider Red Team if proposal is novel or high-stakes

IF impact = Critical:
    → Engage full council (all domain + all cross-cut agents)
    → Red Team is mandatory
    → Human sponsor review is mandatory before finalizing</div>
            </div>

            <div class="content-section">
                <h2>🔑 Keyword Signals — Cross-Cut Agents</h2>
                <h3>🛡️ Always include Security if request mentions:</h3>
                <ul>
                    <li>authentication, authorization, identity, IAM, SSO, OAuth</li>
                    <li>data encryption, key management, TLS/HTTPS</li>
                    <li>external-facing systems, public APIs, internet exposure</li>
                    <li>personal data, PII, sensitive data classification</li>
                    <li>zero-trust, micro-segmentation</li>
                    <li>SaaS onboarding, third-party access</li>
                </ul>
                <h3>⚖️ Always include Risk & Compliance if request mentions:</h3>
                <ul>
                    <li>GDPR, NIS2, SOX, ISO 27001, DORA, PCI-DSS</li>
                    <li>data residency, data sovereignty, cross-border transfer</li>
                    <li>audit trail, logging, regulatory reporting</li>
                    <li>vendor risk, third-party dependency</li>
                    <li>business continuity, disaster recovery</li>
                </ul>
                <h3>🏭 Always include Manufacturing & OT if request mentions:</h3>
                <ul>
                    <li>OT, ICS, SCADA, DCS, HMI, PLC, RTU, historian</li>
                    <li>MES, MOM, production scheduling, batch management</li>
                    <li>IIoT, OPC UA, MQTT, Modbus, industrial protocol</li>
                    <li>Purdue model, IT/OT convergence, OT network, DMZ</li>
                </ul>
                <h3>🔬 Always include R&D & EDA if request mentions:</h3>
                <ul>
                    <li>EDA, RTL, synthesis, place & route, FPGA, ASIC, chip design</li>
                    <li>CAD, CAE, CAM, FEA, CFD, simulation</li>
                    <li>PLM, Teamcenter, Windchill, Enovia, PDM</li>
                    <li>HPC, high-performance compute, simulation cluster</li>
                    <li>ITAR, EAR, dual-use, export control</li>
                </ul>
                <h3>🎯 Always include Red Team if request mentions:</h3>
                <ul>
                    <li>new AI system or autonomous agent</li>
                    <li>irreversible architectural change</li>
                    <li>single point of failure in critical path</li>
                    <li>"we're confident this is safe" (flag groupthink)</li>
                    <li>novel architecture pattern not in reference architectures</li>
                </ul>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // ESCALATION
    // ═══════════════════════════════════════════════════
    function renderEscalation() {
        return `
            <div class="page-header">
                <h1>Escalation Matrix</h1>
                <p>Defines when and how the Chief Architect escalates beyond the AI council to human sponsors. Escalation is not failure — it is the correct response to decisions that exceed the council's authority or confidence.</p>
            </div>

            <div class="content-section">
                <h2>🚨 Escalation Triggers</h2>
                <table class="content-table">
                    <thead><tr><th>Trigger</th><th>Condition</th><th>Action</th><th>Escalate To</th></tr></thead>
                    <tbody>
                        ${ESCALATION_TRIGGERS.map(e => `
                            <tr><td><strong>${e.trigger}</strong></td><td>${e.condition}</td><td>${e.action}</td><td>${e.escalateTo}</td></tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="content-section">
                <h2>📝 Escalation Format</h2>
                <div class="code-block">ESCALATION NOTICE

Date: [date]
Request: [original request summary]
Impact Level: [level]
Escalation Trigger: [trigger from matrix]

Council Position:
[Summary of what the council has agreed on]

Point of Escalation:
[Specifically what the humans need to decide — one clear question]

Options Considered:
A. [Option A] — [pros/cons]
B. [Option B] — [pros/cons]

Recommendation (if council has preference):
[Preferred option and why — or "no consensus" if deadlock]

Agents with Dissenting Views:
[Agent name]: [their position]

Requested Response:
[What the council needs back]</div>
            </div>

            <div class="content-section">
                <h2>📌 Post-Escalation</h2>
                <ol>
                    <li>Chief Architect documents the human decision in the ADR</li>
                    <li>If a new principle was established, add it to architecture-principles.md</li>
                    <li>If a policy exception was granted, document it in the relevant agent's policies.md with expiry date</li>
                    <li>Resume the deliberation process with the resolved constraint</li>
                </ol>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // PRINCIPLES
    // ═══════════════════════════════════════════════════
    function renderPrinciples() {
        return `
            <div class="page-header">
                <h1>Architecture Principles</h1>
                <p>These ${PRINCIPLES.length} principles govern all architecture decisions across all domains. When domain-level principles conflict with enterprise principles, enterprise principles take precedence.</p>
            </div>

            ${PRINCIPLES.map(p => `
                <div class="principle-card">
                    <div class="principle-id">${p.id}</div>
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="implication"><strong>Implication:</strong> ${p.implication}</div>
                </div>
            `).join('')}

            <div class="content-section" style="margin-top: 24px;">
                <h2>⚖️ Principle Conflict Resolution</h2>
                <ol>
                    <li><strong>EP-003</strong> (Security & Privacy) — always applies; cannot be traded away</li>
                    <li><strong>EP-010</strong> (Compliance) — regulatory obligations are non-negotiable</li>
                    <li><strong>EP-001</strong> (Business Value) — the primary driver for all other trade-offs</li>
                    <li><strong>EP-002, EP-005, EP-007</strong> — balance contextually</li>
                    <li>All others — apply based on the specific decision context</li>
                </ol>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // TECH RADAR
    // ═══════════════════════════════════════════════════
    function renderTechRadar() {
        return `
            <div class="page-header">
                <h1>Technology Radar</h1>
                <p>Enterprise technology classification by adoption guidance — updated Q1 2026. Next review: Q3 2026.</p>
            </div>

            <div class="content-section" style="margin-bottom: 28px;">
                <h2>📖 How to Read This Radar</h2>
                <table class="content-table">
                    <thead><tr><th>Ring</th><th>Meaning</th><th>Action</th></tr></thead>
                    <tbody>
                        <tr><td><span class="badge adopt">ADOPT</span></td><td>Proven; recommended for new and existing projects</td><td>Use confidently; no special approval</td></tr>
                        <tr><td><span class="badge trial">TRIAL</span></td><td>Promising; use in non-critical projects</td><td>Allowed with EA awareness; share learnings</td></tr>
                        <tr><td><span class="badge assess">ASSESS</span></td><td>Worth watching; not yet production-ready</td><td>Only in sandboxes/PoCs; brief EA first</td></tr>
                        <tr><td><span class="badge hold">HOLD</span></td><td>Avoid for new use; plan migration</td><td>No new projects; migration roadmap required</td></tr>
                    </tbody>
                </table>
            </div>

            ${Object.entries(TECH_RADAR).map(([category, items]) => `
                <div class="radar-category">
                    <h3>${category}</h3>
                    <div class="radar-items">
                        ${items.map(item => `
                            <div class="radar-item">
                                <div>
                                    <div class="name">${item.name}</div>
                                    <div class="notes">${item.notes}</div>
                                </div>
                                <span class="badge ${item.ring.toLowerCase()}">${item.ring}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }

    // ═══════════════════════════════════════════════════
    // GLOSSARY
    // ═══════════════════════════════════════════════════
    function renderGlossary() {
        return `
            <div class="page-header">
                <h1>EA Council Glossary</h1>
                <p>Common terms used across all council agents. Consistent terminology prevents miscommunication between agents and with human sponsors.</p>
            </div>

            <div class="content-section">
                <dl>
                    ${GLOSSARY.map(g => `
                        <div class="glossary-term">
                            <dt>${g.full || g.term}${g.full ? `<span class="abbr">(${g.term})</span>` : ''}</dt>
                            <dd>${g.def}</dd>
                        </div>
                    `).join('')}
                </dl>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // CONNECTORS
    // ═══════════════════════════════════════════════════
    function renderConnectors() {
        return `
            <div class="page-header">
                <h1>Connectors & Integrations</h1>
                <p>Integration reference guides for the data sources that power the EA Council's evidence-based recommendations.</p>
            </div>

            ${CONNECTORS.map(c => `
                <div class="connector-card">
                    <h3>${c.name}</h3>
                    <span class="connector-protocol">${c.protocol}</span>
                    <p>${c.desc}</p>
                </div>
            `).join('')}

            <div class="content-section" style="margin-top: 8px;">
                <h2>🔗 Data Flow</h2>
                <p>All agents query live data from LeanIX (via MCP) and ServiceNow (via REST API) during their assessments. The Chief Architect pulls relevant context during the Triage phase and distributes it to domain agents. Decisions are written back to update the enterprise record.</p>
                <div class="code-block">┌──────────────────────┐
│   Council Request    │
└──────────┬───────────┘
           │
    ┌──────▼───────┐
    │Chief Architect│──── Pull context ────┐
    └──────┬───────┘                       │
           │                     ┌─────────▼──────────┐
    ┌──────▼───────┐             │  LeanIX (MCP)      │
    │ Domain Agents│◄────────────│  ServiceNow (REST) │
    └──────┬───────┘             └─────────▲──────────┘
           │                               │
    ┌──────▼────────┐                      │
    │ Cross-Cut +   │                      │
    │ Red Team      │                      │
    └──────┬────────┘                      │
           │                               │
    ┌──────▼───────┐                       │
    │  Synthesis   │──── Write back ───────┘
    └──────┬───────┘
           │
    ┌──────▼───────┐
    │     ADR      │
    └──────────────┘</div>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════
    // AGENT DETAIL
    // ═══════════════════════════════════════════════════
    function renderAgentDetail(agent) {
        const typeClass = agent.type;
        const typeLabel = agent.type === 'domain' ? 'Domain Agent' : agent.type === 'crosscut' ? 'Cross-Cut Agent' : 'Challenge Agent';

        return `
            <div class="agent-header ${typeClass}">
                <div class="agent-avatar ${typeClass}">${agent.icon}</div>
                <div class="agent-info">
                    <h1>${agent.name}</h1>
                    <div class="agent-type ${typeClass}">${typeLabel} · ${agent.authority}</div>
                    <div class="agent-desc">${agent.identity}</div>
                </div>
            </div>

            <div class="tabs">
                <button class="tab-btn active" data-tab="scope">Scope</button>
                <button class="tab-btn" data-tab="frameworks">Frameworks</button>
                ${agent.leanixFacts ? '<button class="tab-btn" data-tab="leanix">LeanIX Data</button>' : ''}
            </div>

            <div class="tab-content active" id="tab-scope">
                <div class="content-section">
                    <h2>📋 Domain Scope</h2>
                    <ul>
                        ${agent.scope.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="tab-content" id="tab-frameworks">
                <div class="content-section">
                    <h2>🧰 Frameworks & Methodologies</h2>
                    <ul>
                        ${agent.frameworks.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>

            ${agent.leanixFacts ? `
            <div class="tab-content" id="tab-leanix">
                <div class="content-section">
                    <h2>📊 LeanIX Fact Sheets Used</h2>
                    <ul>
                        ${agent.leanixFacts.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}

            ${agent.id === 'security' ? `
            <div class="content-section" style="margin-top: 4px;">
                <h2>⛔ Veto Criteria</h2>
                <p>You may veto when:</p>
                <ol>
                    <li>A proposal violates a <span class="badge mandatory">MANDATORY</span> security policy with no available mitigation within scope</li>
                    <li>A proposal creates an unacceptable risk (HIGH probability × HIGH impact with no mitigation)</li>
                    <li>A proposal exposes Restricted data to unauthenticated or unauthorized parties</li>
                    <li>A new AI system processes sensitive data with no human oversight mechanism</li>
                </ol>
                <p style="margin-top:12px;">When vetoing: cite the specific policy, the specific risk, and state what must change to lift the veto. <strong>Do not veto without proposing a path forward.</strong></p>
            </div>
            ` : ''}

            ${agent.id === 'redteam' ? `
            <div class="content-section" style="margin-top: 4px;">
                <h2>🔍 Red Team Lenses</h2>
                <div class="flow-grid">
                    <div class="flow-card">
                        <div class="flow-level major">1. Adversarial Lens</div>
                        <div class="flow-desc">Who would want this to fail? External attacker, malicious insider, competitor, regulator/auditor.</div>
                    </div>
                    <div class="flow-card">
                        <div class="flow-level critical">2. Failure Mode Lens</div>
                        <div class="flow-desc">Most likely failure mode? Highest-impact? Catastrophic single point of failure? Recovery path?</div>
                    </div>
                    <div class="flow-card">
                        <div class="flow-level standard">3. Assumption Audit</div>
                        <div class="flow-desc">List top 5 assumptions. Rate: VALIDATED / UNVALIDATED / QUESTIONABLE. What if wrong?</div>
                    </div>
                    <div class="flow-card">
                        <div class="flow-level minor">4. Simplicity Challenge</div>
                        <div class="flow-desc">What if solved with half the complexity? Solving real problems or assumed ones?</div>
                    </div>
                    <div class="flow-card">
                        <div class="flow-level major">5. Regulator Lens</div>
                        <div class="flow-desc">How does this look to someone who wants to find a problem? Weakest evidence?</div>
                    </div>
                    <div class="flow-card">
                        <div class="flow-level critical">6. Operational Reality</div>
                        <div class="flow-desc">Does this work at 2am, with junior staff, under pressure? How complex is the runbook?</div>
                    </div>
                </div>
            </div>
            ` : ''}
        `;
    }

    // ─── TAB LOGIC ───
    function attachTabListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;

                // Update button states
                btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update content
                document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                const target = document.getElementById(`tab-${tabId}`);
                if (target) target.classList.add('active');
            });
        });
    }

    // ─── TOPOLOGY CLICK HANDLERS ───
    function attachTopoClickListeners() {
        document.querySelectorAll('.topo-agent, .topo-chief, .shared-item').forEach(el => {
            if (el.dataset.page) {
                el.addEventListener('click', () => navigateTo(el.dataset.page));
            }
        });
    }

    // ─── INITIAL RENDER ───
    renderPage('dashboard');

})();
