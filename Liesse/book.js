document.addEventListener('DOMContentLoaded', () => {
const apiKey = 'AIzaSyB8d14nV9lif1OHMhgDG5eYB8SxjtGIqKI';
    const query = 'Harry Potter';

  fetch(`https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=5&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Process the data
      if (data.items && data.items.length > 0) {
              data.items.forEach(book => {
                const books = book.volumeInfo;
                displayBooks(books);
              });
            } else {
        console.error('No book found for the given query.');
        }
    })
    .catch(error => console.error('Error fetching data:', error));

    /*function displayBookInfo(book) {
    const titleElement = document.getElementById('book-title');
    const authorElement = document.getElementById('author');
    const descriptionElement = document.getElementById('description');
    const imageElement = document.getElementById('book-image');

    const title = book.title || 'Title not available';
    const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
    const description = book.description || 'Description not available';
    const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : '';

    titleElement.innerText = title;
    authorElement.innerText = `Author: ${authors}`;
    descriptionElement.innerText = `Description: ${description}`;
    imageElement.src = imageUrl;
    }*/
});


   // document.addEventListener("DOMContentLoaded", function () {
        //   Här ska Book listan från APIn Laddas in.
      const testbook = [
                { title: "Book 1", author: "Author 1", image: "/Fatina/fantasyimg.png" },
                { title: "Book 2", author: "Author 2", image: "/Fatina/fantasyimg.png" },
                { title: "Book 3", author: "Author 3", image: "/Fatina/fantasyimg.png" },
                { title: "Book 4", author: "Author 4", image: "/Fatina/fantasyimg.png" },
                { title: "Book 5", author: "Author 5", image: "/Fatina/fantasyimg.png" },
            ];

            // Function to display books for a specific page
            function displayBooks(books) {
                const bookList = document.getElementById("book-list");
                //const titleList = document.getElementById("titel-list");


                //bookList.innerHTML = ""; // Clear previous content

//books.forEach(book => {   
    console.log(books.title)                
   //const book = books[i];
                    const bookItem = document.createElement("div");

                    bookItem.classList.add("boxSectn");
                    bookItem.innerHTML = `
            <img src="${books.imageLinks.thumbnail}" alt="${books.title} Cover" class="book-item">
            <p>${books.title}</p>
        `;
                    bookList.appendChild(bookItem);
                    //bookList.appendChild(titleList);

                    
                    
               // })
            }


            displayBooks()
