"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiCloud, BiDesktop, BiServer } from "react-icons/bi";
import { FaDatabase } from "react-icons/fa6";

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
        return <BiDesktop className="size-6 text-indigo-400" />;
      case "backend":
        return <BiServer className="size-6 text-purple-400" />;
      case "database":
        return <FaDatabase className="size-6 text-emerald-400" />;
      case "external":
        return <BiCloud className="size-6 text-sky-400" />;
      default:
        return <BiServer className="size-6 text-zinc-400" />;
    }
  };

  const getBorderColor = (type: string, active: boolean) => {
    if (active) {
      switch (type) {
        case "frontend":
          return "border-indigo-500 shadow-indigo-500/20 shadow-md";
        case "backend":
          return "border-purple-500 shadow-purple-500/20 shadow-md";
        case "database":
          return "border-emerald-500 shadow-emerald-500/20 shadow-md";
        case "external":
          return "border-sky-500 shadow-sky-500/20 shadow-md";
      }
    }
    return "border-white/[0.08] hover:border-white/[0.2]";
  };

  const activeNodeInfo =
    selectedNode || nodes.find((n) => n.id === hoveredNode) || null;

  return (
    <div className="w-full mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
        System <span className="text-purple">Architecture</span>
      </h2>
      <p className="text-center text-white-200 text-sm md:text-base font-light mb-12">
        Explore interactive system flows, components, and communication layers
      </p>

      <div
        ref={containerRef}
        className="relative w-full rounded-3xl border border-white/[0.08] bg-[#04071D]/40 backdrop-blur-xl p-6 md:p-10 overflow-visible"
      >
        {/* SVG Connectors Layer (Only visible on medium and larger screens where columns align side-by-side) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="inactiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3f3f46" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3f3f46" stopOpacity="0.25" />
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
                    stroke="#a855f7"
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
            <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold border-b border-indigo-950/40 pb-2 mb-2 select-none flex items-center gap-2">
              <BiDesktop /> Presentation / Client
            </div>
            {frontendNodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`relative rounded-2xl bg-[#030617]/95 border p-5 cursor-pointer transition-all duration-300 ${getBorderColor(
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
                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900/40">
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm md:text-base leading-tight">
                      {node.label}
                    </h3>
                    <span className="text-[10px] text-zinc-500 uppercase mt-0.5 block tracking-wider">
                      Client-side UI
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Server/Backend Layer */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="text-xs uppercase tracking-wider text-purple-400 font-bold border-b border-purple-950/40 pb-2 mb-2 select-none flex items-center gap-2">
              <BiServer /> Application Services
            </div>
            {backendNodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`relative rounded-2xl bg-[#030617]/95 border p-5 cursor-pointer transition-all duration-300 ${getBorderColor(
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
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-900/40">
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm md:text-base leading-tight">
                      {node.label}
                    </h3>
                    <span className="text-[10px] text-zinc-500 uppercase mt-0.5 block tracking-wider">
                      Server API logic
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Data & Integrations Layer */}
          <div className="flex flex-col gap-6">
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold border-b border-emerald-950/40 pb-2 mb-2 select-none flex items-center gap-2">
              <FaDatabase /> Storage & Integration
            </div>
            {dataNodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`relative rounded-2xl bg-[#030617]/95 border p-5 cursor-pointer transition-all duration-300 ${getBorderColor(
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
                    className={`p-2.5 rounded-lg border ${
                      node.type === "database"
                        ? "bg-emerald-950/40 border-emerald-900/40"
                        : "bg-sky-950/40 border-sky-900/40"
                    }`}
                  >
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm md:text-base leading-tight">
                      {node.label}
                    </h3>
                    <span className="text-[10px] text-zinc-500 uppercase mt-0.5 block tracking-wider">
                      {node.type === "database" ? "Data Store" : "External API"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Details Section */}
        <div className="mt-10 border-t border-white/[0.08] pt-6 relative z-10 min-h-[120px]">
          {activeNodeInfo ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white capitalize">
                  {activeNodeInfo.label}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold select-none ${
                    activeNodeInfo.type === "frontend"
                      ? "text-indigo-400 bg-indigo-950/20 border-indigo-900/40"
                      : activeNodeInfo.type === "backend"
                        ? "text-purple-400 bg-purple-950/20 border-purple-900/40"
                        : activeNodeInfo.type === "database"
                          ? "text-emerald-400 bg-emerald-950/20 border-emerald-900/40"
                          : "text-sky-400 bg-sky-950/20 border-sky-900/40"
                  }`}
                >
                  {activeNodeInfo.type}
                </span>
              </div>
              <p className="text-white-200 text-sm leading-relaxed font-light select-text">
                {activeNodeInfo.details}
              </p>
            </motion.div>
          ) : (
            <div className="text-zinc-500 text-sm font-light italic flex items-center justify-center h-[80px]">
              Hover or click on any system node to inspect architectural
              specifications.
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
