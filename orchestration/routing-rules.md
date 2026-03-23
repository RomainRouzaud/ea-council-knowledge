# Routing Rules — Which Agents to Engage

## Purpose

This file guides the Chief Architect in selecting which agents to consult for a given request. Engaging unnecessary agents wastes cycles; missing a relevant agent risks blind spots.

## Primary Routing Table

| Request Topic | Domain Agents | Cross-Cut Agents |
|---|---|---|
| New application adoption | Application, Integration, Tech & Infra | Security, Risk & Compliance |
| Application decommission | Application, Integration, Business | Risk & Compliance |
| Cloud migration | Tech & Infra, Application, Integration | Security, Risk & Compliance |
| New integration / API | Integration, Application | Security |
| Business capability mapping | Business | — |
| Strategy-to-technology alignment | Business, Application, Tech & Infra | — |
| Data platform or data governance | Data & AI, Application, Integration | Security, Risk & Compliance |
| AI/ML initiative | Data & AI, Application, Tech & Infra | Security, Risk & Compliance, Red Team |
| Security architecture review | (all relevant domain agents) | Security (lead), Risk & Compliance |
| Regulatory compliance assessment | Business, Application | Risk & Compliance (lead), Security |
| Technology radar update | Application, Tech & Infra, Integration, Data & AI | — |
| Reference architecture creation | All domain agents | Security, Risk & Compliance, Red Team |
| Major platform replacement | All domain agents | All cross-cut agents |
| Vendor / SaaS evaluation | Application, Integration, Tech & Infra | Security, Risk & Compliance |
| Incident-driven architecture review | Tech & Infra, Application | Security (lead), Risk & Compliance, Red Team |

## Routing Logic

```
IF impact = Minor:
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
    → Human sponsor review is mandatory before finalizing
```

## Keyword Signals for Cross-Cut Agents

### Always include Security if request mentions:
- authentication, authorization, identity, IAM, SSO, OAuth
- data encryption, key management, TLS/HTTPS
- external-facing systems, public APIs, internet exposure
- cloud egress, network perimeter, firewall
- personal data, PII, sensitive data classification
- zero-trust, micro-segmentation
- SaaS onboarding, third-party access

### Always include Risk & Compliance if request mentions:
- GDPR, NIS2, SOX, ISO 27001, DORA, PCI-DSS
- data residency, data sovereignty, cross-border transfer
- audit trail, logging, regulatory reporting
- vendor risk, third-party dependency
- business continuity, disaster recovery
- risk appetite, tolerance, waiver, exception

### Always include Red Team if request mentions:
- new AI system or autonomous agent
- irreversible architectural change
- single point of failure in critical path
- "we're confident this is safe" (flag groupthink)
- novel architecture pattern not in reference architectures

## Ambiguous Requests

If the request topic is unclear:
1. Ask the requester one clarifying question (topic + impact level)
2. Make a provisional routing decision and state it
3. Adjust routing if new information changes the scope
