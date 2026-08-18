"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Cpu, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { SectionStylesConfig } from "@/lib/styles-helper";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";

export default function ProcessCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [steps, setSteps] = useState<any[]>([]);
  const [processStyles, setProcessStyles] = useState<SectionStylesConfig>({});

  useEffect(() => {
    if (data?.processSteps) {
      setSteps(data.processSteps);
    }
    if ((data as any)?.processStyles) {
      setProcessStyles((data as any).processStyles);
    } else {
      setProcessStyles({});
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAddStep = () => {
    const nextNum = steps.length + 1;
    const formattedStep = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    const newStep = {
      id: `step-${Date.now()}`,
      stepNumber: nextNum,
      step: formattedStep,
      title: `Genomic Isolation (G${nextNum - 1})`,
      subtitle: "Manufacturing Stage",
      description: "Wild fruitbody tissue isolation on sterile PDA agar slants under laminar flow.",
      purpose: "Wild fruitbody tissue isolation on sterile PDA agar slants under laminar flow.",
      temp: "24°C - 25°C",
      time: "Daily",
      pressure: "",
      equipment: ["Agar slant cloning", "Microscopic validation"],
      details: ["Agar slant cloning", "Microscopic validation"],
      precautions: "Maintain strict aseptic laboratory protocols.",
      qualityCheck: "Verified 100% pure.",
    };
    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (index: number) => {
    if (confirm("Are you sure you want to delete this process step?")) {
      const filtered = steps.filter((_, i) => i !== index);
      const reindexed = filtered.map((st, i) => {
        const nextNum = i + 1;
        const formattedStep = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
        return {
          ...st,
          stepNumber: nextNum,
          step: formattedStep,
        };
      });
      setSteps(reindexed);
    }
  };

  const handleSave = async () => {
    // Optimistic instantly-visible save feedback for lightning fast UX
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    setSaving(true);
    const success = await updateData({
      processSteps: steps,
      processStyles: processStyles,
    } as any);
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Cpu className="w-3.5 h-3.5 text-[#4e8c4a]" /> Inoculation Stages
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Production Process CMS</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage SporoNova step-by-step manufacturing stages, biosecurity precautions, duration, and quality checks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Process Stages Saved!
            </span>
          )}
          <button
            onClick={handleAddStep}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-[#1c3c24] hover:text-white transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Inoculation Stage
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Revert Production Process changes to current saved state?")) {
                setSteps(data?.processSteps || []);
                setProcessStyles((data as any)?.processStyles || {});
              }
            }}
            className="px-5 py-3 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer font-sans"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Process Steps
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          // Resolve list of equipment/details
          const currentList = Array.isArray(step.equipment)
            ? step.equipment
            : (Array.isArray(step.details) ? step.details : []);
          const listText = currentList.join(", ");

          return (
            <div key={step.id || idx} className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-4 shadow-sm hover:border-[#4e8c4a]/30 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
                <span className="text-xs font-bold text-[#2c5e37] uppercase tracking-widest font-mono">
                  Stage {step.step || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}: {step.title || ""}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteStep(idx)}
                  className="p-1.5 text-red-500 hover:text-red-750 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Stage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Stage Number (e.g. 01)
                  </label>
                  <input
                    type="text"
                    value={step.step || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].step = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Stage Title
                  </label>
                  <input
                    type="text"
                    value={step.title || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].title = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Stage Purpose / Description
                </label>
                <textarea
                  rows={2}
                  value={step.purpose || step.description || ""}
                  onChange={(e) => {
                    const updated = [...steps];
                    updated[idx].purpose = e.target.value;
                    updated[idx].description = e.target.value;
                    setSteps(updated);
                  }}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Sub-stages / Equipment (Comma-separated list)
                </label>
                <input
                  type="text"
                  value={listText}
                  onChange={(e) => {
                    const updated = [...steps];
                    const items = e.target.value.split(",").map(val => val.trim()).filter(Boolean);
                    updated[idx].equipment = items;
                    updated[idx].details = items;
                    setSteps(updated);
                  }}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  placeholder="e.g. Agar slant cloning, Microscopic validation, Cryo storage preservation"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Temperature (e.g. 24°C - 25°C)
                  </label>
                  <input
                    type="text"
                    value={step.temp || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].temp = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Duration / Time (e.g. Daily)
                  </label>
                  <input
                    type="text"
                    value={step.time || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].time = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Pressure (e.g. 15 PSI)
                  </label>
                  <input
                    type="text"
                    value={step.pressure || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].pressure = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Biosecurity Precaution
                  </label>
                  <textarea
                    rows={2}
                    value={step.precautions || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].precautions = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Quality Control Check
                  </label>
                  <textarea
                    rows={2}
                    value={step.qualityCheck || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].qualityCheck = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BrandingSectionStylesControls
        sectionName="Production Process Stages"
        styles={processStyles}
        onChange={setProcessStyles}
      />
    </div>
  );
}
