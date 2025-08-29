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
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 初回マウント時は何もしない。初期表示時は、検索欄へフォーカスを当てたいため。
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const el = itemRefs.current[active];
    const activeEl = document.activeElement;
    const isSearchFocused = activeEl?.matches("[data-search-input]");
    const isAlreadyFocused = activeEl === el;
    const shouldFocus = el && !isAlreadyFocused && !isSearchFocused;

    if (shouldFocus) {
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
