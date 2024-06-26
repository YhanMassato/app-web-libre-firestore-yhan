const livroList = document.querySelector('#book-list')



function renderBook(doc){
    let list    = document.createElement("li");
    let titulo  = document.createElement("span")
    let autor   = document.createElement("span")
    let excluir = document.createElement("div")

    excluir.textContent = 'X'

    list.setAttribute('data-id', doc.id)
    titulo.textContent = doc.data().titulo
    autor.textContent = doc.data().autor   
    
    list.appendChild(titulo)
    list.appendChild(autor)
    list.appendChild(excluir)

    excluir.addEventListener('click', (event) => {
        event.stopPropagation()

        let id = event.target.parentElement.getAttribute('data-id')
        // alert(id)
        db.collection('libre-firestore').doc(id).delete()
        .then(()=>{window.location.reload()})
        
        
        
})

    livroList.appendChild(list)
}



db.collection('libre-firestore')
    .get()
    .then(
        (snapshot) => {
            // console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                renderBook(doc)
            });
        }
    )

//--------------------------

const form = document.querySelector('#add-book-form')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    db.collection('libre-firestore')
        .add({
            autor: form.autor.value,
            titulo: form.titulo.value
        })
        .then(()=>{
            form.autor.value = ""
            form.titulo.value = ""
            window.location.reload()
        })
})
