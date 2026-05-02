"use client";

import React, { useState } from 'react';

export default function ColorConverter() {
  const [hex, setHex] = useState("4D8EFF");
  const [rgb, setRgb] = useState({ r: 77, g: 142, b: 255 });
  const [hsl, setHsl] = useState({ h: 218, s: 100, l: 65 });

  const hexToRgb = (hexStr: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("#", "");
    setHex(value);
    if (value.length === 6) {
      const newRgb = hexToRgb(value);
      if (newRgb) {
        setRgb(newRgb);
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      }
    }
  };

  const handleSliderChange = (colorChannel: 'r' | 'g' | 'b', value: string) => {
    const newRgb = { ...rgb, [colorChannel]: parseInt(value) };
    setRgb(newRgb);
    const newHex = ((1 << 24) + (newRgb.r << 16) + (newRgb.g << 8) + newRgb.b).toString(16).slice(1).toUpperCase();
    setHex(newHex);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="text-[#111c2d] dark:text-[#e1e2ec] bg-white dark:bg-[#020617] min-h-screen flex flex-col font-sans transition-colors duration-300">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-16 pb-16 relative">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#4D8EFF]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-[#111c2d] dark:text-white mb-4 tracking-tight">Color Converter</h1>
          <p className="text-lg text-[#424754] dark:text-[#c2c6d6]">Precision color translation and palette generation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#111c2d] dark:text-white">Input Color</h2>
                <span className="material-symbols-outlined text-[#0058be] dark:text-[#adc6ff]">colorize</span>
              </div>
              
              <div className="h-48 w-full rounded-2xl mb-8 shadow-inner transition-all duration-300 border-4 border-white dark:border-slate-800" 
                   style={{ backgroundColor: `#${hex}` }}></div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-[#727785] dark:text-[#c2c6d6] uppercase tracking-widest mb-3">HEX Value</label>
                <div className="flex items-center bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden focus-within:border-[#0058be] dark:focus-within:border-[#adc6ff] transition-all">
                  <span className="pl-4 text-[#727785] dark:text-[#8c909f] font-mono font-bold">#</span>
                  <input 
                    className="w-full bg-transparent border-none py-4 px-2 text-[#111c2d] dark:text-white font-mono font-bold uppercase focus:ring-0" 
                    value={hex}
                    onChange={handleHexChange}
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {(['r', 'g', 'b'] as const).map((channel) => (
                  <div key={channel} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold uppercase text-[#727785] dark:text-[#8c909f]">
                       <span>{channel === 'r' ? 'Red' : channel === 'g' ? 'Green' : 'Blue'}</span>
                       <span className="font-mono">{rgb[channel]}</span>
                    </div>
                    <input 
                      type="range" max="255" min="0" 
                      value={rgb[channel]}
                      onChange={(e) => handleSliderChange(channel, e.target.value)}
                      className="w-full h-1.5 bg-slate-100 dark:bg-[#32353c] rounded-lg appearance-none cursor-pointer accent-[#0058be] dark:accent-[#4edea3]" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Conversions & Tones */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-white/10 shadow-xl">
              <h2 className="text-xl font-bold mb-6 text-[#111c2d] dark:text-white">Format Conversions</h2>
              <div className="space-y-4">
                {[
                  { label: 'HEX', value: `#${hex.toUpperCase()}` },
                  { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                  { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between bg-slate-50 dark:bg-[#10131a] rounded-xl p-4 border border-slate-100 dark:border-white/5 hover:border-[#0058be] dark:hover:border-[#adc6ff] transition-all group cursor-pointer"
                       onClick={() => copyToClipboard(item.value)}>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-[#727785] dark:text-[#8c909f] uppercase tracking-tighter">{item.label}</span>
                      <span className="font-mono font-bold text-[#111c2d] dark:text-white text-lg">{item.value}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#727785] dark:text-[#8c909f] group-hover:text-[#0058be] dark:group-hover:text-[#adc6ff] transition-colors">
                      <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                      <span className="material-symbols-outlined">content_copy</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-white/10 shadow-xl">
              <h2 className="text-xl font-bold mb-6 text-[#111c2d] dark:text-white">Generated Tones</h2>
              <div className="flex h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                {[0.2, 0.4, 0.6, 0.8, 1].map((op) => (
                  <div key={op} 
                       className="flex-1 hover:flex-[1.5] transition-all duration-300 cursor-pointer flex items-end p-2" 
                       style={{ backgroundColor: `#${hex}`, opacity: op }}>
                    <span className="text-[10px] font-bold text-white mix-blend-difference">{Math.round(op * 100)}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-[#727785] dark:text-[#c2c6d6]">Opacity-based shades for your UI elements.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}