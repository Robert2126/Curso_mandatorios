const STORAGE_KEY = "cursoMandatoriosState";
const ALERTA_DIAS = 7;

const fallbackData = {
  cursos: [
    {
      id: 1,
      nombre: "Induccion institucional obligatoria",
      descripcion: "Curso inicial para reforzar lineamientos institucionales y responsabilidades basicas.",
      duracionHoras: 8,
      vigenciaMeses: 12,
      obligatorio: true
    },
    {
      id: 2,
      nombre: "Seguridad y salud en el trabajo",
      descripcion: "Curso obligatorio sobre prevencion, autocuidado y gestion basica de riesgos laborales.",
      duracionHoras: 20,
      vigenciaMeses: 12,
      obligatorio: true
    },
    {
      id: 3,
      nombre: "Proteccion de datos personales",
      descripcion: "Curso sobre tratamiento adecuado de informacion personal y deberes de confidencialidad.",
      duracionHoras: 10,
      vigenciaMeses: 24,
      obligatorio: true
    }
  ],
  usuarios: [
    {
      id: 1,
      nombre: "Usuario de prueba",
      identificacion: "1000000000",
      dependencia: "Talento Humano",
      cargo: "Analista"
    }
  ],
  asignaciones: [
    {
      id: 1,
      usuarioId: 1,
      cursoId: 1,
      fechaAsignacion: "2026-07-07",
      fechaLimite: "2026-08-07",
      fechaFinalizacion: null,
      estado: "pendiente"
    }
  ]
};

let state = structuredClone(fallbackData);

const elements = {
  totalUsuarios: document.getElementById("totalUsuarios"),
  totalCursos: document.getElementById("totalCursos"),
  totalAsignaciones: document.getElementById("totalAsignaciones"),
  totalVencidos: document.getElementById("totalVencidos"),
  formUsuario: document.getElementById("formUsuario"),
  formCurso: document.getElementById("formCurso"),
  formAsignacion: document.getElementById("formAsignacion"),
  usuarioAsignacion: document.getElementById("usuarioAsignacion"),
  cursoAsignacion: document.getElementById("cursoAsignacion"),
  fechaLimiteAsignacion: document.getElementById("fechaLimiteAsignacion"),
  filtroEstado: document.getElementById("filtroEstado"),
  tablaAsignaciones: document.getElementById("tablaAsignaciones"),
  cumplimientoUsuarios: document.getElementById("cumplimientoUsuarios"),
  btnRestablecer: document.getElementById("btnRestablecer"),
  emptyStateTemplate: document.getElementById("emptyStateTemplate")
};

async function iniciarAplicacion() {
  const savedState = cargarDesdeLocalStorage();

  if (savedState) {
    state = savedState;
  } else {
    state = await cargarDatosIniciales();
    guardarEstado();
  }

  normalizarEstados();
  configurarEventos();
  renderizarAplicacion();
}

async function cargarDatosIniciales() {
  try {
    const response = await fetch("data/cursos.json");

    if (!response.ok) {
      throw new Error("No fue posible cargar el archivo de datos iniciales.");
    }

    const data = await response.json();
    return validarEstructuraDatos(data) ? data : structuredClone(fallbackData);
  } catch (error) {
    console.warn("Se utilizaran datos de respaldo:", error.message);
    return structuredClone(fallbackData);
  }
}

function validarEstructuraDatos(data) {
  return Boolean(
    data &&
      Array.isArray(data.cursos) &&
      Array.isArray(data.usuarios) &&
      Array.isArray(data.asignaciones)
  );
}

function cargarDesdeLocalStorage() {
  const rawState = localStorage.getItem(STORAGE_KEY);

  if (!rawState) {
    return null;
  }

  try {
    const parsedState = JSON.parse(rawState);
    return validarEstructuraDatos(parsedState) ? parsedState : null;
  } catch (error) {
    console.warn("Estado local invalido. Se reiniciaran datos.", error.message);
    return null;
  }
}

function guardarEstado() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function configurarEventos() {
  elements.formUsuario.addEventListener("submit", registrarUsuario);
  elements.formCurso.addEventListener("submit", registrarCurso);
  elements.formAsignacion.addEventListener("submit", registrarAsignacion);
  elements.filtroEstado.addEventListener("change", renderizarTablaAsignaciones);
  elements.btnRestablecer.addEventListener("click", restablecerDatos);
}

function registrarUsuario(event) {
  event.preventDefault();

  const nombre = obtenerValor("nombreUsuario");
  const identificacion = obtenerValor("identificacionUsuario");
  const dependencia = obtenerValor("dependenciaUsuario");
  const cargo = obtenerValor("cargoUsuario");

  if (!nombre || !identificacion || !dependencia || !cargo) {
    mostrarMensaje("Todos los campos del usuario son obligatorios.");
    return;
  }

  const identificacionDuplicada = state.usuarios.some(
    (usuario) => usuario.identificacion === identificacion
  );

  if (identificacionDuplicada) {
    mostrarMensaje("Ya existe un usuario con la misma identificacion.");
    return;
  }

  state.usuarios.push({
    id: generarId(state.usuarios),
    nombre,
    identificacion,
    dependencia,
    cargo
  });

  event.target.reset();
  guardarEstado();
  renderizarAplicacion();
}

function registrarCurso(event) {
  event.preventDefault();

  const nombre = obtenerValor("nombreCurso");
  const duracionHoras = Number(obtenerValor("duracionCurso"));
  const vigenciaMeses = Number(obtenerValor("vigenciaCurso"));
  const descripcion = obtenerValor("descripcionCurso");

  if (!nombre || !duracionHoras || !vigenciaMeses) {
    mostrarMensaje("El curso debe tener nombre, duracion y vigencia.");
    return;
  }

  if (duracionHoras <= 0 || vigenciaMeses <= 0) {
    mostrarMensaje("La duracion y la vigencia deben ser mayores a cero.");
    return;
  }

  const cursoDuplicado = state.cursos.some(
    (curso) => normalizarTexto(curso.nombre) === normalizarTexto(nombre)
  );

  if (cursoDuplicado) {
    mostrarMensaje("Ya existe un curso con ese nombre.");
    return;
  }

  state.cursos.push({
    id: generarId(state.cursos),
    nombre,
    descripcion,
    duracionHoras,
    vigenciaMeses,
    obligatorio: true
  });

  event.target.reset();
  guardarEstado();
  renderizarAplicacion();
}

function registrarAsignacion(event) {
  event.preventDefault();

  const usuarioId = Number(elements.usuarioAsignacion.value);
  const cursoId = Number(elements.cursoAsignacion.value);
  const fechaLimite = elements.fechaLimiteAsignacion.value;

  if (!usuarioId || !cursoId || !fechaLimite) {
    mostrarMensaje("Debe seleccionar usuario, curso y fecha limite.");
    return;
  }

  if (esFechaPasada(fechaLimite)) {
    mostrarMensaje("La fecha limite no puede ser anterior a la fecha actual.");
    return;
  }

  const asignacionDuplicadaActiva = state.asignaciones.some(
    (asignacion) =>
      asignacion.usuarioId === usuarioId &&
      asignacion.cursoId === cursoId &&
      asignacion.estado !== "aprobado"
  );

  if (asignacionDuplicadaActiva) {
    mostrarMensaje("El usuario ya tiene una asignacion activa para ese curso.");
    return;
  }

  state.asignaciones.push({
    id: generarId(state.asignaciones),
    usuarioId,
    cursoId,
    fechaAsignacion: obtenerFechaActualISO(),
    fechaLimite,
    fechaFinalizacion: null,
    estado: "pendiente"
  });

  event.target.reset();
  guardarEstado();
  renderizarAplicacion();
}

function normalizarEstados() {
  const hoy = obtenerFechaSinHora(new Date());

  state.asignaciones = state.asignaciones.map((asignacion) => {
    if (asignacion.estado === "aprobado") {
      return asignacion;
    }

    const fechaLimite = obtenerFechaSinHora(new Date(`${asignacion.fechaLimite}T00:00:00`));

    if (fechaLimite < hoy) {
      return { ...asignacion, estado: "vencido" };
    }

    if (!asignacion.estado || asignacion.estado === "vencido") {
      return { ...asignacion, estado: "pendiente" };
    }

    return asignacion;
  });

  guardarEstado();
}

function aprobarAsignacion(asignacionId) {
  state.asignaciones = state.asignaciones.map((asignacion) => {
    if (asignacion.id !== asignacionId) {
      return asignacion;
    }

    return {
      ...asignacion,
      estado: "aprobado",
      fechaFinalizacion: obtenerFechaActualISO()
    };
  });

  guardarEstado();
  renderizarAplicacion();
}

function iniciarCurso(asignacionId) {
  state.asignaciones = state.asignaciones.map((asignacion) => {
    if (asignacion.id !== asignacionId || asignacion.estado !== "pendiente") {
      return asignacion;
    }

    return {
      ...asignacion,
      estado: "en_proceso"
    };
  });

  guardarEstado();
  renderizarAplicacion();
}

function eliminarAsignacion(asignacionId) {
  const confirmar = window.confirm("Esta accion eliminara la asignacion seleccionada. Desea continuar?");

  if (!confirmar) {
    return;
  }

  state.asignaciones = state.asignaciones.filter((asignacion) => asignacion.id !== asignacionId);
  guardarEstado();
  renderizarAplicacion();
}

function restablecerDatos() {
  const confirmar = window.confirm("Se restableceran los datos iniciales del sistema. Desea continuar?");

  if (!confirmar) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(fallbackData);
  guardarEstado();
  renderizarAplicacion();
}

function renderizarAplicacion() {
  normalizarEstados();
  renderizarIndicadores();
  renderizarSelectores();
  renderizarTablaAsignaciones();
  renderizarCumplimientoUsuarios();
}

function renderizarIndicadores() {
  elements.totalUsuarios.textContent = state.usuarios.length;
  elements.totalCursos.textContent = state.cursos.length;
  elements.totalAsignaciones.textContent = state.asignaciones.length;
  elements.totalVencidos.textContent = state.asignaciones.filter(
    (asignacion) => asignacion.estado === "vencido"
  ).length;
}

function renderizarSelectores() {
  elements.usuarioAsignacion.innerHTML = crearOpciones(
    state.usuarios,
    "Seleccione usuario",
    (usuario) => `${usuario.nombre} - ${usuario.dependencia}`
  );

  elements.cursoAsignacion.innerHTML = crearOpciones(
    state.cursos,
    "Seleccione curso",
    (curso) => `${curso.nombre} (${curso.duracionHoras} h)`
  );
}

function crearOpciones(items, placeholder, labelBuilder) {
  const opciones = [`<option value="">${placeholder}</option>`];

  items.forEach((item) => {
    opciones.push(`<option value="${item.id}">${labelBuilder(item)}</option>`);
  });

  return opciones.join("");
}

function renderizarTablaAsignaciones() {
  const filtro = elements.filtroEstado.value;
  const asignacionesFiltradas = state.asignaciones.filter(
    (asignacion) => filtro === "todos" || asignacion.estado === filtro
  );

  elements.tablaAsignaciones.innerHTML = "";

  if (asignacionesFiltradas.length === 0) {
    elements.tablaAsignaciones.appendChild(elements.emptyStateTemplate.content.cloneNode(true));
    return;
  }

  asignacionesFiltradas.forEach((asignacion) => {
    const usuario = buscarUsuario(asignacion.usuarioId);
    const curso = buscarCurso(asignacion.cursoId);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${usuario ? usuario.nombre : "Usuario no encontrado"}</td>
      <td>${curso ? curso.nombre : "Curso no encontrado"}</td>
      <td>${formatearFecha(asignacion.fechaLimite)}</td>
      <td><span class="status status-${asignacion.estado}">${formatearEstado(asignacion.estado)}</span></td>
      <td>${crearTextoAlerta(asignacion)}</td>
      <td>
        <div class="actions">
          <button type="button" class="btn-secondary" data-action="iniciar" data-id="${asignacion.id}">Iniciar</button>
          <button type="button" data-action="aprobar" data-id="${asignacion.id}">Aprobar</button>
          <button type="button" class="btn-danger" data-action="eliminar" data-id="${asignacion.id}">Eliminar</button>
        </div>
      </td>
    `;

    row.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", manejarAccionAsignacion);
    });

    elements.tablaAsignaciones.appendChild(row);
  });
}

function manejarAccionAsignacion(event) {
  const action = event.currentTarget.dataset.action;
  const asignacionId = Number(event.currentTarget.dataset.id);

  if (action === "iniciar") {
    iniciarCurso(asignacionId);
    return;
  }

  if (action === "aprobar") {
    aprobarAsignacion(asignacionId);
    return;
  }

  if (action === "eliminar") {
    eliminarAsignacion(asignacionId);
  }
}

function renderizarCumplimientoUsuarios() {
  elements.cumplimientoUsuarios.innerHTML = "";

  if (state.usuarios.length === 0) {
    elements.cumplimientoUsuarios.innerHTML = `<p class="empty-state">No hay usuarios registrados.</p>`;
    return;
  }

  state.usuarios.forEach((usuario) => {
    const asignacionesUsuario = state.asignaciones.filter(
      (asignacion) => asignacion.usuarioId === usuario.id
    );

    const total = asignacionesUsuario.length;
    const aprobados = asignacionesUsuario.filter(
      (asignacion) => asignacion.estado === "aprobado"
    ).length;

    const porcentaje = total === 0 ? 0 : Math.round((aprobados / total) * 100);

    const item = document.createElement("article");
    item.className = "progress-item";
    item.innerHTML = `
      <div class="progress-title">
        <span>${usuario.nombre}</span>
        <span>${porcentaje}%</span>
      </div>
      <div class="progress-bar" aria-label="Cumplimiento de ${usuario.nombre}">
        <div class="progress-fill" style="width: ${porcentaje}%"></div>
      </div>
      <span class="progress-meta">${aprobados} de ${total} cursos aprobados</span>
    `;

    elements.cumplimientoUsuarios.appendChild(item);
  });
}

function crearTextoAlerta(asignacion) {
  if (asignacion.estado === "aprobado") {
    return `<span class="alert-text alert-ok">Aprobado el ${formatearFecha(asignacion.fechaFinalizacion)}</span>`;
  }

  if (asignacion.estado === "vencido") {
    return `<span class="alert-text alert-danger">Curso vencido</span>`;
  }

  const diasRestantes = calcularDiasRestantes(asignacion.fechaLimite);

  if (diasRestantes <= ALERTA_DIAS) {
    return `<span class="alert-text alert-warning">Vence en ${diasRestantes} dia(s)</span>`;
  }

  return `<span class="alert-text alert-ok">Dentro del plazo</span>`;
}

function buscarUsuario(usuarioId) {
  return state.usuarios.find((usuario) => usuario.id === usuarioId);
}

function buscarCurso(cursoId) {
  return state.cursos.find((curso) => curso.id === cursoId);
}

function obtenerValor(elementId) {
  return document.getElementById(elementId).value.trim();
}

function generarId(items) {
  if (items.length === 0) {
    return 1;
  }

  return Math.max(...items.map((item) => item.id)) + 1;
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

function obtenerFechaActualISO() {
  return new Date().toISOString().slice(0, 10);
}

function obtenerFechaSinHora(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

function esFechaPasada(fechaISO) {
  const hoy = obtenerFechaSinHora(new Date());
  const fecha = obtenerFechaSinHora(new Date(`${fechaISO}T00:00:00`));
  return fecha < hoy;
}

function calcularDiasRestantes(fechaISO) {
  const hoy = obtenerFechaSinHora(new Date());
  const fechaLimite = obtenerFechaSinHora(new Date(`${fechaISO}T00:00:00`));
  const diferencia = fechaLimite - hoy;
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

function formatearFecha(fechaISO) {
  if (!fechaISO) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(`${fechaISO}T00:00:00`));
}

function formatearEstado(estado) {
  const labels = {
    pendiente: "Pendiente",
    en_proceso: "En proceso",
    aprobado: "Aprobado",
    vencido: "Vencido"
  };

  return labels[estado] || "Sin estado";
}

function mostrarMensaje(mensaje) {
  window.alert(mensaje);
}

iniciarAplicacion();
