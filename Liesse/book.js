document.addEventListener('DOMContentLoaded', () => {
const apiKey = 'AIzaSyB8d14nV9lif1OHMhgDG5eYB8SxjtGIqKI';
const query = 'Harry Potter';

fetch(`https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=5&key=${apiKey}`)
.then(response => response.json())
.then(data => {
// Process the data
if (data.items && data.items.length > 0) {
    data.items.forEach(book => {
    const books = book;
    displayBooks(books);
    });

}
})
.catch(error => console.error('Error fetching data:', error));

 function handleBookImageClick() {
     // console.log(clickedElement)
        let information = clickedElement.getAttribute("data-info");

        console.log('Clicked on book:', information);
        // For example, you can open a new page with more details or perform other actions
      }

function displayBooks(books) {
    const bookList = document.getElementById("book-list");
        const bookItem = document.createElement("div");
        bookItem.classList.add("boxSectn");
      bookItem.innerHTML = `
            <img src="${books.volumeInfo.imageLinks.thumbnail}"
                 alt="${books.volumeInfo.title} Cover"
                 class="bookBox"
                 onclick="handleBookImageClick(this)"
            >
            <p>${books.volumeInfo.title}</p>
        `;


}


// onclick="location.href='http://127.0.0.1:5500/Liesse/book.html';"

    

    });
