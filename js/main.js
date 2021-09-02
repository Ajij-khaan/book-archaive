const searchText = document.getElementById('search-input');

const fetchData = () => {

    fetch('https://openlibrary.org/search.json?q=javascript')
        .then(res => res.json())
        .then(data => loadData(data))
}

const loadData = (data) => {
    console.log(data)
}