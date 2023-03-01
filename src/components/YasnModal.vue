<template>
    <div>
        <!-- Button Neuer Beitrag -->
        <button style="float:left" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#neuer-beitrag">
            Neuer Beitrag
        </button>

        <!-- Modal zum Button -->
        <div class="modal fade" id="neuer-beitrag" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">

                        <!-- Modal Überschrift -->
                        <h4 class="modal-title" id="neuerBeitragModalLabel">Neuer Beitrag</h4>
                        
                        <!-- Kleine Kreuzbutton oben rechts zum Schließen -->
                        <button type="button" @click="hideModal" class="close" data-bs-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>

                    <!-- Modal Eingabefelder -->
                    <div class="modal-body">
                        <form>

                            <!-- Eingabe in den Textfeldern wird permanent validiert. Validierung erfolgt durch die computed Properties
                            headlineInvalid und headlineValid. Liefern diese "true" für die Box rot, grün umrandet und erscheint ggfs. der
                            rote Text bei negativem Ergebnis der Validierung -->
                            <div class="form-group">
                                <label for="ueberschrift">Überschrift</label>
                                <input type="text" class="form-control" :class="{'is-invalid': headlineInvalid, 'is-valid': headlineValid}" id="ueberschrift" placeholder="Gib Deine Überschrift ein" v-model="newPost.headline">
                                <div class="invalid-feedback">
                                    {{headlineInvalidMsg}}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="beitrag">Dein Beitrag</label>
                                <textarea class="form-control" :class="{'is-invalid': textInvalid, 'is-valid': textValid}" id="kommentar" rows="10" placeholder="Gib Deinen Beitrag ein" v-model="newPost.text"></textarea>
                                <div class="invalid-feedback">
                                    {{textInvalidMsg}}
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Modal Buttnos - Absenden wird erst dann aktiviert, wenn die Validierung beider Felder positiv ist -->
                    <div class="modal-footer">
                        <button type="button" @click="hideModal" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
                        <button type="button" @click="sendPost" v-bind:disabled="!(headlineValid && textValid)" class="btn btn-success" data-bs-dismiss="modal">Absenden</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {

            /* Funktionen zur permanenten Validierung der Eingabefelder. Validierung erfolgt bei jedem Tastenanschlag.*/
            headlineInvalid() {
                return (this.newPost.headline!="" && this.newPost.headline.length < 4) ? true:false
            },
            headlineValid() {
                return this.newPost.headline.length >=4 ? true:false
            },
            textInvalid() {
                return (this.newPost.text!="" && this.newPost.text.length < 10) ? true:false
            },
            textValid() {
                return this.newPost.text.length>=10 ? true:false
            },

            /* Feedback-Text bei negativer Validierung der Eingabefelder */
            headlineInvalidMsg() {
                if (this.newPost.headline!="" && this.newPost.headline.length < 4) {
                    return 'Geben Sie mindestens vier Zeichen ein.'
                }
                return "";
            },
            textInvalidMsg() {
                if (this.newPost.text!="" && this.newPost.headline.length < 10) {
                    return 'Geben Sie mindestens zehn Zeichen ein.'
                }
                return "";
            }
        },
        methods: {

            /* Wird aufegrufen bei Drücken von Absenden */
            sendPost() {
                var xhr=new XMLHttpRequest();
                var thisapp=this;
                xhr.open("POST", '/messages', true);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onreadystatechange=function() {
                    if (xhr.readyState==4) {
                        if (xhr.status==200) {
                            thisapp.hideModal();
                            thisapp.$parent.getTimeline();
                        }
                    }
                }
                xhr.send(JSON.stringify({
                    headline: this.newPost.headline,
                    content: this.newPost.text
                }));

                /*
                this.sentPressed=true;
                if (this.headlineValid&&this.textValid) {
                    //Versenden des Posts später hier einfügen
                    //Textfelder löschen
                    this.newPost.headline='';
                    this.newPost.text='';
                    this.sentPressed=false;
                } */
            },

            /*Wird aufgerufen bei Abbrechen und Kreuzbutton oben rechts */
            hideModal() {
                //Textfelder löschen
                this.newPost.headline=''
                this.newPost.text=''
            }
        },
        data() {
            return {
                newPost: {
                    headline: '',
                    text: ''
                },
                sentPressed: false
            }
        }
    }
</script>