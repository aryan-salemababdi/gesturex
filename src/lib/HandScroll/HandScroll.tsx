'use client';
import { useEffect, useRef } from 'react';
import type { FC, ReactNode, RefObject } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

interface HandScrollProps {
  children: ReactNode;
  scrollSpeed?: number;
  showStatus?: boolean;
  direction?: 'vertical' | 'horizontal' | 'both';
  targetRef?: RefObject<HTMLElement>;
  epsilon?: number;
}

const HandScroll: FC<HandScrollProps> = ({
  children,
  scrollSpeed = 5,
  showStatus = true,
  direction = 'vertical',
  targetRef,
  epsilon = 0.1,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollDir = useRef<'up' | 'down' | 'left' | 'right' | null>(null);

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
        scrollDir.current = null;
        return;
      }

      const lm = results.multiHandLandmarks[0][8];
      const { x, y } = lm;

      const y0 = 0.5,
        x0 = 0.5;

      const deltaY = y - y0;
      const deltaX = x - x0;

      if (direction === 'vertical' || direction === 'both') {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          if (y < y0 - epsilon) scrollDir.current = 'up';
          else if (y > y0 + epsilon) scrollDir.current = 'down';
          else scrollDir.current = null;
        }
      }

      if (direction === 'horizontal' || direction === 'both') {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (x < x0 - epsilon) scrollDir.current = 'left';
          else if (x > x0 + epsilon) scrollDir.current = 'right';
          else if (direction === 'horizontal') scrollDir.current = null;
        }
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
      const target = targetRef?.current || window;
      switch (scrollDir.current) {
        case 'up':
          target.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
          break;
        case 'down':
          target.scrollBy({ top: scrollSpeed, behavior: 'auto' });
          break;
        case 'left':
          target.scrollBy({ left: -scrollSpeed, behavior: 'auto' });
          break;
        case 'right':
          target.scrollBy({ left: scrollSpeed, behavior: 'auto' });
          break;
      }
    }, 50);

    return () => {
      camera.stop();
      hands.close();
      clearInterval(interval);
    };
  }, [scrollSpeed, direction, epsilon, targetRef]);

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
          Hand Scroll Active {scrollDir.current ? `(${scrollDir.current})` : ''}
        </p>
      )}
      {children}
    </>
  );
};

export default HandScroll;
