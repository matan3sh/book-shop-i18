'use strict';

function onInit() {
    creatBooks();
    doTrans();
    booksToDisplay();
}

function booksToDisplay() {
    if (!getBooks().length) {
        document.querySelector('.no-books-modal').innerHTML = 'There are no books in store';
        document.querySelector('.no-books-modal').style.display = 'block';
        document.querySelector('.pagination').style.display = 'none'
    } else {
        onCloseModal()
        renderBooks();
        onPagination()
    }
}

function renderBooks() {
    var books = getCurrentBooks();
    var strHtmls = books.map(
        book => `<tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.price}$</td>
                    <td>
                        <button data-trans="book-read-btn" class="btn btn-primary" onclick=onReadBook(${book.id})>Read</button>
                        <button data-trans="book-update-btn" class="btn btn-warning" onclick=onUpdateBook(${book.id})>Update</button>
                        <button data-trans="book-delete-btn" class="btn btn-danger" onclick="onDeleteBook(${book.id})">Delete</button>
                    </td>
                </tr>`
    );
    document.querySelector('.book-list').innerHTML = strHtmls.join('');
    onPagination();
}

function onAddBook(event) {
    event.preventDefault()
    var title = document.querySelector('#title').value;
    var price = document.querySelector('#price').value;
    if (title === '' || price === '') showAlert('inValidInputs');
    else {
        addBook(title, price);
        showAlert('Your Book Added Successfuly', 'success');
        onClearFields();
        booksToDisplay();
    }
}

function onDeleteBook(bookId) {
    if (getCurrentBooks().length === 1) onChangePage(getCurrentPage() - 1);
    deleteBook(bookId);
    showAlert('Your Book Deleted Successfuly', 'danger');
    booksToDisplay();
}

function onUpdateBook(bookId) {
    var book = getBookById(bookId);
    var strHtml = ` <div class="update-book-form">
                        <div class="modal-header">
                            <span onclick="onCloseModal()" class="btn btn-sedondary">&times;</span>
                         </div>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" name="title" class="form-control update-title" value="${book.title}" />
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input type="text" name="price" class="form-control update-price" value="${book.price}" />
                        </div>
                        <button onclick="onSaveBook(${bookId})" class="btn btn-dark">Save</button>
                    </div> 
    `;
    document.querySelector('.update-modal').innerHTML = strHtml;
    document.querySelector('.update-modal').style.display = 'block';
}

function onSaveBook(bookId) {
    var book = getBookById(bookId);
    book.title = document.querySelector('input[name="title"]').value;
    book.price = document.querySelector('input[name="price"]').value;
    if (book.price === '' || book.title === '') {
        showAlert('Invalid Inputs', 'danger');
    } else {
        saveChangesInBook(book);
        showAlert('Your Book Saved Successfuly', 'success');
        booksToDisplay();
        document.querySelector('.update-modal').style.display = 'none';
    }
}

function onReadBook(bookId) {
    document.querySelector('.read-modal').style.display = 'block';
    const book = getBookById(bookId);
    var strHtml = ` <div class="modal-content">
                        <div class="modal-read-header bg-primary">
                            <span onclick="onCloseModal()" class="btn btn-sedondary">&times;</span>
                            <h2>${book.title}</h2>
                        </div>
                        <div class="modal-body">
                            <img src="img/books/${book.img}.jpg" width="100" height="100"/>
                            <p>${book.desc}</p>
                        </div>
                        <div class="modal-footer">
                            <span>Your Rate: </span>
                            <input type="number" step="1" max="10" min="0" name="rating" class="rating" value="${book.rating}">
                            <button class="rate-btn" onclick="onRateBook()">Save</button>
                            <div class="save-rate-success alert alert-success"></div>
                            <h3>Price: ${book.price}$</h3>
                        </div>
                    </div>
                  `;
    document.querySelector('.read-modal').innerHTML = strHtml;
}

function onSort(el) {
    getBooksSortingBy(el.innerText);
    booksToDisplay();
}

function onRateBook() {
    const bookTitle = document.querySelector('.modal-read-header h2').innerText;
    const userRating = document.querySelector('input[class="rating"]').value;
    setRateBook(userRating, bookTitle);
    document.querySelector('.save-rate-success').style.display = 'block';
    document.querySelector('.save-rate-success').innerText =
        'Your Rate Has Been Saved';
    setTimeout(
        () => (document.querySelector('.save-rate-success').style.display = 'none'),
        3000
    );
}

function onClearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
}

function showAlert(message, className) {
    const elDiv = document.createElement('div')
    elDiv.className = `alert alert-${className}`
    elDiv.appendChild(document.createTextNode(message))
    const elContainer = document.querySelector('.container')
    const elForm = document.querySelector('.book-form')
    elContainer.insertBefore(elDiv, elForm)
    setTimeout(
        () => (document.querySelector('.alert').remove()), 2500);
}

function onCloseModal() {
    document.querySelector('.no-books-modal').style.display = 'none';
    document.querySelector('.update-modal').style.display = 'none';
    document.querySelector('.read-modal').style.display = 'none';
}

function onPagination() {
    const pageNumbers = [];
    for (var i = 1; i <= Math.ceil(getBooks().length / getBooksPerPage()); i++) {
        pageNumbers.push(i);
    }
    var strHtml = pageNumbers.map(
        pageNumber =>
            `   
            <li class="page-item" href="!#">
                <a onclick="onChangePage(${pageNumber})" class="page-link" href="#">${pageNumber}</a>
            </li>
        `
    );
    document.querySelector('.pagination').innerHTML = strHtml.join('');
}

function onChangePage(pageNumber) {
    setCurrentPage(pageNumber);
    booksToDisplay();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    booksToDisplay();
}