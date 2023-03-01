<template>
<div>
    <!-- Header -->
     <header class="container" style="background-color: #3b5998;">
        <div class="row">
            <div class="col-12 col-md-6">
                <img style="height: 50px" :src="logoURL" alt="YASN" class="img-fluid mt-3 mb-3">
            </div>
        </div>
    </header>

    <!-- Main content -->
    <main class="container" style="background-color: silver;">
        <div class="row">

            <!-- Carousel -->
            <section class="col-12 col-md-6 mt-3 mb-3">
                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">

                    <!-- Carousel Indicators -->
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3"></button>
                    </div>

                    <!-- Carousel Slideshow -->
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="3000">
                            <img class="d-block w-100" :src="carousel[0]" alt="Berlin">
                        </div>
                        <div class="carousel-item" data-bs-interval="3000">
                            <img class="d-block w-100" :src="carousel[1]" alt="Oxford">
                        </div>
                        <div class="carousel-item" data-bs-interval="3000">
                            <img class="d-block w-100" :src="carousel[2]" alt="Hongkong">
                        </div>
                        <div class="carousel-item" data-bs-interval="3000">
                            <img class="d-block w-100" :src="carousel[3]" alt="Wien">
                        </div>
                    </div>

                    <!-- Left and right controls -->
                    <button type="button" class="carousel-control-prev" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button type="button" class="carousel-control-next" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            </section>

            <section class="col-12 col-md-6 mt-3 mb-3">
                <h1>Login fehlgeschlagen</h1>
                <p>Versuche es erneut</p>
                <form id="login-form" novalidate autocomplete="off">
                    <div class="row mb-3">
                        <div class="col-12"><div class="form-floating">
                            <input class="form-control" id="username" name="username" placeholder="Benutzername" type="text" v-model="existingUser.username">
                            <label for="username">Benutzername</label>
                        </div></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12"><div class="form-floating">
                            <input class="form-control" id="password" name="password" placeholder="Passwort" type="password" v-model="existingUser.password">
                            <label for="password">Passwort</label>
                        </div></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 form-group">
                            <button type="button" @click="signin" class="btn btn-success form-control">Login</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="container" style="background-color: #3b5998;">
        <div class="row">
            <p class="col-12 text-right mt-2" style="color: white;"><a href="impressum.html" style="color: white;">Impressum</a></p>
        </div>
    </footer>
</div>
</template>

<script>
export default {
    computed: {
        loginState() {
            return (this.userName!='' && this.password!='') ? true:false 
        }
    },
    data: function() {
        return {
            logoURL: require('@/assets/yasn-logo.png'),
            carousel: [
                require('@/assets/berlin-teaser.jpg'),
                require('@/assets/oxford-teaser.jpg'),
                require('@/assets/hongkong-teaser.jpg'),
                require('@/assets/wien-teaser.jpg')
            ],
            existingUser: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        signin() {
            var userToLogin=JSON.parse(JSON.stringify(this.existingUser));
            this.existingUser.username="";
            this.existingUser.password="";
            this.$emit('signin', userToLogin);
        }
    },
    mounted: function() {
        console.log("Failed login")
    }
}
</script>