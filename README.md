# Curso Mandatorios

## 1. Descripcion general

Este repositorio corresponde al proyecto **Curso Mandatorios**, orientado a la gestion, seguimiento y control de cursos obligatorios. Su finalidad es servir como base para desarrollar una herramienta que permita registrar cursos, asociarlos a usuarios, verificar su estado de cumplimiento y generar alertas sobre actividades pendientes o proximas a vencer.

El proyecto se encuentra en fase inicial. Este documento define el alcance tecnico preliminar, la logica esperada y los criterios que deberan revisarse durante el desarrollo para evitar errores funcionales.

## 2. Objetivo del proyecto

Desarrollar una aplicacion que permita administrar cursos obligatorios, controlar su cumplimiento y calcular indicadores basicos de avance, pendiente, aprobacion y vencimiento.

## 3. Alcance funcional preliminar

La aplicacion deberia permitir:

1. Registrar cursos obligatorios.
2. Registrar usuarios o funcionarios asociados a los cursos.
3. Asignar cursos a cada usuario.
4. Definir fechas de inicio, limite y finalizacion.
5. Marcar cursos como pendientes, en proceso, aprobados o vencidos.
6. Calcular el porcentaje de cumplimiento por usuario.
7. Generar alertas sobre cursos proximos a vencer.
8. Filtrar informacion por usuario, curso, estado o fecha.

## 4. Estructura inicial sugerida

```text
Curso_mandatorios/
|
|-- README.md
|-- index.html
|-- css/
|   |-- styles.css
|-- js/
|   |-- app.js
|-- data/
|   |-- cursos.json
```

## 5. Modelo logico sugerido

### 5.1 Curso

Cada curso deberia contener, como minimo:

```json
{
  "id": 1,
  "nombre": "Curso obligatorio",
  "descripcion": "Descripcion del curso",
  "duracionHoras": 20,
  "vigenciaMeses": 12,
  "obligatorio": true
}
```

### 5.2 Usuario

Cada usuario deberia contener:

```json
{
  "id": 1,
  "nombre": "Nombre del usuario",
  "identificacion": "00000000",
  "dependencia": "Dependencia o area",
  "cargo": "Cargo"
}
```

### 5.3 Asignacion de curso

Cada asignacion deberia relacionar usuario, curso y estado:

```json
{
  "id": 1,
  "usuarioId": 1,
  "cursoId": 1,
  "fechaAsignacion": "2026-01-01",
  "fechaLimite": "2026-03-01",
  "fechaFinalizacion": null,
  "estado": "pendiente"
}
```

## 6. Reglas de negocio preliminares

1. Un curso sin fecha de finalizacion no puede figurar como aprobado.
2. Un curso con fecha limite vencida y sin aprobacion debe marcarse como vencido.
3. Un usuario no deberia tener dos asignaciones activas del mismo curso.
4. El porcentaje de cumplimiento debe calcularse sobre cursos obligatorios asignados.
5. Los cursos aprobados fuera del plazo deben conservar trazabilidad de la fecha real de finalizacion.
6. Las alertas deben generarse antes del vencimiento, no despues de que el curso ya este vencido.
7. Los estados validos deben estar controlados para evitar inconsistencias.

## 7. Estados sugeridos

| Estado | Descripcion |
|---|---|
| pendiente | Curso asignado, sin inicio o sin avance registrado. |
| en_proceso | Curso iniciado, pero no finalizado. |
| aprobado | Curso finalizado satisfactoriamente. |
| vencido | Curso no aprobado dentro del plazo definido. |

## 8. Riesgos logicos a revisar durante el desarrollo

| Area | Riesgo posible | Control sugerido |
|---|---|---|
| Fechas | Marcar como vigente un curso ya vencido. | Comparar fecha actual contra fecha limite. |
| Estados | Permitir aprobado sin fecha de finalizacion. | Validar estado antes de guardar. |
| Duplicados | Asignar el mismo curso dos veces al mismo usuario. | Verificar usuarioId + cursoId activos. |
| Porcentajes | Calcular cumplimiento con cursos no obligatorios. | Filtrar solo cursos obligatorios asignados. |
| Alertas | Notificar cursos ya vencidos como proximos a vencer. | Separar alerta preventiva y alerta de vencimiento. |
| Datos vacios | Registrar cursos sin nombre o sin vigencia. | Validar campos obligatorios. |

## 9. Criterios minimos de prueba

Antes de considerar funcional el sistema, se deberian probar estos escenarios:

1. Registro de curso con datos completos.
2. Rechazo de curso sin nombre.
3. Asignacion de curso a usuario existente.
4. Bloqueo de asignacion duplicada activa.
5. Cambio correcto de pendiente a aprobado.
6. Deteccion automatica de curso vencido.
7. Calculo correcto del porcentaje de cumplimiento.
8. Generacion de alerta para cursos proximos a vencer.

## 10. Pendientes de definicion

Para continuar el desarrollo se debe definir:

1. Tipo de aplicacion: web estatica, web con backend o aplicacion de escritorio.
2. Lenguaje principal: JavaScript, Python, Java u otro.
3. Metodo de almacenamiento: JSON, localStorage, base de datos o API.
4. Roles de usuario: administrador, consulta, usuario final.
5. Reglas exactas de vencimiento y vigencia.
6. Necesidad de reportes exportables en PDF, Excel o CSV.

## 11. Proximo paso sugerido

Crear los archivos base del proyecto:

```text
index.html
css/styles.css
js/app.js
data/cursos.json
```

Despues de crear estos archivos, se podra iniciar una revision tecnica de la logica de negocio, validaciones, calculos y flujo funcional.