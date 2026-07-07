# Requerimientos funcionales y no funcionales

## Requerimientos funcionales

### Autenticacion

- RF-01: El sistema debe permitir ingreso con cedula y contrasena.
- RF-02: El sistema debe permitir cierre de sesion.
- RF-03: El sistema debe restringir rutas internas sin sesion activa.
- RF-04: El panel administrativo solo debe estar disponible para rol administrador.

### Cursos y temas

- RF-05: El sistema debe mostrar cursos organizados por ciclos.
- RF-06: El sistema debe permitir filtrar cursos por ciclo y estado.
- RF-07: El sistema debe mostrar detalle del curso, temas, recursos y progreso.
- RF-08: El sistema debe permitir marcar temas como completados.

### Contenido educativo

- RF-09: El sistema debe mostrar microlecciones, resumenes, videos, infografias y ejemplos aplicados.
- RF-10: El sistema debe permitir registrar notas personales por curso o tema.
- RF-11: El sistema debe registrar tiempo de estudio.

### Banco de preguntas

- RF-12: El sistema debe permitir practicar preguntas por curso, tema y dificultad.
- RF-13: Cada pregunta debe ser de seleccion unica.
- RF-14: El sistema debe mostrar retroalimentacion despues de responder.
- RF-15: El sistema debe registrar aciertos, errores y preguntas guardadas para repaso.

### Simulacros

- RF-16: El sistema debe permitir configurar simulacros por curso.
- RF-17: El simulacro debe seleccionar preguntas aleatorias.
- RF-18: El simulacro debe tener tiempo limite.
- RF-19: El simulacro debe permitir un solo intento por usuario.
- RF-20: El sistema debe calcular nota, aprobado/no aprobado y temas debiles.

### Reportes

- RF-21: El sistema debe generar reportes basicos en PDF y Excel.
- RF-22: Los reportes deben incluir avance, resultado, temas debiles y recomendaciones.

### Administracion

- RF-23: El administrador debe crear y editar ciclos, cursos, temas, recursos, preguntas y simulacros.
- RF-24: El administrador debe activar o desactivar contenidos.
- RF-25: El administrador debe previsualizar contenido como estudiante.

## Requerimientos no funcionales

- RNF-01: La plataforma debe ser responsive.
- RNF-02: La plataforma debe cargar de forma aceptable en baja conectividad.
- RNF-03: Las contrasenas deben almacenarse cifradas.
- RNF-04: No se deben exponer respuestas correctas antes de responder o finalizar simulacro.
- RNF-05: El banco de preguntas debe estar protegido por sesion y rol.
- RNF-06: El sistema debe usar base de datos relacional.
- RNF-07: El codigo debe mantenerse versionado en GitHub.
- RNF-08: Las variables sensibles deben manejarse en `.env` y no subirse al repositorio.

## Reglas de negocio

1. Cada pregunta debe tener una unica respuesta correcta.
2. La practica libre puede repetirse.
3. El simulacro formal solo permite un intento.
4. El avance del curso se calcula por temas completados.
5. Los contenidos inactivos no se muestran al estudiante.
6. El material se visualiza dentro de la plataforma y no debe ser descargable por defecto.
