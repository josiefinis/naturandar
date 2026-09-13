"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

interface MainContentProps {
  children: ReactNode;
}
export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (mainRef.current) {
      mainRef.current.focus();
      window.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className="focus:outline-none"
    >
      {children}
    </main>
  );
}
