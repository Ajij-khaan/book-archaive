
// Fetching Data
const fetchData = () => {
    const searchText = document.getElementById('search-input');
    // console.log(searchText);

    const url = `https://openlibrary.org/search.json?q=${searchText.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadData(data))
}

//Loading Data
const loadData = (data) => {
    // console.log(data.docs);
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
        <div class="col">
        <div class="card h-100">
            <img src="${urlCover}"  class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
            </div>
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