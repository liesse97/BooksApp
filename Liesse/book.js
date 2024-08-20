const apiKey = 'AIzaSyB8d14nV9lif1OHMhgDG5eYB8SxjtGIqKI';
const query = 'Harry Potter';
const searchForm = document.querySelector(".search-div");
const bookInput = document.querySelector(".search-input");
const bookList = document.getElementById("book-list");
const bookInfo = document.querySelector(".bookInfo");

const urlParams = new URLSearchParams(window.location.search);
const bookID = urlParams.get('id');
console.log(bookID)
if (bookID) {
getSingleBookInfo(bookID);
}


//const booksData = await getBooks();
//async function booksForm() {}
searchForm.addEventListener("submit",async event => {
//Prevent default refresh page
event.preventDefault();
// Access to the book in the input.
const book = bookInput.value;
if(book){
    //location.href = `http://127.0.0.1:5500/Liesse/searchPage.html?id=${book}`;
    const bookData = await getBooks(book);
            console.log(bookData)

    displayBooksInfo(bookData)


} else{
    //h1 : Pleade Enter Book
}
})

async function getBooks (book) {
//const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=5&key=${apiKey}`;
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${book}`;
const response =  await fetch(apiUrl);
if (!response.ok) {
throw new Error(`Error: ${response.status}`);
}
const booksData = await response.json();

return booksData.items

}


function displayBooksInfo (data) {
//clear booklist befre adding new list
const bookList = document.querySelector("#book-list");
bookList.innerHTML ="";

data.forEach((book) => {
//let bookID= book.id;
const bookItem = document.createElement("div");
bookItem.classList.add("boxSectn");
bookItem.innerHTML = `
<img src="${book.volumeInfo.imageLinks.thumbnail}"
alt="${book.volumeInfo.title} Cover"
>
`;

bookList.appendChild(bookItem);
//Säkerställa att addEventListener sker after vi har boken objekt har skapas
bookItem.addEventListener("click",() => {
location.href=`http://127.0.0.1:5500/Liesse/book.html?id=${book.id}`;
});

});

}


async function getSingleBookInfo (bookID){
const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookID}?key=${apiKey}`;
const response =  await fetch(apiUrl);
if (!response.ok) {
throw new Error(`Error: ${response.status}`);
}
const singleBook = await response.json();
displaySingleBookInfo (singleBook.volumeInfo)
};

function displaySingleBookInfo(singleBook){
const bookInfoItem = document.createElement("div");
//have array so need to map
const categoriesHTML = singleBook.categories.map(categorie => `${categorie}`).join('<br>');
const authorsHTML = singleBook.authors.map(author => `${author}`).join(', ');

console.log(singleBook)
bookInfoItem.innerHTML = `
<section class="div1">
<div>
<img src=${singleBook.imageLinks.thumbnail} alt="" width="" height="300px">
<a href=${singleBook.canonicalVolumeLink} target="_blank">
<button class="btn_bookBuy">Buy on Google Play</button>
</a>
</div>
<div class="textBok">
<h1>${singleBook.title}</h1>
<h4>${authorsHTML}</h4>
<div id="rating-stars">
<span class="star selected" onclick="rate(1)">&#9733;</span>
<span class="star selected" onclick="rate(2)">&#9733;</span>
<span class="star selected" onclick="rate(3)">&#9733;</span>
<span class="star selected" onclick="rate(4)">&#9733;</span>
<span class="star" onclick="rate(5)">&#9733;</span>

</div>
<p>${singleBook.description}</p>

<p class="infoBok"> <strong>Genre:</strong><br>
${categoriesHTML}
</p>
<p><strong>This edition</strong><br>
Pages: ${singleBook.pageCount} pages<br>
Published: ${singleBook.publishedDate} by ${singleBook.publisher} <br>
Language: ${singleBook.language}<br>

</p>
</div>
</section>


<section class="rviewIntro">
<h2>Ratings & Review</h2>
<i class="far fa-user"></i>
<p>What do you think?</p>
<div class="text_rviewIntro">
<div>
<div id="rating-stars">
<span class="star " onclick="rate(1)">&#9733;</span>
<span class="star " onclick="rate(2)">&#9733;</span>
<span class="star" onclick="rate(3)">&#9733;</span>
<span class="star " onclick="rate(4)">&#9733;</span>
<span class="star" onclick="rate(5)">&#9733;</span>

</div><p >Rate book</p>
</div>
<button class="btn_rviewIntro">Write a Review</button>
</div>

</section>
<hr>

<section class="div1 Textrview">
<div style='padding-top: 30px;'>
<i class="far fa-user"></i>
<p>Name</p>
</div>
<div class="textBok" >
<div style="padding-bottom: 50px ;">
<div id="rating-stars" style="width: 75%;float:left">
<span class="star selected" onclick="rate(1)">&#9733;</span>
<span class="star selected " onclick="rate(2)">&#9733;</span>
<span class="star selected" onclick="rate(3)">&#9733;</span>
<span class="star selected " onclick="rate(4)">&#9733;</span>
<span class="star" onclick="rate(5)">&#9733;</span>
</div>
<div style="width: 25%;float:right;padding-top: 10px;">
<p>April 2, 2020</p>
</div>
</div>

<p  style="width:90%">Considering that The Lord of the Rings is one of the most popular books of the last century, it's surprising to see how
few reviews there are here. I get the impression that many people feel guilty about liking it. It's a phase you go
through, and the less said about it, the better. I think this is unfair to the book, which, I am prepared</p>
<a href="'">Show more</a>
<i class="fas fa-chevron-down"></i>
</div>
</section>
`;

bookInfo.appendChild(bookInfoItem);

}


//getBooks();

