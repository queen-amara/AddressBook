window.onload = function() {
    var quickAddBtn = document.getElementById("Quickadd");
    var Addbtn = document.getElementById("Add");
    var quickCancelBtn = document.getElementById("cancel");
    var quickAddFormDiv = document.getElementById("quick-form");
    var contactlistDiv = document.querySelector(".contact-list");
    var viewContact = document.getElementById("view-contact");


    //edit inputs
    var editFirstname = document.getElementById("edit-firstname");
    var editLastname = document.getElementById("edit-lastname");
    var editAddress = document.getElementById("edit-address");
    var editPhone = document.getElementById("edit-phone");
    var editEmail = document.getElementById("edit-email");
    var editIndex = document.getElementById("edit-index");


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
                this.errorMessage = 'this object does not have a valid id';

                return false;
            }
                this.errorMessage = 'this is not a valid object';
              
                return false;
        },
        editContact: function(id, editedContact) {
            // pull the all storage ... use JSON.parse to convert storage back to array
            // loop through the array find the object with corresponding id
            // create a new object from the old, change the  properties of the new object, delete old object and push the new object. update local storage
            if ( id !== null) {
                var store = addressbook.getStore();
                for (a in store) {
                    var contact = store[a]
                  
                    if ( id == contact.id) {
                        store.splice(a,1);
                        store.push(editedContact);
                        var storeToString = addressbook.storeToString(store);
                        localStorage.setItem('addressBook', storeToString);
                        return true;
                    }
                    
                }
                
            }
            this.errorMessage = 'this object does not have a valid id';
            return false
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
                var str = '<div class= "entry" style="margin-bottom: 5px;">'
                str += `<span class="list-label">First name:</span><span class="list-value"> ${ contacts[a].firstName}</span> <span class="list-label">Last name:</span><span class="list-value">${contacts[a].lastName}</span>`;
                str += `<button class="view-details" id='view${contacts[a].id}' > View details </button> <button class="edit-button" id='edit${contacts[a].id}'> Edit </button>`
                str += ` <button class="delete-button" id='delete${contacts[a].id}'> Delete </button></div>`
                document.querySelector(".contact-list").innerHTML += str;
            }
        }
    }

    display();

    function actionButton() {
        var contacts = addressbook.getStore();
        if (contacts != null) {
            for ( var a in contacts ) {
                (function() {
                    var id = contacts[a].id;
                    document.getElementById('view' +id).addEventListener("click", function () {
                        openViewMoreModal(id);
                    })
                    document.getElementById('edit' +id).addEventListener("click", function() {
                        openEditModal(id);
                    });
                    document.getElementById('close-view').addEventListener("click", closeViewMoreModal)
                    document.getElementById('close-edit').addEventListener("click", closeEditModal);
                    document.getElementById('delete'+id).addEventListener("click", function(){
                        deleteContact(id);
                    })
                })(a);
            }
        }
    }

    actionButton();

    function deleteContact(id) {
        alert('are you sure you want to delete this contact');
        if ( addressbook.deleteContact(id) == true ) {
            display();
            actionButton();
        }

    }

    function openViewMoreModal(id) {
        viewContact.style.display = "block";
        var contacts = addressbook.getStore();
        document.querySelector('#show-full-details').innerHTML = '';
        for ( a in contacts) {
            var contact = contacts[a];
            var str = ``
            if ( contact.id == id ) {
                str += `<div class="contact-details">`
                str += `<p><span class="list-label">Firstname: </span><span>${contact.firstName}</span></p>`
                str += `<p><span class="list-label">Lastname: </span><span>${contact.lastName}</span></p></div>`
                str += `<p><span class="list-value">Email: </span><span>${contact.email}</span></p>`
                str += `<p><span class="list-value">Phone: </span><span>${contact.phone}</span></p>`
                str += `<p><span>Address: </span><span>${contact.address}</span></p>`
                str += `</div>`
                document.querySelector('#show-full-details').innerHTML += str;
            }
        }
    }

    function openEditModal(id) {
        document.getElementById("edit-contact").style.display = "block"; 
        var contacts = addressbook.getStore();
        for ( a in contacts) {
            var contact = contacts[a];
            console.log(contact);
            if ( contact.id == id ) {
                if ( editFirstname.value == '' || editFirstname.value !== null ) {
                    editFirstname.value = contact.firstName;
                }
                if ( editLastname.value == '' || editLastname.value !== null ) {
                    editLastname.value = contact.lastName;
                }
                if ( editAddress.value == '' || editAddress.value !== null ) {
                    editAddress.value = contact.address;
                }
                if ( editEmail.value == '' || editEmail.value !== null ) {
                    editEmail.value = contact.email;
                }
                if ( editPhone.value == '' || editPhone.value !== null ) {
                    editPhone.value = contact.phone;
                }
                if ( editIndex.value == '' || editIndex.value !== null || editIndex.value =='undefined' ) {
                    console.log('edit index', id);
                    editIndex.value = id;
                }
            }
        }
    }


    function closeViewMoreModal() {
        viewContact.style.display = "none";
    }

    function closeEditModal() {
        document.getElementById("edit-contact").style.display = "none"; 
    }

    
    document.getElementById('addContact').addEventListener('submit', function(e) {
        e.preventDefault();
        var contact = {
            firstName: firstname.value,
            lastName: lastname.value,
            address: address.value,
            email: email.value,
            phone: phone.value,
            id: getRandomInt(100)    
        };

        if (addressbook.saveContact(contact) == true) {
            quickAddFormDiv.style.display = 'none';
            firstname.value = '';
            lastname.value = '';
            address.value = '';
            email.value = '';
            phone.value = '';
        }
        display();
        actionButton();
    });

    
    document.getElementById('editContact').addEventListener('submit', function(e) {
        e.preventDefault();
        var id = editIndex.value;
        var contact = {
            firstName: editFirstname.value,
            lastName: editLastname.value,
            address: editAddress.value,
            email: editEmail.value,
            phone: editPhone.value,
        };
    
  
        if (addressbook.editContact(id, contact) == true) {
            document.getElementById("edit-contact").style.display = "none"; 
        }else {
            console.log(id);
            console.log(addressbook.errorMessage);
        }
        display();
        actionButton();
    })
};