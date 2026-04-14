"use client";
import { useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const checklistData = [
  {
    phase: "6-8 Weeks Before Move",
    icon: "📋",
    tasks: [
      "Confirm closing date with your real estate agent",
      "Get your moving quote locked in with Umbrella Movers",
      "Start decluttering — donate, sell, or toss what you don't need",
      "Begin collecting free boxes (liquor stores, Costco, Facebook groups)",
      "Notify your landlord if currently renting",
    ],
  },
  {
    phase: "3-4 Weeks Before Move",
    icon: "📦",
    tasks: [
      "Start packing non-essential rooms (guest room, garage, storage)",
      "Update your address: USPS, DMV, banks, subscriptions",
      "Transfer or set up utilities (NV Energy, Southwest Gas, LVVWD)",
      "Schedule internet/cable installation at your new home",
      "Confirm HOA move-in requirements (elevator reservations, deposits)",
    ],
  },
  {
    phase: "1-2 Weeks Before Move",
    icon: "🏠",
    tasks: [
      "Pack room by room — label every box (room + contents)",
      "Take photos of electronics & wiring before disconnecting",
      "Prepare a \"first night\" box: toiletries, chargers, snacks, sheets",
      "Confirm move date & arrival window with Umbrella Movers",
      "Set aside important docs (closing papers, IDs, medications)",
    ],
  },
  {
    phase: "Move Day",
    icon: "🚚",
    tasks: [
      "Do a final walkthrough of your old home",
      "Pack an 'Open First' box with essentials — keep it in your car, not the truck",
      "Keep walkways clear — prop doors open for the team",
      "Point out fragile or high-value items to your crew lead",
      "Verify everything is loaded before heading to your new home",
    ],
  },
];

const tipsList = [
  { icon: "🌡️", tip: "Vegas Heat Tip: Move early morning to beat the 110°+ temps" },
  { icon: "🧊", tip: "Protect candles, vinyl & electronics from melting in transit" },
  { icon: "🅿️", tip: "Confirm parking access at both locations for the moving truck" },
  { icon: "🔑", tip: "Have keys, gate codes & garage remotes ready for your crew" },
];

const VegasMovingKit = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const kitRef = useRef<HTMLDivElement>(null);

  const toggle = (phaseIdx: number, taskIdx: number) => {
    const key = `${phaseIdx}-${taskIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalTasks = checklistData.reduce((a, p) => a + p.tasks.length, 0);
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const handlePrint = () => {
    if (!kitRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Your Vegas Moving Kit — Umbrella Movers</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; padding: 32px; max-width: 620px; margin: 0 auto; color: #1a1a1a; }
        h2 { font-size: 22px; text-align: center; margin-bottom: 4px; }
        .subtitle { text-align: center; font-size: 13px; color: #666; margin-bottom: 24px; }
        .phase { border: 1px solid #ddd; border-radius: 10px; margin-bottom: 16px; overflow: hidden; }
        .phase-header { background: #f5f5f5; padding: 10px 16px; font-weight: 700; font-size: 14px; border-bottom: 1px solid #ddd; }
        .task { padding: 8px 16px; font-size: 13px; display: flex; align-items: flex-start; gap: 8px; }
        .task::before { content: "☐"; flex-shrink: 0; }
        .tips { background: #fffbeb; border: 1px solid #f59e0b; border-radius: 10px; padding: 16px; margin-top: 20px; }
        .tips h3 { font-size: 14px; font-weight: 700; color: #92400e; margin-bottom: 10px; }
        .tip { font-size: 12px; color: #78350f; margin-bottom: 6px; }
        .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #999; }
      </style>
      </head><body>
        <h2>🌵 Your Vegas Moving Kit</h2>
        <p class="subtitle">Checklist from contract to close — by Umbrella Movers</p>
        ${checklistData.map(phase => `
          <div class="phase">
            <div class="phase-header">${phase.icon} ${phase.phase}</div>
            ${phase.tasks.map(task => `<div class="task">${task}</div>`).join("")}
          </div>
        `).join("")}
        <div class="tips">
          <h3>🌵 Vegas-Specific Tips</h3>
          ${tipsList.map(t => `<div class="tip">${t.icon} ${t.tip}</div>`).join("")}
        </div>
        <div class="footer">umbrella-moves-you.lovable.app</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div ref={kitRef} className="w-full max-w-xl mx-auto mt-12 mb-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <p className="text-sm font-bold tracking-widest uppercase text-accent mb-2">🌵 Bonus Resource</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Your Vegas Moving Kit</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Congrats on your new home! Use this checklist from contract to close to make sure nothing falls through the cracks.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-secondary/50 rounded-xl p-4 mb-6 border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-foreground">Move Readiness</span>
          <span className="text-sm font-bold text-accent">
            {progress === 100 ? "🎉 You're Ready!" : `${completedTasks}/${totalTasks} tasks`}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Checklist Phases */}
      <div className="space-y-4">
        {checklistData.map((phase, pi) => {
          const phaseComplete = phase.tasks.every((_, ti) => checked[`${pi}-${ti}`]);
          return (
            <div
              key={pi}
              className={`rounded-xl border overflow-hidden transition-colors ${
                phaseComplete ? "border-green-300 bg-green-50/30" : "border-border bg-card"
              }`}
            >
              <div className={`px-4 py-3 flex items-center gap-2.5 border-b ${
                phaseComplete ? "border-green-200 bg-green-50/50" : "border-border bg-secondary/30"
              }`}>
                <span className="text-xl">{phaseComplete ? "✅" : phase.icon}</span>
                <h3 className={`text-sm font-bold ${phaseComplete ? "text-green-600" : "text-foreground"}`}>
                  {phase.phase}
                </h3>
              </div>
              <div className="py-1.5">
                {phase.tasks.map((task, ti) => {
                  const done = checked[`${pi}-${ti}`];
                  return (
                    <div
                      key={ti}
                      onClick={() => toggle(pi, ti)}
                      className="flex items-start gap-3 px-4 py-2.5 cursor-pointer select-none hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <Checkbox
                        checked={done}
                        onCheckedChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5 pointer-events-none"
                      />
                      <span className={`text-sm leading-relaxed transition-all ${
                        done ? "text-muted-foreground line-through" : "text-foreground"
                      }`}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vegas Tips */}
      <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <h3 className="text-sm font-bold text-amber-800 mb-3">🌵 Vegas-Specific Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tipsList.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-base">{t.icon}</span>
              <span className="text-xs text-amber-900 leading-relaxed">{t.tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-5 print:hidden">
        <Button
          variant="outline"
          onClick={handlePrint}
          className="gap-2"
        >
          <Printer className="h-4 w-4" />
          Download as PDF
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">Use "Save as PDF" in the print dialog</p>
      </div>
    </div>
  );
};

export default VegasMovingKit;
