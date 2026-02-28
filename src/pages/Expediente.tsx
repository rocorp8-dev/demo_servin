import React, { useState } from 'react';

const consultas = [
  { fecha: '28 Feb 2026', tipo: 'Seguimiento', nota: 'Mejoría en movilidad articular. Reduce dolor lumbar 70%. Continúa MARSK 3.', activo: true },
  { fecha: '14 Feb 2026', tipo: 'Seguimiento', nota: 'Paciente refiere sueño más profundo. Se ajusta dosis de TCM.', activo: false },
  { fecha: '31 Ene 2026', tipo: 'Seguimiento', nota: 'Respuesta positiva a RESCUE. Continúa con plan alimenticio.', activo: false },
  { fecha: '17 Ene 2026', tipo: 'Seguimiento', nota: 'Primer control post-diagnóstico. Se inicia MARSK 3 200CC.', activo: false },
  { fecha: '03 Ene 2026', tipo: 'Primera vez', nota: 'Diagnóstico inicial. Anamnesis completa. Psora dominante con componente sycótico.', activo: false },
];

const miasmas = [
  { nombre: 'Psora', porcentaje: 45, color: '#3B82F6', bg: '#EFF6FF' },
  { nombre: 'Sycosis', porcentaje: 35, color: '#EAB308', bg: '#FEFCE8' },
  { nombre: 'Sífilis', porcentaje: 20, color: '#EF4444', bg: '#FEF2F2' },
];

const tratamiento = [
  { nombre: 'MARSK 3 200CC', categoria: 'Medicamento base', icono: '💊', frecuencia: 'Cada 8 hrs' },
  { nombre: 'MARSK 4 LV', categoria: 'Medicamento base', icono: '💊', frecuencia: 'En ayunas' },
  { nombre: 'RESCUE', categoria: 'Floral Bach', icono: '🌸', frecuencia: 'SOS / 4 gotas' },
  { nombre: 'TCM', categoria: 'Medicina Tradicional China', icono: '🌿', frecuencia: 'Diario, 30 min' },
  { nombre: 'Sueros IV', categoria: 'Terapia de soporte', icono: '💉', frecuencia: 'Semanal' },
  { nombre: 'Ampollas médula ósea', categoria: 'Terapia celular', icono: '🔬', frecuencia: 'Quincenal' },
];

const printSections = [
  { id: 'ficha', label: 'Ficha de identificación', checked: true },
  { id: 'historial', label: 'Historial de consultas', checked: true },
  { id: 'diagnosticos', label: 'Diagnósticos miasmáticos', checked: true },
  { id: 'receta', label: 'Receta médica', checked: true },
  { id: 'alimenticio', label: 'Plan alimenticio', checked: false },
  { id: 'ejercicios', label: 'Plan de ejercicios', checked: false },
  { id: 'consentimiento', label: 'Consentimiento informado', checked: false },
  { id: 'notas', label: 'Notas de evolución', checked: true },
];

const Expediente: React.FC = () => {
  const [showPrint, setShowPrint] = useState(false);
  const [sections, setSections] = useState(printSections);
  const [editingMiasma, setEditingMiasma] = useState<number | null>(null);
  const [miasmaValues, setMiasmaValues] = useState(miasmas.map(m => m.porcentaje));

  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-start justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#1B5E4B' }}>
            MC
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">Mónica Carmina Carrillo</h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Al día
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              74 años · Femenino · Tijuana, B.C. ·
              <span className="ml-1 font-medium text-gray-600">Exp. #00142</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Llamar
          </button>
          <button
            onClick={() => setShowPrint(!showPrint)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: '#1B5E4B' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir expediente
          </button>
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="grid grid-cols-5 gap-6">
          {/* Timeline */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Historial de consultas</h2>
                <span className="text-xs text-gray-400">5 consultas</span>
              </div>
              <div className="p-5">
                <div className="relative">
                  <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gray-200"></div>
                  <div className="space-y-0">
                    {consultas.map((c, i) => (
                      <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              c.activo ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'
                            }`}
                          >
                            {c.activo && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                        </div>
                        <div className={`flex-1 pb-1 ${c.activo ? 'opacity-100' : 'opacity-80'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold ${c.activo ? 'text-green-700' : 'text-gray-500'}`}>
                              {c.fecha}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              c.tipo === 'Primera vez' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {c.tipo}
                            </span>
                          </div>
                          <div className={`p-3 rounded-lg text-xs text-gray-600 leading-relaxed ${c.activo ? 'bg-green-50 border border-green-100' : 'bg-gray-50'}`}>
                            {c.nota}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="col-span-3 space-y-5">
            {/* Diagnóstico Miasmático */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Diagnóstico Miasmático</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                  Última actualización: 28/Feb/2026
                </span>
              </div>
              <div className="p-6 space-y-4">
                {miasmas.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }}></div>
                        <span className="text-sm font-semibold text-gray-800">{m.nombre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {editingMiasma === i ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={miasmaValues[i]}
                              onChange={(e) => {
                                const newVals = [...miasmaValues];
                                newVals[i] = parseInt(e.target.value);
                                setMiasmaValues(newVals);
                              }}
                              className="w-24 accent-green-600"
                            />
                            <button
                              onClick={() => setEditingMiasma(null)}
                              className="text-xs px-2 py-1 bg-green-600 text-white rounded-md font-medium"
                            >
                              OK
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="text-sm font-bold" style={{ color: m.color }}>{miasmaValues[i]}%</span>
                            <button
                              onClick={() => setEditingMiasma(i)}
                              className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Editar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: m.bg }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${miasmaValues[i]}%`, backgroundColor: m.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tratamiento actual */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Tratamiento Actual</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Generado por <strong>Dr. Servín 5.2</strong> · Aprobado el 15/Feb/2026</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Editar
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {tratamiento.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50">
                      <span className="text-xl">{t.icono}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{t.nombre}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.categoria}</p>
                        <span className="inline-block mt-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          {t.frecuencia}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-blue-700 leading-relaxed">
                <strong>Próxima cita:</strong> 28 de Febrero, 2026 a las 10:00 hrs · El paciente fue contactado por WhatsApp el 25/Feb/2026 para confirmar.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Print Panel */}
      {showPrint && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 backdrop-blur-sm" onClick={() => setShowPrint(false)}>
          <div
            className="bg-white w-full max-w-3xl rounded-t-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Imprimir para expediente físico</h3>
                <p className="text-sm text-gray-500 mt-0.5">Selecciona las secciones que deseas incluir</p>
              </div>
              <button onClick={() => setShowPrint(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-5">
              {sections.map((s) => (
                <label
                  key={s.id}
                  className={`flex items-start gap-2.5 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    s.checked ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={s.checked}
                    onChange={() => toggleSection(s.id)}
                    className="mt-0.5 accent-green-600 w-4 h-4 flex-shrink-0"
                  />
                  <span className={`text-xs font-medium leading-tight ${s.checked ? 'text-green-800' : 'text-gray-600'}`}>
                    {s.label}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: '#1B5E4B' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir selección ({sections.filter(s => s.checked).length} secciones)
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 text-gray-700 border-gray-200 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar PDF completo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expediente;
