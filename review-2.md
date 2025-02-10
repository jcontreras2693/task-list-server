# task-list-server | Gestor de Tareas

## ¿Qué es mi producto y para qué sirve?

Este mini servidor realizado usando Express es un **gestor de tareas** que permite a los usuarios ver, agregar, actualizar y borrar sus tareas de manera sencilla. Con esta aplicación, los usuarios pueden organizar mejor su trabajo, consultar tareas pendientes, marcarlas como completadas y revisar los detalles de cada una.

Además, se han implementado validaciones de seguridad mediante middleware, asegurando que las solicitudes sean correctas y evitando datos inválidos o métodos HTTP no permitidos.

## ¿Cuáles son las funcionalidades más importantes y por qué los usuarios las usarían?

1. **Ver todas las tareas**: Permite a los usuarios obtener una lista completa de sus tareas, lo que les ayuda a visualizar todas las actividades pendientes y planificar mejor su tiempo.

2. **Filtrar tareas**: Se pueden ver únicamente las tareas pendientes o completadas, facilitando el enfoque en lo que realmente necesita atención.

3. **Buscar una tarea específica**: Gracias a un ID único, los usuarios pueden consultar detalles de una tarea para revisarla, actualizarla o eliminarla según sea necesario.

4. **Crear y actualizar tareas con validación**: Se ha implementado un middleware que impide crear o modificar tareas sin datos válidos, garantizando la integridad de la información.

5. Gestión de errores y seguridad:
   - Se validan los parámetros de las solicitudes para evitar errores.
   - Se impide el uso de métodos HTTP no permitidos.
   - Se manejan errores en los endpoints para evitar fallos inesperados.

Estas funcionalidades mejoran la organización personal, reducen la posibilidad de olvidar tareas importantes y facilitan un flujo de trabajo más eficiente.

## ¿Qué tecnologías usaste y por qué?

1. **Node.js**: Proporciona un entorno rápido y eficiente para manejar múltiples solicitudes simultáneamente, ideal para aplicaciones en tiempo real.

2. **Express.js**: Facilita la gestión de rutas y solicitudes HTTP, permitiendo una implementación rápida y limpia de las funcionalidades del servidor.

3. **JavaScript**: Es el lenguaje base tanto del servidor como del cliente (cuando se amplíe el proyecto). Su flexibilidad y popularidad lo convierten en la mejor opción para este desarrollo.

4. **JSON**: Se utiliza para intercambiar datos entre el servidor y los clientes de manera ligera y estructurada.

5. **Middleware personalizado**:
   - **Validación de datos** para evitar solicitudes POST y PUT incorrectas.
   - **Gestión de errores** para asegurar que los parámetros y métodos HTTP sean correctos.
   - **Control de accesos** para permitir solo solicitudes bien estructuradas.

Estas tecnologías fueron elegidas por su popularidad, facilidad de uso y eficiencia, garantizando un desarrollo rápido, seguro y escalable.
