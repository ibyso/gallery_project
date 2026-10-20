import { useEffect, useState } from "react";

export function usePostModal(setComment: (value: string) => void) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const closeModal = () => {
    setSelectedId(null);
    setComment("");
  };

  useEffect(() => {
    if (selectedId === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        setComment("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedId, setComment]);

  return { selectedId, setSelectedId, closeModal };
}
