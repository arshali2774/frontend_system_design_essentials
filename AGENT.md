# User Dropdown Learning Project

This project shows how a simple UI feature slowly becomes complex — and how to design scalable frontend systems.

We start simple, intentionally create problems, and then fix them one by one.  
Along the way we learn:

- performance
- API contracts
- pagination
- search + debouncing
- request cancellation
- accessibility
- caching
- optimistic UI
- real-time consistency
- system coordination

At the end, we’ll build a small **task management app** using everything learned.

---

## 📂 Project Flow (Conceptual Pages)

Each page represents a new level of complexity:

```
/simple-dropdown
/large-list-problem
/pagination-solution
/search
/search-with-pagination
/accessibility
/system-coordination
```

Navigation idea:

> “What happens if users grow from 10 → 1000?”

Buttons or links move to the next lesson.

---

## 1️⃣ Simple User Dropdown (10 Users)

### 🎯 Goal

Build a dropdown to assign a user to a task.

### 🧩 Tasks

- Fetch **10 users**
- Store in state
- Render dropdown
- Add **loading + error states**

### 🧠 Observation

Everything feels clean and easy.

> This is how most apps _start_ — deceptively simple.

---

## 2️⃣ Scale Problem — 1000 Users

### 🎯 Scenario

Increase users to **1000–2000** using the _same_ component.

### 🧩 Tasks

- Keep dropdown logic identical
- The API now returns thousands of users
- Inspect performance using **DevTools → Network + Performance**

### 👀 What to look for

- UI freezes / lag
- Slow network response
- Large memory usage
- Expensive rendering

> First real problem: **too many employees**.

---

## 3️⃣ Pagination Solution

### 🎯 Goal

Fix performance by loading users in chunks.

### 🔌 Backend requirement

Support:

`GET /users?page=1&limit=20`

Response example:

```json
{
  "data": [],
  "page": 1,
  "totalPages": 50
}
```

### 🧩 Tasks

- Load first page
- “Load more” or infinite scroll
- Show loading placeholders
- Handle errors

### 🧠 Concepts learned

- pagination
- API contracts
- backward compatibility & versioning risk

> First moment we **step outside the component**.

---

## 4️⃣ Add Search

### 🎯 Problem

Client asks:

> “Scrolling forever is annoying — add search.”

### 🧩 Things to intentionally reproduce

- request on every keypress
- out-of-order results overwriting correct data

### 🧩 Tasks

- Debounce search (≈ 300ms)
- Cancel previous requests
- Avoid race conditions

### 🧠 Skills

- debouncing
- AbortController
- correct request lifecycle handling

---

## 5️⃣ Search + Pagination Together

### 🎯 New challenges

- Search resets pagination
- “No users found” state
- Errors on filtered queries
- Repeated searches trigger duplicate calls

### 🧩 Tasks

- Combine **query + page** as cache key
- Add empty states
- Cache results
- Improve UX

> Now we're thinking about **data as a system**.

---

## 6️⃣ Accessibility & Localization

### 🎯 Problems to demonstrate

- Keyboard cannot navigate dropdown
- Screen readers don’t announce selection
- German text overflows container
- RTL layouts break
- Chinese wrapping behaves differently
- Sorting breaks for multiple locales

### 🧩 Tasks

- ARIA roles & attributes
- focus management
- arrow key navigation
- locale-aware sorting
- text truncation
- RTL support
- basic translation system

> Real apps need inclusivity and resilience.

---

## 7️⃣ System Coordination (Kanban Example)

Simulate something like Notion/Jira.

### 🎯 Scenario

User assigns someone to a task.

### 🔗 Things that should react

- card shows new assignee
- board may reorder (group by user)
- activity log records change
- notifications update
- other viewers update in real time
- cached screens stay consistent
- optimistic UI vs waiting
- rollback on failure
- conflict handling (two users assign at once)
- screen reader announcement

### 🧠 Concepts

- single source of truth
- global store / event bus
- WebSockets / SSE
- optimistic updates
- server conflict resolution
- cache invalidation

> A “simple dropdown” is now part of a **system**.

---

## 🎯 Final Project — Mini Task Manager

After learning everything, build:

- a small kanban board
- real assignments
- pagination + search
- optimistic updates
- caching
- accessibility
- optional real-time sync

Think of it as a **mini Notion/Jira built from scratch**.

---

## 🧪 Learning Process

For each page:

1. Build the simple version
2. Push it until it breaks
3. Write down _why_ it broke
4. Design the fix
5. Implement cleanly
6. Reflect on what changed

That reflection is how senior intuition forms.

---

## 🚀 Getting Started

- Create a Next.js project
- Create pages matching each section
- Start with **/simple-dropdown**
- Begin with fake data, evolve the API later

Document every insight you discover.
