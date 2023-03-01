<template>
    <div class="d-flex mt-5">

        <!-- Bild des Autors -->
        <div class="flex-shrink-0">
            <img style="width: 100px;" :src="'img/'+contact.thumbnail" class="rounded-circle" :alt="contact.username">
        </div>
        
        <!-- Nachricht mit Überschrift, Autor, Datum und Zeit des Posts  -->
        <div class="flex-grow-1 ms-3">
            <h4>{{contact.firstname}}  {{contact.lastname}}</h4>
            <h5>Benutzername: {{contact.username}}</h5>
            <p><small class="text-muted">Letzter Besuch: 11. Februar 2022</small></p>
        </div>
    </div>

</template>

<script>
export default {
    props: ['contact']
}
</script>
