const addBook = document.getElementsByClassName('btn--search')[0];
const addABookArea = document.getElementsByClassName('AddaBook');
const formTitle = document.getElementById('titleInput');
const formAuthor = document.getElementById('authorInput');
const cancelButton = document.getElementsByClassName('btn--cancel')[0];
const bookslist = document.getElementsByClassName('searchList__books')[0];
const bookmarkslist = document.getElementsByClassName('searchList__bookmarks')[0];
const form = document.getElementsByClassName("form")[0];
const searchLisTitle = document.getElementsByClassName("searchList__title")[0];

const myApiKey = "AIzaSyCcZ7XkGbP2iLw8M0Z_A20ivlf_wWJr0cY";
const searchLink = "https://www.googleapis.com/books/v1/volumes?q=";
const bookRequest = "https://www.googleapis.com/books/v1/volumes/";

let request = new XMLHttpRequest();
let requestOneBook = new XMLHttpRequest();


 //api request to google with a books list as a response 
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        let bookslist = response.items; 
        
        displayBook(bookslist);
    }
};
//api request to google with a book as a reponse
requestOneBook.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        
        displayBookmark(response);
    }
};
//on click the button "ajouter un livre" is removed and the form is displayed
addBook.addEventListener('click', function() {    
    addBook.style.display="none";
    form.style.display="flex";
    cancelButton.style.display="flex";

});
//on click the button "annuler" is removed with the booklist 
cancelButton.addEventListener('click',function(){
    addBook.style.display="flex";
    form.style.display="none";
    searchLisTitle.style.display="none"; 
    cancelButton.style.display="none";
    bookslist.innerHTML="";
});
//add a bookmark on the storage session and the dom
function bookmark(id,isLoading){

    if(sessionStorage.getItem(id) != null && isLoading === false){
        alert("Vous ne pouvez ajouter deux fois le m??me livre");  

    }else if(id != null){ 
            sessionStorage.setItem(id,id);
            requestOneBook.open("GET", bookRequest+id);
            requestOneBook.send();       
           
    }  
};
// delete a book from the storage session and from the dom
function deleteBookmark(id){
    delete sessionStorage[id];
    let bookmarkcard = document.getElementById(id);
    bookmarkcard.remove();
}

//Request the user input from
form.addEventListener('submit',function(event){
    event.preventDefault();
    bookslist.innerHTML= "";
    this.searchedBook = formTitle.value;
    this.searchedAuthor = formAuthor.value;

    if(this.searchedBook != "" || this.searchedAuthor != ""){
        searchLisTitle.style.display="flex"; 
        request.open("GET", searchLink+this.searchedBook+" "+this.searchedAuthor);
        request.send();       
    }
});

//call the bookCard function and insert card in the searched list
function displayBook(books) {
    if(books != null){

        for(let i = 0;i < books.length;i++){
            let bookmark = false;
            let id = books[i].id;
            let title = books[i].volumeInfo.title;
            let author = books[i].volumeInfo.authors;
            let description = limitDescription(books[i].volumeInfo.description);       
            let imageLink = checkImageLink(books[i].volumeInfo.imageLinks); 
            
            console.log(id+"|titre:"+title+"|auteur:"+author+"|descritpion:"+description+"|imagelink:"+imageLink);
            
            bookslist.innerHTML += bookCard(id,title,author,description,imageLink,bookmark);
        }        
    }
    else{
        bookslist.innerHTML += "<h3 style='text-align:center;width:100%'>Aucun livre n???a ??t?? trouv??</h3>";        
    }
  }
//call the bookCard function and insert card in the bookmark list
function displayBookmark(book){

        let bookmark = true;
        let id = book.id;
        let title = book.volumeInfo.title;
        let author = book.volumeInfo.authors;
        let description = limitDescription(book.volumeInfo.description);       
        let imageLink = checkImageLink(book.volumeInfo.imageLinks); 
        
        console.log(id+"|titre:"+title+"|auteur:"+author+"|descritpion:"+description+"|imagelink:"+imageLink);
        
        bookmarkslist.innerHTML += bookCard(id,title,author,description,imageLink,bookmark);
}

//launched when the page is loading and request for registered bookmark
window.onload = function(){
    for (var i = 0; i < sessionStorage.length; i++){
        
        id = sessionStorage.getItem(sessionStorage.key(i));
        console.log("onload:"+i+"/"+id);
        requestOneBook.open("GET", bookRequest+id, false);
        requestOneBook.send();
    }
};

// limit the description to 200 characters  
function limitDescription(text){
    let maxLength = 200;
    
    if(text === undefined){
        return "Information manquante"
    }   
    else if (text.length > maxLength){
        return text.slice(0, maxLength)+"...";
    }
    else{
        return text;    
    }
}

// check if an image was delivered after a request
function checkImageLink(image){
    if(image != null){
        return image.thumbnail;
    }else{
        return "img/no-image.png";
    }
}

//check if the identifier is null
function checkIdentifier(id){
    if(id != null){
        return id[0].identifier;
    }else{
        return "no identifier found";
    }
}

// Generation of the html to create book card or bookmark card
function bookCard(id,title,author,description,imageLink,bookmark){
    let string_of_html;
    
    if(!bookmark){
        string_of_html = '<div class="card bookcard">';
        string_of_html +='<span onclick="bookmark(\''+id+'\','+bookmark+')" style ="color:blue;text-align:right;width:100%" class="material-icons bookmark">bookmark</span>';
    }else{
        string_of_html = '<div class="card bookcard" id="'+id+'">';
        string_of_html +='<span onclick="deleteBookmark(\''+id+'\')" style ="color:blue;text-align:right;width:100%" class="material-icons bookmark">delete</span>';
    }
    
    string_of_html +='<h2 class="card-title">Titre: <strong>'+title+'</strong></h2>';
    string_of_html +='<span class="card-title"><strong><i class="title">id :'+id+'</i></strong></span><br/>';
    string_of_html +='<span class="card-title author"><i>Auteur: </i>'+author+'</span><br/>';
    string_of_html +='<p class="card-text description">description: '+description+'</p>';
    string_of_html +='<img src="'+imageLink+'" alt="cover of '+title+'"> '; 
    string_of_html +='</div>';

    return string_of_html;
}


