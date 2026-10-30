"use client";

import dynamic from "next/dynamic";

// Loaded after hydration so the terminal never weighs on first paint.
const TerminalOverlay = dynamic(() => import("./TerminalOverlay"), { ssr: false });

export default TerminalOverlay;
