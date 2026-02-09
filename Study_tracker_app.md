# 📚 Study Tracker App

### Complete Product & Technical Specification

(Local-only React Native Application)

---

# 1. 🎯 Vision

A **minimal, powerful, offline-first study tracking app** built with React Native.

Goals:

* Personal productivity tracking
* Accurate timer handling (even after screen lock)
* Clean analytics
* Lightweight & fast
* No backend dependency
* Fully local SQLite storage
* Dark / Light theme
* Built using NativeWind (Tailwind CSS)

---

# 2. 🏗️ Tech Stack

| Layer            | Technology                                             |
| ---------------- | ------------------------------------------------------ |
| Framework        | React Native                                           |
| Styling          | NativeWind                                             |
| Database         | SQLite                                                 |
| State Management | Zustand or Context API                                 |
| Charts           | react-native-chart-kit or victory-native               |
| Notifications    | Local notifications                                    |
| Navigation       | React Navigation                                       |
| Persistence      | SQLite (primary), AsyncStorage (small prefs if needed) |

---

# 3. 📱 Screens Overview

## 3.1 Welcome Screen

### Purpose

Entry dashboard

### Show:

* Today’s study time
* Current streak
* Daily goal progress
* “Start Studying” button

---

## 3.2 Timer Screen

### Modes

* Pomodoro
* Stopwatch

Toggle between both.

---

### Pomodoro Mode

#### Configurable:

* Focus duration
* Short break duration
* Long break duration
* Sessions per cycle

#### UI Components:

* Countdown timer
* Circular progress bar
* Current subject/task selector
* Session counter (e.g., 2/4)
* Mode indicator (Focus / Break)
* Pause / Resume / Stop buttons

#### Behavior:

* Auto transition between sessions
* Sound/Vibration at session completion
* Auto save session on completion

---

### Stopwatch Mode

#### Features:

* Start
* Pause
* Resume
* Stop (Save session)

#### UI:

* Large live elapsed time
* Subject / Task dropdown
* Save button

---

## 3.3 Reports Screen

### Filters:

* Date range picker
* Weekly
* Monthly
* Yearly
* All-time

---

### Metrics:

| Metric                  | Description           |
| ----------------------- | --------------------- |
| Total Study Time        | Sum of all sessions   |
| Average Daily Time      | Time ÷ days           |
| Longest Streak          | Max consecutive days  |
| Current Streak          | Current active streak |
| Total Sessions          | Count                 |
| Daily Goal Completion % | Based on settings     |

---

### Charts:

1. Pie chart → Subject distribution
2. Bar chart → Daily/weekly totals
3. Trend line → Monthly growth
4. Calendar heatmap (optional advanced)

---

## 3.4 Settings Screen

### CRUD Sections:

#### Subjects

* Add
* Edit
* Delete
* Color selection

#### Tasks

* Add
* Edit
* Delete
* Linked to subject

#### Pomodoro Settings

* Focus duration
* Short break
* Long break
* Sessions per cycle

#### General Settings

* Daily goal
* Theme (Light / Dark / System)
* Sound toggle
* Notification toggle
* Data export
* Reset data

---

# 4. 🧠 Timer Architecture (CRITICAL DESIGN)

## DO NOT:

Use continuous background JS timers.

iOS & Android suspend JS thread.

---

## Correct Engineering Approach

### Timestamp-Based Logic

When session starts:

```js
startTime = Date.now()
endTime = startTime + duration
```

Store:

* startTime
* endTime
* mode
* subject/task

On resume:

```js
remaining = endTime - Date.now()
```

If:

* remaining > 0 → resume
* remaining <= 0 → mark complete

---

### AppState Handling

Use:

```js
AppState.addEventListener('change', ...)
```

Detect:

* background
* active

Recalculate time difference.

---

### Crash Safety

Store active session temporarily in SQLite.

On app launch:

* Check unfinished session
* Resume or auto-complete

---

# 5. 🗃️ Database Schema (SQLite)

---

## subjects

| Column     | Type                |
| ---------- | ------------------- |
| id         | INTEGER PRIMARY KEY |
| name       | TEXT                |
| color      | TEXT                |
| created_at | INTEGER             |

---

## tasks

| Column     | Type                |
| ---------- | ------------------- |
| id         | INTEGER PRIMARY KEY |
| subject_id | INTEGER             |
| name       | TEXT                |
| created_at | INTEGER             |

---

## sessions

| Column           | Type                |
| ---------------- | ------------------- |
| id               | INTEGER PRIMARY KEY |
| subject_id       | INTEGER             |
| task_id          | INTEGER             |
| mode             | TEXT                |
| start_time       | INTEGER             |
| end_time         | INTEGER             |
| duration_seconds | INTEGER             |
| created_at       | INTEGER             |

---

## settings

| Column              | Type                |
| ------------------- | ------------------- |
| id                  | INTEGER PRIMARY KEY |
| focus_minutes       | INTEGER             |
| short_break_minutes | INTEGER             |
| long_break_minutes  | INTEGER             |
| sessions_per_cycle  | INTEGER             |
| daily_goal_minutes  | INTEGER             |
| theme               | TEXT                |
| sound_enabled       | BOOLEAN             |

---

# 6. 📊 Streak Logic

### Definition:

Consecutive days with ≥1 completed session.

---

### Algorithm:

1. Get unique session dates.
2. Sort descending.
3. Compare consecutive dates.
4. Count until gap.

---

# 7. 🎨 UI / UX Guidelines

## NativeWind Strategy

* Use consistent spacing
* Large typography for timer
* Rounded corners
* Shadowed cards
* Accessible contrast
* Responsive layout

---

## Theme Implementation

Use:

```js
useColorScheme()
```

Store preference in SQLite.

Support:

* Light
* Dark
* System

---

# 8. 🔔 Notifications

Local only.

Trigger:

* Pomodoro completed
* Daily reminder

Ensure:

* Works when app backgrounded
* Respect sound toggle

---

# 9. 📈 Advanced Insights (Optional)

* Most productive day
* Most productive hour range
* Subject ranking
* Monthly improvement %
* Longest single session
* Study consistency score

---

# 10. 🗂 Folder Structure

```
src/
 ├── components/
 ├── screens/
 ├── navigation/
 ├── database/
 ├── hooks/
 ├── store/
 ├── utils/
 ├── charts/
 ├── theme/
 └── services/
```

---

# 11. ⚙️ State Management Strategy

Use Zustand or Context API.

Store:

* Active session
* Timer state
* Settings
* Theme

Keep business logic separated from UI.

---

# 12. 🛡️ Performance Optimization

* Update UI once per second
* Memoize heavy charts
* Use indexed SQL columns
* Avoid large in-memory arrays
* Paginate session history

---

# 13. 🧪 Edge Cases to Handle

* App crash during session
* Device time manually changed
* Timezone changes
* Deleting subject linked to sessions
* Overlapping sessions
* Duplicate save prevention

---

# 14. 🔐 Data Safety

* Auto commit session on completion
* Backup option (export SQLite)
* CSV export
* Restore option

---

# 15. 🧭 MVP Roadmap

## Phase 1

* SQLite setup
* Stopwatch mode
* Save sessions
* Basic report

## Phase 2

* Pomodoro logic
* Streak calculation
* Pie chart

## Phase 3

* Theme support
* Notifications
* Settings CRUD

## Phase 4

* Advanced analytics
* Export
* Heatmap

---

# 16. 🚀 Future Enhancements

* Widgets
* Lock screen timer
* iOS Live Activities
* Habit integration
* AI-based study insights
* Study forecasting
* Cloud backup (optional future)

---

# 17. 📐 Clean Architecture Principles

* Separate UI & business logic
* Single responsibility per module
* Timestamp-based time calculation
* Deterministic state recovery
* SQL-driven reporting
* No background hacks

---

# 18. ✅ Final Summary

This app will:

* Work fully offline
* Survive screen lock
* Accurately calculate time
* Provide actionable study analytics
* Stay lightweight & fast
* Be scalable for future enhancements

---

If you want next:

* Full SQLite implementation example
* Timer hook implementation
* Complete navigation structure
* NativeWind theme config
* Pomodoro engine implementation
* Streak calculation utility

Tell me which module to design first.
