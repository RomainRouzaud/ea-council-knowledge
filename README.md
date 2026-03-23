# EA Architecture Council — Multi-Agent Knowledge Base

A multi-agent AI system built on **Microsoft Copilot Studio** that simulates a functioning Enterprise Architecture Board with a Chief Architect orchestrator and 10 specialist domain agents.

## Architecture

```
                    ┌──────────────────────────────┐
                    │      Chief Architect Agent    │
                    │        (Orchestrator)         │
                    └──────┬───────────────┬────────┘
                           │               │
              ┌────────────┴───┐     ┌─────┴────────────┐
              │  Domain Agents │     │  Cross-Cut Agents │
              ├────────────────┤     ├───────────────────┤
              │ Business Arch  │     │ Security Arch     │
              │ Application    │     │ Risk & Compliance │
              │ Integration    │     │ Red Team          │
              │ Tech & Infra   │     │                   │
              │ Data & AI      │     │                   │
              │ Manufacturing  │     │                   │
              │ R&D / EDA      │     │                   │
              └───────┬────────┘     └────────┬─────────┘
                      │                       │
              ┌───────┴───────────────────────┴─────────┐
              │           Shared Knowledge Layer         │
              │  ┌──────────┐  ┌───────────┐  ┌──────┐  │
              │  │ LeanIX   │  │ServiceNow │  │ File  │  │
              │  │  (MCP)   │  │  (API)    │  │ Store │  │
              │  └──────────┘  └───────────┘  └──────┘  │
              └─────────────────────────────────────────┘
```

## Repository Structure

```
├── council-config.md                  # Global council rules & configuration
├── orchestration/                     # Chief Architect orchestrator
│   ├── chief-architect.md             # System prompt & behaviour
│   ├── deliberation-protocol.md       # 6-phase deliberation process
│   ├── routing-rules.md               # Which agents to consult per topic
│   └── escalation-matrix.md           # When to escalate to humans
├── agents/                            # All 10 specialist agents
│   ├── business-architecture/         # Strategy & capability alignment
│   ├── application-architecture/      # Portfolio management & rationalization
│   ├── integration-architecture/      # APIs, events, middleware
│   ├── technology-infrastructure/     # Cloud, infra, DevOps
│   ├── data-ai/                       # Data governance & AI/ML strategy
│   ├── manufacturing-ot/             # IT/OT convergence, MES, SCADA, IIoT
│   ├── rd-eda/                       # EDA, CAD/CAE, PLM, HPC, IP & export control
│   ├── security/                      # Threat modeling, zero-trust (veto power)
│   ├── risk-compliance/               # Regulatory, risk appetite, GRC
│   └── red-team/                      # Adversarial review & assumption testing
├── shared/                            # Enterprise-wide knowledge
│   ├── architecture-principles.md     # 12 enterprise architecture principles
│   ├── tech-radar.md                  # Technology radar (ADOPT/TRIAL/ASSESS/HOLD)
│   ├── glossary.md                    # Common terminology
│   ├── standards/                     # ADR template, naming, documentation
│   └── reference-architectures/       # Cloud-native, integration, data platform
├── connectors/                        # Integration reference guides
│   ├── leanix-queries.md              # Full GraphQL query library
│   ├── servicenow-apis.md             # REST API reference (CMDB, CHG, GRC)
│   └── output-formats.md             # Output templates + Teams Adaptive Card
├── outputs/                           # Deliverables
│   └── adr-register.md               # ADR register
└── copilot-studio/                    # Implementation guide (12 files)
    ├── 00-implementation-guide.md     # Overview & build order
    ├── 01-platform-overview.md        # Copilot Studio concepts mapped
    ├── 02-agent-topology.md           # Agent creation & wiring
    ├── 03-orchestrator-design.md      # Chief Architect config (paste-ready)
    ├── 04-sub-agent-design.md         # Sub-agent pattern + per-agent config
    ├── 05-leanix-mcp-integration.md   # SAP LeanIX MCP setup
    ├── 06-servicenow-integration.md   # ServiceNow REST + Power Automate flows
    ├── 07-prompt-injection-patterns.md # Knowledge layering strategy
    ├── 08-knowledge-sources.md        # SharePoint setup & Git sync
    ├── 09-testing-and-validation.md   # Test cases & go-live checklist
    ├── 10-governance-and-operations.md # Monitoring, maintenance, evolution
    └── copilot-instructions-all-agents.md # ★ PASTE-READY instructions for all 11 agents
```

Each agent has:
- `agent.md` — identity, scope, output format
- `policies.md` — mandatory and standard policies enforced
- `principles.md` — architectural principles for the domain
- `guidelines.md` — methodologies, frameworks, how-to guides
- `examples/` — one fully worked assessment example per agent

## Council Members

| Agent | Type | Scope | Special Authority |
|---|---|---|---|
| 🏛️ Chief Architect | Orchestrator | Triage, synthesis, ADR production | Final recommendation |
| 📊 Business Architecture | Domain | Strategy alignment, capability impact, value streams | — |
| 📱 Application Architecture | Domain | Portfolio, lifecycle, build/buy/SaaS, tech radar | — |
| 🔗 Integration Architecture | Domain | APIs, events, middleware, coupling risk | — |
| ☁️ Technology & Infrastructure | Domain | Cloud, hosting, DR, lifecycle, capacity | — |
| 📈 Data & AI | Domain | Data governance, classification, EU AI Act, DPIA | — |
| 🏭 Manufacturing & OT | Domain | IT/OT convergence, MES, SCADA, IIoT, IEC 62443 | — |
| 🔬 R&D & EDA | Domain | EDA, CAD/CAE, PLM, HPC, IP & export control | — |
| 🔒 Security Architecture | Cross-cut | STRIDE, zero-trust, policy compliance | **Veto power** |
| ⚖️ Risk & Compliance | Cross-cut | Regulatory, risk appetite, GRC obligations | **Escalation power** |
| 🔴 Red Team | Cross-cut | Assumption testing, pre-mortem, adversarial review | Challenge only |

## Integrations

| System | Protocol | Purpose |
|---|---|---|
| SAP LeanIX | MCP (Model Context Protocol) | Application landscape, capabilities, interfaces, tech stack |
| ServiceNow | REST API via Power Automate | CMDB, change management, GRC risk register |

## Getting Started

1. See [`copilot-studio/00-implementation-guide.md`](copilot-studio/00-implementation-guide.md) for the full build guide
2. See [`copilot-studio/copilot-instructions-all-agents.md`](copilot-studio/copilot-instructions-all-agents.md) for paste-ready agent instructions with all GitHub knowledge source links

## License

Internal use only.
