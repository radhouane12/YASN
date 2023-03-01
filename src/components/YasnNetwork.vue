<template>
    <main class="container-fluid">
        <h1 class="my-4">Netzwerk</h1>
        <div class="row">
            <div class="col-12 col-md-6">Fügen sie Ihrem Netzwerk einen neuen Kontakt hinzu</div>
        </div>
        <div class="row">
            <div class="input-group mt-3 mb-3">
                <input type="text" class="form-control" v-model="targetUser" required placeholder="Geben Sie einen Benutzernamen ein"> 
                <button class="btn btn-outline-secondary" @click="addContact" type="button" id="button-netzwerk">Hinzufügen</button> 
            </div>
        </div>
        <y-contact class="mb-5" v-for="contact in contactlist" v-bind:key="contact._id" v-bind:contact="contact"></y-contact>
        <div class="modal fade" id="modalAlert" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Fehler</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Der eingegebene Nutzername existiert nicht. Versuch es erneut.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    </main>
</template>

<script>
import YasnContact from './YasnContact.vue';
import { Modal } from 'bootstrap';

export default {
    components: {
        'y-contact': YasnContact,
    },
    props: ['user'],
    data: function() {
        return {
            contactlist: [],
            targetUser: '',
            modal: null
        }
    },
    methods: {
        addContact: function() {
            var xhr=new XMLHttpRequest();
            var thisapp=this;
            xhr.open("POST", "/users/"+this.user.username+"/contacts", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    if (xhr.status==200) {
                        thisapp.getContacts();
                        thisapp.targetUser="";
                    }
                    else {
                        thisapp.modal.show();
                        thisapp.targetUser="";
                    }
                }
            }
            xhr.send(JSON.stringify({
                targetuser: this.targetUser
            }));
        },
        getContacts: function() {
            var xhr=new XMLHttpRequest();
            var thisapp=this;
            xhr.open("GET", "/users/"+this.user.username+"/contacts", true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    if (xhr.status==200) {
                        thisapp.contactlist=JSON.parse(xhr.responseText);
                    }
                }
            }
            xhr.send();
        }

    },
    mounted: function() {
        this.getContacts();
        this.modal=new Modal(document.getElementById('modalAlert'));
    }

}

</script>