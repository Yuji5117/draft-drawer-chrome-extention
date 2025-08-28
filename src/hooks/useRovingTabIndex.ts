import { useEffect, useRef, useState } from "react";

interface UseRovingTabIndexProps {
  itemCount: number;
  initialIndex?: number;
}

interface UseRovingTabIndexReturn {
  active: number;
  setActive: (index: number) => void;
  itemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const useRovingTabIndex = ({
  itemCount,
  initialIndex = 0,
}: UseRovingTabIndexProps): UseRovingTabIndexReturn => {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState<number>(initialIndex);

  useEffect(() => {
    const el = itemRefs.current[active];
    if (el && document.activeElement !== el) {
      el.focus({ preventScroll: true });
    }
  }, [active]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        setActive((prev) => Math.min(prev + 1, itemCount - 1));
        break;
      case "ArrowUp":
      case "ArrowLeft":
        setActive((prev) => Math.max(prev - 1, 0));
        break;
      case "Home":
        setActive(0);
        break;
      case "End":
        setActive(itemCount - 1);
        break;
      default:
        break;
    }
  };

  return {
    active,
    setActive,
    itemRefs,
    handleKeyDown,
  };
};