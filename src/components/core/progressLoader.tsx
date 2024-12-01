import { useEffect, useRef, useState } from "react";

interface ProgressLoaderProps {
  isCurrent: boolean;
  isViewed: boolean;
  isLoaded: boolean;
}
const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  isCurrent,
  isViewed,
  isLoaded,
}) => {
  const [width, setWidth] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    setWidth(0);

    if (isCurrent) {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min((elapsed / 5000) * 100, 100);

        setWidth(progress);

        if (progress < 100) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        startTimeRef.current = null;
      };
    }
  }, [isCurrent, isLoaded]);

  return (
    <div className="h-1 w-full bg-black rounded-full overflow-hidden shadow-sm shadow-gray-600">
      <div
        className={`h-full bg-white`}
        style={{ width: `${isCurrent ? width : isViewed ? 100 : 0}%` }}
      />
    </div>
  );
};
export default ProgressLoader;
