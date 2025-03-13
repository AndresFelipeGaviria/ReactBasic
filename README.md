# Proyecto: Aplicación de Gestión Hotelera

Este proyecto es una aplicación web de gestión hotelera desarrollada con **React**, **TypeScript** y **Tailwind CSS**, desplegada en **Azure**. A continuación, se resumen sus aspectos clave, fortalezas y áreas de mejora, junto con información relevante para acceder y probar la aplicación.

## Descripción General

La aplicación permite gestionar hoteles, habitaciones y reservas, ofreciendo una interfaz moderna y responsiva. Está dividida en dos partes principales:

- **Frontend**: Desplegado en Azure Static Web Apps y accesible en [https://lemon-grass-0cd43590f.6.azurestaticapps.net/](https://lemon-grass-0cd43590f.6.azurestaticapps.net/).
- **Backend**: Desarrollado en C# y desplegado en Azure Web Services, con documentación disponible en Swagger: [https://hotelmanagement20250304171928.azurewebsites.net/swagger/index.html](https://hotelmanagement20250304171928.azurewebsites.net/swagger/index.html).

Para acceder al panel de administración, los usuarios deben iniciar sesión en [https://lemon-grass-0cd43590f.6.azurestaticapps.net/login](https://lemon-grass-0cd43590f.6.azurestaticapps.net/login). Las credenciales de prueba son:
- **Correo**: correoprueba@gmail.com
- **Contraseña**: Abc123.

También es posible crear nuevos usuarios desde el Swagger del backend.

## Fortalezas

- **Arquitectura bien estructurada**: El código está organizado con una clara separación de responsabilidades, lo que facilita su mantenimiento y escalabilidad.
- **Manejo del estado con Zustand**: Se utiliza Zustand para gestionar el estado global de manera eficiente.
- **Diseño responsivo**: La interfaz, desarrollada con Tailwind CSS, es moderna y se adapta a diferentes dispositivos.
- **Integración con API REST**: La comunicación con el backend está bien organizada mediante servicios separados.
- **TypeScript**: Proporciona seguridad de tipos y reduce errores comunes.

## Áreas de Mejora

- **Seguridad en el manejo de tokens**: Actualmente, los tokens se almacenan en localStorage, lo que podría mejorarse con cookies HttpOnly y refresh tokens.
- **Gestión de errores**: Sería útil implementar un sistema más consistente para manejar y mostrar errores en las llamadas a la API. Debido al tiempo y la premura, no se realizó un modal de errores para las peticiones, pero soy consciente de que son fundamentales para un buen funcionamiento y entendimiento del flujo del proyecto.
- **Optimización del rendimiento**: Añadir un sistema de caché para reducir solicitudes redundantes mejoraría el rendimiento.
- **Pruebas automatizadas**: Incorporar pruebas unitarias y de integración con herramientas como Jest y React Testing Library.
- **Validación de formularios**: Mejorar la validación utilizando bibliotecas como Zod o Yup.
- **Feedback visual**: Implementar loading states y mensajes de feedback para operaciones asíncronas.

## Información Adicional

- **Imágenes**: La aplicación utiliza imágenes quemadas y aleatorias para simular contenido.
- **Despliegue**: Tanto el frontend como el backend están desplegados en Azure, lo que garantiza escalabilidad y disponibilidad.
- **Swagger**: Para pruebas y creación de usuarios, accede a la documentación del backend en Swagger.

## Conclusión

Este proyecto demuestra una implementación sólida y funcional de una aplicación de gestión hotelera, con un diseño atractivo y una arquitectura bien organizada. Aunque hay áreas que podrían mejorarse, como la seguridad, la gestión de errores y el rendimiento, la aplicación está lista para su uso.
