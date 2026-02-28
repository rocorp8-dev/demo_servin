import React, { useState, useEffect, useRef } from 'react';

type SectionStatus = 'pending' | 'approved' | 'rejected';
type FlowStep = 'pre' | 'recording' | 'processing' | 'review';

interface Section {
  id: string;
  title: string;
  status: SectionStatus;
  icon: string;
}

const initialSections: Section[] = [
  { id: 'historial', title: 'Historial Clínico', status: 'pending', icon: '📋' },
  { id: 'receta', title: 'Receta Médica', status: 'pending', icon: '💊' },
  { id: 'alimenticio', title: 'Plan Alimenticio', status: 'pending', icon: '🥗' },
  { id: 'ejercicios', title: 'Plan de Ejercicios', status: 'pending', icon: '🏃' },
];

const AIBadge: React.FC = () => (
  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    Generado por IA — Pendiente aprobación
  </div>
);

const EditIcon: React.FC = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

/* ─── Waveform bars animation ─── */
const Waveform: React.FC<{ active: boolean }> = ({ active }) => {
  const bars = [3, 5, 8, 6, 4, 9, 7, 5, 3, 6, 8, 4, 7, 5, 9, 6, 4, 8, 5, 3];
  return (
    <div className="flex items-center gap-0.5 h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all"
          style={{
            height: active ? `${h * 4}px` : '4px',
            backgroundColor: active ? '#22C55E' : '#d1d5db',
            animation: active ? `wave ${0.8 + (i % 5) * 0.15}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
};

/* ─── Step 1: Pre-consulta screen ─── */
const PreConsulta: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Nueva consulta</p>
            <h1 className="text-xl font-bold text-gray-900">Lorena Arzate Aguilar</h1>
            <p className="text-sm text-gray-500 mt-0.5">52 años · Seguimiento · {dateStr}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-100">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-xs font-semibold text-purple-700">Sumari listo</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 bg-gray-50">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1B5E4B' }}></div>
              <span className="text-xs font-semibold text-gray-600">Dr. Servín 5.2</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-2xl">

          {/* Patient card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#1B5E4B' }}>
                LA
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-lg font-bold text-gray-900">Lorena Arzate Aguilar</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Al día</span>
                </div>
                <p className="text-sm text-gray-500">52 años · Seguimiento mensual · Última consulta: 28/Ene/2026</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">Próxima cita</p>
                <p className="text-sm font-semibold text-gray-700">Hoy, 28/Feb/2026</p>
                <p className="text-sm font-bold" style={{ color: '#1B5E4B' }}>11:30 am</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-500 font-semibold mb-0.5">Psora</p>
                <p className="text-lg font-bold text-blue-700">50%</p>
                <div className="h-1.5 bg-blue-100 rounded-full mt-1.5"><div className="h-full rounded-full bg-blue-500" style={{ width: '50%' }}></div></div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-xl">
                <p className="text-xs text-yellow-600 font-semibold mb-0.5">Sycosis</p>
                <p className="text-lg font-bold text-yellow-700">30%</p>
                <div className="h-1.5 bg-yellow-100 rounded-full mt-1.5"><div className="h-full rounded-full bg-yellow-500" style={{ width: '30%' }}></div></div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-xl">
                <p className="text-xs text-red-500 font-semibold mb-0.5">Sífilis</p>
                <p className="text-lg font-bold text-red-700">20%</p>
                <div className="h-1.5 bg-red-100 rounded-full mt-1.5"><div className="h-full rounded-full bg-red-500" style={{ width: '20%' }}></div></div>
              </div>
            </div>
          </div>

          {/* Big record button */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-lg font-semibold text-gray-700">Inicia la consulta y graba la conversación</p>
              <p className="text-sm text-gray-400 max-w-md">
                Sumari transcribirá en tiempo real. Al terminar, Dr. Servín 5.2 generará automáticamente el expediente completo.
              </p>
            </div>

            {/* The big button */}
            <button
              onClick={onStart}
              className="group relative flex flex-col items-center gap-3 focus:outline-none"
            >
              {/* Ripple rings */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full opacity-20 scale-100 group-hover:scale-125 transition-transform duration-500" style={{ backgroundColor: '#22C55E' }}></div>
                <div className="absolute inset-0 rounded-full opacity-10 scale-100 group-hover:scale-150 transition-transform duration-700" style={{ backgroundColor: '#22C55E' }}></div>
                <div
                  className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-200 group-hover:scale-105 group-active:scale-95"
                  style={{ backgroundColor: '#22C55E' }}
                >
                  <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a4 4 0 014 4v7a4 4 0 01-8 0V5a4 4 0 014-4z" />
                    <path fillRule="evenodd" d="M5 11a1 1 0 012 0 5 5 0 0010 0 1 1 0 112 0 7 7 0 01-6 6.92V21h3a1 1 0 110 2H8a1 1 0 110-2h3v-3.08A7 7 0 015 11z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-sm tracking-wide">GRABAR</span>
                </div>
              </div>
            </button>

            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              La grabación se procesa localmente y con seguridad médica
            </p>
          </div>

          {/* Checklist below */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              { label: 'Expediente anterior cargado', ok: true },
              { label: 'Perfil miasmático disponible', ok: true },
              { label: 'Sumari activo y listo', ok: true },
              { label: 'Dr. Servín 5.2 conectado', ok: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.ok ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {item.ok
                    ? <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    : <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  }
                </div>
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

/* ─── Step 2: Recording in progress ─── */
const Recording: React.FC<{ onStop: () => void }> = ({ onStop }) => {
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lines = [
    'Dr. Servín: Buenos días Lorena, ¿cómo se ha sentido desde la última consulta?',
    'Lorena: Ha mejorado mucho el dolor lumbar, ya puedo dormir mejor.',
    'Dr. Servín: Excelente. ¿Ha seguido el plan alimenticio que le indiqué?',
    'Lorena: Sí doctor, dejé los lácteos y el azúcar refinada como me dijo.',
    'Dr. Servín: Bien. Noto que el hipotiroidismo subclínico ha mejorado en los análisis.',
    'Lorena: ¿Seguiré con los mismos medicamentos?',
    'Dr. Servín: Vamos a ajustar la potencia del Sulphur y agregar Nux Vomica...',
    'Lorena: ¿Cuándo regreso a consulta?',
    'Dr. Servín: En cuatro semanas. Continuamos con el plan de ejercicios suave.',
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsed(e => e + 1);
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (elapsed > 0 && elapsed <= lines.length * 4) {
      const idx = Math.floor((elapsed - 1) / 4);
      if (idx < lines.length && !transcript.includes(lines[idx])) {
        setTranscript(prev => [...prev, lines[idx]]);
      }
    }
  }, [elapsed]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Grabando consulta...</h1>
              <p className="text-sm text-gray-500">Lorena Arzate Aguilar · Transcripción en tiempo real</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-2xl font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
              {fmt(elapsed)}
            </div>
            <button
              onClick={onStop}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-md hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#EF4444' }}
            >
              <div className="w-3 h-3 rounded-sm bg-white"></div>
              Detener y procesar
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-3 gap-6">
        {/* Transcript */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Transcripción en vivo — Sumari</p>
              <p className="text-xs text-gray-400">Procesando audio en tiempo real</p>
            </div>
            <div className="ml-auto">
              <Waveform active={true} />
            </div>
          </div>
          <div className="flex-1 p-6 space-y-3 overflow-y-auto min-h-0">
            {transcript.length === 0 && (
              <div className="flex items-center gap-3 text-gray-400">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-sm">Esperando audio...</span>
              </div>
            )}
            {transcript.map((line, i) => {
              const isDoctor = line.startsWith('Dr.');
              return (
                <div key={i} className={`flex gap-3 ${isDoctor ? '' : 'flex-row-reverse'}`}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: isDoctor ? '#1B5E4B' : '#3B82F6' }}
                  >
                    {isDoctor ? 'Dr' : 'L'}
                  </div>
                  <div
                    className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isDoctor
                        ? 'rounded-tl-none bg-gray-50 text-gray-800 border border-gray-100'
                        : 'rounded-tr-none bg-blue-50 text-blue-900 border border-blue-100'
                    }`}
                  >
                    {line.replace(/^(Dr\. Servín|Lorena): /, '')}
                    <p className="text-xs mt-1 font-semibold opacity-50">
                      {isDoctor ? 'Dr. Servín' : 'Lorena'}
                    </p>
                  </div>
                </div>
              );
            })}
            {transcript.length > 0 && (
              <div className="flex items-center gap-2 text-gray-400 pl-10">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Live stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Estado de grabación</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Calidad de audio</span>
                  <span className="font-semibold text-green-600">Excelente</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full bg-green-500" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Palabras transcritas</span>
                  <span className="font-semibold text-gray-700">{transcript.reduce((a, l) => a + l.split(' ').length, 0)}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${Math.min((transcript.length / lines.length) * 100, 100)}%`, backgroundColor: '#2E8B6E' }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Hablantes detectados</span>
                <div className="flex gap-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#E8F5F0', color: '#1B5E4B' }}>Dr. Servín</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700">Paciente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sections to generate */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Se generará al terminar</p>
            <div className="space-y-2.5">
              {[
                { icon: '📋', label: 'Historial Clínico' },
                { icon: '💊', label: 'Receta Médica' },
                { icon: '🥗', label: 'Plan Alimenticio' },
                { icon: '🏃', label: 'Plan de Ejercicios' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                  <span className="text-base">{s.icon}</span>
                  <span className="text-sm text-gray-600 font-medium flex-1">{s.label}</span>
                  <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: '#E8F5F0', borderColor: '#B7D9CE' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#1B5E4B' }}>💡 Tip para mejor resultado</p>
            <p className="text-xs leading-relaxed" style={{ color: '#2E5947' }}>
              Mencione explícitamente los medicamentos con su potencia y las indicaciones del plan de seguimiento.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ─── Step 3: Processing / AI generating ─── */
const Processing: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);

  const tasks = [
    { label: 'Analizando transcripción con NLP médico...', duration: 800 },
    { label: 'Identificando perfil miasmático...', duration: 700 },
    { label: 'Generando historial clínico...', duration: 900 },
    { label: 'Elaborando receta médica con potencias...', duration: 700 },
    { label: 'Construyendo plan alimenticio personalizado...', duration: 800 },
    { label: 'Diseñando plan de ejercicios...', duration: 600 },
    { label: 'Revisión final con Dr. Servín 5.2...', duration: 700 },
  ];

  useEffect(() => {
    let p = 0;
    let t = 0;
    const step = () => {
      if (p >= 100) { onDone(); return; }
      const inc = 100 / tasks.length;
      p = Math.min(p + inc, 100);
      setProgress(Math.round(p));
      setCurrentTask(t);
      t = Math.min(t + 1, tasks.length - 1);
      setTimeout(step, tasks[Math.min(t, tasks.length - 1)].duration);
    };
    const timeout = setTimeout(step, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-8">
      <div className="w-full max-w-lg text-center">
        {/* Animated orb */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div
            className="absolute inset-0 rounded-full opacity-20 animate-ping"
            style={{ backgroundColor: '#1B5E4B' }}
          ></div>
          <div
            className="absolute inset-2 rounded-full opacity-30 animate-ping"
            style={{ backgroundColor: '#2E8B6E', animationDelay: '0.2s' }}
          ></div>
          <div
            className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: '#1B5E4B' }}
          >
            <svg className="w-14 h-14 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dr. Servín 5.2 está trabajando</h2>
        <p className="text-gray-500 mb-8">Generando el expediente completo a partir de la consulta...</p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: '#1B5E4B' }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">{tasks[currentTask]?.label}</span>
            <span className="text-sm font-bold" style={{ color: '#1B5E4B' }}>{progress}%</span>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left space-y-2.5">
          {tasks.map((task, i) => (
            <div key={i} className={`flex items-center gap-3 transition-opacity ${i <= currentTask ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                i < currentTask ? 'bg-green-500' : i === currentTask ? 'border-2 border-green-500 bg-white' : 'bg-gray-200'
              }`}>
                {i < currentTask
                  ? <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  : i === currentTask
                    ? <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    : null
                }
              </div>
              <span className={`text-sm ${i <= currentTask ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{task.label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Procesamiento seguro · Datos cifrados en tránsito
        </p>
      </div>
    </div>
  );
};

/* ─── Step 4: Review & Approve ─── */
const Review: React.FC = () => {
  const [sections, setSections] = useState(initialSections);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const updateStatus = (id: string, status: SectionStatus) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const handleRegenerate = (id: string) => {
    setRegenerating(id);
    setTimeout(() => {
      setRegenerating(null);
      setSections(prev => prev.map(s => s.id === id ? { ...s, status: 'pending' } : s));
    }, 2000);
  };

  const approvedCount = sections.filter(s => s.status === 'approved').length;
  const totalCount = sections.length;

  const getSectionBorder = (status: SectionStatus) => {
    if (status === 'approved') return 'border-green-200 bg-green-50/30';
    if (status === 'rejected') return 'border-red-200 bg-red-50/30';
    return 'border-amber-200 bg-amber-50/20';
  };

  const getStatusBadge = (status: SectionStatus) => {
    if (status === 'approved') return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
        Aprobado por Dr. Servín
      </span>
    );
    if (status === 'rejected') return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Regenerando...
      </span>
    );
    return <AIBadge />;
  };

  const ActionBar: React.FC<{ id: string }> = ({ id }) => {
    const section = sections.find(s => s.id === id)!;
    if (section.status !== 'pending') return null;
    return (
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2">
        <button
          onClick={() => handleRegenerate(id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rechazar y regenerar
        </button>
        <button
          onClick={() => setEditingSection(id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white transition-colors"
        >
          <EditIcon /> Editar
        </button>
        <button
          onClick={() => updateStatus(id, 'approved')}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: '#1B5E4B' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Aprobar
        </button>
      </div>
    );
  };

  /* ── Bar shown when a section is approved — includes "Regresar a edición" ── */
  const ApprovedBar: React.FC<{ id: string; time: string }> = ({ id, time }) => {
    const [confirmUndo, setConfirmUndo] = useState(false);

    if (confirmUndo) {
      return (
        <div className="px-6 py-3 border-t border-amber-100 bg-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-amber-800 font-medium">¿Regresar esta sección a edición? Se cancelará la aprobación.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setConfirmUndo(false)}
              className="text-xs px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 font-medium hover:bg-amber-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                updateStatus(id, 'pending');
                setConfirmUndo(false);
              }}
              className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: '#EAB308' }}
            >
              Sí, regresar a edición
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-6 py-3 border-t border-green-100 bg-green-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs text-green-700 font-medium">
            Aprobado por Dr. Luis Alfonso Servín · 28/Feb/2026 {time}
          </span>
        </div>
        <button
          onClick={() => setConfirmUndo(true)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:bg-white"
          style={{ color: '#1B5E4B', borderColor: '#86EFAC', backgroundColor: 'rgba(255,255,255,0.6)' }}
          title="Regresar a edición aunque ya esté aprobado"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Regresar a edición
        </button>
      </div>
    );
  };

  const RegenSpinner: React.FC = () => (
    <div className="p-12 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-600">Regenerando con Dr. Servín 5.2...</p>
      <p className="text-xs text-gray-400">Analizando perfil miasmático y datos de la consulta</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-10 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900">Consulta del 28/Feb/2026</h1>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                approvedCount === totalCount
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {approvedCount}/{totalCount} aprobadas
              </span>
            </div>
            <p className="text-base font-semibold text-gray-700">Lorena Arzate Aguilar · 52 años</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Grabada por <strong className="text-gray-700">Sumari</strong></span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1B5E4B' }}>
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">Procesada por <strong className="text-gray-700">Dr. Servín 5.2</strong></span>
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400 italic">Generado en 12 min · Manual: ~35 min</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Progreso de aprobación</span>
              <span className="text-sm font-bold text-gray-900">{approvedCount}/{totalCount}</span>
            </div>
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(approvedCount / totalCount) * 100}%`, backgroundColor: '#1B5E4B' }}
              ></div>
            </div>
            {approvedCount === totalCount && (
              <span className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded-full">
                ✓ Listo para guardar en expediente
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 space-y-5 pb-28">

        {/* ── Historial Clínico ── */}
        <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-colors ${getSectionBorder(sections[0].status)}`}>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">📋</span>
              <h2 className="text-base font-semibold text-gray-900">Historial Clínico</h2>
            </div>
            {getStatusBadge(sections[0].status)}
          </div>
          {regenerating === 'historial' ? <RegenSpinner /> : (
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">Diagnóstico Nosológico</h3>
                    <button onClick={() => setEditingSection(editingSection === 'diag' ? null : 'diag')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                      <EditIcon /> Editar
                    </button>
                  </div>
                  {editingSection === 'diag' ? (
                    <div>
                      <textarea className="w-full text-xs text-gray-700 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500" rows={4} defaultValue="Síndrome doloroso crónico lumbar&#10;Trastorno del sueño&#10;Hipotiroidismo subclínico&#10;Gastritis funcional" />
                      <button onClick={() => setEditingSection(null)} className="mt-2 text-xs px-3 py-1.5 rounded-md font-semibold text-white" style={{ backgroundColor: '#1B5E4B' }}>Guardar cambios</button>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg space-y-1.5">
                      {['Síndrome doloroso crónico lumbar', 'Trastorno del sueño', 'Hipotiroidismo subclínico', 'Gastritis funcional'].map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div>
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">Diagnóstico Miasmático</h3>
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                      <EditIcon /> Editar
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { nombre: 'Psora', pct: 50, color: '#3B82F6', bg: '#EFF6FF' },
                      { nombre: 'Sycosis', pct: 30, color: '#EAB308', bg: '#FEFCE8' },
                      { nombre: 'Sífilis', pct: 20, color: '#EF4444', bg: '#FEF2F2' },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">{m.nombre}</span>
                          <span className="font-bold" style={{ color: m.color }}>{m.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ backgroundColor: m.bg }}>
                          <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <ActionBar id="historial" />
          {sections[0].status === 'approved' && <ApprovedBar id="historial" time="10:47" />}
        </div>

        {/* ── Receta Médica ── */}
        <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-colors ${getSectionBorder(sections[1].status)}`}>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💊</span>
              <h2 className="text-base font-semibold text-gray-900">Receta Médica</h2>
            </div>
            {getStatusBadge(sections[1].status)}
          </div>
          {regenerating === 'receta' ? <RegenSpinner /> : (
            <div className="p-6 space-y-3">
              {[
                { med: 'MARSK 1 LV', potencia: '30C', instruccion: 'Una dosis en ayunas, disuelto en agua' },
                { med: 'Sulphur', potencia: '200C', instruccion: 'Una dosis semanal por las noches' },
                { med: 'Nux Vomica', potencia: '30C', instruccion: 'Tres veces al día antes de comidas' },
                { med: 'RESCUE REMEDY', potencia: 'Floral', instruccion: '4 gotas en agua, 4 veces al día' },
                { med: 'Thuja Occidentalis', potencia: '200C', instruccion: 'Una dosis quincenal' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border border-gray-100 bg-gray-50/50 hover:border-gray-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{r.med}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{r.potencia}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{r.instruccion}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors flex-shrink-0">
                    <EditIcon /> Editar
                  </button>
                </div>
              ))}
            </div>
          )}
          <ActionBar id="receta" />
          {sections[1].status === 'approved' && <ApprovedBar id="receta" time="10:49" />}
        </div>

        {/* ── Plan Alimenticio ── */}
        <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-colors ${getSectionBorder(sections[2].status)}`}>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🥗</span>
              <h2 className="text-base font-semibold text-gray-900">Plan Alimenticio</h2>
            </div>
            {getStatusBadge(sections[2].status)}
          </div>
          {regenerating === 'alimenticio' ? <RegenSpinner /> : (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    meal: 'Desayuno', emoji: '🌅',
                    items: [
                      { cat: 'Proteínas', items: ['Huevo entero (2 pzas)', 'Queso fresco'] },
                      { cat: 'Frutas', items: ['Papaya', 'Melón'] },
                      { cat: 'Grasas', items: ['Aguacate ¼', 'Aceite de oliva 1 cdta'] },
                    ]
                  },
                  {
                    meal: 'Comida', emoji: '☀️',
                    items: [
                      { cat: 'Proteínas', items: ['Pollo a la plancha', 'Pescado blanco'] },
                      { cat: 'Leguminosas', items: ['Lentejas', 'Frijol negro ½ taza'] },
                      { cat: 'Verduras A', items: ['Espinaca', 'Brócoli', 'Coliflor'] },
                    ]
                  },
                  {
                    meal: 'Cena', emoji: '🌙',
                    items: [
                      { cat: 'Proteínas', items: ['Atún natural', 'Pechuga fría'] },
                      { cat: 'Verduras B', items: ['Calabacín', 'Chayote', 'Ejotes'] },
                      { cat: 'Frutas', items: ['Manzana verde (no noche)', 'Pera'] },
                    ]
                  },
                ].map((meal, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{meal.emoji}</span>
                        <span className="text-sm font-semibold text-gray-800">{meal.meal}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors"><EditIcon /></button>
                    </div>
                    <div className="p-3 space-y-2.5">
                      {meal.items.map((cat, j) => (
                        <div key={j}>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{cat.cat}</p>
                          {cat.items.map((item, k) => (
                            <div key={k} className="flex items-center gap-1.5 text-xs text-gray-700">
                              <div className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0"></div>
                              {item}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs font-semibold text-amber-800 mb-1.5">⚠️ Restricciones importantes:</p>
                <div className="flex flex-wrap gap-2">
                  {['Evitar lácteos procesados', 'Sin azúcar refinada', 'Limitar harinas blancas', 'No alcohol', 'Evitar frituras'].map((r, i) => (
                    <span key={i} className="text-xs bg-white border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <ActionBar id="alimenticio" />
          {sections[2].status === 'approved' && <ApprovedBar id="alimenticio" time="10:52" />}
        </div>

        {/* ── Plan de Ejercicios ── */}
        <div className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-colors ${getSectionBorder(sections[3].status)}`}>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏃</span>
              <h2 className="text-base font-semibold text-gray-900">Plan de Ejercicios</h2>
            </div>
            {getStatusBadge(sections[3].status)}
          </div>
          {regenerating === 'ejercicios' ? <RegenSpinner /> : (
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    dia: 'Lunes / Miércoles / Viernes',
                    tipo: 'Ejercicio aeróbico suave',
                    actividades: ['Caminata 30 min a ritmo moderado', 'Natación 20 min (opcional)', 'Stretching 10 min al final'],
                    intensidad: 'Baja-moderada',
                    color: '#1B5E4B', bg: '#E8F5F0',
                  },
                  {
                    dia: 'Martes / Jueves',
                    tipo: 'Ejercicio de movilidad',
                    actividades: ['Yoga suave 20 min', 'Respiración diafragmática 5 min', 'Ejercicios posturales para lumbar'],
                    intensidad: 'Baja',
                    color: '#3B82F6', bg: '#EFF6FF',
                  },
                ].map((plan, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: plan.bg }}>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: plan.color }}>{plan.dia}</p>
                        <p className="text-sm font-bold text-gray-800 mt-0.5">{plan.tipo}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors"><EditIcon /></button>
                    </div>
                    <div className="p-4 space-y-2">
                      {plan.actividades.map((act, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: plan.color }}></div>
                          {act}
                        </div>
                      ))}
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <span className="text-xs font-medium text-gray-500">Intensidad: </span>
                        <span className="text-xs font-bold" style={{ color: plan.color }}>{plan.intensidad}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-xs font-semibold text-gray-700 mb-1">⚠️ Consideraciones especiales</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dado el diagnóstico de síndrome lumbar crónico, evitar ejercicios de alto impacto, sentadillas profundas y cargar peso mayor a 5 kg. Descanso completo en días de dolor agudo.
                </p>
              </div>
            </div>
          )}
          <ActionBar id="ejercicios" />
          {sections[3].status === 'approved' && <ApprovedBar id="ejercicios" time="10:55" />}
        </div>
      </main>

      {/* ── Sticky bottom bar ── */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Time saved */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tiempo de documentación</p>
                <p className="text-sm font-bold text-gray-900">
                  <span className="text-purple-700">12 min</span>
                  <span className="text-gray-400 font-normal"> vs </span>
                  <span className="line-through text-gray-400 font-normal">35 min manual</span>
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tiempo ahorrado</p>
                <p className="text-sm font-bold text-green-700">23 minutos</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-medium">Secciones:</span>
              <div className="flex gap-1">
                {sections.map((s) => (
                  <div
                    key={s.id}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      s.status === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {s.status === 'approved' ? '✓' : '·'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saved ? (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-100 text-green-800 text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Guardado en expediente
              </div>
            ) : (
              <button
                disabled={approvedCount < totalCount}
                onClick={() => setSaved(true)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  approvedCount === totalCount
                    ? 'text-white shadow-md hover:opacity-90 active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                style={approvedCount === totalCount ? { backgroundColor: '#1B5E4B' } : {}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {approvedCount === totalCount ? 'Guardar en expediente' : `Aprobar todas (${approvedCount}/${totalCount})`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Generacion component — orchestrates the flow ─── */
const Generacion: React.FC = () => {
  const [step, setStep] = useState<FlowStep>('pre');

  const handleStartRecording = () => setStep('recording');
  const handleStopRecording = () => setStep('processing');
  const handleProcessingDone = () => setStep('review');

  return (
    <>
      {step === 'pre' && <PreConsulta onStart={handleStartRecording} />}
      {step === 'recording' && <Recording onStop={handleStopRecording} />}
      {step === 'processing' && <Processing onDone={handleProcessingDone} />}
      {step === 'review' && <Review />}
    </>
  );
};

export default Generacion;
