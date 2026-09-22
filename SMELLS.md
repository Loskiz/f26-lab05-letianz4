# reservation-service: Smells and One Fix

Fill in each section. One section per milestone. Keep it short and specific. Point at files
and methods, not adjectives.

---

## Milestone 1: Three smells

Three smells, each in a different part of the module. For each one, fill in all five parts.

### Smell 1

**The smell.** Feature Envy (classic)

**Classic or agent-specific.** Classic

**Where in the code.** `resevationManager.ts` createBooking

**The principle it violates.** It violates the Information Expert princeple where the behavior should be enforced near the data

**What it makes expensive.** Let us say we introduce another booking related function in ReservationManager, the same behavior enforcement need to be preplicated and not just live in one place instead. 

### Smell 2

**The smell.** God Class

**Classic or agent-specific.** Classic

**Where in the code.** `reservationManager.ts` below calculate price

**The principle it violates.** Cohesion

**What it makes expensive.** changing one thing about discount population potentially require us to reason about how the change propagates in the whole Reservation manager class, we might also have to run the entire test suite for it as well

### Smell 3

**The smell.** Speculative over-abstraction.

**Classic or agent-specific.** Agent-specific; an underspecified request may have led to a plugin-style design without a need for multiple channels.

**Where in the code.** `src/notifications/notifierFactory.ts`: `registerChannel`, `registeredChannels`, and `createNotificationChannel`. The only registered channel is `email`.

**The principle it violates.** YAGNI: add an abstraction when there is a concrete variation it needs to support.

**What it makes expensive.** Changing how the sole email channel is constructed requires tracing the config, mutable registry, factory, and `EmailChannel` instead of one construction path. The two default sender addresses can also drift.

---

## Milestone 2: One small fix

One fix, behavior preserved, suite green, zero test edits.

**Which smell you attacked.** Smell 3, speculative over-abstraction. Email is the only channel, so removing the unused plugin registry is a small, complete fix.

**What changed.** `ReservationManager` now constructs `EmailChannel` directly. I removed `src/notifications/notifierFactory.ts`, including its registry, config, and duplicate default sender address, and updated the stale comment on `NotificationChannel.name`.

**What you deliberately did not touch.** I kept `EmailChannel.send`, the `NotificationChannel` interface, `ReservationManager.dispatchNotification`, and receipt formatting unchanged. The smell is limited to the unused construction registry.

**How you know behavior is preserved.** After `npm ci`, all 39 tests passed and `npm run typecheck` passed. A temporary smoke check confirmed that booking and cancellation still log `email` notifications with the same recipient, subjects, and default sender address. The suite exercises those flows but does not assert notification text; the smoke check covers that representative case. No tests were edited.

---

## Milestone 3: Two proposals and one false positive

One proposal for each milestone 1 smell you did not fix.

### Proposal A (not coded)

**The problem.** Name it.

**The decomposition.** What are the pieces, what does each own, and where do the rules live?

**One cost.** Something this actually costs. "No real downside" is not a cost.

### Proposal B (not coded)

**The problem.**

**The decomposition.**

**One cost.**

### The thing that looks smelly but is fine

**What it is.** File and method.

**Why it is fine.** Defend it with properties of the code, not with its line count.

**What would flip your verdict.** Name the change that would turn this into a real problem.
