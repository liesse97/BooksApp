

document.addEventListener("DOMContentLoaded", function () {
 
  //API


  let apiUrl = "";// tempApiUrl + key;
  const books = [];

  const itemsPerPage = 15; //antalet böcker per sida
  let totalPages;

 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
async function fetchBooks(searchQuery){
  const apiKey = "AIzaSyB8d14nV9lif1OHMhgDG5eYB8SxjtGIqKI";
  apiUrl= `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=40&key=${apiKey}`;
  console.log(apiUrl);
  console.log(searchQuery);

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  
delay(300).then(()=>{
return fetch(apiUrl)})
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error status: ${response.status}");
      }
      return response.json();
    })
    .then((data) => {
    
      data.items.forEach((book) => {
        const title = book.volumeInfo?.title;
        const image = book.volumeInfo?.imageLinks?.thumbnail;
        const author = book.volumeInfo?.authors?.join(", ");
        const bookId = book.id;
        if (title && image && author && bookId) {
          
          books.push({
            title: title,
            image: image,
            author: author,
            bookId: bookId,
          });
          
        }
      });
     // console.log(apiUrl);
      totalPages = Math.ceil(books.length / itemsPerPage);

      const bookList = document.getElementById("book-list");
      bookList.innerHTML = "";
      // Initial display
      displayBooks(1);
      createPagination();
      let cpage = 1;

      // Handle page button clicks
      document.addEventListener("click", function (event) {
        if (event.target.classList.contains("page-button")) {
          const page = parseInt(event.target.dataset.page);
          displayBooks(page);

          // ändrar färg på aktiva knappen
          document.querySelectorAll(".page-button").forEach((button) => {
            button.classList.remove("active");
          });
          document.querySelector(".page" + page).classList.add("active");
          //xreturn cpage;
          cpage = page;
        }

        // Forward and back page buttons
        if (event.target.classList.contains("change-page-plus")) {
          console.log("current page " + cpage);
          let fpage = cpage + 1;
          if (fpage <= totalPages) {
            console.log("forward page " + fpage);
            displayBooks(fpage);

            document.querySelectorAll(".page-button").forEach((button) => {
              button.classList.remove("active");
            });
            document.querySelector(".page" + fpage).classList.add("active");

            cpage++;
          }
        }

        if (event.target.classList.contains("change-page-minus")) {
          //console.log("current page " + cpage);
          let bpage = cpage - 1;
          if (bpage >= 1) {
            //  console.log("back page " + bpage);
            displayBooks(bpage);
            // console.log("total pages" + totalPages);

            // ändrar färg på aktiva knappen
            document.querySelectorAll(".page-button").forEach((button) => {
              button.classList.remove("active");
            });
            document.querySelector(".page" + bpage).classList.add("active");

            cpage--;
          }
        }
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
    };//fetchbooks ends here¨

  // Function to create pagination buttons
  function createPagination() {
    const pagination = document.getElementById("pagesbutton");
    pagination.innerHTML = ""; // Clear previous pagination

    for (let page = 1; page <= totalPages; page++) {
      const pageButton = document.createElement("button");
      pageButton.classList.add("page-button"); //This Adds the class "page-button onto" the pageButton element.
      pageButton.classList.add("page" + page);
      pageButton.textContent = page;
      pageButton.dataset.page = page;
      pagination.appendChild(pageButton); // With appendChild  you will add pageButton to paginitation.
    }
    document.querySelector(".page1").classList.add("active");
  }


  // Function to display books for a specific page

  function displayBooks(page) {
    
    let bookid;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const bookList = document.getElementById("book-list");
    bookList.innerHTML =""; // Clear previous content
    console.log("test");
    for (let i = startIndex; i < endIndex && i < books.length; i++) {
      const book = books[i];
      console.log("book " + books[i]);
      const bookItem = document.createElement("div");
      //bookItem.classList.add("book-item");
      bookid = book.bookId;
      bookItem.innerHTML = `<div class="book-container" onclick="getbookId('${book.bookId}')"> 

     
        <img src="${book.image}" alt="${book.title} Cover" class="book-item">
          <div class="book-info-container"> 
            
            <p class="bookt">${book.title}</p>
            <p class="booka">${book.author}</p>
            <p class="booka">${book.bookId}</p>
           
          </div> 
          </div>`;
           
      bookList.appendChild(bookItem);
    }
    
  }
  getbookId = function(bookid) {//assigns to a global window making it globle access
    console.log(bookid);
    getSingleBookInfo (bookid);
    //window.location.href = "newPage.html";
    // Need code that change to a liesses webpage.
  }



//Search funtion

//Categories
document.querySelectorAll(".category").forEach((button) => {
  button.addEventListener("click", function () {
    const searchQuery = this.getAttribute("data-string");
    books.length = 0; // Resolves the problem with books adding on when changing category.
                      // this removes the elements in the book array.
    //console.log(searchQuery);
    fetchBooks(searchQuery);
   
  });
});
});

