<template>

    <!-- Time line tab -->
    <main class="container-fluid">
        <!-- Überschrift -->
        <h1 class="my-4">Timeline</h1>

        <!-- Button Neuer Beitrag (Modal) -->
        <y-modal></y-modal>

        <!-- Pagination -->
        <nav style="float:none;">
            <ul class="pagination justify-content-end">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1">
                        <span>&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">
                        <span class="sr-only">Next</span>
                        <span>&raquo;</span>
                    </a>
                </li>  
            </ul>
        </nav>

        <!-- Postings -->
        <!-- Iteriere durch das Array timeline und übergebe ein post an die Komponente y-post -->
        <div v-for="post in timeline" v-bind:key="post.id">
            <y-post :post="post"></y-post>
        </div>

        <br>

        <!-- Button Neuer Beitrag (Modal) -->
        <y-modal></y-modal>

        <!-- Pagination -->
        <nav style="float:none;">
            <ul class="pagination justify-content-end">
                <li class="page-item">
                    <a class="page-link" href="#" tabindex="-1">
                        <span>&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">
                        <span class="sr-only">Next</span>
                        <span>&raquo;</span>
                    </a>
                </li>  
            </ul>
        </nav>
    </main>
</template>

<script>
import YasnPost from './YasnPost.vue';
import YasnModal from './YasnModal.vue'

export default {
    components: {
        'y-post': YasnPost,
        'y-modal': YasnModal
    },
    props:['user'],
    data: function () {
        return {
            timeline: [],
        }
    },
    methods: {
        getTimeline: function() {
            var xhr=new XMLHttpRequest();
            var thisapp=this;
            xhr.open("GET", "/users/"+this.user.username+'/timeline', true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    if (xhr.status==200) {
                        thisapp.timeline=JSON.parse(xhr.responseText);
                    } else if (xhr.status==404) {
                        thisapp.timeline=new Array;
                        thisapp.timeline[0]={
                            headline: "Keine Nachrichten",
                            thumbnail: "/img/dummyuser.jpg",
                            author: "",
                            date: "",
                            time: "",
                            content: "Schreib etwas oder verbinde Dich mit anderen Nutzern."
                        };
                    } else {
                        thisapp.$emit('notLoggedIn');
                    }
                }
            }
            xhr.send(); 
        }
    },
    mounted: function() {
        this.getTimeline();
    } 
}
</script>