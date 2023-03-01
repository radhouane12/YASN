<template>

    <!-- Ein Nachrichtenpost in der Timeline -->
    <div class="d-flex mt-5">

        <!-- Bild des Autors -->
        <div class="flex-shrink-0">
            <img style="width: 100px;" :src="this.post.thumbnail" class="rounded-circle" :alt="post.author">
        </div>
        
        <!-- Nachricht mit Überschrift, Autor, Datum und Zeit des Posts  -->
        <div class="flex-grow-1 ms-3">
            <h4>{{post.headline}}</h4>
            <h5>{{post.author}} <small class="text-muted"><i>{{post.date}}, {{post.time}}</i></small></h5>
            <p>{{post.content}}</p>

            <!-- Exisitierende Kommentare zum Post -->
            <div v-if="post.comments && post.comments.length">
                <div v-for="comment in post.comments" v-bind:key="comment.id" class="flex-grow-1 ms-3">
                    <div class="flex-shrink-0">
                        <img style="width: 100px;" :src="require('@/assets/'+comment.thumbnail)" class="rounded-circle" :alt="comment.author">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h4>{{comment.headline}}</h4>
                        <h5>{{comment.author}} <small class="text-muted"><i>{{comment.date}}, {{comment.time}}</i></small></h5>
                        <p>{{comment.content}}</p>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="collapse" :data-bs-target="'#'+post.id">Kommentar</button>

            
            <!-- Eingeklapptes Formular zur Kommentierung -->
            <div class="mt-3 collapse" :id="post.id" :ref="post.id">
                <form>
                    
                    <!-- Textfelder für Überschrift und Kommentat. Eingabe wird kontinuierlich durch die computed Properties headlineInvalid, headlineValid, commentInvalid und
                    commentValid validiert. Properties steuern die .is-invalid und .is-valid Klassen. Feedback Text im Divs der Klasse .invalid-feedback falls Validierung
                    negativ -->
                    <div class="form-group">
                        <label :for="'ueberschrift-'+post.id">Überschrift</label>
                        <input type="text" class="form-control" :class="{'is-invalid': headlineInvalid, 'is-valid': headlineValid}" :id="'ueberschrift-'+post.id" placeholder="Gib Deine Überschrift ein" v-model="headline">
                        <div class="invalid-feedback">
                            {{headlineInvalidMsg}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label :for="'kommentar-'+post.id">Dein Beitrag</label>
                        <textarea class="form-control" :class="{'is-invalid': commentInvalid, 'is-valid': commentValid}" rows="10" :id="'kommentar-'+post.id" placeholder="Gib Deinen Kommentar ein" v-model="comment"></textarea>
                        <div class="invalid-feedback">
                            {{commentInvalidMsg}}
                        </div>
                    </div>
                    
                    <!-- Buttons zum Abbrechen und Absenden. Absenden wird blockiert falls Validierung negativ -->
                    <div class="my-3">
                        <button type="button" @click="hideCollapse" class="btn btn-danger btn-sm" data-bs-toggle="collapse" :data-bs-target="'#'+post.id">Abbrechen</button>
                        <button type="button" @click="sendComment" :disabled="!(headlineValid && commentValid)" data-bs-toggle="collapse" :data-bs-target="'#'+post.id" class="btn btn-success btn-sm mx-2">Absenden</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script> 
export default {
 /*   name: "comment", */

    /* Hole Posting vom Elternelement */
    props: ['post'],
    computed: {

        /* Computed Properties zur Validierung */
        headlineInvalid() {
            return (this.headline!="" && this.headline.length<4) ? true:false
        },
        headlineValid() {
            return this.headline.length>=4 ? true:false
        },
        commentInvalid() {
            return (this.comment!="" && this.comment.length<10) ? true:false
        },
        commentValid() {
            return this.comment.length>=10 ? true:false
        },
        headlineInvalidMsg() {
            if (this.headline!="" && this.headline.length<4) {
                return 'Geben Sie mindestens vier Zeichen ein.';
            }
            return '';
        },
        commentInvalidMsg() {
            if (this.comment!="" && this.comment.length<10) {
                return 'Geben Sie mindestens zehn Zeichen ein.'
            }
            return '';
        }
    },
    methods: {
        sendComment() {
            //Versenden des Comment später hier einfügen
            this.comment='';
            this.headline='';
        },
        hideCollapse() {
            this.comment='';
            this.headline='';
        }
    },
    data: function() {
        return {
            comment: '',
            headline: '',
            visible: false,
            collapseComment: true
        }
    }
}
</script>