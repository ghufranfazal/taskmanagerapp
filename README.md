# DOM Explorer: Task Manager

  

A lightweight browser-based task manager designed for cohort learning and focused on DOM exploration, browser rendering mechanics, and event-driven interactivity.

  

## Project Overview

  

This project is a DOM-focused task manager built with plain HTML, CSS, and JavaScript. It demonstrates how a browser converts markup into a live document tree, applies styles, and updates the interface dynamically in response to user actions.

  

### Core Capabilities

  

- Add tasks with a title and category

- Display dynamic task cards in the page

- Mark tasks as completed

- Edit tasks through a modal overlay

- Delete individual tasks or clear all tasks

  

### Files Included

  

- `index.html` — page structure and markup

- `style.css` — visual layout and styling

- `script.js` — DOM manipulation, task management, and event handling logic

  

---

  
## Features

- Add new tasks with a title and category
- View task cards with category labels
- Mark tasks as completed
- Edit task details after creation
- Delete tasks individually
- Clear all tasks with a single button

## Project Structure


- `index.html` — Main application layout and interface
- `style.css` — Responsive styling for the task manager
- `script.js` — Client-side behavior and task handling logic
## How to Use

  

1. Open `index.html` in a browser.

2. Enter a task description in the input field.

3. Select a task category from the dropdown.

4. Click the `Add` button to create the task card.

5. Use the buttons on each card to `Complete`, `Edit`, or `Delete` the task.

6. Click `Delete All Task` to remove every task.

  

> This application is intentionally client-only. Tasks are stored in memory while the page is open and are not persisted after refresh.

  

---

  

## Browser and DOM Concepts for the Cohort Assignment

  

This section is written to satisfy strict documentation criteria by explaining the exact browser mechanics and DOM concepts used by the project.

  

### 1. The Browser Rendering Pipeline

  

When the browser loads this page, it performs a series of steps to transform the raw source into what appears on the screen.

  

#### Parsing & Tokenization

  

- The browser reads the raw HTML byte stream and breaks it into tokens.

- Tokens represent opening and closing tags, attributes, text nodes, and comments.

- For example, the browser decomposes this markup:

  

```html

<div class="taskCard">My task</div>

```

  

into tokens for:

  

- `<div>` start tag

- `class="taskCard"` attribute

- text content `My task`

- `</div>` end tag

  

- The HTML engine then converts these tokens into nodes.

- A node is the browser’s internal representation of an element or text fragment.

  

#### The DOM Tree (Document Object Model)

  

- The DOM is a hierarchical tree of nodes representing the document structure.

- Each HTML element becomes an element node.

- Text content becomes a text node.

- Parent-child relationships reflect the nested structure of the HTML.

  

Example DOM tree representation:

  

```text

html

└── body

    └── main

        └── div.header

        └── div.form-parent

        └── div.taskCards

            └── div.taskCard

                ├── p.taskCategory

                ├── h1.task

                └── div.task-btns

                    ├── button.complete

                    ├── button.edit

                    └── button.delete

```

  

- The DOM tree is accessible from JavaScript via `document`.

- It is the live object model the browser uses to reflect page structure and content.

  

#### The CSSOM Tree (CSS Object Model)

  

- The browser separately parses CSS rules into the CSSOM.

- The CSSOM describes how styles apply to DOM nodes.

- It includes rules from external stylesheets, internal `<style>` blocks, and inline styles.

- The CSSOM is not the same as the DOM. It represents styling and computed values.

  

#### The Render Tree

  

- The browser merges the DOM and CSSOM into the Render Tree.

- The Render Tree contains only nodes that will be painted.

- Elements with `display: none` are excluded because they do not generate boxes.

- Elements hidden by `visibility: hidden` still appear in the Render Tree, but their contents are not visible.

  

The render tree drives:

  

1. **Layout (Reflow)**

   - Computes the size and position of each visible element.

   - Resolves box dimensions, margins, padding, and element flow.

2. **Painting**

   - Converts layout results into pixels on the screen.

   - Draws colors, text, borders, backgrounds, and shadows.

  

> In short: HTML and CSS are parsed into DOM and CSSOM, then combined into a Render Tree, which is used for layout and painting.

  

---

  

### 2. Dynamic DOM Manipulation & Custom Data Attributes

  

This app builds and updates task cards dynamically in the browser using DOM APIs.

  

#### Dynamic creation methods

  

Common DOM construction methods used in browser-based apps include:

  

- `document.createElement()` — creates a new element node

- `document.createTextNode()` — creates a text node

- `appendChild()` / `append()` — inserts nodes into the DOM

  

These methods allow JavaScript to add, update, and remove elements without requiring a page refresh.

  

Example:

  

```js

const card = document.createElement('div');

card.classList.add('taskCard');

const text = document.createTextNode('Finish assignment');

card.appendChild(text);

document.querySelector('.taskCards').appendChild(card);

```

  

#### Attributes vs Properties

  

- An **HTML attribute** is part of the initial markup.

- A **DOM property** is the live value stored on the element object.

  

For example:

  

```html

<input id="taskInput" value="Learn DOM">

```

  

- `input.getAttribute('value')` reads the original markup value.

- `input.value` reads the current, live value that may change as the user types.

  

Key differences:

  

- Attributes are static metadata written in HTML.

- Properties are dynamic and reflect the current state of the DOM element.

- Updating `element.value` changes the live input state.

- Updating `element.setAttribute('value', ...)` changes the markup attribute, but may not always update the live property in the same way.

  

> Use attributes when you want the original configuration. Use properties when you want the current, runtime state.

  

#### Custom `data-*` attributes and `.dataset`

  

- `data-*` attributes provide a safe way to store custom meta information on HTML elements.

- They are commonly used to attach application state to DOM nodes.

- In this app, task cards use attributes like:

  - `data-id`

  - `data-status`

  - `data-category`

  

Example:

  

```html

<div class="taskCard" data-id="42" data-status="pending" data-category="Work"></div>

```

  

- These values are accessible in JavaScript through the `.dataset` object:

  

```js

const card = document.querySelector('.taskCard');

console.log(card.dataset.id); // "42"

console.log(card.dataset.status); // "pending"

console.log(card.dataset.category); // "Work"

```

  

- `data-*` attributes are safe because they do not affect browser layout or built-in behavior.

- They simplify the link between UI elements and application state.

  

---

  

### 3. Event Architecture (The Core of Interactivity)

  

Events are how this task manager responds to user actions such as clicks and form submissions.

  

#### Event Propagation: Bubbling vs Capturing

  

DOM events travel through a lifecycle with three main phases:

  

1. **Capturing Phase**

   - The event starts at the top of the DOM tree and travels downward toward the target.

   - This phase is also known as "trickle-down."

2. **Target Phase**

   - The event reaches the target element.

   - Handlers attached directly to the target run here.

3. **Bubbling Phase**

   - The event then bubbles upward from the target back to the root.

   - This is the default phase for most event listeners.

  

Example event path for a click on a button inside a task card:

  

```text

window -> document -> body -> .taskCards -> .taskCard -> button.complete

```

  

- During bubbling, the browser invokes event listeners on the clicked element first, then on each ancestor.

- `event.stopPropagation()` can prevent the event from continuing to bubble.

  

#### Event Delegation

  

- Attaching separate listeners to every dynamic task card is inefficient and scales poorly.

- Event delegation solves this by attaching a single listener to a stable parent container.

- The parent listens for bubbled events and checks `event.target` to determine what action to take.

  

Example pattern:

  

```js

const taskCards = document.querySelector('.taskCards');

taskCards.addEventListener('click', (event) => {

  const trigger = event.target;

  if (trigger.matches('.complete')) {

    // mark task completed

  } else if (trigger.matches('.edit')) {

    // open edit modal

  } else if (trigger.matches('.delete')) {

    // delete task

  }

});

```

  

Why event delegation matters:

  

- Reduces the number of listeners attached to the DOM

- Improves memory usage

- Automatically supports dynamically created elements

- Centralizes interaction logic in one place

  

> Event delegation is a best practice for dynamic UIs, especially when the page creates or removes elements after initial load.

  

---

  

## Reflection and Learning Goals

  

This README is structured to support cohort assignment requirements by explaining both the working task manager and the underlying browser fundamentals.

  

Learners should be able to explain:

  

- how HTML and CSS become a live page in the browser

- how the DOM and CSSOM are constructed and combined

- why render trees exclude invisible elements

- the difference between HTML attributes and DOM properties

- how custom `data-*` attributes can store app state

- how events propagate and how event delegation reduces complexity

  

---

  

## Recommended Improvements
---



  

- saving tasks to local storage for persistence

- adding keyboard and accessibility support

- implementing task filters by category and status

- improving mobile responsiveness and layout

- Show completed task count and summary