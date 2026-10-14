import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, BookOpen } from 'lucide-react';
import { CHEATSHEET_DATA, CheatItem } from '../data/cheatsheet';

export const CheatsheetView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Barchasi', 'Asoslar', 'Shart & Sikl', 'Funksiya', 'Massiv & Obyekt', 'Asinxron', 'React'];

  const filteredItems = useMemo(() => {
    return CHEATSHEET_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Barchasi' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.syntax.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Tezkor Spravochnik</span>
            <span aria-hidden="true">·</span>
            <span>JavaScript & React Konspekti</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Dasturchi Konspekti (Cheatsheet)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Eng kerakli sintaksislar, massiv metodlari, obyektlar va React hooklari bo'yicha qulay qo'llanma.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Categories Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Sintaksis qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Grid of Cheat items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs text-sky-700 font-semibold">{item.category}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {item.title}
                </h3>
              </div>

              <button
                onClick={() => handleCopy(item.id, item.example)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded hover:bg-slate-100 transition-colors"
                title="Misolni nusxalash"
              >
                {copiedId === item.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {item.description}
            </p>

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Sintaksis:
              </div>
              <pre className="p-2.5 bg-slate-100 text-slate-900 rounded font-mono text-xs overflow-x-auto">
                {item.syntax}
              </pre>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Amaliy misol:
              </div>
              <pre className="p-2.5 bg-slate-900 text-sky-300 rounded font-mono text-xs overflow-x-auto">
                {item.example}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Qidiruvingiz bo'yicha hech qanday ma'lumot topilmadi.
        </div>
      )}
    </div>
  );
};
