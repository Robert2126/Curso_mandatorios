# Modelo de base de datos

## Motor recomendado

PostgreSQL.

## Entidades principales

| Tabla | Finalidad |
|---|---|
| usuarios | Datos de acceso y perfil. |
| roles | Roles de estudiante y administrador. |
| usuario_roles | Relacion usuario-rol. |
| ciclos | Agrupacion de cursos. |
| cursos | Cursos mandatorios. |
| temas | Temas variables por curso. |
| recursos | Videos, infografias, enlaces y textos interactivos. |
| ejemplos_aplicados | Casos practicos por tema. |
| preguntas | Banco de preguntas. |
| opciones_respuesta | Alternativas de cada pregunta. |
| practicas | Sesiones de practica libre. |
| respuestas_practica | Respuestas dadas en practica. |
| simulacros | Configuracion de simulacros. |
| intentos_simulacro | Intentos presentados. |
| respuestas_simulacro | Respuestas del simulacro. |
| avance_usuario | Avance por curso y tema. |
| sesiones_estudio | Tiempo de estudio. |
| notas_personales | Apuntes privados. |
| insignias | Logros simbolicos. |
| recordatorios | Alertas internas. |
| reportes_generados | Historial de reportes. |
| auditoria | Acciones relevantes. |

## Relaciones principales

- Un ciclo tiene muchos cursos.
- Un curso tiene muchos temas.
- Un curso tiene muchas preguntas.
- Un tema puede tener muchas preguntas.
- Una pregunta tiene varias opciones.
- Una pregunta debe tener una unica opcion correcta.
- Un simulacro pertenece a un curso.
- Un usuario solo puede tener un intento por simulacro.

## Restricciones criticas

```sql
CREATE UNIQUE INDEX una_respuesta_correcta_por_pregunta
ON opciones_respuesta (pregunta_id)
WHERE es_correcta = true;

CREATE UNIQUE INDEX un_intento_por_usuario_simulacro
ON intentos_simulacro (usuario_id, simulacro_id);
```

## Calculo de avance

```text
avance_curso = (temas_completados / total_temas) * 100
```

## Calculo de nota

```text
puntaje_100 = (respuestas_correctas / total_preguntas) * 100
nota_5 = (puntaje_100 * 5) / 100
```
