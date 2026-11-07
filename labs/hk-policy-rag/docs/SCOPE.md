# Scope: visa FAQ assistant (pilot)

Written the way I would hand it to a client before building. The client here is imagined: a university careers office and an HR team that both answer the same immigration questions every week.

## Problem

Staff answer the same questions about IANG, GEP and student work rules by hand, usually by searching the Immigration Department (ImmD) site and pasting paragraphs into emails. Answers drift from the official wording, and nobody can tell later which page an answer came from.

## Users

- **Students and recent graduates** (via the careers office): study, IANG, working holiday and visitor rules.
- **HR officers**: employment schemes (GEP, ASMTP, TechTAS, TTPS, QMAS), dependants, IANG.
- **Caseworkers**: everything, to check what the other two groups were told.

## User stories

1. As a student, I ask how long I can stay on IANG and get the official sentence with a link, so I don't rely on hearsay.
2. As an HR officer, I ask about GEP processing time and can forward the answer with its source.
3. As a caseworker, I can see why the assistant refused a question.

## Acceptance criteria

- **Given** a question covered by a page my role can see, **when** I ask it, **then** the answer quotes that page and links it, with the snapshot date.
- **Given** a question the pages don't cover (minimum wage, tax rates, housing), **when** I ask it, **then** the assistant says it can't answer and points to the live ImmD site. It never guesses.
- **Given** a page outside my role, **when** I ask about it, **then** it is not used, not quoted, and doesn't influence ranking.
- **Given** the model endpoint is down, **when** I ask a question, **then** I still get a quoted (extractive) answer instead of an error.
- On the evaluation set: hit@3 ≥ 90% on answerable questions, 100% refusal on out-of-scope ones, no more than 1 false refusal.

## Out of scope (pilot)

- Legal advice, eligibility decisions, or filling in application forms.
- Chinese-language questions (planned for phase 2).
- Labour Department content: its terms require prior written permission to republish.
- Live sync with ImmD; the corpus is a dated snapshot refreshed by a script.

## Risks

- **Stale rules**: ImmD changes a page and the snapshot is out of date. Mitigation: date on every answer, scheduled re-fetch, diff alert.
- **Confident wrong answer**: retrieval picks the wrong scheme page. Mitigation: refusal gate, citations, caseworker review of logged answers.
- **Over-refusal**: users give up if it refuses too often. Mitigation: track false refusals weekly.

## Success after launch

- Share of staff replies that include a source link.
- Questions answered without escalation to a caseworker.
- False refusal rate and wrong-source rate from a weekly sample of 50 logged questions.
