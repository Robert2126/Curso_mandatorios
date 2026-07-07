# Diseno de pantallas y componentes

## Pantallas principales

1. Login.
2. Inicio o dashboard.
3. Catalogo de cursos.
4. Detalle del curso.
5. Tema de estudio.
6. Video y ejemplo aplicado.
7. Banco de preguntas.
8. Configuracion del simulacro.
9. Presentacion del simulacro.
10. Resultado del simulacro.
11. Mi progreso.
12. Notas personales.
13. Reportes.
14. Panel administrativo.

## Componentes reutilizables

| Componente | Uso |
|---|---|
| Header | Navegacion principal. |
| Sidebar | Accesos rapidos en escritorio. |
| CardCurso | Catalogo y progreso. |
| CardTema | Temario del curso. |
| BarraProgreso | Avance de curso, tema y simulacro. |
| PreguntaSeleccionUnica | Banco y simulacros. |
| Temporizador | Simulacros. |
| BadgeEstado | Estados de curso, tema o simulacro. |
| ModalConfirmacion | Acciones criticas. |
| ReportePreview | Vista previa de PDF o Excel. |

## Reglas de interfaz

- Cada pantalla debe tener una accion principal clara.
- En celular, los botones deben ocupar ancho completo.
- El temporizador del simulacro debe permanecer visible.
- El banco de preguntas debe mostrar retroalimentacion solo despues de responder.
- El simulacro no debe mostrar retroalimentacion durante el intento.
- El material debe visualizarse dentro de la plataforma.

## Flujo visual del estudiante

```text
Login -> Inicio -> Cursos -> Detalle -> Tema -> Banco de preguntas -> Simulacro -> Resultado -> Progreso
```
