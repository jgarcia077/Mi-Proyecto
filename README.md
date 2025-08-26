# Sistema de Gestión de Biblioteca

- Descripción

Este proyecto es un **Sistema de Gestión de Biblioteca** desarrollado en **Node.js**, que permite administrar libros, registrar préstamos, devoluciones, realizar búsquedas y generar reportes.  
Su objetivo es simular de forma sencilla el funcionamiento de una biblioteca real.

# Funcionalidades principales
Agregar libros - Registrar nuevos libros en la biblioteca.  
*Prestar libros - Asociar libros a usuarios con fecha de devolución.  
*Devolver libros - Actualizar el estado de los libros prestados.  
*Buscar libros - Buscar por título, autor o género.  
*Generar reportes - Reporte de libros disponibles, prestados, vencidos y cálculo de multas.  

# Tecnologías utilizadas
- *Node.js (JavaScript en servidor)  
- *npm (gestor de dependencias)  
- *Git (control de versiones)  
- *GitHub (repositorio remoto)  

# Instalar dependencias
- Requisitos previos
Antes de ejecutar el proyecto asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (incluye `npm`)
- Git
- npm install 

Puedes verificarlo con los siguientes comandos:
node -v
npm -v
git --version

# Ejecutar el proyecto:

- node index.js
- npm start

# Algunos ejemplos uso del sistema

- createBook("Cien años de soledad", "Gabriel García Márquez", "Novela")

- Prestar un libro
// borrowBook(1, "Usuario01", "2025-09-10")

- Devolver un libro
// returnBook(1, "Usuario01")

- Buscar libros
// searchBooks("soledad") 
// Devuelve coincidencias con "Cien años de soledad"

- Generar reporte
// getReport()
// Devuelve cantidad de libros prestados, disponibles, vencidos y multas

# Ejemplo de reporte

{
  "totalBooks": 5,
  "borrowedBooks": 2,
  "availableBooks": 3,
  "overdueBooks": 1,
  "totalFines": 2000
}

# Funciones implementadas según la guía

- createBook(title, author, genre, isbn) → Crea un nuevo libro.
- addBookToLibrary(books, title, author, genre, isbn) → Agrega libro a la biblioteca.
- removeBookFromLibrary(books, id) → Elimina un libro por ID.
- borrowBook(books, borrowedBooks, bookId, borrowerName, days=14) → Registra préstamo de un libro.
- returnBook(books, borrowedBooks, bookId) → Registra devolución y calcula multa.
- calculateFine(dueDate, fineRate=0.50) → Calcula multa por retraso.
- searchBooks(books, criteria) → Busca libros por título, autor o género.
- getBooksByGenre(books, genre) → Lista libros por género.
- getOverdueBooks(borrowedBooks, fineRate) → Muestra libros vencidos y multas.
- generateLibraryReport(books, borrowedBooks) → Genera un reporte completo.

##  Dificultades encontradas
Durante el desarrollo del proyecto se presentaron varios retos importantes:

- Fue necesario **investigar de manera autónoma**, revisando documentación y tutoriales en video para reforzar los conceptos que no habían quedado claros en el semestre anterior.  
- La **organización del código** representó un desafío inicial, ya que había que estructurar las funciones y módulos de forma ordenada y entendible.  
- En varios momentos se identificaron **falencias de base en los conocimientos previos**, lo que exigió dedicar más tiempo a la práctica y la revisión de ejemplos.  
- Se utilizó el apoyo de **herramientas de inteligencia artificial** como complemento para resolver dudas puntuales y mejorar la calidad del código.

# Instalación y ejecución

1. Clonar el repositorio:
git clone https://github.com/jgarcia077/Mi-Proyecto.git
cd Mi-Proyecto