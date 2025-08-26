// SISTEMA DE BIBLIOTECA

let library = [];                 // Array que almacena todos los libros
let borrowedBooks = new Map();    // Map que almacena los libros actualmente prestados

// 1️ Función para crear un libro
// Esta función sirve para crear un libro como objeto en la biblioteca
function createBook(title, author, genre, isbn) {
  const book = {
    id: Date.now(),         // ID único del libro generado con la fecha actual
    title: title,           // título del libro
    author: author,         // autor del libro
    genre: genre,           // género del libro
    isbn: isbn,             // ISBN del libro
    isAvailable: true,      // disponibilidad (true = disponible, false = prestado)
    borrowedBy: null,       // nombre de quien lo tiene prestado
    borrowedAt: null,       // fecha en que se prestó
    dueDate: null,          // fecha de devolución
    createdAt: new Date()   // fecha de creación del objeto libro
  };
  return book;              // devolvemos el objeto libro creado
}

// Ejemplo de uso
const book1 = createBook("Satanas", "Mario Mendoza", "Novela", "1998"); // creación de un libro
console.log("1️ - Libro creado:", book1); // mostrar libro en consola

// 2️ Función para agregar libro a la biblioteca
// Esta función agrega un libro creado a la lista principal de la biblioteca
function addBookToLibrary(books, title, author, genre, isbn) {
  const newBook = createBook(title, author, genre, isbn); // crear libro con la función createBook
  books.push(newBook);                                    // añadir el libro creado al array principal
  return newBook;                                         // devolver libro agregado
}

// Ejemplo de uso
const book2 = addBookToLibrary(library, "La importancia de morir a tiempo", "Mario Mendoza", "Novela", "1999"); // se agrega un libro
console.log(" 2 - Libro agregado a la biblioteca:", book2); // mostrar resultado

// 3️ Función para eliminar un libro de la biblioteca
// Esta función elimina un libro por su ID
function removeBookFromLibrary(books, id) {
  const index = books.findIndex(book => book.id === id); // buscar índice del libro por ID
  if (index !== -1) {
    return books.splice(index, 1)[0];  // eliminar del array y devolver libro eliminado
  }
  return null; // si no se encontró, devolver null
}

// Ejemplo de uso
const removedBook = removeBookFromLibrary(library, book1.id); // eliminar libro creado antes
console.log(" 3 - Libro eliminado:", removedBook); // mostrar libro eliminado
console.log(" Biblioteca actual después de eliminar:", library); // mostrar biblioteca actual

// 4️ Función para prestar un libro
// Cambia el estado del libro, asigna prestatario y fecha de devolución, y lo registra en borrowedBooks
function borrowBook(books, borrowedBooks, bookId, borrowerName, days = 14) {
  const book = books.find(b => b.id === bookId); // buscar libro por ID
  if (!book) {
    return { success: false, message: `No se encontró el libro con ID: ${bookId}`, book: null, dueDate: null }; // si no existe
  }
  if (!book.isAvailable) {
    return { success: false, message: `El libro "${book.title}" no está disponible`, book: book, dueDate: null }; // si ya está prestado
  }
  book.isAvailable = false;                   // marcar como no disponible
  book.borrowedBy = borrowerName;             // registrar prestatario
  book.borrowedAt = new Date();               // guardar fecha de préstamo
  book.dueDate = new Date();                  // fecha de devolución inicial
  book.dueDate.setDate(book.borrowedAt.getDate() + days); // calcular fecha de devolución sumando días
  borrowedBooks.set(book.id, book);           // registrar en Map de prestados
  return {
    success: true,
    message: `El libro "${book.title}" fue prestado a ${borrowerName} hasta el ${book.dueDate.toLocaleDateString()}`, // mensaje de confirmación
    book: book,
    dueDate: book.dueDate
  };
}

// Ejemplo de uso
const prestamo = borrowBook(library, borrowedBooks, book2.id, "Carlos Castro"); // prestar libro
console.log("4️ - Resultado del préstamo:", prestamo); // mostrar resultado del préstamo
console.log(" Libros prestados:", borrowedBooks); // mostrar libros actualmente prestados

// 5️ Función para devolver un libro
// Restaura propiedades del libro, calcula multa si corresponde y elimina del Map de prestados
function returnBook(books, borrowedBooks, bookId, fineRate = 0.5) {
  const book = borrowedBooks.get(bookId); // obtener libro del Map de prestados
  if (!book) {
    return { success: false, message: `El libro con ID: ${bookId} no está prestado`, fine: 0 }; // si no existe, no se devuelve
  }
  const today = new Date(); // fecha actual
  let fine = 0; // multa inicial
  if (today > book.dueDate) { // si pasó la fecha límite
    fine = calculateFine(book.dueDate, fineRate); // calcular multa
  }
  book.isAvailable = true;    // marcar como disponible
  book.borrowedBy = null;     // borrar prestatario
  book.borrowedAt = null;     // borrar fecha de préstamo
  book.dueDate = null;        // borrar fecha de devolución
  borrowedBooks.delete(bookId); // eliminar de Map de prestados
  return { success: true, message: `El libro "${book.title}" ha sido devuelto`, fine: fine }; // devolver confirmación
}

// Ejemplo de uso
const devolucion = returnBook(library, borrowedBooks, book2.id); // devolver libro prestado
console.log("5️ - Resultado de devolución:", devolucion); // mostrar resultado
console.log(" Libros prestados después de devolver:", borrowedBooks); // verificar Map vacío

// 6️ Función para calcular multa por retraso
// Devuelve 0 si no hay retraso, o la multa calculada
function calculateFine(dueDate, fineRate = 0.50) {
  const today = new Date(); // fecha actual
  if (today <= dueDate) return 0; // si aún no se venció, no hay multa
  const diffTime = today - dueDate; // diferencia en milisegundos
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convertir a días
  return diffDays * fineRate; // multiplicar días de retraso por tarifa
}

// Ejemplo de uso
const due = new Date();
due.setDate(due.getDate() - 5); // fecha vencida hace 5 días
const multa = calculateFine(due, 1); // calcular multa
console.log("6️ -  Multa calculada:", multa); // mostrar multa

// 7️ Función para buscar libros por criterios
// Devuelve libros cuyo título, autor o género coincida con el criterio
const searchBooks = (books, criteria) => {   // arrow function para búsqueda
  const lowerCriteria = criteria.toLowerCase(); // convertir criterio a minúsculas
  return books.filter(book =>                // filtrar libros
    book.title.toLowerCase().includes(lowerCriteria) ||   // buscar en título
    book.author.toLowerCase().includes(lowerCriteria) ||  // buscar en autor
    book.genre.toLowerCase().includes(lowerCriteria)      // buscar en género
  );
};

// Ejemplo de uso
const searchResult = searchBooks(library, "Mario"); // buscar por "Mario"
console.log("7️ - Libros encontrados por 'Mario':", searchResult); // mostrar resultados

// 8️ Función para obtener libros por género
// Devuelve libros que pertenecen a un género específico
const getBooksByGenre = (books, genre) => {   // arrow function para búsqueda por género
  const lowerGenre = genre.toLowerCase(); // convertir género a minúsculas
  return books.filter(book => book.genre.toLowerCase() === lowerGenre); // filtrar por género
};

// Ejemplo de uso
const genreBooks = getBooksByGenre(library, "Novela"); // buscar por género "Novela"
console.log("8️ . Libros del género 'Novela':", genreBooks); // mostrar resultados

// 9️ - Función para obtener libros vencidos
// Recorre borrowedBooks y devuelve libros cuyo dueDate ya pasó, con multa calculada
function getOverdueBooks(borrowedBooks, fineRate = 0.5) {
  const today = new Date(); // fecha actual
  const overdue = []; // array para libros vencidos
  borrowedBooks.forEach(book => { // recorrer todos los libros prestados
    if (book.dueDate && book.dueDate < today) { // si ya pasó la fecha
      const fine = calculateFine(book.dueDate, fineRate); // calcular multa
      overdue.push({ id: book.id, title: book.title, borrower: book.borrowedBy, dueDate: book.dueDate, fine: fine }); // guardar datos
    }
  });
  return overdue; // devolver lista de vencidos
}

// Ejemplo de uso
const book5 = {   // crear libro vencido manualmente
  id: 2000,
  title: "Don Quijote",
  author: "Miguel de Cervantes",
  genre: "Novela",
  isAvailable: false,
  borrowedBy: "Ana",
  borrowedAt: new Date('2025-08-01'),
  dueDate: new Date('2025-08-10')
};
borrowedBooks.set(book5.id, book5); // agregar a libros prestados
console.log("9️ - Libros vencidos:", getOverdueBooks(borrowedBooks)); // mostrar vencidos

// 10 Función para generar reporte de la biblioteca
// Devuelve estadísticas: total de libros, prestados, disponibles, vencidos y multas totales
function generateLibraryReport(books, borrowedBooks, fineRate = 0.5) {
  const totalBooks = books.length; // total de libros en biblioteca
  const totalBorrowed = borrowedBooks.size; // total de libros prestados
  const availableBooks = books.filter(book => book.isAvailable).length; // cantidad de libros disponibles
  const overdue = getOverdueBooks(borrowedBooks, fineRate); // libros vencidos
  const overdueBooks = overdue.length; // cantidad de libros vencidos
  const totalFines = overdue.reduce((sum, book) => sum + book.fine, 0); // total de multas acumuladas
  return { totalBooks, borrowedBooks: totalBorrowed, availableBooks, overdueBooks, totalFines }; // devolver estadísticas
}

// Ejemplo de uso
const reporte = generateLibraryReport(library, borrowedBooks); // generar reporte
console.log("10 - Reporte de la biblioteca:", reporte); // mostrar reporte en consola