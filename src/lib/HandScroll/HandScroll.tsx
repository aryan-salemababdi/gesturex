'use client';
import { useEffect, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

interface HandScrollProps {
  children: ReactNode;
  scrollSpeed?: number;
  showStatus?: boolean;
}

const HandScroll: FC<HandScrollProps> = ({
  children,
  scrollSpeed = 5,
  showStatus = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollDirection = useRef<'up' | 'down' | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.6,
    });

    hands.onResults((results) => {
      if (
        !results.multiHandLandmarks ||
        results.multiHandLandmarks.length === 0
      ) {
        scrollDirection.current = null;
        return;
      }

      const lm = results.multiHandLandmarks[0][8];
      const y = lm.y;

      if (y < 0.4) {
        scrollDirection.current = 'up';
      } else if (y > 0.6) {
        scrollDirection.current = 'down';
      } else {
        scrollDirection.current = null;
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    const interval = setInterval(() => {
      if (scrollDirection.current === 'up') {
        window.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
      } else if (scrollDirection.current === 'down') {
        window.scrollBy({ top: scrollSpeed, behavior: 'auto' });
      }
    }, 50);

    return () => {
      camera.stop();
      clearInterval(interval);
    };
  }, [scrollSpeed]);

  return (
    <>
      <video ref={videoRef} style={{ display: 'none' }} playsInline />
      {showStatus && (
        <p
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            background: '#0008',
            color: '#fff',
            padding: '8px',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        >
          Hand Scroll Active
        </p>
      )}
      {children}
    </>
  );
};

export default HandScroll;
