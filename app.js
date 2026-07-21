'use strict';
/* ================================================================
   BLOOM 🌸 — compañía diaria de alimentación, medicamentos y bienestar
   Calendario por día · plan importable · recetas propias · tema manual
   Zona horaria fija: America/Bogota. Datos solo en este dispositivo.
   ================================================================ */

/* ---------- Plan semilla (editable importando un .json en Ajustes) ---------- */
const PLAN_SEMILLA = [
  {
    id:'despertar', nombre:'Al despertar', emoji:'🌅',
    fijos:[{id:'d-agua', em:'💧', lb:'Vaso de agua con limón'}],
    meds:[], opciones:null, extra:null
  },
  {
    id:'desayuno', nombre:'Desayuno', emoji:'🍳',
    fijos:[
      {id:'de-agua', em:'💧', lb:'Vaso pequeño de agua'},
      {id:'de-prob', em:'✨', lb:'Probióticos Milenium'}
    ],
    meds:[{id:'de-bupropion', em:'💊', lb:'Bupropión'}],
    opciones:[
      {em:'🥪', lb:'Sánduche', dt:'2 panes integrales + 2 jamón + 1 queso + 2 cdas de aguacate'},
      {em:'🥣', lb:'Avena con fresa', dt:'4 cdas de avena + 50 ml leche + fresa + 150 ml yogur griego + 1 cda de chía'},
      {em:'🧇', lb:'Waffles proteicos', dt:'50 ml agua + 1 scoop de mezcla + 1 cda de crema de maní + fruta'},
      {em:'🌯', lb:'Burrito', dt:'Tortilla + verduras al gusto + 100 g pollo + 1 lonchita de queso · alternar la tortilla con galletas saladas'}
    ],
    extra:{id:'de-tinto', em:'☕', lb:'1 tinto sin azúcar'}
  },
  {
    id:'almuerzo', nombre:'Almuerzo', emoji:'🍽️',
    fijos:[
      {id:'al-agua', em:'💧', lb:'Vaso mediano de agua', dt:'250 ml'},
      {id:'al-prob', em:'✨', lb:'Probióticos Milenium'},
      {id:'al-omega', em:'🐟', lb:'Omega 3', omega:true}
    ],
    meds:[],
    opciones:[
      {em:'🍗', lb:'Pollo con arroz', dt:'120 g pollo + 80 g arroz + tomate al gusto'},
      {em:'🥔', lb:'Papa criolla con pollo', dt:'108 g papa criolla asada + 120 g pollo + 2 cdas de guacamole'},
      {em:'🥗', lb:'Sopa con ensalada', dt:'1 cucharón y medio de sopa + ensalada + ¼ de aguacate + 2 cdas de arroz'},
      {em:'🍲', lb:'Cazuela', dt:'Libre'}
    ],
    extra:{id:'al-bebida', em:'🍹', lb:'Bebida', dt:'Soda con frutos rojos · infusión fría Tosh · agua de limón · infusión de menta o hierbabuena'},
    nota:'<b>Proteína:</b> 4–5 veces carnes blancas y 2–3 veces carnes rojas por semana · cada plato: 2 harinas + 2 grasas + 1½ verduras + 1 porción de proteína + agua Omega American Health'
  },
  {
    id:'mediatarde', nombre:'Media tarde', emoji:'🥭',
    fijos:[], meds:[],
    opciones:[
      {em:'🥭', lb:'Mango biche con tajín', dt:'112 g, 1 unidad pequeña'},
      {em:'🍮', lb:'Yogur natural con gelatina', dt:'Gelatina 140 g + yogur natural fat free 100 ml'},
      {em:'🫐', lb:'Arándanos', dt:'93 g'},
      {em:'🥜', lb:'Marañones, almendras o nueces de Brasil', dt:'30 g · 3 cdas soperas colmadas'}
    ],
    extra:null
  },
  {
    id:'cena', nombre:'Cena', emoji:'🌙',
    fijos:[
      {id:'ce-agua', em:'💧', lb:'Vaso mediano de agua', dt:'250 ml'},
      {id:'ce-prob', em:'✨', lb:'Probióticos Milenium'}
    ],
    meds:[
      {id:'ce-pregabalina', em:'💊', lb:'Pregabalina'},
      {id:'ce-lamotrigina', em:'💊', lb:'Lamotrigina'},
      {id:'ce-rosuvastatina', em:'💊', lb:'Rosuvastatina'}
    ],
    opciones:[
      {em:'🥗', lb:'Ensalada de atún', dt:'Verduras al gusto'},
      {em:'🍅', lb:'Crema de tomate con pollo', dt:'2 cucharones (100 ml) + pollo + tomate + 1 cda de aceite de oliva'},
      {em:'🥤', lb:'Batido de proteína', dt:'Scoop de proteína + fruta + 200 ml de leche de avena'},
      {em:'🥦', lb:'Verduras con proteína', dt:'Al gusto'}
    ],
    extra:{id:'ce-infusion', em:'🍵', lb:'Infusión de frutos amarillos'}
  }
];
const COLORES = ['--b1','--b2','--b3','--b4','--b5'];
const HORAS_DEF = {despertar:'05:00', desayuno:'10:00', almuerzo:'12:30', mediatarde:'16:00', cena:'19:00'};

/* Frases con enfoque de recuperación: autocompasión, comida como cuidado,
   progreso imperfecto, cero culpa. Nada que premie restricción ni cargue peso moral. */
const FRASES = [
  'Comer también es cuidarte.',
  'Tu valor no se mide en una báscula.',
  'La recuperación no es una línea recta, y así está bien.',
  'Hoy solo tienes que ocuparte de hoy.',
  'Nutrirte es un acto de valentía.',
  'Tu cuerpo es tu casa: trátalo como hogar, no como enemigo.',
  'Un día difícil no borra todo lo que has caminado.',
  'Ser amable contigo también cuenta como progreso.',
  'La meta nunca fue la perfección: es la constancia.',
  'Cada comida completa es un acto de amor propio.',
  'Descansar también es avanzar.',
  'Tus medicamentos a tiempo son una forma de abrazarte.',
  'Mereces nutrirte hoy y todos los días.',
  'El progreso a veces no se ve. Igual está sucediendo.',
  'Tu cuerpo está de tu lado. Escúchalo con paciencia.',
  'La comida es energía, cuidado y también disfrute.',
  'Mereces sentarte a la mesa en paz.',
  'Poco a poco también es un ritmo válido.',
  'Recuperarte es de las cosas más valientes que harás.',
  'No estás sola en este camino.',
  'Cada casilla que marcas es una promesa que te cumples.',
  'Hoy es otra oportunidad de tratarte bien.',
  'Lo que haces con cariño todos los días, transforma.',
  'Confía en tu proceso, incluso en los días lentos.',
  'Un vaso de agua también es una forma de decirte "te cuido".',
  'Si hoy no salió como querías, mañana te espera sin culpa.',
  'Compárate solo con quien fuiste ayer — y con compasión.',
  'Comer no se gana ni se merece: es tu derecho.',
  'La voz que te critica no es la tuya. La tuya es la que te cuida.',
  'Hoy también cuenta, aunque no sea perfecto.',
  'Pedir ayuda también es fuerza.',
  'Tu desayuno de hoy es un ladrillo de tu recuperación.',
  'No eres un número: eres una historia en camino.',
  'Celebra lo pequeño: hoy también te elegiste.',
  'La constancia amable llega más lejos que la exigencia dura.',
  'Tu bienestar vale más que cualquier meta de espejo.',
  'Respira. Un paso, una comida, un día a la vez.',
  'Cuidarte no es egoísmo: es la base de todo lo demás.',
  'Los hábitos que siembras hoy te sostendrán mañana.',
  'Estás más cerca que ayer, aunque no lo sientas.',
  'Que tu plato sea paz y no batalla.',
  'Tu esfuerzo silencioso de hoy también es heroico.',
  'Sanar toma tiempo. Date ese tiempo sin pelear con él.',
  'Puedes empezar de nuevo las veces que necesites.',
  'Tu historia no la escribe una talla.',
  'La meta es comer en paz, no en guerra.',
  'Cada día que te cuidas, tu cuerpo lo agradece en silencio.',
  'Ser constante no es no caerse: es volver con ternura.',
  'Hoy mereces el mismo cariño que le darías a alguien que amas.',
  'Tu recuperación va primero. Todo lo demás puede esperar.',
  'El espejo no sabe nada de tu risa, tu fuerza ni tu historia.',
  'Marca tu día con orgullo: estás haciendo algo difícil.',
  'La báscula mide el peso. No mide tu valor, tu luz ni tu camino.',
  'Aliméntate como quien riega su propio jardín.',
  'No hay comidas "buenas" o "malas": hay cuidado y equilibrio.',
  'Tu cuerpo te acompaña desde el primer día. Hagan las paces.',
  'Un momento difícil no te define: eres más grande que un instante.',
  'Las rachas también se construyen con días imperfectos.',
  'Vas bien. Aunque hoy no lo parezca, vas bien.',
  'Gracias por no rendirte contigo.'
];

const FELICITACIONES = [
  '¡Día completo! Cuidarte así, con esta constancia, es enorme.',
  'Todo marcado. Hoy te trataste con el cariño que mereces.',
  'Plan completo y medicamentos al día. Tu recuperación te lo agradece.',
  'Otro día construido con paciencia y valentía. Bravo.',
  'Hoy te nutriste, te cuidaste y cumpliste. Eso vale oro.',
  'Un día más eligiéndote. Así se sana.'
];

/* ---------- Estado ---------- */
const LS_KEY = 'planvital.v1';
const DEFAULTS = {
  settings:{ times:{...HORAS_DEF}, notif:false, meta:null, nombre:'', tema:'auto', acento:'verde', acentoHex:null },
  plan:null,   // null = usa PLAN_SEMILLA
  recetas:[],  // [{id, nombre, bloque, opcion, ing, prep, categoria, origen?}]
  planSembrado:false, // ya se crearon recetas a partir de las opciones del plan
  bebidasSembradas:false, // ya se crearon recetas de bebida desde los extras
  days:{},     // 'YYYY-MM-DD' -> {checks:{}, opts:{}, rec:{bloqueId:recetaId}}
  pesos:[],    // [{d, kg}]
  notified:{}
};
let S = load();
function load(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return structuredClone(DEFAULTS);
    const d = JSON.parse(raw);
    return {
      settings:{...structuredClone(DEFAULTS.settings), ...(d.settings||{}), times:{...HORAS_DEF, ...((d.settings||{}).times||{})}},
      plan:d.plan||null, recetas:d.recetas||[], planSembrado:!!d.planSembrado, bebidasSembradas:!!d.bebidasSembradas,
      days:d.days||{}, pesos:d.pesos||[], notified:d.notified||{}
    };
  }catch(e){ return structuredClone(DEFAULTS); }
}
function save(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){} }
function plan(){ return S.plan || PLAN_SEMILLA; }
function colorDe(i){ return COLORES[i % COLORES.length]; }
function horaDe(bId){ return S.settings.times[bId] || HORAS_DEF[bId] || '12:00'; }

/* ---------- Utilidades ---------- */
function esc(s){
  return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escNota(s){ // permite solo <b> en las notas del plan
  return esc(s).replace(/&lt;(\/?)b&gt;/g, '<$1b>');
}

/* ---------- Fecha/hora en Bogotá ---------- */
function bogota(){
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Bogota', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23'}).formatToParts(new Date());
  const g = t => parts.find(p=>p.type===t).value;
  return {date:`${g('year')}-${g('month')}-${g('day')}`, hm:`${g('hour')}:${g('minute')}`};
}
function fechaBonita(dateStr){
  const d = new Date(dateStr+'T12:00:00-05:00');
  return d.toLocaleDateString('es-CO', {timeZone:'America/Bogota', weekday:'long', day:'numeric', month:'long'});
}
function fechaCorta(dateStr){
  const d = new Date(dateStr+'T12:00:00-05:00');
  return d.toLocaleDateString('es-CO', {timeZone:'America/Bogota', weekday:'short', day:'numeric', month:'short'}).replace(/\./g,'');
}
function diasAtras(dateStr, n){
  const d = new Date(dateStr+'T12:00:00Z');
  d.setUTCDate(d.getUTCDate()-n);
  return d.toISOString().slice(0,10);
}
function hora12(hm){
  const [h,m] = hm.split(':').map(Number);
  const ap = h < 12 ? 'a. m.' : 'p. m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2,'0')} ${ap}`;
}

/* ---------- Día visible (calendario) ---------- */
let viewDate = bogota().date;

/* ---------- Cálculo de puntos ---------- */
function dayData(dateStr){
  if(!S.days[dateStr]) S.days[dateStr] = {checks:{}, opts:{}, rec:{}, recBebida:{}};
  if(!S.days[dateStr].rec) S.days[dateStr].rec = {};
  if(!S.days[dateStr].recBebida) S.days[dateStr].recBebida = {};
  return S.days[dateStr];
}
// Categoría de una receta (compatibilidad: sin categoría = comida)
function catReceta(r){ return r.categoria === 'bebida' ? 'bebida' : 'comida'; }
function statsDe(dateStr){
  const d = S.days[dateStr] || {checks:{}, opts:{}};
  let total=0, hechos=0, medsT=0, medsH=0;
  for(const b of plan()){
    for(const f of b.fijos){ total++; if(d.checks[f.id]) hechos++; }
    for(const m of b.meds){ total++; medsT++; if(d.checks[m.id]){ hechos++; medsH++; } }
    if(b.opciones && b.opciones.length){ total++; if(d.opts[b.id]!=null) hechos++; }
  }
  const pct = total ? Math.round(hechos/total*100) : 0;
  return {total, hechos, medsT, medsH, pct, cumplido: medsH===medsT && pct>=80, perfecto: total>0 && hechos===total};
}
function tieneRegistros(dateStr){
  const d = S.days[dateStr];
  return !!(d && (Object.keys(d.checks).some(k=>d.checks[k]) || Object.keys(d.opts).length>0));
}
function rachas(){
  const hoy = bogota().date;
  let actual = 0;
  let cursor = statsDe(hoy).cumplido ? hoy : diasAtras(hoy,1);
  while(statsDe(cursor).cumplido){ actual++; cursor = diasAtras(cursor,1); }
  const fechas = Object.keys(S.days).filter(f=>statsDe(f).cumplido).sort();
  let mejor=0, run=0, prev=null;
  for(const f of fechas){
    run = (prev && diasAtras(f,1)===prev) ? run+1 : 1;
    if(run>mejor) mejor=run;
    prev=f;
  }
  return {actual, mejor:Math.max(mejor, actual)};
}

/* ---------- Frase del día ---------- */
function fraseDelDia(dateStr){
  const n = Math.floor(new Date(dateStr+'T12:00:00Z').getTime()/86400000);
  return FRASES[n % FRASES.length];
}

/* ---------- Tema ---------- */
function aplicarTema(){
  const t = S.settings.tema || 'auto';
  if(t==='auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  document.querySelectorAll('[data-tema]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tema===t)));
}
document.querySelectorAll('[data-tema]').forEach(b => {
  b.addEventListener('click', () => { S.settings.tema = b.dataset.tema; save(); aplicarTema(); });
});

/* ---------- Color de la app (acento) ---------- */
const ACENTOS = [
  {id:'verde',     nombre:'Menta',   hex:'#A9DCC0'},
  {id:'azul',      nombre:'Cielo',   hex:'#AECBEB'},
  {id:'indigo',    nombre:'Lila',    hex:'#C3BCEC'},
  {id:'frambuesa', nombre:'Rosa',    hex:'#F2BCCB'},
  {id:'terracota', nombre:'Durazno', hex:'#F5C8A4'},
  {id:'turquesa',  nombre:'Agua',    hex:'#A6DEDC'}
];
/* Texto oscuro sobre colores claros, blanco sobre colores fuertes */
function tintaPara(hex){
  const n = parseInt(hex.slice(1), 16);
  const lin = c => { c/=255; return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  const lum = 0.2126*lin(n>>16 & 255) + 0.7152*lin(n>>8 & 255) + 0.0722*lin(n & 255);
  return lum > 0.35 ? '#2A322C' : '#FFFFFF';
}
/* Variante intensa del color elegido: mismo tono, luminosidad fija */
function hexAHsl(hex){
  const n = parseInt(hex.slice(1), 16);
  const r = (n>>16 & 255)/255, g = (n>>8 & 255)/255, b = (n & 255)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b), l = (max+min)/2;
  if(max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d/(2-max-min) : d/(max+min);
  let h;
  if(max === r) h = ((g-b)/d + (g<b ? 6 : 0));
  else if(max === g) h = (b-r)/d + 2;
  else h = (r-g)/d + 4;
  return [h/6, s, l];
}
function hslAHex(h, s, l){
  const k = n => (n + h*12) % 12;
  const a = s * Math.min(l, 1-l);
  const f = n => { const c = l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1))); return Math.round(c*255).toString(16).padStart(2,'0'); };
  return '#' + f(0) + f(8) + f(4);
}
function variante(hex, luz, satMin){
  const [h, s, _l] = hexAHsl(hex);
  return hslAHex(h, Math.max(s, satMin), luz);
}
function acentoActual(){
  if(S.settings.acento === 'custom' && /^#[0-9a-fA-F]{6}$/.test(S.settings.acentoHex||''))
    return {id:'custom', nombre:'Personalizado ' + S.settings.acentoHex.toUpperCase(), hex:S.settings.acentoHex};
  return ACENTOS.find(x => x.id === (S.settings.acento||'verde')) || ACENTOS[0];
}
function aplicarAcento(){
  const a = acentoActual();
  const tinta = tintaPara(a.hex);
  const fuerteClaro = variante(a.hex, 0.33, 0.30);  // para leer sobre fondos claros
  const fuerteOscuro = variante(a.hex, 0.72, 0.28); // para leer sobre fondos oscuros
  /* Timeline en subtonos del color elegido: se profundiza del amanecer a la noche,
     con un matiz apenas más cálido en la mañana y más frío en la noche */
  const [h, s] = hexAHsl(a.hex);
  const sat = s < 0.05 ? s : Math.max(s, 0.28); // los grises se quedan grises
  const matices = [0.045, 0.02, 0, -0.02, -0.045];
  const LUZ_DIA = [0.58, 0.51, 0.44, 0.37, 0.30];
  const LUZ_NOCHE = [0.56, 0.62, 0.68, 0.74, 0.80];
  const tonos = luces => matices.map((m, i) => hslAHex((h + m + 1) % 1, sat, luces[i]));
  const bDia = tonos(LUZ_DIA), bNoche = tonos(LUZ_NOCHE);
  const vars = b => b.map((hex, i) => `--b${i+1}:${hex}`).join('; ');
  let el = document.getElementById('acentoStyle');
  if(!el){
    el = document.createElement('style');
    el.id = 'acentoStyle';
    // al final del body para ganar en orden de cascada al estilo principal
    (document.body || document.documentElement).appendChild(el);
  }
  const claro = `--accent:${a.hex}; --accent-ink:${tinta}; --accent-strong:${fuerteClaro}; ${vars(bDia)}`;
  const oscuro = `--accent:${a.hex}; --accent-ink:${tinta}; --accent-strong:${fuerteOscuro}; ${vars(bNoche)}`;
  el.textContent = `
    :root{${claro}}
    @media (prefers-color-scheme: dark){ :root{${oscuro}} }
    :root[data-theme="dark"]{${oscuro}}
    :root[data-theme="light"]{${claro}}`;
  document.querySelectorAll('[data-acento]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.acento===a.id)));
  const nom = document.getElementById('acentoNombre');
  if(nom) nom.textContent = 'Color: ' + a.nombre;
  const picker = document.getElementById('acentoCustom');
  if(picker) picker.value = a.hex;
}
document.querySelectorAll('button[data-acento]').forEach(b => {
  b.addEventListener('click', () => { S.settings.acento = b.dataset.acento; save(); aplicarAcento(); });
});
const pickerAcento = document.getElementById('acentoCustom');
if(pickerAcento){
  pickerAcento.addEventListener('input', e => {
    S.settings.acento = 'custom';
    S.settings.acentoHex = e.target.value;
    aplicarAcento();
  });
  pickerAcento.addEventListener('change', () => save());
}

/* ---------- Render: cabecera ---------- */
function renderCabecera(){
  const {date, hm} = bogota();
  document.getElementById('fechaHoy').textContent = fechaBonita(date);
  const h = +hm.split(':')[0];
  const saludo = h<12 ? 'Buenos días' : h<18 ? 'Buenas tardes' : 'Buenas noches';
  const nom = S.settings.nombre ? `, ${S.settings.nombre}` : '';
  document.getElementById('saludo').textContent = `${saludo}${nom} 🌸`;
  document.getElementById('fraseDia').textContent = '“' + fraseDelDia(date) + '”';
}

/* ---------- Navegador de días ---------- */
function renderDiaNav(){
  const hoy = bogota().date;
  const esHoy = viewDate === hoy;
  document.getElementById('diaLabel').textContent = esHoy ? `Hoy · ${fechaCorta(viewDate)}` : fechaBonita(viewDate);
  document.getElementById('diaNext').disabled = esHoy;
  document.getElementById('btnVolverHoy').classList.toggle('on', !esHoy);
  document.getElementById('avisoPasado').classList.toggle('on', !esHoy);
  document.getElementById('resumenTitulo').textContent = esHoy ? 'Progreso de hoy' : 'Progreso del día';
}
function irADia(dateStr){
  const hoy = bogota().date;
  if(dateStr > hoy) dateStr = hoy;
  viewDate = dateStr;
  renderDiaNav();
  renderTimeline();
  if(!document.getElementById('calendario').hidden){ calMes = viewDate.slice(0,7); renderCalendario(); }
}
document.getElementById('diaPrev').addEventListener('click', ()=> irADia(diasAtras(viewDate,1)));
document.getElementById('diaNext').addEventListener('click', ()=> irADia(diasAtras(viewDate,-1)));
document.getElementById('btnVolverHoy').addEventListener('click', ()=> irADia(bogota().date));

/* ---------- Calendario desplegable con días de racha ---------- */
let calMes = null; // 'YYYY-MM' del mes visible
function mesVecino(ym, delta){
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m-1+delta, 1)).toISOString().slice(0,7);
}
function toggleCalendario(){
  const cal = document.getElementById('calendario');
  const abierto = !cal.hidden;
  if(abierto){
    cal.hidden = true;
  } else {
    calMes = viewDate.slice(0,7);
    renderCalendario();
    cal.hidden = false;
  }
  document.getElementById('diaCentro').setAttribute('aria-expanded', String(!abierto));
}
document.getElementById('diaCentro').addEventListener('click', toggleCalendario);
function renderCalendario(){
  const hoy = bogota().date;
  const [y, m] = calMes.split('-').map(Number);
  const nDias = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const primerDow = (new Date(Date.UTC(y, m-1, 1)).getUTCDay() + 6) % 7; // lunes = 0
  const mesLabel = new Date(Date.UTC(y, m-1, 1)).toLocaleDateString('es-CO', {timeZone:'UTC', month:'long', year:'numeric'});
  const r = rachas();
  let html = `<div class="cal-cab">
    <button class="cal-nav" id="calPrev" aria-label="Mes anterior">‹</button>
    <span class="cal-mes">${mesLabel}</span>
    <button class="cal-nav" id="calNext" aria-label="Mes siguiente" ${calMes >= hoy.slice(0,7) ? 'disabled' : ''}>›</button>
  </div><div class="cal-grid">`;
  for(const d of ['L','M','X','J','V','S','D']) html += `<span class="cal-sem">${d}</span>`;
  for(let i=0; i<primerDow; i++) html += `<span></span>`;
  for(let dia=1; dia<=nDias; dia++){
    const f = `${calMes}-${String(dia).padStart(2,'0')}`;
    const futuro = f > hoy;
    const clases = ['cal-dia'];
    if(!futuro){
      if(statsDe(f).cumplido) clases.push('racha');
      else if(tieneRegistros(f)) clases.push('parcial');
    }
    if(f === viewDate) clases.push('sel');
    if(f === hoy) clases.push('hoy');
    html += `<button class="${clases.join(' ')}" data-caldia="${f}" ${futuro?'disabled':''} aria-label="${fechaBonita(f)}">${dia}</button>`;
  }
  html += `</div><div class="cal-pie">
    <span><span class="dot" style="background:var(--accent)"></span>Día de racha</span>
    <span><span class="dot" style="background:color-mix(in srgb, var(--accent) 18%, var(--card)); border:1px solid var(--line)"></span>Con registros</span>
    <span class="cal-racha">🔥 ${r.actual} ${r.actual===1?'día':'días'}</span>
  </div>`;
  const cal = document.getElementById('calendario');
  cal.innerHTML = html;
  document.getElementById('calPrev').addEventListener('click', () => { calMes = mesVecino(calMes, -1); renderCalendario(); });
  document.getElementById('calNext').addEventListener('click', () => { calMes = mesVecino(calMes, 1); renderCalendario(); });
  cal.querySelectorAll('[data-caldia]').forEach(b => b.addEventListener('click', () => {
    irADia(b.dataset.caldia);
    toggleCalendario();
  }));
}

/* ---------- Render: timeline ---------- */
function itemHTML(it, tipo, bloqueId, checked){
  const clase = tipo==='med' ? 'item med' : it.omega ? 'item omega' : 'item';
  const eyebrow = tipo==='med' ? '<span class="eyebrow">Medicamento</span>' : it.omega ? '<span class="eyebrow">Suplemento diario</span>' : '';
  return `<label class="${clase}">
    <input type="checkbox" data-item="${esc(it.id)}" data-bloque="${esc(bloqueId)}" ${checked?'checked':''}>
    <span class="caja" aria-hidden="true"></span>
    <span class="em" aria-hidden="true">${esc(it.em||'•')}</span>
    <span class="tx">${eyebrow}<span class="lb">${esc(it.lb)}</span>${it.dt?`<span class="dt">${esc(it.dt)}</span>`:''}</span>
  </label>`;
}
/* Chips de recetas propias de un bloque, por categoría (comida | bebida).
   Para bebida, mostrarVacio=true muestra siempre la sección con un botón "+ Bebida". */
function chipsRecetaHTML(bid, cat, d, mostrarVacio){
  const recs = S.recetas.filter(r => r.bloque === bid && catReceta(r) === cat);
  if(!recs.length && !mostrarVacio) return '';
  const elegida = cat==='bebida' ? d.recBebida[bid] : d.rec[bid];
  const titulo = cat==='bebida' ? '🥤 Mi bebida de este día' : '🧑‍🍳 Mi receta de este día';
  const emoji = cat==='bebida' ? '🥤' : '🧑‍🍳';
  let chips = '';
  for(const r of recs){
    chips += `<button class="rec-chip" data-receta="${r.id}" data-bloque="${esc(bid)}" data-cat="${cat}" aria-pressed="${elegida===r.id}">${emoji} ${esc(r.nombre)}</button>`;
  }
  if(cat==='bebida') chips += `<button class="rec-chip rec-add" data-addbebida="${esc(bid)}">➕ Bebida</button>`;
  return `<div class="rec-dia"><div class="t">${titulo}</div><div class="rec-chips">${chips}</div></div>`;
}
function renderTimeline(){
  const d = dayData(viewDate);
  const cont = document.getElementById('timeline');
  const P = plan();
  let html = '';
  P.forEach((b, i) => {
    const next = P[i+1];
    const hm = horaDe(b.id);
    let inner = '';
    for(const f of b.fijos) inner += itemHTML(f, f.omega?'omega':'fijo', b.id, !!d.checks[f.id]);
    for(const m of b.meds) inner += itemHTML(m, 'med', b.id, !!d.checks[m.id]);
    if(b.nota) inner += `<div class="nota">${escNota(b.nota)}</div>`;
    if(b.opciones && b.opciones.length){
      inner += `<fieldset><legend class="grupo-titulo">Elige 1 opción</legend>`;
      b.opciones.forEach((o, oi) => {
        inner += `<label class="item">
          <input type="radio" name="opt-${esc(b.id)}" data-opt="${oi}" data-bloque="${esc(b.id)}" ${d.opts[b.id]===oi?'checked':''}>
          <span class="caja" aria-hidden="true"></span>
          <span class="em" aria-hidden="true">${esc(o.em||'•')}</span>
          <span class="tx"><span class="lb">${esc(o.lb)}</span>${o.dt?`<span class="dt">${esc(o.dt)}</span>`:''}</span>
        </label>`;
      });
      inner += `</fieldset>`;
      // recetas de comida propias de este bloque
      inner += chipsRecetaHTML(b.id, 'comida', d);
    }
    if(b.extra){
      inner += `<div class="extra-titulo">Extra · opcional</div>` + itemHTML(b.extra, 'extra', b.id, !!d.checks[b.extra.id]);
    }
    // Toda comida lleva bebida: sección de bebida en cada bloque con opciones o con extra
    if((b.opciones && b.opciones.length) || b.extra){
      inner += chipsRecetaHTML(b.id, 'bebida', d, true);
    }
    html += `<article class="bloque" id="bloque-${esc(b.id)}" style="--bc:var(${colorDe(i)}); --bc-next:var(${next?colorDe(i+1):colorDe(i)})">
      <span class="punto" aria-hidden="true"></span>
      <div class="b-cab">
        <span class="b-hora" data-hora="${esc(b.id)}">${hora12(hm)}</span>
        <span class="b-nombre">${esc(b.emoji||'')} ${esc(b.nombre)}</span>
        <span class="chip-ahora">Ahora</span>
        ${b.opciones && b.opciones.length ? `<button class="b-foto" data-fotocomida="${esc(b.id)}" aria-label="Añadir foto de ${esc(b.nombre)}" title="Añadir foto de lo que comí">📷</button>` : ''}
      </div>
      <div class="b-card">${inner}<div class="fotos-comida" data-fotoscomida="${esc(b.id)}" hidden></div></div>
    </article>`;
  });
  cont.innerHTML = html;
  actualizarDerivados();
  marcarBloqueActual();
  pintarFotosComidas();
}

/* Conteo por bloque, anillo, chips, banner */
function actualizarDerivados(){
  const d = dayData(viewDate);
  const st = statsDe(viewDate);
  plan().forEach(b => {
    let t=0, h=0;
    for(const f of b.fijos){ t++; if(d.checks[f.id]) h++; }
    for(const m of b.meds){ t++; if(d.checks[m.id]) h++; }
    if(b.opciones && b.opciones.length){ t++; if(d.opts[b.id]!=null) h++; }
    const art = document.getElementById(`bloque-${b.id}`);
    if(art) art.classList.toggle('hecho', t>0 && h===t);
  });
  const C = 2*Math.PI*36;
  document.getElementById('anilloVal').style.strokeDashoffset = String(C * (1 - st.hechos/Math.max(st.total,1)));
  document.getElementById('anilloPct').textContent = st.pct + '%';
  document.getElementById('resumenSub').textContent = `${st.hechos} de ${st.total} puntos del plan`;
  const r = rachas();
  document.getElementById('chipRacha').textContent = `🔥 ${r.actual} ${r.actual===1?'día':'días'}`;
  const chipM = document.getElementById('chipMeds');
  chipM.textContent = `💊 ${st.medsH}/${st.medsT}`;
  chipM.classList.toggle('ok', st.medsT>0 && st.medsH===st.medsT);
  const banner = document.getElementById('bannerFiesta');
  if(st.perfecto){
    if(!banner.classList.contains('on')){
      document.getElementById('bannerFrase').textContent = FELICITACIONES[Math.floor(Math.random()*FELICITACIONES.length)];
      banner.classList.add('on');
    }
  } else banner.classList.remove('on');
}

/* Bloque actual según hora de Bogotá — solo al ver el día de hoy */
function marcarBloqueActual(){
  const {date, hm} = bogota();
  const esHoy = viewDate === date;
  const orden = plan().map(b => ({id:b.id, t:horaDe(b.id)})).sort((a,b)=>a.t.localeCompare(b.t));
  let actual = orden.length ? orden[0].id : null;
  for(const o of orden){ if(o.t <= hm) actual = o.id; }
  plan().forEach(b => {
    document.getElementById(`bloque-${b.id}`)?.classList.toggle('ahora', esHoy && b.id===actual);
  });
}

/* ---------- Interacción: marcar casillas y recetas ---------- */
document.getElementById('timeline').addEventListener('change', e => {
  const inp = e.target;
  const d = dayData(viewDate);
  if(inp.dataset.item){
    d.checks[inp.dataset.item] = inp.checked;
    if(inp.checked && inp.closest('.item').classList.contains('med')) toast('💊 Medicamento registrado');
  } else if(inp.dataset.opt != null){
    d.opts[inp.dataset.bloque] = +inp.dataset.opt;
  }
  save();
  actualizarDerivados();
});
/* Recuerda si la opción ya estaba elegida antes del toque, para poder desmarcarla */
const radioPrev = new WeakMap();
document.getElementById('timeline').addEventListener('pointerdown', e => {
  const r = e.target.closest('label.item')?.querySelector('input[type=radio][data-opt]');
  if(r) radioPrev.set(r, r.checked);
});
document.getElementById('timeline').addEventListener('click', e => {
  const vf = e.target.closest('[data-verfoto]');
  if(vf){ verFotoComida(vf.dataset.verfoto); return; }
  const bf = e.target.closest('[data-fotocomida]');
  if(bf){ fotoComidaBloque = bf.dataset.fotocomida; document.getElementById('inFotoComida').click(); return; }
  const add = e.target.closest('[data-addbebida]');
  if(add){ abrirNuevaBebida(add.dataset.addbebida); return; }
  const chip = e.target.closest('.rec-chip');
  if(chip){ abrirRecetaSheet(+chip.dataset.receta, chip.dataset.bloque, chip.dataset.cat); return; }
  // Tocar la opción ya elegida la desmarca
  const radio = e.target.closest('label.item')?.querySelector('input[type=radio][data-opt]');
  if(radio && radioPrev.get(radio)){
    e.preventDefault();
    radio.checked = false;
    setTimeout(() => { radio.checked = false; }, 0); // por si la activación nativa lo re-marca
    const d = dayData(viewDate);
    delete d.opts[radio.dataset.bloque];
    save();
    actualizarDerivados();
    toast('Opción quitada');
  }
});

/* ---------- Fotos de lo que comí (libres: las que quieras por comida y día) ---------- */
let fotoComidaBloque = null;
async function pintarFotosComidas(){
  const fecha = viewDate;
  const todas = await storeAll('comidafotos');
  if(fecha !== viewDate) return; // el usuario cambió de día mientras cargaba
  const delDia = todas.filter(f => f.d === fecha);
  for(const b of plan()){
    const cont = document.querySelector(`[data-fotoscomida="${CSS.escape(b.id)}"]`);
    if(!cont) continue;
    const fotos = delDia.filter(f => f.bloque === b.id);
    if(!fotos.length){ cont.hidden = true; cont.innerHTML = ''; continue; }
    cont.hidden = false;
    cont.innerHTML = fotos.map(f =>
      `<button class="fc-thumb" data-verfoto="${f.id}" aria-label="Ver foto de ${esc(b.nombre)}"><img src="${f.data}" alt=""></button>`
    ).join('');
  }
}
async function verFotoComida(fid){
  const todas = await storeAll('comidafotos');
  const f = todas.find(x => String(x.id) === String(fid));
  if(!f) return;
  const b = plan().find(x => x.id === f.bloque);
  document.getElementById('visorImg').src = f.data;
  document.getElementById('visorFecha').textContent = `${b ? b.nombre + ' · ' : ''}${fechaBonita(f.d)}`;
  document.getElementById('visorFoto').classList.add('on');
  document.getElementById('visorBorrar').onclick = () => {
    confirmar('¿Eliminar foto?', 'Se eliminará esta foto de tu comida.', async () => {
      await storeDel('comidafotos', f.id);
      document.getElementById('visorFoto').classList.remove('on');
      pintarFotosComidas();
      toast('Foto eliminada');
    });
  };
}
document.getElementById('inFotoComida').addEventListener('change', e => {
  const file = e.target.files[0];
  e.target.value = '';
  if(!file || !fotoComidaBloque) return;
  const bid = fotoComidaBloque;
  fotoComidaBloque = null;
  const fecha = viewDate;
  comprimirImagen(file, data => {
    storePut('comidafotos', {id:Date.now(), d:fecha, bloque:bid, data}).then(() => {
      if(fecha === viewDate) pintarFotosComidas();
      toast('📸 Foto de tu comida guardada');
    });
  });
});

/* ---------- Hoja de receta (al tocar un chip) ---------- */
let sheetActual = null; // {rid, bid, cat}
function mapaDia(d, cat){ return cat==='bebida' ? d.recBebida : d.rec; }
function syncChipsBloque(bid){
  const d = dayData(viewDate);
  document.querySelectorAll(`.rec-chip[data-bloque="${CSS.escape(bid)}"]`).forEach(c =>
    c.setAttribute('aria-pressed', String(+c.dataset.receta === mapaDia(d, c.dataset.cat)[bid])));
}
async function abrirRecetaSheet(rid, bid, cat){
  const r = S.recetas.find(x => x.id === rid);
  if(!r) return;
  cat = cat || catReceta(r);
  sheetActual = {rid, bid, cat};
  const b = plan().find(x => x.id === r.bloque);
  document.getElementById('rsNombre').textContent = r.nombre;
  const etiqueta = cat==='bebida' ? '🥤 Bebida' : '🍽️ Comida';
  document.getElementById('rsBase').textContent = etiqueta + ' · ' + (
    r.origen==='plan' ? 'Opción de tu plan' :
    (b && r.opcion!=null && b.opciones && b.opciones[r.opcion]) ? 'Basada en: ' + b.opciones[r.opcion].lb : 'Receta propia');
  const ing = document.getElementById('rsIng'), prep = document.getElementById('rsPrep');
  ing.textContent = r.ing || ''; prep.textContent = r.prep || '';
  document.getElementById('rsIngTitulo').hidden = !r.ing;
  document.getElementById('rsPrepTitulo').hidden = !r.prep;
  const d = dayData(viewDate);
  document.getElementById('rsElegir').textContent = mapaDia(d, cat)[bid]===rid ? '✕ Quitar de este día' : '✓ Elegir para este día';
  const img = document.getElementById('rsFoto');
  img.hidden = true;
  document.getElementById('recetaSheet').classList.add('on');
  const foto = await recFotoGet(rid);
  if(foto && sheetActual && sheetActual.rid===rid){ img.src = foto.data; img.hidden = false; }
}
function cerrarRecetaSheet(){ document.getElementById('recetaSheet').classList.remove('on'); sheetActual = null; }
document.getElementById('rsCerrar').addEventListener('click', cerrarRecetaSheet);
document.getElementById('recetaSheet').addEventListener('click', e => { if(e.target.id==='recetaSheet') cerrarRecetaSheet(); });
document.getElementById('rsElegir').addEventListener('click', () => {
  if(!sheetActual) return;
  const {rid, bid, cat} = sheetActual;
  const mapa = mapaDia(dayData(viewDate), cat);
  if(mapa[bid] === rid){ delete mapa[bid]; toast('Quitada de este día'); }
  else { mapa[bid] = rid; toast((cat==='bebida'?'🥤':'🧑‍🍳') + ' Elegida para hoy'); }
  save();
  syncChipsBloque(bid);
  cerrarRecetaSheet();
});
document.getElementById('rsEditar').addEventListener('click', () => {
  if(!sheetActual) return;
  const rid = sheetActual.rid;
  cerrarRecetaSheet();
  irAVista('recetas');
  abrirFormReceta(rid);
});

/* ---------- Vistas / tabs ---------- */
const VISTAS = ['hoy','recetas','progreso','ajustes'];
document.querySelectorAll('nav.tabbar [role=tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav.tabbar [role=tab]').forEach(b => b.setAttribute('aria-selected', String(b===btn)));
    for(const v of VISTAS) document.getElementById('view-'+v).hidden = v!==btn.dataset.view;
    if(btn.dataset.view==='recetas') renderRecetas();
    if(btn.dataset.view==='progreso') renderProgreso();
    if(btn.dataset.view==='ajustes') renderAjustes();
    window.scrollTo({top:0});
  });
});
function irAVista(v){ document.querySelector(`nav.tabbar [data-view="${v}"]`).click(); }

/* ---------- Toast y modal ---------- */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('on'), 2200);
}
let modalCb = null;
function confirmar(titulo, texto, cb){
  document.getElementById('modalTitulo').textContent = titulo;
  document.getElementById('modalTexto').textContent = texto;
  modalCb = cb;
  document.getElementById('modal').classList.add('on');
}
document.getElementById('modalNo').addEventListener('click', ()=>{ modalCb=null; document.getElementById('modal').classList.remove('on'); });
document.getElementById('modalSi').addEventListener('click', ()=>{ const cb=modalCb; modalCb=null; document.getElementById('modal').classList.remove('on'); if(cb) cb(); });

/* ---------- RECETAS ---------- */
let recEditando = null; // id de receta en edición, o null
let recetaIdSeq = Date.now();
function nuevaRecetaId(){ return recetaIdSeq++; }
/* Convierte las opciones del plan vigente en recetas editables (sin duplicar) */
function sembrarRecetasDelPlan(){
  let n = 0;
  const existe = (bid, nom) => S.recetas.some(r => r.bloque===bid && r.nombre.trim().toLowerCase()===nom.trim().toLowerCase());
  plan().forEach(b => {
    // Comidas: desde las opciones
    (b.opciones||[]).forEach((o, i) => {
      if(!existe(b.id, o.lb)){
        S.recetas.push({id:nuevaRecetaId(), nombre:o.lb, bloque:b.id, opcion:i, ing:o.dt||'', prep:'', categoria:'comida', origen:'plan'});
        n++;
      }
    });
    // Bebidas: desde el extra (si trae varias separadas por "·", una receta por cada una)
    if(b.extra){
      const nombres = (b.extra.dt && b.extra.dt.includes('·'))
        ? b.extra.dt.split('·').map(s => s.trim()).filter(Boolean)
        : [ (b.extra.lb||'').replace(/^\s*\d+\s+/, '').trim() ];
      nombres.forEach(nom => {
        if(nom && !existe(b.id, nom)){
          S.recetas.push({id:nuevaRecetaId(), nombre:nom, bloque:b.id, opcion:null, ing:'', prep:'', categoria:'bebida', origen:'plan'});
          n++;
        }
      });
    }
  });
  S.planSembrado = true;
  S.bebidasSembradas = true;
  save();
  return n;
}
function nombreBloque(bid){
  const b = plan().find(x=>x.id===bid);
  return b ? `${b.emoji||''} ${b.nombre}`.trim() : bid;
}
let filtroReceta = 'todas'; // todas | comida | bebida
async function renderRecetas(){
  const cont = document.getElementById('recLista');
  if(!S.recetas.length){
    cont.innerHTML = `<div class="rec-vacio">Aún no tienes recetas.<br>Crea la primera con el botón de arriba 👆</div>`;
    return;
  }
  const fotos = await recFotosMap();
  const cardHTML = (r, b) => {
    const cat = catReceta(r);
    let baseLb;
    if(r.origen==='plan') baseLb = 'Opción de tu plan';
    else if(b && r.opcion!=null && b.opciones && b.opciones[r.opcion]) baseLb = `Basada en: ${b.opciones[r.opcion].lb}`;
    else baseLb = 'Receta propia';
    const foto = fotos.get(r.id);
    return `<div class="rec-card" data-editar="${r.id}" role="button" tabindex="0">
      ${foto ? `<img class="thumb" src="${foto}" alt="">` : ''}
      <div class="cuerpo">
        <div class="n">${cat==='bebida'?'🥤 ':'🍽️ '}${esc(r.nombre)}</div>
        <div class="base">${esc(baseLb)}</div>
        ${r.ing ? `<div class="ing">${esc(r.ing)}</div>` : ''}
      </div>
    </div>`;
  };
  // Filtro
  const cuenta = c => S.recetas.filter(r=>catReceta(r)===c).length;
  let html = `<div class="rec-filtro" role="group" aria-label="Filtrar recetas">
    <button data-filtro="todas" aria-pressed="${filtroReceta==='todas'}">Todas</button>
    <button data-filtro="comida" aria-pressed="${filtroReceta==='comida'}">🍽️ Comidas (${cuenta('comida')})</button>
    <button data-filtro="bebida" aria-pressed="${filtroReceta==='bebida'}">🥤 Bebidas (${cuenta('bebida')})</button>
  </div>`;
  const P = plan();
  const pasa = r => filtroReceta==='todas' || catReceta(r)===filtroReceta;
  let algo = false;
  P.forEach((b, i) => {
    const recs = S.recetas.filter(r=>r.bloque===b.id && pasa(r));
    if(!recs.length) return;
    algo = true;
    html += `<div class="rec-bloque-t" style="--bc:var(${colorDe(i)})"><span class="dot"></span>${esc(b.emoji||'')} ${esc(b.nombre)}</div>`;
    for(const r of recs) html += cardHTML(r, b);
  });
  const huerfanas = S.recetas.filter(r => !P.some(b=>b.id===r.bloque) && pasa(r));
  if(huerfanas.length){
    algo = true;
    html += `<div class="rec-bloque-t"><span class="dot" style="background:var(--ink-3)"></span>De un plan anterior</div>`;
    for(const r of huerfanas) html += cardHTML(r, null);
  }
  if(!algo) html += `<div class="rec-vacio">No tienes recetas de esta categoría todavía.</div>`;
  cont.innerHTML = html;
  cont.querySelectorAll('[data-filtro]').forEach(b => b.addEventListener('click', () => { filtroReceta = b.dataset.filtro; renderRecetas(); }));
  cont.querySelectorAll('[data-editar]').forEach(card => {
    const abrir = () => abrirFormReceta(+card.dataset.editar);
    card.addEventListener('click', abrir);
    card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); abrir(); } });
  });
}
let recTipo = 'comida'; // categoría en edición
function aplicarRecTipo(){
  document.querySelectorAll('[data-rectipo]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.rectipo===recTipo)));
  document.getElementById('recCampoOpcion').hidden = recTipo === 'bebida';
  poblarSelectBloques();
}
document.querySelectorAll('[data-rectipo]').forEach(b => {
  b.addEventListener('click', () => { recTipo = b.dataset.rectipo; aplicarRecTipo(); });
});
function poblarSelectBloques(){
  const sel = document.getElementById('recBloque');
  const prev = sel.value;
  // Comida: momentos con opciones · Bebida: momentos donde hay bebida/extra (o cualquiera)
  const bloques = recTipo === 'bebida'
    ? plan().filter(b => b.extra || (b.opciones && b.opciones.length))
    : plan().filter(b => b.opciones && b.opciones.length);
  sel.innerHTML = bloques.map(b=>`<option value="${esc(b.id)}">${esc(b.emoji||'')} ${esc(b.nombre)}</option>`).join('');
  if(prev && bloques.some(b=>b.id===prev)) sel.value = prev;
  poblarSelectOpciones();
}
function poblarSelectOpciones(){
  const bid = document.getElementById('recBloque').value;
  const b = plan().find(x=>x.id===bid);
  const sel = document.getElementById('recOpcion');
  let ops = `<option value="">Receta libre (sin opción base)</option>`;
  if(b && b.opciones) b.opciones.forEach((o,i)=>{ ops += `<option value="${i}">${esc(o.lb)}</option>`; });
  sel.innerHTML = ops;
}
document.getElementById('recBloque').addEventListener('change', poblarSelectOpciones);

/* Foto de ilustración de la receta */
let recFotoPend; // undefined = sin cambios, string = foto nueva, null = quitar
function renderFotoZona(dataUrl){
  const z = document.getElementById('recFotoZona');
  if(dataUrl){
    z.innerHTML = `<img src="${dataUrl}" alt="Foto de la receta">
      <button class="btn sec" id="recFotoCambiar" type="button">Cambiar</button>
      <button class="btn peligro" id="recFotoQuitar" type="button">Quitar</button>`;
    document.getElementById('recFotoCambiar').addEventListener('click', ()=>document.getElementById('recFotoIn').click());
    document.getElementById('recFotoQuitar').addEventListener('click', ()=>{ recFotoPend = null; renderFotoZona(null); });
  } else {
    z.innerHTML = `<button class="recfoto-add" id="recFotoAdd" type="button">📷 Agregar foto de ilustración</button>`;
    document.getElementById('recFotoAdd').addEventListener('click', ()=>document.getElementById('recFotoIn').click());
  }
}
document.getElementById('recFotoIn').addEventListener('change', e => {
  const file = e.target.files[0];
  e.target.value='';
  if(!file) return;
  comprimirImagen(file, data => { recFotoPend = data; renderFotoZona(data); });
});

function abrirFormReceta(id){
  recEditando = id ?? null;
  const rPrevia = recEditando!=null ? S.recetas.find(x=>x.id===recEditando) : null;
  recTipo = rPrevia ? catReceta(rPrevia) : 'comida';
  aplicarRecTipo();
  const sec = document.getElementById('recFormSec');
  sec.hidden = false;
  document.getElementById('recBorrar').hidden = recEditando==null;
  document.getElementById('recFormTitulo').textContent = recEditando==null ? 'Nueva receta' : 'Editar receta';
  recFotoPend = undefined;
  renderFotoZona(null);
  if(recEditando!=null){
    const idAbierto = recEditando;
    recFotoGet(idAbierto).then(f => {
      if(f && recEditando===idAbierto && recFotoPend===undefined) renderFotoZona(f.data);
    });
  }
  if(recEditando!=null){
    const r = S.recetas.find(x=>x.id===recEditando);
    if(r){
      document.getElementById('recNombre').value = r.nombre;
      if(plan().some(b=>b.id===r.bloque)) document.getElementById('recBloque').value = r.bloque;
      poblarSelectOpciones();
      document.getElementById('recOpcion').value = r.opcion!=null ? String(r.opcion) : '';
      document.getElementById('recIng').value = r.ing||'';
      document.getElementById('recPrep').value = r.prep||'';
    }
  } else {
    document.getElementById('recNombre').value = '';
    document.getElementById('recIng').value = '';
    document.getElementById('recPrep').value = '';
    document.getElementById('recOpcion').value = '';
  }
  sec.scrollIntoView({behavior:'smooth', block:'start'});
  document.getElementById('recNombre').focus();
}
document.getElementById('btnNuevaReceta').addEventListener('click', ()=>abrirFormReceta(null));
/* Crear una bebida nueva ya asignada a un bloque, desde el timeline */
function abrirNuevaBebida(bid){
  irAVista('recetas');
  abrirFormReceta(null);
  recTipo = 'bebida';
  aplicarRecTipo();
  const sel = document.getElementById('recBloque');
  if([...sel.options].some(o => o.value === bid)) sel.value = bid;
}
document.getElementById('recCancelar').addEventListener('click', ()=>{ document.getElementById('recFormSec').hidden = true; recEditando=null; });
document.getElementById('recGuardar').addEventListener('click', () => {
  const nombre = document.getElementById('recNombre').value.trim();
  if(!nombre){ toast('Ponle un nombre a la receta'); return; }
  const bloque = document.getElementById('recBloque').value;
  const opcionV = document.getElementById('recOpcion').value;
  const previa = recEditando!=null ? S.recetas.find(r=>r.id===recEditando) : null;
  const receta = {
    id: recEditando ?? nuevaRecetaId(),
    nombre, bloque,
    categoria: recTipo,
    opcion: (recTipo==='bebida' || opcionV==='') ? null : +opcionV,
    ing: document.getElementById('recIng').value.trim(),
    prep: document.getElementById('recPrep').value.trim(),
    ...(previa && previa.origen ? {origen:previa.origen} : {})
  };
  const i = S.recetas.findIndex(r=>r.id===receta.id);
  if(i>=0) S.recetas[i] = receta; else S.recetas.push(receta);
  save();
  if(recFotoPend !== undefined){
    if(recFotoPend) storePut('recfotos', {id:receta.id, data:recFotoPend});
    else storeDel('recfotos', receta.id);
  }
  document.getElementById('recFormSec').hidden = true;
  recEditando = null;
  renderRecetas();
  renderTimeline();
  toast('🧑‍🍳 Receta guardada');
});
document.getElementById('recBorrar').addEventListener('click', () => {
  if(recEditando==null) return;
  confirmar('¿Eliminar receta?', 'Se eliminará esta receta y su foto. Los días donde la elegiste no pierden sus marcas.', () => {
    storeDel('recfotos', recEditando);
    S.recetas = S.recetas.filter(r=>r.id!==recEditando);
    save();
    document.getElementById('recFormSec').hidden = true;
    recEditando = null;
    renderRecetas();
    renderTimeline();
    toast('Receta eliminada');
  });
});

/* ---------- PROGRESO ---------- */
function renderProgreso(){
  const {date} = bogota();
  const r = rachas();
  document.getElementById('tRacha').textContent = r.actual;
  document.getElementById('tMejor').textContent = r.mejor;
  const pesos = [...S.pesos].sort((a,b)=>a.d.localeCompare(b.d));
  const ultimo = pesos[pesos.length-1];
  document.getElementById('tPeso').textContent = ultimo ? ultimo.kg.toFixed(1) : '—';
  const res = document.getElementById('pesoResumen');
  if(pesos.length>=2){
    const delta = ultimo.kg - pesos[0].kg;
    const signo = delta<=0 ? '' : '+';
    let txt = `Desde ${fechaCorta(pesos[0].d)}: ${signo}${delta.toFixed(1)} kg.`;
    if(S.settings.meta){
      const falta = ultimo.kg - S.settings.meta;
      txt += falta>0 ? ` Te faltan ${falta.toFixed(1)} kg para tu meta de ${S.settings.meta} kg.` : ' 🎉 ¡Alcanzaste tu meta!';
    }
    res.textContent = txt;
  } else {
    res.textContent = 'Registra tu peso para ver tu evolución.';
  }
  renderChart(pesos);
  renderHistorial();
  renderFotos();
  const hoyPeso = pesos.find(p=>p.d===date);
  document.getElementById('inPeso').value = hoyPeso ? hoyPeso.kg : '';
}

/* Gráfica de peso — SVG, una serie */
function renderChart(pesos){
  const cont = document.getElementById('chartPeso');
  if(pesos.length<2){
    cont.innerHTML = `<p style="font-size:.85rem; color:var(--ink-3); padding:14px 0">📉 Con dos o más registros verás aquí tu curva de peso.</p>`;
    return;
  }
  const datos = pesos.slice(-30);
  const W=340, H=170, mL=38, mR=14, mT=14, mB=26;
  const kgs = datos.map(p=>p.kg);
  let yMin = Math.min(...kgs), yMax = Math.max(...kgs);
  if(S.settings.meta){ yMin=Math.min(yMin,S.settings.meta); yMax=Math.max(yMax,S.settings.meta); }
  const pad = Math.max((yMax-yMin)*0.15, 0.6);
  yMin-=pad; yMax+=pad;
  const X = i => mL + (datos.length===1?0:(i/(datos.length-1)))*(W-mL-mR);
  const Y = kg => mT + (1-(kg-yMin)/(yMax-yMin))*(H-mT-mB);
  let g='';
  for(let k=0;k<3;k++){
    const v = yMin + (k+1)*(yMax-yMin)/4;
    g += `<line x1="${mL}" x2="${W-mR}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-width="1"/>
          <text x="${mL-6}" y="${Y(v)+3}" text-anchor="end" font-size="9" font-family="var(--f-mono)" fill="var(--ink-3)">${v.toFixed(1)}</text>`;
  }
  let metaLine='';
  if(S.settings.meta && S.settings.meta>yMin && S.settings.meta<yMax){
    metaLine = `<line x1="${mL}" x2="${W-mR}" y1="${Y(S.settings.meta)}" y2="${Y(S.settings.meta)}" stroke="var(--b4)" stroke-width="1.5" stroke-dasharray="5 4"/>
      <text x="${W-mR}" y="${Y(S.settings.meta)-4}" text-anchor="end" font-size="9" font-family="var(--f-mono)" fill="var(--b4)">meta ${S.settings.meta}</text>`;
  }
  const path = datos.map((p,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(p.kg).toFixed(1)}`).join(' ');
  const area = path + ` L${X(datos.length-1).toFixed(1)},${H-mB} L${X(0).toFixed(1)},${H-mB} Z`;
  let puntos='';
  datos.forEach((p,i)=>{
    const fin = i===datos.length-1;
    puntos += `<circle cx="${X(i).toFixed(1)}" cy="${Y(p.kg).toFixed(1)}" r="${fin?5:4}" fill="var(--accent-strong)" stroke="var(--card)" stroke-width="2" data-i="${i}" style="cursor:pointer"/>`;
    if(fin) puntos += `<text x="${X(i).toFixed(1)}" y="${Y(p.kg)-10}" text-anchor="middle" font-size="10" font-weight="700" font-family="var(--f-mono)" fill="var(--ink)">${p.kg.toFixed(1)}</text>`;
  });
  const ejeX = `<text x="${mL}" y="${H-8}" font-size="9" font-family="var(--f-mono)" fill="var(--ink-3)">${fechaCorta(datos[0].d)}</text>
    <text x="${W-mR}" y="${H-8}" text-anchor="end" font-size="9" font-family="var(--f-mono)" fill="var(--ink-3)">${fechaCorta(datos[datos.length-1].d)}</text>`;
  cont.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Evolución del peso: de ${datos[0].kg} a ${datos[datos.length-1].kg} kilogramos">
    ${g}${metaLine}
    <path d="${area}" fill="var(--accent)" opacity="0.18"/>
    <path d="${path}" fill="none" stroke="var(--accent-strong)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${puntos}${ejeX}
  </svg>`;
  cont.querySelectorAll('circle').forEach(c => {
    c.addEventListener('click', ev => {
      const p = datos[+c.dataset.i];
      const tip = document.getElementById('chartTip');
      const rect = cont.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      tip.textContent = `${fechaCorta(p.d)} · ${p.kg.toFixed(1)} kg`;
      tip.style.left = (cr.left-rect.left+cr.width/2)+'px';
      tip.style.top = (cr.top-rect.top)+'px';
      tip.style.display='block';
      setTimeout(()=>tip.style.display='none', 2500);
      ev.stopPropagation();
    });
  });
}

document.getElementById('btnPeso').addEventListener('click', () => {
  const v = parseFloat(document.getElementById('inPeso').value);
  if(!v || v<30 || v>300){ toast('Ingresa un peso válido'); return; }
  const {date} = bogota();
  S.pesos = S.pesos.filter(p=>p.d!==date);
  S.pesos.push({d:date, kg:Math.round(v*10)/10});
  save(); renderProgreso(); toast('⚖️ Peso registrado');
});

function renderHistorial(){
  const {date} = bogota();
  const cont = document.getElementById('histLista');
  let html='';
  for(let i=0;i<14;i++){
    const f = diasAtras(date,i);
    const st = statsDe(f);
    const sinDatos = !tieneRegistros(f) && i>0;
    html += `<div class="hist-fila" data-dia="${f}" role="button" tabindex="0" style="cursor:pointer">
      <span class="hist-fecha">${i===0?'Hoy':fechaCorta(f)}</span>
      <div class="hist-barra"><div style="width:${st.pct}%${sinDatos?';background:var(--line)':''}"></div></div>
      <span class="hist-pct">${sinDatos?'—':st.pct+'%'}</span>
      <span class="hist-med" title="Medicamentos">${!sinDatos && st.medsT>0 && st.medsH===st.medsT ? '💊' : ''}</span>
    </div>`;
  }
  cont.innerHTML = html;
  cont.querySelectorAll('[data-dia]').forEach(fila => {
    const abrir = () => { irADia(fila.dataset.dia); irAVista('hoy'); };
    fila.addEventListener('click', abrir);
    fila.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); abrir(); } });
  });
}

/* ---------- Fotos (IndexedDB): progreso y recetas ---------- */
const dbp = new Promise((res, rej) => {
  const r = indexedDB.open('planvital-fotos', 3);
  r.onupgradeneeded = e => {
    const db = e.target.result;
    if(!db.objectStoreNames.contains('fotos')) db.createObjectStore('fotos', {keyPath:'id'});
    if(!db.objectStoreNames.contains('recfotos')) db.createObjectStore('recfotos', {keyPath:'id'});
    if(!db.objectStoreNames.contains('comidafotos')) db.createObjectStore('comidafotos', {keyPath:'id'});
  };
  r.onsuccess = e => res(e.target.result);
  r.onerror = () => rej(r.error);
});
async function storeAll(st){
  const db = await dbp;
  return new Promise(res => {
    const q = db.transaction(st).objectStore(st).getAll();
    q.onsuccess = () => res(q.result||[]);
    q.onerror = () => res([]);
  });
}
async function storePut(st, obj){
  const db = await dbp;
  return new Promise(res => { const tx=db.transaction(st,'readwrite'); tx.objectStore(st).put(obj); tx.oncomplete=res; });
}
async function storeDel(st, id){
  const db = await dbp;
  return new Promise(res => { const tx=db.transaction(st,'readwrite'); tx.objectStore(st).delete(id); tx.oncomplete=res; });
}
const fotosAll = () => storeAll('fotos').then(f => f.sort((a,b)=>b.d.localeCompare(a.d)));
const fotoPut = f => storePut('fotos', f);
const fotoDel = id => storeDel('fotos', id);
async function recFotoGet(id){
  const db = await dbp;
  return new Promise(res => {
    const q = db.transaction('recfotos').objectStore('recfotos').get(id);
    q.onsuccess = () => res(q.result||null);
    q.onerror = () => res(null);
  });
}
async function recFotosMap(){
  const lista = await storeAll('recfotos');
  return new Map(lista.map(f => [f.id, f.data]));
}
function comprimirImagen(file, cb){
  const img = new Image();
  const fr = new FileReader();
  fr.onload = () => {
    img.onload = () => {
      const MAX = 900;
      const k = Math.min(1, MAX/Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.width*k); cv.height = Math.round(img.height*k);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      cb(cv.toDataURL('image/jpeg', 0.82));
    };
    img.src = fr.result;
  };
  fr.readAsDataURL(file);
}
async function renderFotos(){
  const grid = document.getElementById('fotosGrid');
  const fotos = await fotosAll();
  let html = `<button class="subir-foto" id="btnFoto" aria-label="Agregar foto de progreso">＋</button>`;
  for(const f of fotos){
    html += `<figure data-id="${f.id}"><img src="${f.data}" alt="Foto de progreso del ${esc(fechaCorta(f.d))}" loading="lazy"><figcaption>${esc(fechaCorta(f.d))}</figcaption></figure>`;
  }
  grid.innerHTML = html;
  document.getElementById('btnFoto').addEventListener('click', ()=>document.getElementById('inFoto').click());
  grid.querySelectorAll('figure').forEach(fig => {
    fig.addEventListener('click', async () => {
      const fotos2 = await fotosAll();
      const f = fotos2.find(x=>String(x.id)===fig.dataset.id);
      if(!f) return;
      document.getElementById('visorImg').src = f.data;
      document.getElementById('visorFecha').textContent = fechaBonita(f.d);
      document.getElementById('visorFoto').classList.add('on');
      document.getElementById('visorBorrar').onclick = () => {
        confirmar('¿Eliminar foto?', 'Se eliminará esta foto de progreso de forma permanente.', async () => {
          await fotoDel(f.id);
          document.getElementById('visorFoto').classList.remove('on');
          renderFotos(); toast('Foto eliminada');
        });
      };
    });
  });
}
document.getElementById('visorCerrar').addEventListener('click', ()=>document.getElementById('visorFoto').classList.remove('on'));
document.getElementById('inFoto').addEventListener('change', e => {
  const file = e.target.files[0];
  e.target.value='';
  if(!file) return;
  comprimirImagen(file, data => {
    fotoPut({id:Date.now(), d:bogota().date, data}).then(()=>{ renderFotos(); toast('📸 Foto guardada'); });
  });
});

/* ---------- AJUSTES ---------- */
function renderAjustes(){
  document.getElementById('setNombre').value = S.settings.nombre || '';
  document.getElementById('setMeta').value = S.settings.meta || '';
  aplicarTema();
  aplicarAcento();
  // horarios dinámicos según el plan vigente
  const cont = document.getElementById('listaHorarios');
  cont.innerHTML = plan().map(b => `<div class="campo">
    <span class="et">${esc(b.emoji||'')} ${esc(b.nombre)}</span>
    <input type="time" data-time="${esc(b.id)}" value="${esc(horaDe(b.id))}">
  </div>`).join('');
  cont.querySelectorAll('[data-time]').forEach(inp => {
    inp.addEventListener('change', e => {
      if(!e.target.value) return;
      S.settings.times[inp.dataset.time] = e.target.value;
      save();
      const el = document.querySelector(`[data-hora="${CSS.escape(inp.dataset.time)}"]`);
      if(el) el.textContent = hora12(e.target.value);
      marcarBloqueActual();
      toast('Horario actualizado');
    });
  });
  document.getElementById('setNotif').checked = S.settings.notif;
  actualizarEstadoNotif();
}
document.getElementById('setNombre').addEventListener('change', e => { S.settings.nombre = e.target.value.trim(); save(); renderCabecera(); toast('Guardado'); });
document.getElementById('setMeta').addEventListener('change', e => { const v=parseFloat(e.target.value); S.settings.meta = (v>=30&&v<=300)?v:null; save(); toast('Guardado'); });

function actualizarEstadoNotif(){
  const est = document.getElementById('notifEstado');
  if(!('Notification' in window)){ est.textContent='No disponibles en este navegador'; return; }
  if(!S.settings.notif){ est.textContent='Desactivadas'; return; }
  est.textContent = Notification.permission==='granted' ? 'Activas mientras la app esté abierta' :
    Notification.permission==='denied' ? 'Bloqueadas por el navegador — revisa los permisos del sitio' : 'Falta conceder permiso';
}
document.getElementById('setNotif').addEventListener('change', async e => {
  if(e.target.checked){
    if(!('Notification' in window)){ toast('Tu navegador no soporta notificaciones'); e.target.checked=false; return; }
    const p = await Notification.requestPermission();
    if(p!=='granted'){ toast('Permiso de notificaciones no concedido'); e.target.checked=false; S.settings.notif=false; save(); actualizarEstadoNotif(); return; }
    S.settings.notif = true; save(); toast('🔔 Recordatorios activados');
  } else {
    S.settings.notif = false; save(); toast('Recordatorios desactivados');
  }
  actualizarEstadoNotif();
});

/* Recordatorios: revisa cada 20 s la hora de Bogotá (siempre sobre el día real) */
function textoRecordatorio(b){
  const partes=[];
  if(b.meds.length) partes.push('💊 ' + b.meds.map(m=>m.lb).join(', '));
  if(b.fijos.length) partes.push(b.fijos.map(f=>f.lb).join(' · '));
  if(b.opciones && b.opciones.length) partes.push('y elige tu opción');
  return partes.join(' · ') || 'Es hora de tu registro';
}
function revisarRecordatorios(){
  if(!S.settings.notif || !('Notification' in window) || Notification.permission!=='granted') return;
  const {date, hm} = bogota();
  for(const b of plan()){
    const key = `${date}:${b.id}`;
    if(S.notified[key]) continue;
    if(horaDe(b.id) === hm){
      S.notified[key]=true;
      for(const k of Object.keys(S.notified)) if(!k.startsWith(date)) delete S.notified[k];
      save();
      try{ new Notification(`${b.emoji||''} ${b.nombre} — ${hora12(hm)}`, {body:textoRecordatorio(b), tag:key}); }catch(err){}
    }
  }
}

/* ---------- Importar / exportar plan ---------- */
function validarPlan(p){
  if(!Array.isArray(p) || !p.length) return 'El archivo no contiene una lista de bloques.';
  const ids = new Set();
  for(const b of p){
    if(typeof b.id!=='string' || !b.id.trim()) return 'Cada bloque necesita un "id" de texto.';
    if(ids.has(b.id)) return `Hay dos bloques con el mismo id: "${b.id}".`;
    ids.add(b.id);
    if(typeof b.nombre!=='string' || !b.nombre.trim()) return `El bloque "${b.id}" necesita un "nombre".`;
    b.fijos = Array.isArray(b.fijos) ? b.fijos : [];
    b.meds = Array.isArray(b.meds) ? b.meds : [];
    b.opciones = Array.isArray(b.opciones) ? b.opciones : null;
    b.extra = (b.extra && typeof b.extra==='object') ? b.extra : null;
    const itemIds = new Set();
    for(const lista of [b.fijos, b.meds]){
      for(const it of lista){
        if(typeof it.id!=='string' || !it.id.trim() || typeof it.lb!=='string' || !it.lb.trim())
          return `Un ítem del bloque "${b.id}" necesita "id" y "lb" (etiqueta).`;
        if(itemIds.has(it.id)) return `Ítem repetido "${it.id}" en el bloque "${b.id}".`;
        itemIds.add(it.id);
      }
    }
    if(b.extra && (typeof b.extra.id!=='string' || typeof b.extra.lb!=='string')) return `El "extra" del bloque "${b.id}" necesita "id" y "lb".`;
    if(b.opciones) for(const o of b.opciones){ if(typeof o.lb!=='string' || !o.lb.trim()) return `Cada opción del bloque "${b.id}" necesita "lb" (etiqueta).`; }
  }
  return null;
}
document.getElementById('btnExportarPlan').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(plan(), null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `plan-dieta-${bogota().date}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('📦 Plan exportado');
});
document.getElementById('btnImportarPlan').addEventListener('click', ()=>document.getElementById('inPlan').click());
document.getElementById('inPlan').addEventListener('change', e => {
  const file = e.target.files[0];
  e.target.value='';
  if(!file) return;
  const fr = new FileReader();
  fr.onload = () => {
    let p;
    try{ p = JSON.parse(fr.result); }
    catch(err){ toast('El archivo no es un JSON válido'); return; }
    const error = validarPlan(p);
    if(error){ toast('Plan no válido'); confirmar('Plan no válido', error, null); return; }
    confirmar('¿Importar este plan?', `Se reemplazará tu dieta actual por "${p.map(b=>b.nombre).join(', ')}". Tu historial de días anteriores no se borra.`, () => {
      S.plan = p;
      for(const b of p) if(!S.settings.times[b.id]) S.settings.times[b.id] = HORAS_DEF[b.id] || '12:00';
      sembrarRecetasDelPlan(); // las opciones nuevas también quedan como recetas
      save();
      renderTimeline(); renderAjustes();
      toast('✅ Plan actualizado');
    });
  };
  fr.readAsText(file);
});

/* ---------- Exportar historial / reiniciar / borrar ---------- */
document.getElementById('btnExportar').addEventListener('click', () => {
  const datos = {exportado:new Date().toISOString(), plan:plan(), recetas:S.recetas, dias:S.days, pesos:S.pesos, ajustes:{horarios:S.settings.times, meta:S.settings.meta}};
  const blob = new Blob([JSON.stringify(datos, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `bloom-historial-${bogota().date}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('📦 Historial exportado');
});
document.getElementById('btnReiniciarHoy').addEventListener('click', () => {
  confirmar('¿Reiniciar hoy?', 'Se desmarcarán todas las casillas y opciones del día de hoy. Esta acción no se puede deshacer.', () => {
    const {date} = bogota();
    S.days[date] = {checks:{}, opts:{}, rec:{}};
    save();
    if(viewDate===date) renderTimeline();
    toast('Día reiniciado');
  });
});
document.getElementById('btnBorrarTodo').addEventListener('click', () => {
  confirmar('¿Borrar todo?', 'Se eliminará TODO el historial, pesos, recetas y ajustes de este dispositivo. Las fotos también. No se puede deshacer.', () => {
    confirmar('Última confirmación', '¿Seguro? Considera exportar primero.', async () => {
      localStorage.removeItem(LS_KEY);
      const fotos = await fotosAll();
      for(const f of fotos) await fotoDel(f.id);
      const recf = await storeAll('recfotos');
      for(const f of recf) await storeDel('recfotos', f.id);
      const comf = await storeAll('comidafotos');
      for(const f of comf) await storeDel('comidafotos', f.id);
      S = load();
      sembrarRecetasDelPlan();
      viewDate = bogota().date;
      aplicarTema();
      renderCabecera(); renderDiaNav(); renderTimeline(); renderAjustes();
      toast('Datos borrados');
    });
  });
});

/* ---------- Ciclo de vida ---------- */
let fechaActual = bogota().date;
function tick(){
  const {date} = bogota();
  if(date !== fechaActual){
    const veniaEnHoy = viewDate === fechaActual;
    fechaActual = date;
    if(veniaEnHoy) viewDate = date;
    renderCabecera(); renderDiaNav(); renderTimeline();
  }
  marcarBloqueActual();
  revisarRecordatorios();
}
setInterval(tick, 20000);
document.addEventListener('visibilitychange', () => { if(!document.hidden) tick(); });

aplicarTema();
aplicarAcento();
if(!S.planSembrado) sembrarRecetasDelPlan();
if(!S.bebidasSembradas) sembrarRecetasDelPlan(); // agrega bebidas del plan a instalaciones previas
renderCabecera();
renderDiaNav();
renderTimeline();

/* ---------- Pantalla de bienvenida (login) ---------- */
(function iniciarWelcome(){
  const wel = document.getElementById('welcome');
  const btn = document.getElementById('welcomeBtn');
  const campo = document.getElementById('welcomeCampo');
  const input = document.getElementById('welcomeNombre');
  const flor = document.getElementById('florW');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Saludo según hora + si ya sabemos su nombre
  const h = +bogota().hm.split(':')[0];
  const momento = h<12 ? 'Buenos días' : h<18 ? 'Buenas tardes' : 'Buenas noches';
  if(S.settings.nombre){
    document.getElementById('welcomeSaludo').textContent = `${momento}, ${S.settings.nombre} 🌸`;
    btn.textContent = 'Entrar 🌸';
  } else {
    document.getElementById('welcomeSaludo').textContent = 'Hola, bienvenida 🌸';
    campo.hidden = false;
    btn.textContent = 'Comenzar 🌸';
  }
  document.getElementById('welcomeFrase').textContent = '“' + fraseDelDia(bogota().date) + '”';
  if(!reduce) flor.classList.add('viva');

  // Lluvia de pétalos en canvas
  let raf = null, corriendo = true;
  if(!reduce){
    const cv = document.getElementById('welcomeCanvas');
    const ctx = cv.getContext('2d');
    let W, H, dpr, petalos = [];
    const acc = getComputedStyle(document.documentElement);
    const c1 = acc.getPropertyValue('--accent').trim() || '#F2BCCB';
    const c2 = acc.getPropertyValue('--accent-strong').trim() || '#C97';
    const colores = [c1, c2, c1];
    function medir(){
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = wel.clientWidth; H = wel.clientHeight;
      cv.width = W*dpr; cv.height = H*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function nuevo(y){
      return {x:Math.random()*W, y: y==null ? Math.random()*H : y,
        s:6+Math.random()*8, vel:.25+Math.random()*.55,
        rot:Math.random()*Math.PI*2, vr:(Math.random()-.5)*.03,
        amp:12+Math.random()*22, fase:Math.random()*Math.PI*2, vf:.006+Math.random()*.01,
        col:colores[(Math.random()*colores.length)|0], alpha:.28+Math.random()*.32};
    }
    medir();
    petalos = Array.from({length:22}, () => nuevo());
    function frame(){
      if(!corriendo) return;
      ctx.clearRect(0,0,W,H);
      for(const p of petalos){
        p.y += p.vel; p.fase += p.vf; p.rot += p.vr;
        const x = p.x + Math.sin(p.fase)*p.amp;
        if(p.y - p.s > H){ Object.assign(p, nuevo(-10)); }
        ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.col;
        ctx.beginPath(); ctx.ellipse(0,0,p.s*0.62,p.s,0,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }
    frame();
    window.addEventListener('resize', medir);
    wel._detener = () => { corriendo = false; if(raf) cancelAnimationFrame(raf); };
  }

  function entrar(){
    if(!campo.hidden){
      const nom = input.value.trim();
      if(nom){ S.settings.nombre = nom; save(); renderCabecera(); }
    }
    wel.classList.add('oculto');
    if(wel._detener) setTimeout(wel._detener, 600);
  }
  btn.addEventListener('click', entrar);
  input.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); entrar(); } });
  setTimeout(() => { (campo.hidden ? btn : input).focus(); }, 400);
})();

/* Service worker para funcionar sin conexión (solo cuando está desplegada en https) */
if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
