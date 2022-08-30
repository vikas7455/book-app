class Book{
    constructor(t,a,is){
        this.title = t
        this.author = a
        this.isbn = is
    }
}

class UI{
// Database Stuff
static displayBook(){

const storeBooks = Store.getBooks()
console.log(storeBooks)

    storeBooks.forEach((book)=>{
        UI.addBookToList(book)
    })
}

   static addBookToList(book){
// Sending data in table
const list = document.querySelector("#book-list")
const row = document.createElement("tr")  //<tr></tr>
row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><button class = "btn btn-sm btn-danger delete">X</button></td>
`
list.appendChild(row);
}

    static clearAllFields(){
        // For clearing the filled part
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
    }

    static showAlert(msg,className){
        // Alert code
    const div = document.createElement("div")
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(msg))

    const form = document.querySelector("#book-form")
    const container = document.querySelector(".container")
    container.insertBefore(div,form)

    setTimeout(function(){
        document.querySelector(".alert").remove()
    },3000)

    }

    static deleteBook(el){
        if(el.classList.contains("delete")){
            confirm("Are you sure you want to delete this task ?")
            if(confirm){
                el.parentElement.parentElement.remove()
            }
        }
    }
}

class Store{

static getBooks(){
let books;
if(localStorage.getItem("books") === null){
    books = []
}else{
    books = JSON.parse(localStorage.getItem("books"))
}
return books;
}

static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books",JSON.stringify(books))
}

static removeBook(isbn){
    const books = Store.getBooks()
    books.forEach((book,index) =>{
        if(book.isbn == isbn){
            books.splice(index,1)
        }
    })
    localStorage.setItem("books",JSON.stringify(books))
}

}

let book = new Book("Title 1","Ansh",12)

document.querySelector("#book-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let isbn = document.getElementById("isbn").value

    if(title=="" || author == "" || isbn == ""){
        UI.showAlert("Please Fill the empty boxes","danger")
    }else{
        const book = new Book(title,author,isbn)

    UI.addBookToList(book)
    UI.clearAllFields()
    UI.showAlert("Book Added Successfully","success")
    Store.addBook(book)
    }

})

// Delete function
document.querySelector("#book-list").addEventListener("click",function(e){
    UI.deleteBook(e.target)
    // console.log()
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})

document.addEventListener("DOMContentLoaded",UI.displayBook())