import React from 'react';
import { ColorCustomization, HeaderStyle } from '../types/resume';
import { X, Sparkles, Check, RotateCcw, Palette } from 'lucide-react';

interface ColorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ColorCustomization;
  onChange: (updated: ColorCustomization) => void;
}

export const PRESET_PALETTES = [
  // Maritime & PSA Framework
  { name: 'PSA Maritime Navy', color: '#0B2545', category: 'Maritime & Ports' },
  { name: 'Deep Ocean Blue', color: '#034078', category: 'Maritime & Ports' },
  { name: 'Port Authority Indigo', color: '#1E1B4B', category: 'Maritime & Ports' },
  { name: 'Harbor Steel', color: '#334155', category: 'Maritime & Ports' },

  // Oil & Gas / Energy EPC
  { name: 'ADNOC Royal Blue', color: '#003366', category: 'Oil & Gas EPC' },
  { name: 'Petroleum Deep Teal', color: '#0E3B43', category: 'Oil & Gas EPC' },
  { name: 'Persian Gulf Teal', color: '#0F766E', category: 'Oil & Gas EPC' },
  { name: 'Refinery Steel', color: '#1E293B', category: 'Oil & Gas EPC' },

  // Compliance & Governance
  { name: 'ISO Audit Emerald', color: '#064E3B', category: 'Compliance & Quality' },
  { name: 'Quality Forest Green', color: '#14532D', category: 'Compliance & Quality' },
  { name: 'WSH Safety Olive', color: '#365314', category: 'Compliance & Quality' },
  { name: 'Jade Governance', color: '#047857', category: 'Compliance & Quality' },

  // Executive & Corporate
  { name: 'Executive Burgundy', color: '#4A0E17', category: 'Executive & Corporate' },
  { name: 'Crimson Bordeaux', color: '#881337', category: 'Executive & Corporate' },
  { name: 'Imperial Violet', color: '#3B0764', category: 'Executive & Corporate' },
  { name: 'Royal Plum', color: '#581C87', category: 'Executive & Corporate' },

  // Modern & Technical
  { name: 'Sapphire Engineering', color: '#1D4ED8', category: 'Modern Engineering' },
  { name: 'Cobalt Precision', color: '#2563EB', category: 'Modern Engineering' },
  { name: 'Offshore Cyan', color: '#0891B2', category: 'Modern Engineering' },
  { name: 'Bronze Infrastructure', color: '#78350F', category: 'Modern Engineering' },

  // Pure Minimalist
  { name: 'Pure ATS Monochrome', color: '#000000', category: 'Monochrome' },
  { name: 'Charcoal Slate', color: '#18181B', category: 'Monochrome' },
  { name: 'Graphite Dark', color: '#27272A', category: 'Monochrome' },
  { name: 'Titanium Neutral', color: '#3F3F46', category: 'Monochrome' },
];

export const PAPER_TINTS = [
  { name: 'Crisp Pure White', color: '#FFFFFF', desc: 'Standard A4 brilliant white' },
  { name: 'Executive Ivory', color: '#FAF9F6', desc: 'Warm professional monograph' },
  { name: 'Cool Snow', color: '#F8FAFC', desc: 'Subtle slate architectural' },
  { name: 'Subtle Warm Sand', color: '#FDFBF7', desc: 'Gentle warm paper' },
  { name: 'Platinum Mist', color: '#F9FAFB', desc: 'Ultra-light neutral gray' },
];

export const ColorStudioModal: React.FC<ColorStudioModalProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
}) => {
  if (!isOpen) return null;

  const handlePrimaryChange = (hex: string) => {
    onChange({
      ...config,
      primaryColor: hex,
    });
  };

  const handlePaperChange = (hex: string) => {
    onChange({
      ...config,
      paperColor: hex,
    });
  };

  const handleHeaderStyleChange = (style: HeaderStyle) => {
    onChange({
      ...config,
      headerStyle: style,
    });
  };

  const handleRandomize = () => {
    // Pick random from rich spectrum
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    onChange({
      ...config,
      primaryColor: randomHex,
    });
  };

  const handleReset = () => {
    onChange({
      primaryColor: '#0B2545',
      secondaryColor: '#334155',
      paperColor: '#FFFFFF',
      headerStyle: 'classic',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Infinite Color Studio &amp; Palette Customizer
              </h3>
              <p className="text-xs text-slate-500">
                Pick from over 16.7 million colors, corporate engineering themes, or custom brand codes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Main Primary Accent Color Controls */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Primary Accent Color (Applied to headings, lines, icons &amp; metrics)
                </span>
                <span className="text-[11px] text-slate-500">
                  Select any exact shade or enter a corporate HEX code
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomize}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 transition-colors shadow-xs font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Inspire Me
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
                  title="Reset to default navy"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Interactive Color Picker + Hex Input */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Native Full-Spectrum Color Picker */}
              <div className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-slate-300 shadow-xs">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => handlePrimaryChange(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                  title="Open spectrum color picker"
                />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Color Wheel</div>
                  <div className="text-xs font-semibold text-slate-800">16.7M Colors</div>
                </div>
              </div>

              {/* Exact Hex Input */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300 shadow-xs">
                <span className="text-slate-400 font-mono font-bold">#</span>
                <input
                  type="text"
                  maxLength={7}
                  value={config.primaryColor.replace('#', '')}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
                    handlePrimaryChange(`#${val}`);
                  }}
                  className="w-24 text-xs font-mono font-bold text-slate-900 uppercase focus:outline-none"
                  placeholder="0B2545"
                />
              </div>

              {/* Live Preview Box */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-white font-semibold text-xs shadow-xs"
                style={{ backgroundColor: config.primaryColor }}
              >
                <span>Live Preview Accent</span>
              </div>
            </div>
          </div>

          {/* Curated Executive & Engineering Palette Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 block">
                Executive &amp; Industry Color Presets
              </span>
              <span className="text-[11px] text-slate-500">24 Curated Engineering Shades</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {PRESET_PALETTES.map((preset, idx) => {
                const isSelected = config.primaryColor.toLowerCase() === preset.color.toLowerCase();
                return (
                  <button
                    key={idx}
                    onClick={() => handlePrimaryChange(preset.color)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-lg shrink-0 shadow-xs border border-black/10 flex items-center justify-center"
                      style={{ backgroundColor: preset.color }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </span>
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-slate-800 truncate">{preset.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase">{preset.color}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Header Layout & Styling Preset */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-900 block mb-2">
              Header Architectural Style
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'classic', label: 'Classic Border', desc: 'Crisp colored bottom hairline border' },
                { id: 'modern-bar', label: 'Vertical Accent', desc: 'Thick left pillar accent bar' },
                { id: 'solid-banner', label: 'Solid Banner', desc: 'Executive colored banner header' },
                { id: 'minimal', label: 'Minimalist', desc: 'Clean high-density typography' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleHeaderStyleChange(style.id as HeaderStyle)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    config.headerStyle === style.id
                      ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{style.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Paper Background Tint */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-900 block mb-2">
              Paper Sheet Tint (Print &amp; Screen Background)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {PAPER_TINTS.map((tint, idx) => {
                const isSelected = config.paperColor.toLowerCase() === tint.color.toLowerCase();
                return (
                  <button
                    key={idx}
                    onClick={() => handlePaperChange(tint.color)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: tint.color }}
                      />
                      <span className="text-[11px] font-bold text-slate-800">{tint.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">{tint.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Current Accent:</span>
            <span className="font-mono font-bold text-slate-900 uppercase">{config.primaryColor}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
          >
            Apply &amp; View Resume
          </button>
        </div>
      </div>
    </div>
  );
};
