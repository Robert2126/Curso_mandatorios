-- Aula Mandatorios - esquema SQL preliminar
-- Motor recomendado: PostgreSQL

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150),
    password_hash TEXT NOT NULL,
    grado_referencia VARCHAR(80),
    estado BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

CREATE TABLE usuario_roles (
    id SERIAL PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    rol_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, rol_id)
);

CREATE TABLE ciclos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    ciclo_id INT NOT NULL REFERENCES ciclos(id) ON DELETE CASCADE,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    duracion_estimada_min INT,
    imagen_portada TEXT,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE temas (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    objetivo TEXT,
    activacion TEXT,
    resumen TEXT,
    contenido_html TEXT,
    orden INT DEFAULT 0,
    duracion_estimada_min INT,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE recursos (
    id SERIAL PRIMARY KEY,
    curso_id INT REFERENCES cursos(id) ON DELETE CASCADE,
    tema_id INT REFERENCES temas(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    url_recurso TEXT,
    contenido_embebido TEXT,
    descargable BOOLEAN DEFAULT false,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE preguntas (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    tema_id INT REFERENCES temas(id) ON DELETE SET NULL,
    enunciado TEXT NOT NULL,
    dificultad VARCHAR(20) DEFAULT 'media',
    explicacion_general TEXT,
    activa BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opciones_respuesta (
    id SERIAL PRIMARY KEY,
    pregunta_id INT NOT NULL REFERENCES preguntas(id) ON DELETE CASCADE,
    texto_opcion TEXT NOT NULL,
    es_correcta BOOLEAN DEFAULT false,
    retroalimentacion TEXT,
    orden INT DEFAULT 0
);

CREATE UNIQUE INDEX una_respuesta_correcta_por_pregunta
ON opciones_respuesta (pregunta_id)
WHERE es_correcta = true;

CREATE TABLE simulacros (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    numero_preguntas INT NOT NULL,
    tiempo_limite_min INT NOT NULL,
    porcentaje_aprobacion NUMERIC(5,2) DEFAULT 70,
    escala_nota VARCHAR(20) DEFAULT '100',
    intentos_permitidos INT DEFAULT 1,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE intentos_simulacro (
    id SERIAL PRIMARY KEY,
    simulacro_id INT NOT NULL REFERENCES simulacros(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP,
    tiempo_empleado_seg INT,
    total_preguntas INT DEFAULT 0,
    correctas INT DEFAULT 0,
    incorrectas INT DEFAULT 0,
    puntaje_100 NUMERIC(5,2),
    puntaje_5 NUMERIC(3,2),
    aprobado BOOLEAN,
    estado VARCHAR(30) DEFAULT 'iniciado',
    UNIQUE (usuario_id, simulacro_id)
);

CREATE TABLE respuestas_simulacro (
    id SERIAL PRIMARY KEY,
    intento_id INT NOT NULL REFERENCES intentos_simulacro(id) ON DELETE CASCADE,
    pregunta_id INT NOT NULL REFERENCES preguntas(id) ON DELETE CASCADE,
    opcion_id INT REFERENCES opciones_respuesta(id) ON DELETE SET NULL,
    es_correcta BOOLEAN,
    orden_pregunta INT,
    respondida BOOLEAN DEFAULT false
);

CREATE TABLE avance_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    tema_id INT REFERENCES temas(id) ON DELETE CASCADE,
    porcentaje_avance NUMERIC(5,2) DEFAULT 0,
    completado BOOLEAN DEFAULT false,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_completado TIMESTAMP,
    ultimo_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, curso_id, tema_id)
);
