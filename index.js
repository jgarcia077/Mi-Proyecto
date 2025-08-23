// SISTEMA DE BIBLIOTECA

let library = [];                 // Array que almacena todos los libros
let borrowedBooks = new Map();    // Map que almacena los libros actualmente prestados

// 1️ Función para crear un libro
// Esta función sirve para crear un libro como objeto en la biblioteca
function createBook(title, author, genre, isbn) {
  const book = {
    id: Date.now(),         // ID único del libro
    title: title,           // título del libro
    author: author,         // autor del libro
    genre: genre,           // género del libro
    isbn: isbn,             // ISBN del libro
    isAvailable: true,      // disponibilidad (true = disponible, false = prestado)
    borrowedBy: null,       // nombre de quien lo tiene prestado
    borrowedAt: null,       // fecha en que se prestó
    dueDate: null,          // fecha de devolución
    createdAt: new Date()   // fecha de creación del objeto
  };
  return book;              // devolvemos el objeto libro
}

// Ejemplo de uso
const book1 = createBook("Satanas", "Mario Mendoza", "Novela", "978-607-111-222-3");
console.log("1️ - Libro creado:", book1);

// 2️ Función para agregar libro a la biblioteca
// Esta función agrega un libro creado a la lista principal de la biblioteca
function addBookToLibrary(books, title, author, genre, isbn) {
  const newBook = createBook(title, author, genre, isbn); // crear libro
  books.push(newBook);                                     // añadir al array
  return newBook;                                         // devolver libro agregado
}

// Ejemplo de uso
const book2 = addBookToLibrary(library, "La importancia de morir a tiempo", "Mario Mendoza", "Novela", "978-607-111-333-4");
console.log(" 2 - Libro agregado a la biblioteca:", book2);

// 3️ Función para eliminar un libro de la biblioteca
// Esta función elimina un libro por su ID
function removeBookFromLibrary(books, id) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    return books.splice(index, 1)[0];  // quitar del array y devolver
  }
  return null;
}

// Ejemplo de uso
const removedBook = removeBookFromLibrary(library, book1.id);
console.log(" 3 - Libro eliminado:", removedBook);
console.log(" Biblioteca actual después de eliminar:", library);

// 4️ Función para prestar un libro
// Cambia el estado del libro, asigna prestatario y fecha de devolución, y lo registra en borrowedBooks
function borrowBook(books, borrowedBooks, bookId, borrowerName, days = 14) {
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return { success: false, message: `No se encontró el libro con ID: ${bookId}`, book: null, dueDate: null };
  }
  if (!book.isAvailable) {
    return { success: false, message: `El libro "${book.title}" no está disponible`, book: book, dueDate: null };
  }
  book.isAvailable = false;
  book.borrowedBy = borrowerName;
  book.borrowedAt = new Date();
  book.dueDate = new Date();
  book.dueDate.setDate(book.borrowedAt.getDate() + days);
  borrowedBooks.set(book.id, book);
  return {
    success: true,
    message: `El libro "${book.title}" fue prestado a ${borrowerName} hasta el ${book.dueDate.toLocaleDateString()}`,
    book: book,
    dueDate: book.dueDate
  };
}

// Ejemplo de uso
const prestamo = borrowBook(library, borrowedBooks, book2.id, "Carlos Castro");
console.log("4️ - Resultado del préstamo:", prestamo);
console.log(" Libros prestados:", borrowedBooks);

// 5️ Función para devolver un libro
// Restaura propiedades del libro, calcula multa si corresponde y elimina del Map de prestados
function returnBook(books, borrowedBooks, bookId) {
  const book = borrowedBooks.get(bookId);
  if (!book) {
    return { success: false, message: `El libro con ID: ${bookId} no está prestado`, fine: 0 };
  }
  const today = new Date();
  let fine = 0;
  if (today > book.dueDate) {
    const diffTime = today - book.dueDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    fine = diffDays * 1000;  // tarifa ejemplo por día
  }
  book.isAvailable = true;
  book.borrowedBy = null;
  book.borrowedAt = null;
  book.dueDate = null;
  borrowedBooks.delete(bookId);
  return { success: true, message: `El libro "${book.title}" ha sido devuelto`, fine: fine };
}

// Ejemplo de uso
const devolucion = returnBook(library, borrowedBooks, book2.id);
console.log("5️ - Resultado de devolución:", devolucion);
console.log(" Libros prestados después de devolver:", borrowedBooks);

// 6️ Función para calcular multa por retraso
// Devuelve 0 si no hay retraso, o la multa calculada
function calculateFine(dueDate, fineRate = 0.50) {
  const today = new Date();
  if (today <= dueDate) return 0;
  const diffTime = today - dueDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays * fineRate;
}

// Ejemplo de uso
const due = new Date();
due.setDate(due.getDate() - 5); // libro vencido hace 5 días
const multa = calculateFine(due, 1);
console.log("6️ -  Multa calculada:", multa);

// 7️ Función para buscar libros por criterios
// Devuelve libros cuyo título, autor o género coincida con el criterio
function searchBooks(books, criteria) {
  const lowerCriteria = criteria.toLowerCase();
  return books.filter(book =>
    book.title.toLowerCase().includes(lowerCriteria) ||
    book.author.toLowerCase().includes(lowerCriteria) ||
    book.genre.toLowerCase().includes(lowerCriteria)
  );
}

// Ejemplo de uso
const searchResult = searchBooks(library, "Mario");
console.log("7️ - Libros encontrados por 'Mario':", searchResult);

// 8️ Función para obtener libros por género
// Devuelve libros que pertenecen a un género específico
function getBooksByGenre(books, genre) {
  const lowerGenre = genre.toLowerCase();
  return books.filter(book => book.genre.toLowerCase() === lowerGenre);
}

// Ejemplo de uso
const genreBooks = getBooksByGenre(library, "Novela");
console.log("8️ . Libros del género 'Novela':", genreBooks);

// 9️ - Función para obtener libros vencidos
// Recorre borrowedBooks y devuelve libros cuyo dueDate ya pasó, con multa calculada
function getOverdueBooks(borrowedBooks, fineRate = 0.5) {
  const today = new Date();
  const overdue = [];
  borrowedBooks.forEach(book => {
    if (book.dueDate && book.dueDate < today) {
      const fine = calculateFine(book.dueDate, fineRate);
      overdue.push({ id: book.id, title: book.title, borrower: book.borrowedBy, dueDate: book.dueDate, fine: fine });
    }
  });
  return overdue;
}

// Ejemplo de uso
const book5 = {
  id: 201,
  title: "Don Quijote",
  author: "Miguel de Cervantes",
  genre: "Novela",
  isAvailable: false,
  borrowedBy: "Ana",
  borrowedAt: new Date('2025-08-01'),
  dueDate: new Date('2025-08-10')
};
borrowedBooks.set(book5.id, book5);
console.log("9️ - Libros vencidos:", getOverdueBooks(borrowedBooks));

// 10 Función para generar reporte de la biblioteca
// Devuelve estadísticas: total de libros, prestados, disponibles, vencidos y multas totales
function generateLibraryReport(books, borrowedBooks, fineRate = 1000) {
  const totalBooks = books.length;
  const totalBorrowed = borrowedBooks.size;
  const availableBooks = books.filter(book => book.isAvailable).length;
  const overdue = getOverdueBooks(borrowedBooks, fineRate);
  const overdueBooks = overdue.length;
  const totalFines = overdue.reduce((sum, book) => sum + book.fine, 0);
  return { totalBooks, borrowedBooks: totalBorrowed, availableBooks, overdueBooks, totalFines };
}

// Ejemplo de uso
const reporte = generateLibraryReport(library, borrowedBooks);
console.log("10 - Reporte de la biblioteca:", reporte);