# GestureX

A lightweight and modern React library for hand gesture recognition using MediaPipe Hands. Perfect for building interactive applications with gesture control.

## Features

- Easy-to-use React components
- Supports React 17+
- Vertical **and** horizontal hand scrolling
- `both` mode for combined scrolling
- Custom scroll container support via `targetRef`
- Adjustable scroll speed and sensitivity (`epsilon` threshold)
- Status indicator (optional)
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

| Prop       | Type                           | Default     | Description |
|------------|--------------------------------|-------------|-------------|
| `children` | `ReactNode`                    | —           | The content to wrap. |
| `scrollSpeed` | `number`                   | 5           | Scroll speed in pixels per frame. |
| `showStatus` | `boolean`                   | true        | Show or hide the status indicator. |
| `direction`  | `"vertical" \| "horizontal" \| "both"` | "vertical" | Scroll direction mode. |
| `targetRef`  | `RefObject<HTMLElement>`     | window      | Optional. Scroll inside a container instead of the window. |
| `epsilon`    | `number`                     | 0.1         | Tolerance threshold to avoid jitter. |

---

**Example – Vertical Scroll:**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HandScroll } from "gesturex";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HandScroll showStatus={true} direction="vertical">
      <div style={{ height: "3000px" }}>
        Scroll me with your hand 👋
      </div>
    </HandScroll>
  </React.StrictMode>
);
```

**Example – Horizontal Scroll (Slider)**

```tsx
import React, { useRef } from "react";
import { HandScroll } from "gesturex";

export default function Slider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <HandScroll direction="horizontal" targetRef={sliderRef} scrollSpeed={10}>
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          overflowX: "auto",
          width: "100%",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              minWidth: "200px",
              height: "200px",
              background: i % 2 ? "lightblue" : "lightcoral",
              margin: "0 10px",
            }}
          >
            Slide {i + 1}
          </div>
        ))}
      </div>
    </HandScroll>
  );
}
```
