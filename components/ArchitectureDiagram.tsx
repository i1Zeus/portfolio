"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiCloud, BiDesktop, BiServer } from "react-icons/bi";
import { FaDatabase } from "react-icons/fa6";
import { useLocale } from "./LocaleContext";

interface NodeData {
  id: string;
  label: string;
  type: string;
  details: string;
}

interface EdgeData {
  from: string;
  to: string;
  label?: string;
}

interface ArchitectureDiagramProps {
  architecture?: {
    nodes: NodeData[];
    edges: EdgeData[];
  };
}

interface ConnectionCoord {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isActive: boolean;
  label?: string;
}

export default function ArchitectureDiagram({
  architecture,
}: ArchitectureDiagramProps) {
  const { dict, locale } = useLocale();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [connections, setConnections] = useState<ConnectionCoord[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { nodes = [], edges = [] } = architecture || {};

  // Calculate connection line coordinates dynamically based on element bounds
  const updateCoordinates = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const calculated: ConnectionCoord[] = edges
      .map((edge, idx): ConnectionCoord | null => {
        const fromEl = nodeRefs.current[edge.from];
        const toEl = nodeRefs.current[edge.to];

        if (!fromEl || !toEl) return null;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        // Calculate connection points relative to container
        // From center-right of left node to center-left of right node
        const fromX = fromRect.right - containerRect.left;
        const fromY = fromRect.top - containerRect.top + fromRect.height / 2;

        const toX = toRect.left - containerRect.left;
        const toY = toRect.top - containerRect.top + toRect.height / 2;

        const isActive =
          hoveredNode === edge.from ||
          hoveredNode === edge.to ||
          (selectedNode &&
            (selectedNode.id === edge.from || selectedNode.id === edge.to)) ||
          false;

        return {
          id: `${edge.from}-${edge.to}-${idx}`,
          fromX,
          fromY,
          toX,
          toY,
          isActive,
          label: edge.label,
        };
      })
      .filter((c): c is ConnectionCoord => c !== null);

    setConnections(calculated);
  }, [edges, hoveredNode, selectedNode]);

  // Run calculation on mount, hover changes, and window resize
  useEffect(() => {
    updateCoordinates();
    window.addEventListener("resize", updateCoordinates);
    // Timeout buffer for layout loads
    const timer = setTimeout(updateCoordinates, 300);

    return () => {
      window.removeEventListener("resize", updateCoordinates);
      clearTimeout(timer);
    };
  }, [updateCoordinates]);

  if (!architecture || !architecture.nodes || architecture.nodes.length === 0) {
    return null;
  }

  // Categorize nodes for column grid layout
  const frontendNodes = nodes.filter((n) => n.type === "frontend");
  const backendNodes = nodes.filter((n) => n.type === "backend");
  const dataNodes = nodes.filter(
    (n) => n.type === "database" || n.type === "external",
  );

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <BiDesktop className="size-6 text-paper/80" />;
      case "backend":
        return <BiServer className="size-6 text-paper/80" />;
      case "database":
        return <FaDatabase className="size-6 text-paper/80" />;
      case "external":
        return <BiCloud className="size-6 text-paper/80" />;
      default:
        return <BiServer className="size-6 text-paper/45" />;
    }
  };

  const getBorderColor = (type: string, active: boolean) => {
    if (active) {
      switch (type) {
        case "frontend":
          return "border-paper bg-paper/[0.04]";
        case "backend":
          return "border-paper bg-paper/[0.04]";
        case "database":
          return "border-paper bg-paper/[0.04]";
        case "external":
          return "border-paper bg-paper/[0.04]";
      }
    }
    return "border-line hover:border-line-strong";
  };

  const activeNodeInfo =
    selectedNode || nodes.find((n) => n.id === hoveredNode) || null;

  return (
    <div className="w-full mt-24">
      <h2 className="heading text-[clamp(2.4rem,5vw,4.5rem)] uppercase text-paper rtl:normal-case mb-3">
        {dict.projects.architectureTitle}
      </h2>
      <p className="text-paper/60 text-sm md:text-base max-w-xl mb-12">
        {dict.projects.architectureSubtitle}
      </p>

      <div
        ref={containerRef}
        className="relative w-full rounded-none border border-line bg-stage p-6 md:p-10 overflow-visible"
      >
        {/* SVG Connectors Layer (Only visible on medium and larger screens where columns align side-by-side) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f2f2ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f2f2ee" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="inactiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f2f2ee" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f2f2ee" stopOpacity="0.16" />
            </linearGradient>
          </defs>

          {connections.map((c) => {
            // Calculate a curved path between columns
            const dx = c.toX - c.fromX;
            const controlX1 = c.fromX + dx * 0.45;
            const controlX2 = c.fromX + dx * 0.55;
            const pathD = `M ${c.fromX} ${c.fromY} C ${controlX1} ${c.fromY}, ${controlX2} ${c.toY}, ${c.toX} ${c.toY}`;

            return (
              <g key={c.id}>
                {/* Background Shadow line for glow */}
                {c.isActive && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#f2f2ee"
                    strokeWidth="4"
                    className="opacity-25 blur-sm"
                  />
                )}
                {/* Main Path connector */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={
                    c.isActive ? "url(#activeGrad)" : "url(#inactiveGrad)"
                  }
                  strokeWidth={c.isActive ? "2" : "1.5"}
                  strokeDasharray={c.isActive ? "6 4" : "none"}
                  className={
                    c.isActive ? "animate-[dash_20s_linear_infinite]" : ""
                  }
                  style={{
                    transition: "stroke 0.3s, stroke-width 0.3s",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* 3 Column Node Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {/* Column 1: Client/Frontend Layer */}
          <div className="flex flex-col gap-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60 border-b border-line pb-2 mb-2 select-none flex items-center gap-2">
              <BiDesktop /> {dict.projects.clientLayer}
            </div>
            {frontendNodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`relative rounded-none bg-ink border p-5 cursor-pointer transition-all duration-300 ${getBorderColor(
                  node.type,
                  hoveredNode === node.id || selectedNode?.id === node.id,
                )}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() =>
                  setSelectedNode(selectedNode?.id === node.id ? null : node)
                }
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-none bg-transparent border border-line">
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h3 className="heading text-xl md:text-2xl text-paper">
                      {node.label}
                    </h3>
                    <span className="text-[10px] text-paper/45 uppercase mt-0.5 block tracking-wider">
                      {dict.projects.clientUi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Server/Backend Layer */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60 border-b border-line pb-2 mb-2 select-none flex items-center gap-2">
              <BiServer /> {dict.projects.serverLayer}
            </div>
            {backendNodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`relative rounded-none bg-ink border p-5 cursor-pointer transition-all duration-300 ${getBorderColor(
                  node.type,
                  hoveredNode === node.id || selectedNode?.id === node.id,
                )}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() =>
                  setSelectedNode(selectedNode?.id === node.id ? null : node)
                }
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-none bg-transparent border border-line">
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h3 className="heading text-xl md:text-2xl text-paper">
                      {node.label}
                    </h3>
                    <span className="text-[10px] text-paper/45 uppercase mt-0.5 block tracking-wider">
                      {dict.projects.serverApi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Data & Integrations Layer */}
          <div className="flex flex-col gap-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60 border-b border-line pb-2 mb-2 select-none flex items-center gap-2">
              <FaDatabase /> {dict.projects.storageLayer}
            </div>
            {dataNodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`relative rounded-none bg-ink border p-5 cursor-pointer transition-all duration-300 ${getBorderColor(
                  node.type,
                  hoveredNode === node.id || selectedNode?.id === node.id,
                )}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() =>
                  setSelectedNode(selectedNode?.id === node.id ? null : node)
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-none border ${
                      node.type === "database"
                        ? "bg-transparent border-line"
                        : "bg-transparent border-line"
                    }`}
                  >
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h3 className="heading text-xl md:text-2xl text-paper">
                      {node.label}
                    </h3>
                    <span className="text-[10px] text-paper/45 uppercase mt-0.5 block tracking-wider">
                      {node.type === "database" ? dict.projects.dataStore : dict.projects.externalApi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Details Section */}
        <div className="mt-10 border-t border-line pt-6 relative z-10 min-h-[120px]">
          {activeNodeInfo ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="heading text-2xl text-paper">
                  {activeNodeInfo.label}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-none border font-semibold select-none ${
                    activeNodeInfo.type === "frontend"
                      ? "text-paper/80 bg-transparent border-line"
                      : activeNodeInfo.type === "backend"
                        ? "text-paper/80 bg-transparent border-line"
                        : activeNodeInfo.type === "database"
                          ? "text-paper/80 bg-transparent border-line"
                          : "text-paper/80 bg-transparent border-line"
                  }`}
                >
                  {activeNodeInfo.type}
                </span>
              </div>
              <p className="text-paper/70 text-sm leading-relaxed font-light select-text">
                {activeNodeInfo.details}
              </p>
            </motion.div>
          ) : (
            <div className="text-paper/45 text-sm font-light font-mono uppercase tracking-[0.1em] text-[11px] flex items-center justify-center h-[80px]">
              {dict.projects.architectureHint}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes stroke-anim {
          to {
            stroke-dashoffset: -20;
          }
        }
        svg path.animate-\\[dash_20s_linear_infinite\\] {
          animation: stroke-anim 1s linear infinite !important;
        }
      `}</style>
    </div>
  );
}
