import React, { useState } from 'react';

interface DashboardProps {
  setActivePage: (page: string) => void;
}

const today = new Date();
const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const formattedDate = `${dayNames[today.getDay()]}, ${today.getDate()} de ${monthNames[today.getMonth()]} de ${today.getFullYear()}`;

const semaforoData = [
  {
    color: '#22C55E',
    bg: '#F0FDF4',
    border: '#86EFAC',
    icon: '✅',
    count: 8,
    label: 'Al día',
    sublabel: 'Con cita en próximos 15 días',
    patients: ['Mónica Carmina Carrillo', 'María Elena Soto', 'Carlos Mendoza', 'Sofía Rodríguez', 'Angélica Torres', 'Roberto Fuentes', 'Patricia Leal', 'Enrique Vega'],
  },
  {
    color: '#EAB308',
    bg: '#FEFCE8',
    border: '#FDE047',
    icon: '⚠️',
    count: 3,
    label: 'En alerta',
    sublabel: 'Sin cita 15+ días',
    patients: ['Guadalupe Martínez', 'Ramón Espinoza', 'Fernanda Ochoa'],
  },
  {
    color: '#EF4444',
    bg: '#FEF2F2',
    border: '#FECACA',
    icon: '🔴',
    count: 3,
    label: 'En riesgo',
    sublabel: 'Sin cita 30+ días',
    patients: ['Jorge Ibarra', 'Carmen Villanueva', 'Héctor Paredes'],
  },
];

const agenda = [
  { time: '10:00', name: 'Mónica Carmina Carrillo', type: 'Seguimiento', duration: '45 min', status: 'confirmada', badge: '✅ Confirmada', badgeColor: 'bg-green-100 text-green-700', available: false, isNew: false },
  { time: '10:45', name: 'María Elena Soto', type: 'Seguimiento', duration: '45 min', status: 'confirmada', badge: '✅ Confirmada', badgeColor: 'bg-green-100 text-green-700', available: false, isNew: false },
  { time: '11:30', name: 'DISPONIBLE', type: '', duration: '', status: 'disponible', badge: '', badgeColor: '', available: true, isNew: false },
  { time: '12:00', name: 'Juan Pérez', type: 'Primera vez', duration: '1.5 hrs', status: 'prospecto', badge: '🆕 Prospecto', badgeColor: 'bg-blue-100 text-blue-700', available: false, isNew: true },
  { time: '13:30', name: 'ALMUERZO', type: '', duration: '', status: 'almuerzo', badge: '', badgeColor: '', available: false, isNew: false },
  { time: '15:00', name: 'Carlos Mendoza', type: 'Seguimiento', duration: '45 min', status: 'pendiente', badge: '🟡 Pendiente confirmar', badgeColor: 'bg-amber-100 text-amber-700', available: false, isNew: false },
  { time: '15:45', name: 'DISPONIBLE', type: '', duration: '', status: 'disponible', badge: '', badgeColor: '', available: true, isNew: false },
];

const metrics = [
  {
    label: 'Pacientes atendidos',
    value: '34',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: '#1B5E4B', bgColor: '#E8F5F0', change: '+12%',
  },
  {
    label: 'Ingresos del mes',
    value: '$27,200',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#47B5BA', bgColor: '#E6F7F8', change: '+8%',
  },
  {
    label: 'Tasa de retención',
    value: '78%',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: '#7C3AED', bgColor: '#F3EFFE', change: '+3%',
  },
  {
    label: 'Prospectos nuevos',
    value: '6',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    color: '#EA580C', bgColor: '#FFF1EA', change: '+2',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const [activeModal, setActiveModal] = useState<null | number>(null);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Buen día, Dr. Servín 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">{formattedDate} · Tijuana, B.C., México</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setActivePage('generacion')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#1B5E4B' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva consulta IA
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 space-y-6">

        {/* ── Hero Banner ── */}
        <section
          className="relative rounded-2xl overflow-hidden shadow-md"
          style={{ background: 'linear-gradient(135deg, #1B5E4B 0%, #2E8B6E 50%, #47B5BA 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10" style={{ backgroundColor: '#4AAFB4' }}></div>
          <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: '#47B5BA' }}></div>
          <div className="absolute top-6 right-40 w-20 h-20 rounded-full opacity-10 bg-white"></div>
          <div className="absolute bottom-4 right-12 w-10 h-10 rounded-full opacity-15 bg-white"></div>

          <div className="relative px-8 py-7 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">Sistema UIH activo</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                Bienvenido, Dr. Servín
              </h2>
              <p className="text-white/75 text-sm mt-1.5">
                Tiene <span className="text-white font-bold">4 consultas</span> programadas hoy
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></div>
                  <span className="text-white/90 text-xs font-semibold">Sumari listo</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4AAFB4' }}></div>
                  <span className="text-white/90 text-xs font-semibold">Dr. Servín 5.2 conectado</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                  <span className="text-white/90 text-xs font-semibold">1 revisión IA pendiente</span>
                </div>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Consultas hoy', value: '4', emoji: '🗓️' },
                { label: 'Pendiente IA', value: '1', emoji: '🤖' },
                { label: 'Alertas', value: '6', emoji: '⚠️' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center px-5 py-4 rounded-2xl min-w-[96px] text-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
                >
                  <span className="text-xl mb-1">{stat.emoji}</span>
                  <span className="text-2xl font-bold text-white leading-none">{stat.value}</span>
                  <span className="text-white/60 text-xs mt-1 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Semáforo Cards ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-700">Seguimiento de Pacientes</h2>
            <span className="text-xs text-gray-400">14 pacientes totales en seguimiento</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {semaforoData.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveModal(i)}
                className="text-left p-5 rounded-xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
                style={{ backgroundColor: item.bg, borderColor: item.border }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <span className="text-2xl font-bold" style={{ color: item.color }}>{item.count}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: item.color }}>
                    {item.label}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: item.color }}>{item.count}</p>
                <p className="text-sm font-medium text-gray-700">pacientes</p>
                <p className="text-xs text-gray-500 mt-1">{item.sublabel}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: item.color }}>
                  <span>Ver lista</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-5 gap-6">
          {/* Agenda */}
          <section className="col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Agenda de Hoy</h2>
                <p className="text-xs text-gray-400 mt-0.5">Viernes 28 de Febrero, 2026</p>
              </div>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Ver semana →
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {agenda.map((slot, i) => {
                if (slot.status === 'almuerzo') {
                  return (
                    <div key={i} className="px-6 py-3 flex items-center gap-4 bg-gray-50">
                      <span className="text-xs font-mono font-medium text-gray-400 w-12">{slot.time}</span>
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-medium">ALMUERZO (1.5 hrs)</span>
                      </div>
                    </div>
                  );
                }
                if (slot.available) {
                  return (
                    <div key={i} className="px-6 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                      <span className="text-xs font-mono font-medium text-gray-400 w-12">{slot.time}</span>
                      <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">— Horario disponible</span>
                        <button className="text-xs font-semibold px-2.5 py-1 rounded-md text-white" style={{ backgroundColor: '#2E8B6E' }}>
                          + Agendar
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="px-6 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                    <span className="text-xs font-mono font-medium text-gray-400 w-12">{slot.time}</span>
                    <div
                      className="w-1 h-10 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: slot.status === 'confirmada' ? '#22C55E' : slot.status === 'pendiente' ? '#EAB308' : '#3B82F6',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => slot.name === 'Mónica Carmina Carrillo' && setActivePage('expediente')}
                          className="text-sm font-semibold text-gray-900 hover:underline text-left"
                        >
                          {slot.name}
                        </button>
                        {slot.isNew && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">1ª vez</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{slot.type} · {slot.duration}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${slot.badgeColor}`}>
                      {slot.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Right column */}
          <div className="col-span-2 space-y-5">
            {/* Metrics */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Métricas del Mes</h2>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-xl" style={{ backgroundColor: m.bgColor }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: m.color + '25' }}>
                        <div style={{ color: m.color }}>{m.icon}</div>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        {m.change}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{m.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Acciones Rápidas</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setActivePage('expediente')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F5F0' }}>
                    <svg className="w-4 h-4" fill="none" stroke="#1B5E4B" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Ver expediente de hoy</span>
                  <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActivePage('generacion')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">Revisión pendiente IA</span>
                    <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">1</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors text-left">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-50">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Reporte mensual</span>
                  <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </section>

            {/* Sumari + Dr. Servín 5.2 badge */}
            <div
              className="rounded-xl p-4 border"
              style={{ background: 'linear-gradient(135deg, #E8F5F0, #E0F5F6)', borderColor: '#B7D9CE' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1B5E4B' }}>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-green-900">Sumari · Grabación activa</span>
                </div>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#47B5BA' }}></div>
              </div>
              <p className="text-xs text-green-800 leading-relaxed">
                Listo para grabar su próxima consulta. Toque <strong>"Nueva consulta IA"</strong> para iniciar con Dr. Servín 5.2.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Semáforo Modal */}
      {activeModal !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{ backgroundColor: semaforoData[activeModal].bg, borderBottom: `2px solid ${semaforoData[activeModal].border}` }}
            >
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Pacientes {semaforoData[activeModal].label}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{semaforoData[activeModal].sublabel}</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              {semaforoData[activeModal].patients.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: semaforoData[activeModal].color }}
                    >
                      {p.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{p}</span>
                  </div>
                  <button className="text-xs font-medium px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
                    Agendar
                  </button>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#1B5E4B' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
