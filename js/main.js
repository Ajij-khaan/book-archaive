
// Fetching Data
const fetchData = () => {
    const searchText = document.getElementById('search-input');
    // console.log(searchText);

    const url = `https://openlibrary.org/search.json?q=${searchText.value}`;
    searchText.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => loadData(data))
}

//Loading Data
const loadData = (data) => {
    //Total Result Found Function
    totalResult(data)
    // console.log(data.docs);

    const bookContainer = document.getElementById('show-books-container');
    bookContainer.innerHTML = '';

    //Book Loder Funtion
    data.docs.forEach(element => {
        showData(element);
    });
}

//Showing Data
const showData = (data) => {


    // console.log(urlCover);
    const urlCover = `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`;
    const bookTitle = data.title;
    const author = data.author_name;
    const firstPublished = data.first_publish_year;

    // console.log(bookTitle, firstPublished);

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
                    <small class="text-muted">By ${author}</small>
                </div>
                <div class="card-footer">
                    <small class="text-muted">First published in ${firstPublished}</small>
                </div>
            </div>
            </div>
        `;

    bookContainer.appendChild(div);

}

const totalResult = (data) => {
    const totalSearchResult = document.getElementById('total-search-result');
    const noBookFound = document.getElementById('no-book-found');

    if (data.numFound === 0) {
        // console.log('NO Book Found. Please Search Again.')
        noBookFound.classList.remove('d-none');
    }

    else {
        totalSearchResult.classList.remove('d-none');
        // console.log(data.numFound);
        let count = 0;
        data.docs.forEach(element => {
            count++;
        });
        totalSearchResult.innerText = `Showing ${count} of ${parseInt(data.numFound)} books`;
    }
}
