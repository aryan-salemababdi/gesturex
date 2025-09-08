# GestureX

A lightweight and modern React library for hand gesture recognition using MediaPipe Hands. Perfect for building interactive applications with gesture control.

## Features

- Easy-to-use React components
- Supports React 17+
- Uses MediaPipe Hands for accurate hand tracking
- TypeScript ready with typings
- Works out-of-the-box with modern bundlers like Vite

## Installation

```bash
npm install gesturex
# or
yarn add gesturex
# or
pnpm add gesturex
```

## API

### `HandGestureProvider`

A React context provider that initializes the hand gesture tracking. Wrap your app or component tree with this provider to enable gesture detection.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The child components that will have access to the hand gesture context. |
| `scrollSpeed` | `number` | 5 | Optional. Used if you want to integrate automatic scrolling based on gestures. |
| `showStatus` | `boolean` | true | Optional. Show or hide the status indicator of hand detection. |

---

**Example:**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HandScroll } from "gesturex";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HandScroll showStatus={false}>
      <div style={{ height: "3500px" }}>
        Hello world
      </div>
    </HandScroll>
  </React.StrictMode>
);
```