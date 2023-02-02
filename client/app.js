const bookForm = document.getElementById("add_form");      // form to add new book
const bookTitle = document.getElementById("book_title");   // input field for book title
const bookLink = document.getElementById("book_link");     // input field for book link
const bookList = document.getElementById("ebooks_list");   // list to display all the books
const bookCard = document.getElementById("book_card");     // card to display each book

const API_ENDPOINT = `http://localhost:3000`  // change this to your server endpoint

let bookArr = [];  // array to store all the books

bookForm.addEventListener('submit', function(e){
    e.preventDefault();
    bookTitle.value && bookLink.value ? addNewEbook(bookTitle.value, bookLink.value) : console.log("Wrong values for book and link");
});  // handle form submission

const renderEbookList = ()=>{
    bookArr.map((book)=>{
        bookList.innerHTML += `<li class="book_card" id="book_card">
        ${book.title}
        <span class="link">
            <a href='${book.link}' target="_blank" rel="no-referrer no-opener">Link</a>
        </span>
    </li>`
    console.log("Render complete!");
    });
}  // render the list of books


const fetchEbooks = async()=>{
    await fetch(`${API_ENDPOINT}/ebooks`)
    .then(res=> res.json())
    .then(res=> {
        res.map((item)=>{
            console.log(item);
            bookArr.push(item);
        });
    }).catch(err=> console.log(err));  // fetch all the books from the server

    renderEbookList();
} //

const addNewEbook = async(bkTitle, bkLink)=>{
    console.log(bkTitle, bkLink);
    // handle submission using rest api
    await fetch(`${API_ENDPOINT}/ebooks`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
            title:bkTitle,
            link:bkLink
        })
    }).then(res=>res.json())
    .then(res=> {
        alert(res.message);
        setTimeout(()=>{
            location.reload();
        },2000);
    })
    .catch(err=> console.log(err));

}

window.addEventListener('load', ()=>{
    fetchEbooks();
})