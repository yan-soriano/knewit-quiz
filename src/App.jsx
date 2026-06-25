import React, { useState } from 'react';
import { QUIZ_QUESTIONS, COURSE_CATALOG } from './data/quizData';
import { SvgPipeline } from './components/SvgPipeline';
import { LeadExporter } from './components/LeadExporter';
import { 
  Globe, 
  Bot, 
  Sparkles, 
  Smartphone, 
  Compass, 
  BookOpen, 
  Palette, 
  Code2, 
  Layout, 
  Cpu, 
  Rocket, 
  Server, 
  Clock, 
  Zap, 
  Flame, 
  Briefcase, 
  Target, 
  Plane, 
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Phone,
  User,
  Send,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Globe, Bot, Sparkles, Smartphone, Compass, BookOpen, Palette, Code2,
  Layout, Cpu, Rocket, Server, Clock, Zap, Flame, Briefcase, Target, Plane, TrendingUp
};

export function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedCourse, setRecommendedCourse] = useState(null);
  const [isExporterOpen, setIsExporterOpen] = useState(false);

  // Lead capture form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [format, setFormat] = useState('campus');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (option) => {
    const updated = { ...answers, [currentQ.id]: option };
    setAnswers(updated);

    if (currentStep < totalSteps - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 200);
    } else {
      // Recommendation Engine calculation
      calculateRecommendation(updated);
    }
  };

  const calculateRecommendation = (allAnswers) => {
    const scores = { vibe: 0, web: 0, ai: 0, mobile: 0 };
    Object.values(allAnswers).forEach((opt) => {
      if (opt?.weight) {
        Object.entries(opt.weight).forEach(([k, val]) => {
          if (scores[k] !== undefined) scores[k] += val;
        });
      }
    });

    let bestKey = 'vibe';
    let max = -1;
    Object.entries(scores).forEach(([k, v]) => {
      if (v > max) {
        max = v;
        bestKey = k;
      }
    });

    const chosen = COURSE_CATALOG[bestKey] || COURSE_CATALOG.vibe;
    setRecommendedCourse(chosen);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('8') || input.startsWith('7')) input = input.substring(1);
    input = input.substring(0, 10);
    
    let formatted = '+7 ';
    if (input.length > 0) formatted += `(${input.substring(0, 3)}`;
    if (input.length >= 3) formatted += `) ${input.substring(3, 6)}`;
    if (input.length >= 6) formatted += `-${input.substring(6, 8)}`;
    if (input.length >= 8) formatted += `-${input.substring(8, 10)}`;
    setPhone(input.length === 0 ? '' : formatted);
  };

  const handleSubmitLead = (e) => {
    e.preventDefault();
    if (!name.trim() || phone.length < 16) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newLead = {
        id: 'QZ-' + Math.floor(1000 + Math.random() * 9000),
        name: name.trim(),
        phone,
        course: recommendedCourse?.title || 'AI & Vibe Coding Bootcamp 2026',
        campus: format === 'campus' ? 'Кампус Алматы (ул. Манаса 34/1)' : 'Онлайн',
        date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };

      const stored = JSON.parse(localStorage.getItem('knewit_quiz_leads') || '[]');
      localStorage.setItem('knewit_quiz_leads', JSON.stringify([newLead, ...stored]));

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setRecommendedCourse(null);
    setIsSubmitted(false);
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col mesh-glow relative overflow-x-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-cyan">
            <span className="font-mono text-xs font-black">&lt;/&gt;</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                Knew<span className="text-cyan-400">IT</span> Quiz
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold">
                Пройди тест за 2 минуты
              </span>
            </div>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange-400" />
              Казахстан, Алматы • ул. Манаса 34/1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExporterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">База лидов</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* SVG Pipeline Graph */}
        <SvgPipeline
          currentStep={currentStep}
          totalSteps={totalSteps}
          isCompleted={!!recommendedCourse}
        />

        {recommendedCourse ? (
          /* ========================================================================= */
          /* FINAL STEP: BENTO RECOMMENDATION CARD & LEAD CAPTURE */
          /* ========================================================================= */
          <div className="space-y-8 animate-fade-in">
            {/* Recommendation Header Bento */}
            <div className="bento-card-active rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono">
                  {recommendedCourse.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                  СОВПАДЕНИЕ: {recommendedCourse.matchScore}%
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                {recommendedCourse.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
                {recommendedCourse.subtitle}
              </p>

              {/* Bento Stat Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Срок обучения
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white font-mono">
                    {recommendedCourse.duration}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-emerald-400" /> Доход выпускника
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                    {recommendedCourse.salaryAvg}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-900/90 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" /> Локация кампуса
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate block">
                    {recommendedCourse.campusFormat}
                  </span>
                </div>
              </div>

              {/* Curriculum Points */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Ключевые преимущества трека:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {recommendedCourse.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead Capture Bento Box */}
            <div className="bento-card rounded-3xl p-6 sm:p-10 border border-slate-800">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Заявка принята в кампус Алматы!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
                    Мы выслали силлабус курса и ссылку на пробный урок на номер <span className="font-mono text-cyan-400">{phone}</span>.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setIsExporterOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-xs text-white transition shadow-glow-cyan"
                    >
                      Посмотреть лид в таблице
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-300 transition"
                    >
                      Пройти тест заново
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="max-w-xl mx-auto space-y-4">
                  <div className="text-center mb-6">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                      Финальный шаг
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      Получить персональный силлабус курса
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Оставьте контакты для бронирования бесплатного урока в кампусе Алматы.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Ваше имя
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Например: Арман"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Телефон (WhatsApp) в Казахстане
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+7 (707) 123-45-67"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Формат обучения
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormat('campus')}
                        className={`p-3 rounded-xl border text-xs font-medium transition flex items-center gap-2 ${
                          format === 'campus'
                            ? 'border-cyan-500 bg-cyan-600/20 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Кампус Алматы (ул. Манаса)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormat('online')}
                        className={`p-3 rounded-xl border text-xs font-medium transition flex items-center gap-2 ${
                          format === 'online'
                            ? 'border-cyan-500 bg-cyan-600/20 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Онлайн в Zoom</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || phone.length < 16}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-glow-cyan transition disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Отправка...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Получить силлабус и забронировать место</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEPPER: 5 QUESTION BENTO CARDS */
          /* ========================================================================= */
          <div className="bento-card rounded-3xl p-6 sm:p-10 border border-slate-800">
            <div className="mb-6">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Вопрос 0{currentStep + 1} из 0{totalSteps} • {currentQ.stepTitle}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                {currentQ.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Asymmetric Bento Options Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {currentQ.options.map((opt) => {
                const IconComponent = ICON_MAP[opt.icon] || Sparkles;
                const isSelected = answers[currentQ.id]?.id === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`group text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-glow-cyan ring-1 ring-cyan-400/50'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                        isSelected ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>
              <span className="text-xs text-slate-500 font-mono">
                Выберите один из вариантов
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Exporter Modal */}
      <LeadExporter
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
      />
    </div>
  );
}

export default App;
