# Mosca Calculator — PQC Migration Urgency

**Part III, Chapter 12 — Post-Quantum Cryptography for Organizations**

## Learning Objectives

- Apply **Mosca's theorem** to determine whether an organization's sensitive data is currently at risk from future quantum attacks.
- Identify the three key timeline variables — data shelf-life (x), migration time (y), and years to CRQC (z) — and understand how each drives urgency.
- Explain the **"Harvest Now, Decrypt Later" (HNDL)** threat model and why it makes the risk calculation retroactive.
- Evaluate different data categories (healthcare, financial, government secrets) through the lens of Mosca risk.

## Simulation

<iframe src="main.html" width="700" height="580" style="border:1px solid #ccc; border-radius:6px;"></iframe>

[Open in full screen](main.html){ .md-button }

## How to Use

- Drag the three sliders to set your organization's parameters:
  - **x**: How long does your sensitive data need to remain confidential?
  - **y**: How long will it take your organization to migrate to post-quantum cryptography?
  - **z**: How many years until a cryptographically relevant quantum computer (CRQC) exists?
- Or click one of the **preset buttons** for a realistic scenario.
- Observe the **traffic light** and read the arithmetic in the calculation panel.

## Mosca's Theorem

Mosca's inequality was formulated by cryptographer Michele Mosca of the University of Waterloo:

$$\text{If } x + y > z \text{, your data is at risk.}$$

Where:
- **x** = Data shelf-life: the number of years the encrypted data must remain confidential
- **y** = Migration time: the years needed to fully deploy post-quantum cryptographic solutions
- **z** = Time to CRQC: estimated years before a cryptographically relevant quantum computer exists

The inequality is asymmetric: it fires even if *z is still in the future*, because an adversary can capture encrypted traffic today and decrypt it once the quantum computer exists — the "Harvest Now, Decrypt Later" attack.

## Traffic Light Interpretation

| Signal | Condition | Meaning |
|--------|-----------|---------|
| RED    | x + y > z + 3 | Critical. Migration should already be in progress. |
| YELLOW | z − 3 ≤ x + y ≤ z + 3 | Warning. In the risk window — migrate urgently. |
| GREEN  | x + y < z − 3 | Some buffer exists, but complacency is dangerous. |

## Example Calculations

| Data Type | x | y | z | x+y | Risk |
|-----------|---|---|---|-----|------|
| Patient health records | 50 | 5 | 10 | 55 | RED — critical |
| Trade secrets | 30 | 8 | 10 | 38 | RED — critical |
| Financial transaction logs | 20 | 7 | 10 | 27 | RED — critical |
| Web session tokens | 1 | 3 | 10 | 4 | GREEN — low risk |
| Classified government documents | 25 | 10 | 10 | 35 | RED — critical |

The table above illustrates why most governments and regulated industries have already mandated PQC migration timelines (see CNSA 2.0, NSA advisory 2022).

## The HNDL Threat

The "Harvest Now, Decrypt Later" attack does not require breaking encryption today. Adversaries with sufficient storage resources — nation-state intelligence agencies, for example — are likely already archiving encrypted traffic on the assumption that a future quantum computer will break it. This means:

- TLS-protected financial transfers made today may be decryptable in 10 years.
- Encrypted health records stored in cloud backups are vulnerable.
- Long-term secrets (military, industrial IP) are at the highest risk.

NIST finalized the first three post-quantum standards in August 2024 (FIPS 203, 204, 205). Migration should begin immediately.

## Further Reading

- Mosca, M., "Cybersecurity in an era with quantum computers: will we be ready?" *IEEE Security & Privacy* 16(5), 38–41 (2018)
- NSA, "Commercial National Security Algorithm Suite 2.0 (CNSA 2.0)" (2022)
- Chapter 12 of this textbook — full PQC migration framework
