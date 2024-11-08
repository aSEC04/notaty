function openAddModal(){
    var model = document.getElementById("addNoteModal");
    var closeSpan = document.getElementById("closeAdd");
    var cancelButton = document.getElementById("cancelAddNoteBtn");
    clearAddModal();
    //closeAdd (x)
    //cancelAddNoteBtn
    model.style.display = "block";
    closeSpan.onclick = ()=>{
        model.style.display = "none";
    }
    cancelButton.onclick = ()=>{
        model.style.display = "none";
    }

    
}

function loadNoteData(noteId){
    var modal =document.getElementById("editNoteModal");
    var noteIdAttribute = document.createAttribute("noteid");
    noteIdAttribute.value =noteId;
    modal.setAttributeNode(noteIdAttribute);
    getNoteById(noteId).then(data =>{
        document.getElementById("editTitle").value = data["title"];
        document.getElementById("editContent").value = data["content"];
    });
}

function saveEditNote(){
    var modal =document.getElementById("editNoteModal");
    const noteId = modal.getAttribute("noteid");
    const titleStr = document.getElementById("editTitle").value;
    const contentStr = document.getElementById("editContent").value;
    const noteData = {_id : noteId, title : titleStr, content : contentStr}

    updateNote(noteData).then(Response =>{
        if(Response.ok){
            var model = document.getElementById("editNoteModal");
            model.style.display = "none";
            updateNotesTable(noteId);
        }else{
            Response.text().then(error => {
                document.getElementById("editError").innerHTML = error;
            })
        }
    })
    .catch(error =>{
        document.getElementById("editError").innerHTML = error;
    })
}

function saveNewNote(){
    
    const titleStr =document.getElementById("addTitle").value;
    const contentStr =document.getElementById("addContent").value;
    const noteData = {title : titleStr, content : contentStr};
    addNote(noteData).then(Response =>{
        if(Response.ok){
            var model = document.getElementById("addNoteModal");
            model.style.display = "none";
            Response.json().then(json =>{
                var newNoteId = json["_id"];
                updateNotesTable( newNoteId);
            })
           
        }else{
            Response.text().then(error => {
                document.getElementById("addError").innerHTML = error;
            })
            
            
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById("addError").innerHTML = error;
    })
}

function clearAddModal(){
    document.getElementById("addTitle").value ="";
    document.getElementById("addContent").value ="";
    document.getElementById("addError").innerHTML ="";
}

function openEditModel(noteId){
    var model = document.getElementById("editNoteModal");
    var closeSpan = document.getElementById("closeEdit");
    var cancelButton = document.getElementById("cancelEditNoteBtn");
    
    clearAddModal();
    

    model.style.display = "block";
    closeSpan.onclick = ()=>{
        model.style.display = "none";
    }
    cancelButton.onclick = ()=>{
        model.style.display = "none";
    }

    loadNoteData(noteId);

}