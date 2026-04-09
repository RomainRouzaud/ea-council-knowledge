/* ═══════════════════════════════════════════════════════════════
   EA Council — Knowledge Base Data
   All content from the ea-council-knowledge repository
   ═══════════════════════════════════════════════════════════════ */

const AGENTS = [
    {
        id: 'business',
        name: 'Business Architecture & Strategy',
        page: 'agent-business',
        type: 'domain',
        icon: '📊',
        authority: 'Advisory',
        scope: [
            'Business capability modeling and mapping',
            'Value stream analysis and optimization',
            'Strategy-to-execution alignment (OKRs → capabilities → applications)',
            'Business model analysis and digital transformation relevance',
            'Stakeholder and organizational impact of technology decisions',
            'Business case framing for architectural investments',
            'Roadmap alignment across business units'
        ],
        identity: 'You connect technology decisions to business value. You speak the language of both the business and IT — translating strategy into capability requirements and evaluating whether technology proposals serve the organization\'s direction.',
        frameworks: ['TOGAF — Architecture Vision, Business Architecture phase', 'BizBok — Business Architecture Guild methodology', 'Wardley Mapping — for strategic positioning of capabilities', 'Business Model Canvas — for digital business model assessment', 'OKR alignment — connecting objectives to capability requirements'],
        leanixFacts: ['Business Capabilities', 'Value Streams', 'User Groups', 'Applications (linked to capabilities)']
    },
    {
        id: 'application',
        name: 'Application Architecture',
        page: 'agent-application',
        type: 'domain',
        icon: '🧩',
        authority: 'Advisory',
        scope: [
            'Application portfolio management and rationalization',
            'Build vs Buy vs SaaS decision frameworks',
            'Application lifecycle management (Plan → Active → Phase Out → End of Life)',
            'Application integration patterns (from an app perspective)',
            'Cloud-native application design patterns',
            'Application modernization (rehost / replatform / refactor / replace)',
            'Technical and functional fitness assessments'
        ],
        identity: 'You are the guardian of the application portfolio. You ensure the organization builds, buys, and retires applications strategically — minimizing redundancy, technical debt, and shadow IT.',
        frameworks: ['TIME Model (Tolerate / Invest / Migrate / Eliminate)', 'Gartner Pace Layering', '12-Factor App methodology', 'Strangler Fig pattern for modernization', 'CNCF Cloud-Native landscape alignment'],
        leanixFacts: ['Applications', 'IT Components', 'Interfaces', 'Business Capabilities (linked)', 'Data Objects']
    },
    {
        id: 'integration',
        name: 'Integration Architecture',
        page: 'agent-integration',
        type: 'domain',
        icon: '🔗',
        authority: 'Advisory',
        scope: [
            'API design and governance (RESTful, GraphQL, AsyncAPI)',
            'Event-driven architecture patterns',
            'Enterprise integration patterns (EIP)',
            'Middleware and iPaaS strategy',
            'Data flow design and orchestration',
            'Interface documentation and lifecycle',
            'API versioning and deprecation policies'
        ],
        identity: 'You are the guardian of how systems talk to each other. You ensure integrations are well-designed, documented, governed, and built on standard patterns.',
        frameworks: ['Enterprise Integration Patterns (EIP)', 'API-First Design', 'Event-Driven Architecture (EDA)', 'OpenAPI / AsyncAPI specifications', 'TOGAF Integration Architecture']
    },
    {
        id: 'techinfra',
        name: 'Technology & Infrastructure',
        page: 'agent-techinfra',
        type: 'domain',
        icon: '☁️',
        authority: 'Advisory',
        scope: [
            'Cloud platform strategy (Azure-first, multi-cloud governance)',
            'Container and Kubernetes strategy',
            'Infrastructure as Code (IaC)',
            'DevOps and CI/CD pipeline architecture',
            'Networking and connectivity design',
            'Capacity planning and cost optimization',
            'Disaster recovery and high availability design'
        ],
        identity: 'You are the infrastructure and cloud strategist. You ensure workloads run on the right platform, with the right resilience, at the right cost.',
        frameworks: ['Azure Well-Architected Framework', 'Cloud Adoption Framework (CAF)', 'TOGAF Technology Architecture', 'SRE principles', 'FinOps for cloud cost management']
    },
    {
        id: 'dataai',
        name: 'Data & AI',
        page: 'agent-dataai',
        type: 'domain',
        icon: '🧠',
        authority: 'Advisory',
        scope: [
            'Data governance and stewardship',
            'Data platform architecture (Fabric, Lakehouse)',
            'Data classification and sensitivity management',
            'Master data management strategy',
            'AI/ML platform and MLOps strategy',
            'AI governance and EU AI Act compliance',
            'RAG, vector search, and LLM integration patterns'
        ],
        identity: 'You are the data and AI strategist. You ensure data is governed as an enterprise asset and AI systems are built responsibly, securely, and with measurable business value.',
        frameworks: ['DMBOK — Data Management Body of Knowledge', 'DAMA-DMBOK Data Governance Framework', 'MLOps maturity model', 'Responsible AI Framework', 'Data Mesh principles (where applicable)']
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing & OT Architecture',
        page: 'agent-manufacturing',
        type: 'domain',
        icon: '🏭',
        authority: 'Advisory',
        scope: [
            'IT/OT convergence architecture',
            'MES/MOM strategy and platform selection',
            'SCADA, DCS, and HMI architecture',
            'IIoT connectivity and edge computing',
            'Industrial protocol management (OPC UA, MQTT, Modbus)',
            'Purdue model adaptation for modern architectures',
            'Plant historian and data integration',
            'Safety Instrumented Systems (SIS) architecture'
        ],
        identity: 'You are the Manufacturing & OT specialist. You bridge the gap between IT and operational technology, ensuring plant floor systems are modernized safely while maintaining operational continuity and safety.',
        frameworks: ['Purdue/ISA-95 reference model', 'IEC 62443 (OT cybersecurity)', 'ISA-88 (batch control)', 'ISA-95 (enterprise-control integration)', 'Industry 4.0 reference architecture (RAMI 4.0)']
    },
    {
        id: 'rdeda',
        name: 'R&D & EDA Architecture',
        page: 'agent-rdeda',
        type: 'domain',
        icon: '🔬',
        authority: 'Advisory',
        scope: [
            'EDA infrastructure (chip design, RTL, synthesis, P&R)',
            'CAD/CAE/CAM platform strategy',
            'PLM and digital thread architecture',
            'HPC cluster and simulation infrastructure',
            'Research data management (ELN, LIMS)',
            'IP protection and export control (ITAR, EAR)',
            'External R&D collaboration platforms'
        ],
        identity: 'You are the R&D and EDA specialist. You ensure that engineering, research, and design systems are architected for performance, IP protection, and regulatory compliance.',
        frameworks: ['EDA design flow reference architecture', 'PLM reference model (Teamcenter/Windchill/Enovia)', 'HPC cluster architecture patterns', 'ITAR/EAR compliance framework', 'Research data management (FAIR principles)']
    },
    {
        id: 'security',
        name: 'Security Architecture',
        page: 'agent-security',
        type: 'crosscut',
        icon: '🛡️',
        authority: 'Governance — Veto Power',
        scope: [
            'Threat modeling (STRIDE, MITRE ATT&CK)',
            'Zero-trust architecture and identity security',
            'Network security: segmentation, perimeter, east-west controls',
            'Data security: encryption at rest and in transit, key management',
            'Application security: secure design patterns, OWASP alignment',
            'API security: authentication, authorization, rate limiting',
            'Cloud security: shared responsibility model, CSPM',
            'Supply chain security: third-party and SaaS risk',
            'Security of AI/ML systems',
            'Security monitoring and detection architecture'
        ],
        identity: 'You are the guardian of the organization\'s security posture. You review every proposal that could affect the attack surface, data exposure, access controls, or threat landscape. You are empowered to veto proposals that violate mandatory security policies.',
        frameworks: ['STRIDE — threat modeling', 'MITRE ATT&CK — advanced threat analysis', 'OWASP Top 10 — application security', 'Zero Trust Architecture (NIST SP 800-207)', 'NIST CSF — security posture assessment', 'CIS Controls — infrastructure security']
    },
    {
        id: 'risk',
        name: 'Risk Management & Compliance',
        page: 'agent-risk',
        type: 'crosscut',
        icon: '⚖️',
        authority: 'Governance — Escalation Power',
        scope: [
            'Regulatory compliance assessment (GDPR, NIS2, DORA, SOX)',
            'Risk identification and scoring',
            'GRC integration with ServiceNow',
            'Data residency and sovereignty requirements',
            'Vendor risk and third-party dependency management',
            'Business continuity and disaster recovery compliance',
            'Policy exception management',
            'Audit trail and evidence management'
        ],
        identity: 'You are the compliance and risk management specialist. You ensure architecture decisions comply with regulatory requirements and align with the organization\'s risk appetite.',
        frameworks: ['GDPR compliance framework', 'NIS2 Directive requirements', 'ISO 27001 / ISO 27002', 'DORA (Digital Operational Resilience Act)', 'NIST Risk Management Framework', 'COBIT for IT governance']
    },
    {
        id: 'redteam',
        name: 'Red Team',
        page: 'agent-redteam',
        type: 'challenge',
        icon: '🎯',
        authority: 'Challenge (no veto)',
        scope: [
            'Attack proposals — find weaknesses, blind spots, single points of failure',
            'Challenge consensus — when all agree, be more skeptical',
            'Think like the adversary — attacker, regulator, auditor',
            'Play devil\'s advocate — argue the opposite of consensus',
            'Spot overconfidence — probe when certainty is highest'
        ],
        identity: 'Your job is to break proposals — not maliciously, but rigorously. You are the council\'s immune system. You find what everyone else missed, challenge what everyone else assumed, and speak uncomfortable truths.',
        frameworks: ['Adversarial Lens — who wants this to fail?', 'Failure Mode Lens — how will this fail?', 'Assumption Audit — what must be true?', 'Simplicity Challenge — is there a simpler path?', 'Regulator/Auditor Lens — how does this look to someone finding problems?', 'Operational Reality Lens — does this work at 2am with junior staff?']
    }
];

const PRINCIPLES = [
    { id: 'EP-001', title: 'Business Value Drives Architecture', desc: 'Architecture exists to serve the business. Every architecture decision must have a clear line of sight to a business outcome. Technical elegance without business relevance is not a sufficient justification.', implication: '"Because it\'s the right architecture" is not an argument. "Because it reduces time-to-market by X weeks" is.' },
    { id: 'EP-002', title: 'Simplicity Over Cleverness', desc: 'The simplest architecture that meets the requirements is preferred over a complex one that exceeds them. Complexity is a cost — it accrues in maintenance, operational burden, and failure modes.', implication: 'When two proposals meet requirements equally, choose the simpler one.' },
    { id: 'EP-003', title: 'Security and Privacy Are Non-Negotiable', desc: 'Security and privacy are design requirements, not features or compliance checkboxes. They are applied at every layer, from the start, and are never deferred to a later phase.', implication: '"We\'ll add security later" is not architecture. Proposals without a security design are incomplete.' },
    { id: 'EP-004', title: 'Data Is an Enterprise Asset', desc: 'Data belongs to the enterprise, not to individual applications or teams. Data must be governed, classified, owned, and accessible to those who need it through defined channels.', implication: 'Applications do not own data in isolation. They are stewards. Data flows must be explicit and governed.' },
    { id: 'EP-005', title: 'Architect for Change', desc: 'Change is constant. Architecture must accommodate change without requiring wholesale redesign. Loose coupling, versioned interfaces, and modularity are the mechanisms.', implication: 'Hard-wired dependencies between systems are a liability. Every cross-system dependency must use a defined, versioned interface.' },
    { id: 'EP-006', title: 'Cloud-First, On-Premises by Exception', desc: 'Cloud-hosted services are the default for new workloads. On-premises hosting requires explicit justification on grounds of regulation, latency, or cost.', implication: '"We\'ve always done it on-prem" is not a justification. Legacy on-premises workloads have a migration obligation.' },
    { id: 'EP-007', title: 'Reuse Before Build', desc: 'Before building or buying new capability, the existing portfolio must be evaluated. Reuse eliminates duplication, reduces cost, and simplifies the landscape.', implication: 'New application proposals must include a portfolio reuse assessment.' },
    { id: 'EP-008', title: 'Everything Is Documented and Discoverable', desc: 'Architecture decisions, data flows, application relationships, and infrastructure configurations are documented in LeanIX and ServiceNow. If it\'s not documented, it doesn\'t officially exist.', implication: 'Undocumented systems are a governance gap.' },
    { id: 'EP-009', title: 'Operational Excellence Is an Architecture Responsibility', desc: 'An application that cannot be monitored, backed up, recovered, and upgraded is not production-ready. Operational requirements are architecture requirements.', implication: 'Proposals must include observability, DR tier, and operational ownership as design elements.' },
    { id: 'EP-010', title: 'Compliance Is Designed In', desc: 'The organization\'s regulatory obligations shape architecture from the start. Compliance requirements are inputs to design, not filters applied at the end.', implication: 'Regulatory applicability (GDPR, NIS2, DORA, etc.) is assessed at triage, not after the design is complete.' },
    { id: 'EP-011', title: 'Vendor Relationships Are Strategic Risks', desc: 'Technology vendors are partners but also sources of risk: lock-in, price increases, acquisition, end-of-support. Vendor risk is architecture risk.', implication: 'Every significant vendor dependency must have a documented exit strategy and concentration risk assessment.' },
    { id: 'EP-012', title: 'Architecture Decisions Are Records, Not Conversations', desc: 'All decisions at Standard impact or above are recorded as Architecture Decision Records (ADRs). ADRs are the institutional memory of why things are built the way they are.', implication: 'Verbal or email-only decisions are not architecture decisions.' }
];

const TECH_RADAR = {
    'Cloud Platforms': [
        { name: 'Microsoft Azure', ring: 'ADOPT', notes: 'Primary cloud platform' },
        { name: 'Azure Government / Sovereign', ring: 'ADOPT', notes: 'Regulated/public sector workloads' },
        { name: 'AWS', ring: 'TRIAL', notes: 'Where Azure lacks capability or for multi-cloud resilience' },
        { name: 'Google Cloud Platform', ring: 'ASSESS', notes: 'Evaluate for specific ML/data workloads' },
        { name: 'On-premises self-managed', ring: 'HOLD', notes: 'No new workloads; migration required' }
    ],
    'Compute & Containers': [
        { name: 'Azure Kubernetes Service (AKS)', ring: 'ADOPT', notes: 'Default for containerized workloads' },
        { name: 'Azure Container Apps (ACA)', ring: 'ADOPT', notes: 'Preferred for new microservices' },
        { name: 'Azure Functions', ring: 'ADOPT', notes: 'Event-driven, stateless workloads' },
        { name: 'Azure App Service', ring: 'ADOPT', notes: 'Traditional web apps and APIs' },
        { name: 'Azure Virtual Machines', ring: 'HOLD', notes: 'Only lift-and-shift legacy; migrate to containers' },
        { name: 'Docker', ring: 'ADOPT', notes: 'Standard container runtime' }
    ],
    'Integration & Messaging': [
        { name: 'Azure Service Bus', ring: 'ADOPT', notes: 'Enterprise messaging; queues and topics' },
        { name: 'Azure Event Hubs', ring: 'ADOPT', notes: 'High-throughput event streaming' },
        { name: 'Azure API Management (APIM)', ring: 'ADOPT', notes: 'API gateway and developer portal' },
        { name: 'Azure Logic Apps', ring: 'ADOPT', notes: 'Low-code orchestration' },
        { name: 'Azure Event Grid', ring: 'ADOPT', notes: 'Event routing; serverless triggers' },
        { name: 'MuleSoft Anypoint', ring: 'TRIAL', notes: 'Complex enterprise integration' },
        { name: 'Apache Kafka', ring: 'TRIAL', notes: 'Streaming at very high scale' },
        { name: 'SOAP/WS-* web services', ring: 'HOLD', notes: 'No new interfaces; use REST/AsyncAPI' },
        { name: 'FTP/SFTP file-based integration', ring: 'HOLD', notes: 'Legacy only; migrate to API/event' }
    ],
    'Data & Analytics': [
        { name: 'Microsoft Fabric', ring: 'ADOPT', notes: 'Unified analytics platform' },
        { name: 'Azure Data Lake Storage Gen2', ring: 'ADOPT', notes: 'Standard for raw data storage' },
        { name: 'Azure SQL Database', ring: 'ADOPT', notes: 'Relational transactional data' },
        { name: 'Azure PostgreSQL Flexible Server', ring: 'ADOPT', notes: 'Open-source relational' },
        { name: 'Azure Cosmos DB', ring: 'ADOPT', notes: 'Multi-model NoSQL' },
        { name: 'Azure Cache for Redis', ring: 'ADOPT', notes: 'Caching and session' },
        { name: 'Power BI', ring: 'ADOPT', notes: 'Standard BI and reporting' },
        { name: 'Databricks', ring: 'TRIAL', notes: 'Advanced ML/data engineering' },
        { name: 'On-premises SQL Server', ring: 'HOLD', notes: 'Migrate to Azure SQL or PostgreSQL' }
    ],
    'AI & Machine Learning': [
        { name: 'Azure OpenAI Service', ring: 'ADOPT', notes: 'LLM platform; enterprise-grade' },
        { name: 'Azure Machine Learning', ring: 'ADOPT', notes: 'ML platform for training & deployment' },
        { name: 'Microsoft Copilot Studio', ring: 'ADOPT', notes: 'Agentic AI and conversational UI' },
        { name: 'Azure AI Search', ring: 'ADOPT', notes: 'Vector search and RAG patterns' },
        { name: 'GitHub Copilot', ring: 'ADOPT', notes: 'Developer productivity' },
        { name: 'Azure AI Foundry', ring: 'TRIAL', notes: 'Next-gen AI development hub' },
        { name: 'Hugging Face (self-hosted)', ring: 'TRIAL', notes: 'Open-source models on Azure ML' },
        { name: 'OpenAI API (direct)', ring: 'HOLD', notes: 'Use Azure OpenAI for data residency' }
    ],
    'Security': [
        { name: 'Microsoft Entra ID', ring: 'ADOPT', notes: 'Identity platform; SSO, MFA, PIM' },
        { name: 'Azure Key Vault', ring: 'ADOPT', notes: 'Secrets, keys, certificates' },
        { name: 'Microsoft Defender for Cloud', ring: 'ADOPT', notes: 'Cloud security posture management' },
        { name: 'Microsoft Sentinel', ring: 'ADOPT', notes: 'SIEM and SOAR' },
        { name: 'Azure Front Door + WAF', ring: 'ADOPT', notes: 'External-facing app protection' },
        { name: 'Conditional Access', ring: 'ADOPT', notes: 'Zero trust access control' },
        { name: 'Legacy username/password auth', ring: 'HOLD', notes: 'Migrate to Entra ID with MFA' }
    ],
    'DevOps & CI/CD': [
        { name: 'GitHub Actions', ring: 'ADOPT', notes: 'CI/CD pipeline standard' },
        { name: 'Azure DevOps Pipelines', ring: 'ADOPT', notes: 'Legacy CI/CD' },
        { name: 'Terraform', ring: 'ADOPT', notes: 'IaC for multi-cloud' },
        { name: 'Azure Bicep', ring: 'ADOPT', notes: 'IaC for Azure-native' },
        { name: 'ArgoCD', ring: 'TRIAL', notes: 'GitOps for Kubernetes' },
        { name: 'Jenkins', ring: 'HOLD', notes: 'Migrate to GitHub Actions' }
    ],
    'Enterprise Applications': [
        { name: 'SAP (S/4HANA Cloud)', ring: 'ADOPT', notes: 'ERP platform' },
        { name: 'SAP LeanIX', ring: 'ADOPT', notes: 'EA repository (MCP available)' },
        { name: 'ServiceNow', ring: 'ADOPT', notes: 'ITSM, CMDB, GRC platform' },
        { name: 'Microsoft 365', ring: 'ADOPT', notes: 'Productivity and collaboration' },
        { name: 'Microsoft Teams', ring: 'ADOPT', notes: 'Collaboration and communication' },
        { name: 'SharePoint Online', ring: 'ADOPT', notes: 'Document management and intranet' }
    ]
};

const GLOSSARY = [
    { term: 'ADR', full: 'Architecture Decision Record', def: 'A document that captures an architecture decision, the context in which it was made, the options considered, the rationale for the chosen option, and the trade-offs accepted.' },
    { term: 'Application', full: null, def: 'A software system that provides business functionality. Registered in LeanIX as an Application fact sheet.' },
    { term: 'Application Portfolio', full: null, def: 'The full inventory of applications used by the organization, managed in LeanIX.' },
    { term: 'API', full: 'Application Programming Interface', def: 'A defined contract through which systems exchange data or trigger actions. The preferred integration mechanism for all new interfaces.' },
    { term: 'Business Capability', full: null, def: 'A particular ability or capacity a business possesses to achieve a specific purpose or outcome. Registered in LeanIX. Independent of how it is implemented.' },
    { term: 'Business Fit', full: null, def: 'A score (1–5) assessing how well an application continues to serve the business need it was acquired for.' },
    { term: 'CMDB', full: 'Configuration Management Database', def: 'ServiceNow\'s authoritative record of IT infrastructure configuration items (CIs) and their relationships.' },
    { term: 'Cross-Cut Agent', full: null, def: 'An agent (Security, Risk & Compliance, Red Team) that reviews proposals across all domains rather than owning a specific domain.' },
    { term: 'Data Classification', full: null, def: 'The assignment of a sensitivity level (Public / Internal / Confidential / Restricted) to data, governing how it must be protected and shared.' },
    { term: 'Data Object', full: null, def: 'A logical representation of a business data entity (e.g., Customer, Order, Product). Registered in LeanIX.' },
    { term: 'DPIA', full: 'Data Protection Impact Assessment', def: 'A GDPR-required assessment for processing activities that may result in high risk to individuals.' },
    { term: 'Domain Agent', full: null, def: 'An agent specializing in a specific architecture domain (Business, Application, Integration, etc.).' },
    { term: 'DR Tier', full: null, def: 'Disaster Recovery tier classification (1–4) defining the RTO and RPO targets for a workload.' },
    { term: 'EU AI Act', full: null, def: 'EU regulation classifying AI systems by risk level (Unacceptable / High / Limited / Minimal) with corresponding obligations.' },
    { term: 'Fact Sheet', full: null, def: 'LeanIX\'s term for a record in the EA repository. Types include: Application, IT Component, Business Capability, Interface, Data Object, User Group.' },
    { term: 'Functional Fit', full: null, def: 'How well an application\'s features match the current functional requirements of its users.' },
    { term: 'Impact Level', full: null, def: 'Classification of an architecture decision\'s scope and risk: Minor / Standard / Major / Critical.' },
    { term: 'Interface', full: null, def: 'A LeanIX fact sheet documenting a data flow or integration between two applications.' },
    { term: 'IT Component', full: null, def: 'A LeanIX fact sheet representing a technology component (framework, platform, product) underlying an application.' },
    { term: 'LeanIX', full: null, def: 'The organization\'s Enterprise Architecture repository (SAP LeanIX). System of record for applications, capabilities, data objects, interfaces, and technology components. Accessible via MCP.' },
    { term: 'Lifecycle State', full: null, def: 'The current operational status of an application or IT component: Active / Phase Out / End of Life / Planned.' },
    { term: 'MCP', full: 'Model Context Protocol', def: 'The protocol used to expose LeanIX data to AI agents via tool calls, enabling real-time querying of the architecture repository.' },
    { term: 'MLOps', full: null, def: 'The practice of applying DevOps disciplines to machine learning model development, deployment, and monitoring.' },
    { term: 'Orchestrator', full: null, def: 'The Chief Architect agent. Receives requests, coordinates domain agents, synthesizes outputs, and produces final decisions.' },
    { term: 'Policy Exception', full: null, def: 'A formally approved deviation from a mandatory policy, with documented business justification, compensating controls, approval, and expiry.' },
    { term: 'Principle', full: null, def: 'A general rule that guides architecture decisions across the enterprise. Applied when resolving conflicts between competing options.' },
    { term: 'Red Team', full: null, def: 'The adversarial challenge agent. Reviews council outputs to identify weaknesses, blind spots, and unvalidated assumptions.' },
    { term: 'RPO', full: 'Recovery Point Objective', def: 'The maximum acceptable data loss in time. "How old can our backup be when we restore?"' },
    { term: 'RTO', full: 'Recovery Time Objective', def: 'The maximum acceptable time to restore a system after failure. "How long can this be down?"' },
    { term: 'ServiceNow', full: null, def: 'The organization\'s ITSM and GRC platform. Sources of truth for: CMDB, change requests, incidents, risk register, policy exceptions.' },
    { term: 'System of Record (SoR)', full: null, def: 'The single authoritative source for a data domain. All other copies of that data are derived from the SoR.' },
    { term: 'Technical Fit', full: null, def: 'A score (1–5) assessing how well an application\'s technology stack aligns with current standards and maintainability expectations.' },
    { term: 'Tech Radar', full: null, def: 'The organization\'s classification of technologies by adoption guidance: ADOPT / TRIAL / ASSESS / HOLD.' },
    { term: 'TIME Model', full: null, def: 'Gartner application portfolio framework: Tolerate / Invest / Migrate / Eliminate.' },
    { term: 'Value Stream', full: null, def: 'An end-to-end sequence of activities that delivers value to a customer (internal or external).' },
    { term: 'Veto', full: null, def: 'A formal halt issued by the Security agent when a proposal violates a mandatory security policy with no available mitigation.' }
];

const DELIBERATION_PHASES = [
    { num: 1, name: 'Triage & Decompose', driver: 'Chief Architect', desc: 'Read and interpret the incoming request. Identify decision type, assign impact level, decompose into domain-specific sub-questions, select agents, and pull relevant context from LeanIX and ServiceNow.' },
    { num: 2, name: 'Parallel Domain Assessment', driver: 'Domain Agents', desc: 'All selected domain agents run simultaneously (or sequentially). Each agent receives the full request, their specific sub-question, and relevant data. They assess current state, provide recommendations, identify risks, and flag dependencies.' },
    { num: 3, name: 'Cross-Cut Review', driver: 'Security + Risk & Compliance', desc: 'Security and Risk & Compliance agents review ALL domain outputs through their governance lens. They identify concerns missed by domain agents, flag items requiring remediation, and rate overall risk level.' },
    { num: 4, name: 'Red Team Challenge', driver: 'Red Team', desc: 'The Red Team\'s job is NOT to endorse — it\'s to break the proposal. They identify weaknesses, challenge assumptions, find failure modes, and assess whether there\'s a simpler approach the council overlooked.' },
    { num: 5, name: 'Synthesis & Refinement', driver: 'Chief Architect', desc: 'List consensus points and conflicts. Resolve conflicts using architecture principles. Address Security/Risk findings and Red Team challenges. Formulate the synthesized recommendation.' },
    { num: 6, name: 'Decision & Output', driver: 'Chief Architect', desc: 'Produce the Architecture Decision Record (ADR). List next actions with owners. Write back to LeanIX/ServiceNow. Notify human sponsors if escalation is needed.' }
];

const IMPACT_LEVELS = [
    { level: 'Minor', desc: 'Single-app, low risk, reversible', agents: '1–2 relevant domain agents', output: 'Quick recommendation' },
    { level: 'Standard', desc: 'Multi-app, moderate risk', agents: 'Relevant domain + Security', output: 'Architecture Decision Record (ADR)' },
    { level: 'Major', desc: 'Enterprise-wide, high risk, strategic', agents: 'Full council', output: 'Full ADR + human review' },
    { level: 'Critical', desc: 'Regulatory, safety, irreversible', agents: 'Full council + Red Team', output: 'Full ADR + mandatory human approval' }
];

const ROUTING_TABLE = [
    { topic: 'New application adoption', domain: 'Application, Integration, Tech & Infra', crosscut: 'Security, Risk & Compliance' },
    { topic: 'Application decommission', domain: 'Application, Integration, Business', crosscut: 'Risk & Compliance' },
    { topic: 'Cloud migration', domain: 'Tech & Infra, Application, Integration', crosscut: 'Security, Risk & Compliance' },
    { topic: 'New integration / API', domain: 'Integration, Application', crosscut: 'Security' },
    { topic: 'Business capability mapping', domain: 'Business', crosscut: '—' },
    { topic: 'Data platform or governance', domain: 'Data & AI, Application, Integration', crosscut: 'Security, Risk & Compliance' },
    { topic: 'AI/ML initiative', domain: 'Data & AI, Application, Tech & Infra', crosscut: 'Security, Risk & Compliance, Red Team' },
    { topic: 'Security architecture review', domain: '(all relevant domain agents)', crosscut: 'Security (lead), Risk & Compliance' },
    { topic: 'Major platform replacement', domain: 'All domain agents', crosscut: 'All cross-cut agents' },
    { topic: 'OT connectivity / IIoT', domain: 'Manufacturing & OT, Integration, Tech & Infra', crosscut: 'Security, Risk & Compliance' },
    { topic: 'EDA infrastructure / HPC', domain: 'R&D & EDA, Tech & Infra', crosscut: 'Security, Risk & Compliance' },
    { topic: 'PLM change or digital thread', domain: 'R&D & EDA, Integration, Application', crosscut: 'Security' },
    { topic: 'Export-controlled system', domain: 'R&D & EDA', crosscut: 'Security, Risk & Compliance (always)' }
];

const ESCALATION_TRIGGERS = [
    { trigger: 'Security veto — unresolvable', condition: 'Security agent issues a veto that cannot be remediated within scope', action: 'Pause decision. Escalate to CISO / Security Sponsor', escalateTo: 'CISO + EA Lead' },
    { trigger: 'Critical compliance risk', condition: 'Risk & Compliance rates a risk as CRITICAL', action: 'Pause decision. Escalate to Chief Risk Officer / Legal', escalateTo: 'CRO + Legal' },
    { trigger: 'Agent deadlock', condition: 'Two or more agents in irreconcilable conflict after synthesis', action: 'Present both positions to human sponsors with recommendation', escalateTo: 'EA Board' },
    { trigger: 'Outside principle coverage', condition: 'No applicable architecture principle', action: 'Escalate to EA Board to establish a new principle', escalateTo: 'EA Board' },
    { trigger: 'Red Team: confidence LOW', condition: 'Red Team rates confidence in the proposal as LOW', action: 'Require additional analysis or escalate for human review', escalateTo: 'CTO' },
    { trigger: 'Budget/resource impact', condition: 'Material cost implications not pre-approved', action: 'Escalate to CTO / CFO', escalateTo: 'CTO + CFO' },
    { trigger: 'Vendor lock-in > 3 years', condition: 'Proposal creates single vendor dependency 3+ years', action: 'Escalate to CTO for strategic approval', escalateTo: 'CTO' }
];

const CONNECTORS = [
    { name: 'SAP LeanIX', protocol: 'MCP (GraphQL)', desc: 'Enterprise Architecture repository. Query application portfolio, capabilities, interfaces, tech stack, data objects. Provides real-time context for all architecture assessments.' },
    { name: 'ServiceNow', protocol: 'REST API', desc: 'ITSM and GRC platform. Query CMDB configuration items, change records, incidents, and GRC risk register. Write back change requests and risk records.' },
    { name: 'Output Formats', protocol: 'Templates', desc: 'Structured output templates for ADRs, assessment reports, and Teams Adaptive Cards for human notification.' }
];
