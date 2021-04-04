const addBook = document.getElementById('buttonAddBook');
const addABookArea = document.getElementsByClassName('AddaBook');
const formTitle = document.getElementById('titleInput');
const formAuthor = document.getElementById('authorInput');
const cancelButton = document.getElementById('button-cancel');
const bookslist = document.getElementById('bookslist');
const bookmarkslist = document.getElementById('bookmarkslist');
const form = document.getElementsByClassName("form")[0];

const myApiKey = "AIzaSyCcZ7XkGbP2iLw8M0Z_A20ivlf_wWJr0cY";
const searchLink = "https://www.googleapis.com/books/v1/volumes?q=";
const bookRequest = "https://www.googleapis.com/books/v1/volumes/";

let request = new XMLHttpRequest();
let requestOneBook = new XMLHttpRequest();


  
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        let bookslist = response.items; 
        
        displayBook(bookslist);
    }
};

requestOneBook.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        
        displayBookmark(response);
    }
};

addBook.addEventListener('click', function() {
    addBook.style.display="none";
    form.style.display="flex";
    cancelButton.style.display="flex";

});

cancelButton.addEventListener('click',function(){
    addBook.style.display="flex";
    form.style.display="none";
    cancelButton.style.display="none";
    bookslist.innerHTML="";
});

function bookmark(id,isLoading){

    if(sessionStorage.getItem(id) != null && isLoading === false){
        alert("Ce livre est déjà présent dans le marque pages.");     
    }else{
        
        if(id != null){
            sessionStorage.setItem(id,id);
            console.log("********VALEUR DE: "+id);
            requestOneBook.open("GET", bookRequest+id);
            requestOneBook.send();       
           }
    }  

   //    console.log( sessionStorage.getItem('salut'));
};

function deleteBookmark(id){
    delete sessionStorage[id];
    let bookmarkcard = document.getElementById(id);
    bookmarkcard.remove();
}

form.addEventListener('submit',function(event){
    event.preventDefault();// avoid page refresh 
    
    bookslist.innerHTML= "";
    this.searchedBook = formTitle.value;
    this.searchedAuthor = formAuthor.value;

    if(this.searchedBook != "" || this.searchedAuthor !=""){
        request.open("GET", searchLink+this.searchedBook+" "+this.searchedAuthor);
        request.send();       
    }
});

function displayBook(books) {
    if(books != null){

        for(let i = 0;i < books.length;i++){
            let bookmark = false;
            let id = books[i].id;
   //         let identifier = checkIdentifier(books[i].volumeInfo.industryIdentifiers);
            let title = books[i].volumeInfo.title;
            let author = books[i].volumeInfo.authors;
            let description = limitDescription(books[i].volumeInfo.description);       
            let imageLink = checkImageLink(books[i].volumeInfo.imageLinks); 
            
            console.log(id+"|titre:"+title+"|auteur:"+author+"|descritpion:"+description+"|imagelink:"+imageLink);
            
            bookslist.innerHTML += bookCard(id,title,author,description,imageLink,bookmark);
        }        
    }
    else{
        alert('aucun livres trouvés');        
    }
  }
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

window.onload = function(){
    for (var i = 0; i < sessionStorage.length; i++){
        
        id = sessionStorage.getItem(sessionStorage.key(i));
        console.log("onload:"+i+"/"+id);
        requestOneBook.open("GET", bookRequest+id, false);
        requestOneBook.send();
          
       // bookmark(id,true);
    }
};

  
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

function checkImageLink(image){
    if(image != null){
        return image.thumbnail;
    }else{
        return "img/no-image.png";
    }
}

function checkIdentifier(id){
    if(id != null){
        return id[0].identifier;
    }else{
        return "no identifier found";
    }
}

function bookCard(id,title,author,description,imageLink,bookmark){
    let string_of_html;
    
    if(!bookmark){
        string_of_html = '<div class="card bookcard col-10 col-sm-12 col-md-3 col-lg-2">';
        string_of_html +='<span onclick="bookmark(\''+id+'\','+bookmark+')" style ="color:blue;text-align:right;" class="material-icons bookmark">bookmark</span>';
    }else{
        string_of_html = '<div class="card bookcard col-10 col-sm-12 col-md-3 col-lg-2" id="'+id+'">';
        string_of_html +='<span onclick="deleteBookmark(\''+id+'\')" style ="color:blue;text-align:right;" class="material-icons bookmark">delete</span>';
    }
    
    string_of_html +='<h6 class="card-title"><strong>Titre: '+title+'</strong></h6>';
    string_of_html +='<span class="card-title"><strong><i class="title">id :'+id+'</i></strong></span><br/>';
    string_of_html +='<span class="card-title author"><i>Auteur: </i>'+author+'</span><br/>';
    string_of_html +='<p class="card-text description">description: '+description+'</p>';
    string_of_html +='<img src="'+imageLink+'" alt="cover of '+title+'"> '; 
    string_of_html +='</div>';

    return string_of_html;
}


