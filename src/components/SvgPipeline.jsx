import React from 'react';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

export function SvgPipeline({ currentStep, totalSteps = 5, isCompleted = false }) {
  const nodes = [
    { id: 0, label: "Цель продукта", code: "TARGET" },
    { id: 1, label: "Опыт в коде", code: "EXP" },
    { id: 2, label: "Тип логики", code: "LOGIC" },
    { id: 3, label: "Интенсивность", code: "HOURS" },
    { id: 4, label: "План 2026", code: "GOAL" },
    { id: 5, label: "AI Анализ", code: "RECOMMEND", isSpecial: true }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-2">
      {/* Desktop SVG Pipeline */}
      <div className="hidden md:block relative">
        <svg className="w-full h-20" viewBox="0 0 800 80" fill="none">
          <defs>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Connecting Line */}
          <path
            d="M 50 40 L 750 40"
            stroke="url(#baseGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Active Flowing Line */}
          {currentStep > 0 && (
            <path
              d={`M 50 40 L ${isCompleted ? 750 : 50 + (currentStep / (totalSteps)) * 700} 40`}
              stroke="url(#activeGrad)"
              strokeWidth="4"
              className="animate-flow-dash"
              filter="url(#glow)"
            />
          )}

          {/* Node Circles */}
          {nodes.map((node, i) => {
            const cx = 50 + (i / 5) * 700;
            const isDone = isCompleted ? true : currentStep > i;
            const isCurrent = isCompleted ? node.id === 5 : currentStep === i;

            return (
              <g key={node.id} className="transition-all duration-500">
                {/* Outer halo if active */}
                {isCurrent && (
                  <circle
                    cx={cx}
                    cy="40"
                    r="20"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={cx}
                  cy="40"
                  r="14"
                  fill={isDone ? "#10B981" : isCurrent ? "#06B6D4" : "#0F172A"}
                  stroke={isDone ? "#10B981" : isCurrent ? "#38BDF8" : "#334155"}
                  strokeWidth="2.5"
                  filter={isCurrent ? "url(#glow)" : undefined}
                />

                {/* Node Label Text */}
                <text
                  x={cx}
                  y="68"
                  textAnchor="middle"
                  fill={isCurrent ? "#38BDF8" : isDone ? "#10B981" : "#64748B"}
                  fontSize="11"
                  fontWeight={isCurrent ? "700" : "500"}
                  fontFamily="Inter, sans-serif"
                >
                  {node.label}
                </text>

                {/* Node Status Badge */}
                <text
                  x={cx}
                  y="22"
                  textAnchor="middle"
                  fill={isCurrent ? "#06B6D4" : "#475569"}
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {node.code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile Pipeline Bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-200">
            {isCompleted ? "Анализ завершен" : `Шаг 0${currentStep + 1} / 0${totalSteps}: ${nodes[currentStep]?.label}`}
          </span>
        </div>
        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${isCompleted ? 100 : Math.round(((currentStep + 1) / totalSteps) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
