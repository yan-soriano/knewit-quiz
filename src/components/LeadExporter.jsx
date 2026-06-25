import React, { useState, useEffect } from 'react';
import { Download, FileJson, FileSpreadsheet, Trash2, X, CheckCircle, Users } from 'lucide-react';

export function LeadExporter({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('knewit_quiz_leads') || '[]');
      if (stored.length === 0) {
        const dummy = [
          {
            id: 'QZ-4011',
            name: 'Азамат Нурланов',
            phone: '+7 (777) 123-45-67',
            course: 'AI & Vibe Coding Bootcamp 2026',
            campus: 'Кампус Алматы (ул. Манаса 34/1)',
            date: '18.09.2026 14:20'
          },
          {
            id: 'QZ-3920',
            name: 'Аружан Каримова',
            phone: '+7 (705) 998-11-22',
            course: 'Full-Stack Web Developer (React + Node.js)',
            campus: 'Онлайн',
            date: '18.09.2026 12:45'
          }
        ];
        localStorage.setItem('knewit_quiz_leads', JSON.stringify(dummy));
        setLeads(dummy);
      } else {
        setLeads(stored);
      }
    } catch {
      setLeads([]);
    }
  };

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `knewit_leads_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportAsCSV = () => {
    const headers = ["ID,Name,Phone,Course,Campus,Date"];
    const rows = leads.map(l => `"${l.id}","${l.name}","${l.phone}","${l.course}","${l.campus}","${l.date}"`);
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent([headers, ...rows].join("\n"));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `knewit_leads_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Экспорт базы лидов KnewIT</h3>
              <p className="text-xs text-slate-400">Синхронизировано с локальным хранилищем ({leads.length} записей)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={exportAsCSV}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Скачать таблицу (.CSV)</span>
          </button>
          <button
            onClick={exportAsJSON}
            className="flex-1 py-3 px-4 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <FileJson className="w-4 h-4 text-cyan-400" />
            <span>Скачать данные (.JSON)</span>
          </button>
        </div>

        {/* Table preview */}
        <div className="max-h-64 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-950/60 p-2 text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800 text-[10px] uppercase font-mono">
                <th className="p-2">ID</th>
                <th className="p-2">Имя</th>
                <th className="p-2">Телефон</th>
                <th className="p-2">Курс</th>
                <th className="p-2">Кампус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads.map((l) => (
                <tr key={l.id} className="text-slate-300 hover:bg-slate-800/40">
                  <td className="p-2 font-mono text-cyan-400">{l.id}</td>
                  <td className="p-2 font-semibold text-white">{l.name}</td>
                  <td className="p-2 font-mono">{l.phone}</td>
                  <td className="p-2 truncate max-w-[150px]">{l.course}</td>
                  <td className="p-2 text-slate-400">{l.campus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
