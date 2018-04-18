
window.onload = function() {
/***
 *  var store = [
 *  { id: 1, firstName: 'omofolarin', lastName: 'shonibare', phoneNumber: '09083494644'},
 *  { id: 2, firstName: 'omofolarin', lastName: 'shonibare', phoneNumber: '09083494644'},
 *  { id: 3, firstName: 'omofolarin', lastName: 'shonibare', phoneNumber: '09083494644'},
 * { id: 4, firstName: 'omofolarin', lastName: 'shonibare', phoneNumber: '09083494644'},
 * ] 
 * 
 * 
 * 
 */

var quickAddBtn = document.getElementById("Quickadd");
var Addbtn = document.getElementById("Add");
var quickCancelBtn = document.getElementById("cancel");
var quickAddFormDiv = document.getElementById("quick-form");
var contactlistDiv = document.querySelector(".contact-list");
var viewMoreModal = document.getElementById("view-contact");
var editModal = document.getElementById("edit-contact");


//formField
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var address = document.getElementById("address");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var idEl = document.getElementById("index");


//Event Listners
quickAddBtn.addEventListener("click", OpenFormDisplay);
function OpenFormDisplay () {
    quickAddFormDiv.style.display = quickAddFormDiv.style.display === "none" ? "block" : "none";
}
quickCancelBtn.addEventListener("click", toggleOffFormDisplay);
function toggleOffFormDisplay(e) {
    e.preventDefault();
    quickAddFormDiv.style.display = 'none';
    
}

var addressbook = {
    getStore: function() {
        return JSON.parse(localStorage.getItem('addressBook')); //array
    },
    
    storeToString: function(store) {        
        return JSON.stringify(store)
    },


    errorMessage: '',

    viewContact: function () {
        if ( id !== null) {
            var store = addressbook.getStore();
            for (a in store){
                if ( id == store[a].id) {
                    return store[a];
                } else {
                    return null;
                    
                }
    
            }
            
        }
        
    },


    saveContact: function(contact) {
        console.log(contact)
        // pushing the object to the array,
        // call the localstorage via key, if null, create the localstorage, pushing store to localstorage
        if ( typeof contact == 'object' ) {
        
            if ( contact.id !== null) {
                if ( this.getFromLocalStorage() == null) {
                    var store = [];
                    store.push(contact);
                   
                    localStorage.setItem('addressBook',  JSON.stringify(store));
                    return true;
                } else { 
                    var store = this.getStore();
                    store.push(contact);

                    localStorage.setItem('addressBook', this.storeToString(store));
                    return true;
                }
            }
            this.errorMessage = 'this object doesnot have a valid id';
            console.log(this.errorMessage);
            return false;
        }
            this.errorMessage = 'this is not a valid object';
            console.log(this.errorMessage);
            return false;
    },
    editContact: function(id, editedContact) {
        // pull the all storage ... use JSON.parse to convert storage back to array
        // loop through the array find the object with corresponding id
        // create a new object from the old, change the  properties of the new object, delete old object and push the new object. update local storage
    if ( id !== null) {
        var store = addressbook.getStore();
        for (a in store){
            if ( id == store[a].id) {
                store.splice(a,1);
                store.push(editedContact);
                var storeToString = addressbook.storeToString(store);
                localStorage.setItem('addressBook', storeToString);
                return true;
            } else {
                return false;
                
            }

        }
        
    }

    },


    deleteContact: function(id) {
         // loop through the storage
         // find the object via id and delete the object via index and array.slice
         if ( id !== null) {
            var store = addressbook.getStore();
            for (a in store){
                if ( id == store[a].id) {
                    store.splice(a,1);
                    var storeToString = addressbook.storeToString(store);
                    localStorage.setItem('addressBook', storeToString);
                    return true;
                } else {
                    return false;
                    
                }
    
            }
            
        }
    },

    getFromLocalStorage: function() {
        return localStorage.getItem('addressBook');
    }

};





function getRandomInt(max) {
    var randomId = Math.floor(Math.random() * Math.floor(max))
    var store = addressbook.getStore()
    for (a in store){
        if (randomId == store[a].id) {
            return getRandomInt(max);
        }  
    }
    return randomId;
}


 //display
 function display() {
    var contacts = addressbook.getStore();
    document.querySelector(".contact-list").innerHTML = '';
    if ( contacts != null ) {
        for ( var a in contacts) {
            console.log(contacts[a]);
            var str = '<div class= "entry">'
            str += `<span>First name: ${ contacts[a].firstName}</span> <span>Last name: ${contacts[a].lastName}</span>`;
            str += `<button class="view-details" id="view${contacts[a].id}" > View details </button> <button class="edit-button" id="edit${contacts[a].id}"> Edit </button>`
            str += `</div>`
            document.querySelector(".contact-list").innerHTML += str;
            
        }
    }
 }

 display();

 function actionButton() {
     var contacts = addressbook.getStore();
     if (contacts != null){
         for (var a in contacts){
             (function(){
                 var id = contacts[a].id;
          
            document.getElementById('view' +id).addEventListener("click", openViewMoreModal);
            document.getElementById('edit' +id).addEventListener("click", openEdit);
            document.getElementById('close-view').addEventListener("click", closeViewMoreModal);
            document.getElementById('close-edit').addEventListener("click", closeEditModal);
            
            })(a);
         }
     }
     
 }

 actionButton();

 function openViewMoreModal() {
    viewMoreModal.style.display = "block"   
}
function openEd000itModal(id) {
   editModal.style.display = "block"
   console.log(id);
      
}
function closeViewMoreModal() {
    viewMoreModal.style.display = "none";
}
function closeEditModal() {
editModal.style.display ="none";
}

 
document.getElementById('addContact').addEventListener('submit', function(e) {
    e.preventDefault();
    


   
    var contact = {
        firstName: firstname.value,
        lastName: lastname.value,
        id: getRandomInt(100)
         
    
        
    };

    if (addressbook.saveContact(contact) == true) {
       quickAddFormDiv.style.display = 'none';
    }
    display();
    actionButton();
});


}