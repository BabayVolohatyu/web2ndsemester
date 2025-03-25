// Task 1
function task1() {
    console.log("Task 1");
    const initialFruits = ["apple", "banana", "orange", "kiwi", "pear"];

    let fruitsStep1 = [...initialFruits];
    fruitsStep1.pop();
    console.log("1. Original:", initialFruits);
    console.log("   After removing last element:", fruitsStep1);

    let fruitsStep2 = [...initialFruits];
    fruitsStep2.unshift("pineapple");
    console.log("2. After adding pineapple:", fruitsStep2);

    let fruitsStep3 = [...initialFruits];
    fruitsStep3.sort().reverse();
    console.log("3. Sorted in reverse order:", fruitsStep3);

    const appleIndex = initialFruits.indexOf("apple");
    console.log("4. Index of 'apple' in original array:", appleIndex);
}

// Task 2
function task2() {
    console.log("Task 2");
    let colors = ["red", "blue", "green", "light blue", "yellow", "dark blue"];

    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);
    console.log("1. Longest:", longest, "Shortest:", shortest);

    colors = colors.filter(color => color.includes("blue"));
    console.log("2. Only blue colors:", colors);

    const colorsString = colors.join(", ");
    console.log("3. Joined string:", colorsString);
}

// Task 3
function task3() {
    console.log("Task 3");
    const initialEmployees = [
        { name: "John", age: 32, position: "developer" },
        { name: "Alice", age: 28, position: "designer" },
        { name: "Bob", age: 35, position: "manager" },
        { name: "Eve", age: 30, position: "developer" }
    ];

    let sortedEmployees = [...initialEmployees];
    sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("1. Sorted by name:", sortedEmployees);

    const developers = initialEmployees.filter(emp => emp.position === "developer");
    console.log("2. Developers:", developers);

    let youngEmployees = [...initialEmployees];
    youngEmployees = youngEmployees.filter(emp => emp.age <= 30);
    console.log("3. After removing employees over 30:", youngEmployees);

    let extendedEmployees = [...initialEmployees];
    extendedEmployees.push({ name: "Mike", age: 25, position: "intern" });
    console.log("4. After adding new employee:", extendedEmployees);
}

// Task 4
function task4() {
    console.log("Task 4");
    const initialStudents = [
        { name: "John", age: 20, course: 2 },
        { name: "Alex", age: 22, course: 3 },
        { name: "Anna", age: 19, course: 1 },
        { name: "Mike", age: 21, course: 4 }
    ];
    console.log("Original students:", initialStudents);

    let withoutAlex = initialStudents.filter(student => student.name !== "Alex");
    console.log("1. After removing Alex:", withoutAlex);

    let withSarah = [...initialStudents];
    withSarah.push({ name: "Sarah", age: 23, course: 3 });
    console.log("2. After adding Sarah:", withSarah);

    let sortedByAge = [...initialStudents];
    sortedByAge.sort((a, b) => b.age - a.age);
    console.log("3. Sorted by age (descending):", sortedByAge);

    const thirdCourseStudent = initialStudents.find(student => student.course === 3);
    console.log("4. Student on 3rd course (from original):", thirdCourseStudent);
}

// Task 5
function task5() {
    console.log("Task 5");
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const squared = numbers.map(num => num * num);
    console.log("1. Squared numbers:", squared);

    const evens = numbers.filter(num => num % 2 === 0);
    console.log("2. Even numbers:", evens);

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    console.log("3. Sum of numbers:", sum);

    const newArrNumbers = [11, 12, 13, 14, 15];
    const newNumbers = [...newArrNumbers, ...numbers];
    console.log("4. After adding new numbers:", newNumbers);

    const splicedNumbers =numbers.splice(0, 3);
    console.log("5. After removing first 3 elements:", splicedNumbers);
}

// Task 6
function task6() {
    console.log("Task 6");
    let books = [
        { title: "Book1", author: "Author1", genre: "Fiction", pages: 200, isAvailable: true },
        { title: "Book2", author: "Author2", genre: "Non-Fiction", pages: 150, isAvailable: false },
        { title: "Book3", author: "Author1", genre: "Science", pages: 300, isAvailable: true }
    ];

    function addBook(title, author, genre, pages) {
        books.push({ title, author, genre, pages, isAvailable: true });
        console.log(`Added book: ${title}`);
    }

    function removeBook(title) {
        const initialLength = books.length;
        books = books.filter(book => book.title !== title);
        if (books.length === initialLength) {
            console.log(`Book "${title}" not found`);
        } else {
            console.log(`Removed book: ${title}`);
        }
    }

    function findBooksByAuthor(author) {
        const authorBooks = books.filter(book => book.author === author);
        console.log(`Books by ${author}:`, authorBooks);
        return authorBooks;
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
            console.log(`Book "${title}" availability set to ${book.isAvailable}`);
        } else {
            console.log(`Book "${title}" not found`);
        }
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
        console.log("Books sorted by pages:", books);
    }

    function getBooksStatistics() {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.isAvailable).length;
        const borrowedBooks = totalBooks - availableBooks;
        const avgPages = books.reduce((sum, book) => sum + book.pages, 0) / totalBooks;

        const stats = {
            totalBooks,
            availableBooks,
            borrowedBooks,
            avgPages
        };

        console.log("Library statistics:", stats);
        return stats;
    }

    addBook("New Book", "Author3", "Fantasy", 250);
    removeBook("Book2");
    findBooksByAuthor("Author1");
    toggleBookAvailability("Book1", true);
    sortBooksByPages();
    getBooksStatistics();
}

// Task 7
function task7() {
    console.log("Task 7");
    let student = {
        name: "John",
        age: 20,
        course: 2
    };

    student.subjects = ["Math", "Physics", "Literature"];
    delete student.age;
    console.log("After removing age and adding subjects:", student);
}

function executeAllTasks() {
    task1();
    task2();
    task3();
    task4();
    task5();
    task6();
    task7();
}

executeAllTasks();