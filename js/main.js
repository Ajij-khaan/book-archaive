
// Fetching Data
const fetchData = () => {
    //Load CUrrese Search Term
    const searchText = document.getElementById('search-input');
    const url = `https://openlibrary.org/search.json?q=${searchText.value}`;

    //Clear Previous Search Term
    searchText.value = '';

    fetch(url)
        .then(res => res.json())
        .then(data => loadData(data))
}

//Loading Data
const loadData = (data) => {
    //Total Result Found 
    showingResult(data)


    // console.log(data.docs);
    //Clear the previous books display
    const bookContainer = document.getElementById('show-books-container');
    bookContainer.innerHTML = '';

    //Display New books
    data.docs.forEach(element => {
        displayBook(element);
    });
}

//Disply books
const displayBook = (data) => {

    const urlCover = `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`;
    const bookTitle = data.title;
    const author = data.author_name;
    const firstPublished = data.first_publish_year;

    const bookContainer = document.getElementById('show-books-container');
    const div = document.createElement('div');

    div.innerHTML = `
            <div class="col mt-3">
            <div class="card h-100">
            <img src="${urlCover}"  class="card-img-top img-size" alt="...">
                <div class="card-footer">
                    <small class="text-dark fw-bold">${bookTitle}</small>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Author: ${author}</small>
                </div>
                <div class="card-footer">
                    <small class="text-muted">First published in ${firstPublished}</small>
                </div>
            </div>
            </div>
        `;

    bookContainer.appendChild(div);
}

//Checking how much resutl showing
const showingResult = (data) => {
    const totalSearchResult = document.getElementById('total-search-result');
    const noBookFound = document.getElementById('no-book-found');

    if (data.numFound === 0) {
        // console.log('NO Book Found. Please Search Again.')
        totalSearchResult.classList.add('d-none');
        noBookFound.classList.remove('d-none');
    }

    else {
        totalSearchResult.classList.remove('d-none');

        //counting how much books is showing
        let count = 0;
        data.docs.forEach(element => count++);

        totalSearchResult.innerText = `Showing ${count} of ${parseInt(data.numFound)} books`;
        noBookFound.classList.add('d-none');
    }
}
