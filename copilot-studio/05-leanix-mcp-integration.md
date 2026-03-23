# 05 — LeanIX MCP Integration

## Overview

SAP LeanIX exposes an MCP (Model Context Protocol) server that allows AI agents to query the LeanIX workspace via natural-language-friendly tool calls backed by the LeanIX GraphQL API. Copilot Studio supports MCP connectors natively (check your tenant's release ring for GA status; available in preview from late 2025).

---

## MCP Server Details

| Property | Value |
|---|---|
| Protocol | MCP over HTTPS (SSE transport) |
| Authentication | OAuth 2.0 Bearer Token (Entra ID or LeanIX API token) |
| Base URL | Provided by LeanIX — format: `https://{workspace}.leanix.net/mcp` |
| API behind it | LeanIX GraphQL API (`https://{workspace}.leanix.net/services/pathfinder/v1/graphql`) |

---

## Step 1: Configure Authentication

### Option A: LeanIX API Token (simpler, less secure — for development)
1. In LeanIX: Admin → API Tokens → Create Token (read-only scope for most agents; write scope for Chief Architect write-back)
2. Store token in **Azure Key Vault** — never hardcode
3. Reference Key Vault secret in Power Platform environment variables

### Option B: OAuth 2.0 Service Principal (recommended for production)
1. Register an Entra ID app: `ea-council-leanix-connector`
2. In LeanIX Admin: configure OIDC authentication with the Entra app's client ID
3. Grant the service principal read access (and write for ADR write-back scope)
4. Store client secret in Azure Key Vault
5. Use Power Platform environment variable to reference the Key Vault secret

---

## Step 2: Add MCP Server to Copilot Studio

In Copilot Studio (for each agent that needs LeanIX access):

```
Actions → Add an action → MCP Server
→ Enter MCP Server URL: https://{workspace}.leanix.net/mcp
→ Authentication: OAuth 2.0 (select the connector configured above)
→ Name: LeanIX Architecture Repository
→ Description: "Query the SAP LeanIX Enterprise Architecture repository for 
   applications, business capabilities, interfaces, data objects, IT components, 
   and technology radar information."
```

Copilot Studio will discover the available MCP tools automatically from the server's tool manifest.

---

## Step 3: Key MCP Tools (LeanIX Exposes These)

LeanIX MCP exposes tools that map to GraphQL queries. The primary tools available:

| Tool Name | What It Does | Used By |
|---|---|---|
| `search_fact_sheets` | Full-text search across all fact sheet types | All agents |
| `get_fact_sheet` | Retrieve a specific fact sheet by ID | All agents |
| `list_applications` | List applications with filters (lifecycle, business unit, capability) | Application, Business, Integration |
| `get_application_relations` | Get interfaces, capabilities, IT components for an application | Integration, Application |
| `list_business_capabilities` | List capabilities with maturity and strategic importance | Business Architecture |
| `list_interfaces` | List data flows between applications | Integration Architecture |
| `list_it_components` | List technology components with lifecycle and vendor | Technology & Infrastructure |
| `list_data_objects` | List data entities with classification and ownership | Data & AI |
| `get_tech_radar` | Get technology radar positions | Application, Technology & Infrastructure |
| `update_fact_sheet` | Update a fact sheet field (lifecycle state, tag, etc.) | Chief Architect (write-back only) |
| `create_fact_sheet` | Create a new Interface or Data Object record | Chief Architect (write-back only) |

---

## Step 4: Write-Back Configuration (Chief Architect Only)

Only the Chief Architect agent should have write access to LeanIX. Domain and cross-cut agents are read-only.

**Write-back operations triggered after ADR approval:**

| Operation | LeanIX Tool | When Triggered |
|---|---|---|
| Update application lifecycle state | `update_fact_sheet` | Application retirement or phase-out decision |
| Create new Interface record | `create_fact_sheet` (type: Interface) | New integration approved |
| Update IT Component lifecycle | `update_fact_sheet` | Technology retirement decision |
| Add tech radar tag | `update_fact_sheet` | Tech radar position change |
| Create Data Object record | `create_fact_sheet` (type: DataObject) | New data domain formalized |

**Write-back must be gated by ADR approval status.** Only trigger write-back when the ADR status is ACCEPTED (not PROPOSED). Implement this check in the Power Automate flow that handles the "Update LeanIX" button on the ADR Adaptive Card.

---

## Step 5: Prompt Guidance for LeanIX Queries

Agents need guidance on how to query LeanIX effectively. Add these instructions to each agent's system prompt or as a knowledge source snippet:

```
When querying LeanIX:

1. Start broad, then narrow: search by business capability or application name first, 
   then retrieve specific fact sheets by ID.

2. Always check lifecycle state: applications in End of Life or Phase Out are flagged 
   automatically in your assessment.

3. For integration queries: use list_interfaces filtered by source OR target application 
   to find all existing connections for a system.

4. For technology assessment: use list_it_components filtered by the application's ID 
   to retrieve the full tech stack, then check lifecycle against the tech radar.

5. Never state "the current portfolio shows X" without first having queried LeanIX 
   in this session. Stale assumptions undermine every recommendation.

6. If a query returns no results: state this explicitly — "LeanIX returned no records 
   for this query, which may indicate undocumented systems or a gap in the repository."
```

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| MCP connection fails | Token expired or wrong scope | Re-generate LeanIX API token; check OAuth scope |
| Tool discovery shows no tools | MCP server URL wrong or server not running | Verify LeanIX MCP endpoint with LeanIX support |
| `update_fact_sheet` returns 403 | Read-only token used for write | Use write-scope token (Chief Architect only) |
| Queries return incomplete data | LeanIX workspace not fully populated | Flag as data quality gap; do not invent data |
| Agent ignores LeanIX data | Instruction not strong enough | Add "ALWAYS query LeanIX before answering" to Instructions |
