<template>

<!-- Landing Page für nicht eingeloggt Benutzer -->
<div>
    <!-- Header -->
     <header class="container" style="background-color: #3b5998;">
        <div class="row">
            <div class="col-12 col-md-6">
                <img style="height: 50px" :src="logoURL" alt="YASN" class="img-fluid mt-3 mb-3">
            </div>

            <!-- Nutzername und Password für breite Displays -->
            <div class="col-md-6 d-none d-md-block d-flex align-self-center">
                <form id="header-form-large" name="anmelden-form">
                    <div class="row g-2">
                        <div class="col">
                            <input type="text" placeholder="Benutzername" v-model="existingUser.username" class="form-control">
                        </div>
                        <div class="col">
                            <input type="password" placeholder="Passwort" v-model="existingUser.password" class="form-control">
                        </div>
                        <div class="col">
                            <button type="button" @click="$emit('signin', this.existingUser)" class="btn btn-success form-control">Login</button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Nutzername und Passwort für schmale Displays -->
            <div class="col-12 d-block d-md-none mb-3">
                <form id="header-form-small" name="anmelden-form">
                    <div class="row g-2">
                        <div class="col-12">
                            <input type="text" placeholder="Benutzername" v-model="existingUser.username" class="form-control">
                        </div>
                        <div class="col-12">
                            <input type="password" placeholder="Passwort" v-model="existingUser.password" class="form-control">
                        </div>
                        <div class="col-12">
                             <button type="button" @click="$emit('signin', this.existingUser)" class="btn btn-success form-control">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </header>

    <main class="container" style="background-color: silver;">
        <div class="row">

            <!-- Carousel -->
            <section class="col-12 col-md-6 mt-3">
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

            <!-- Main form -->
            <section class="col-12 col-md-6 mt-3 mb-3">
                    <h1>Registrieren</h1>
                    <p>yasn ist und bleibt kostenlos!</p>
                    
                    <!-- Formular für die Registrierung neuer Nutzer. Alle Nutzereingaben werden kontinuierlich validiert. Validierung basiert auf regulären Ausdrücken. Ferner wird bei Email und Passwort geprüft ob
                    die doppelte Eingabe identisch ist. Validierung erfolgt durch computet Properties während der Eingabe. Computed Properties liefern true bzw. false wodurch die Klassen .is-invalid bzw. is-valid bzw. 
                    .invalid-feedback in den verschiedenen Eingabefeldern gesetzt werden um optisches Feedback (rote Umrandung mit Text, bzw. grüne Umrandung gegeben wird --> 
                    <form class="needs-validation" novalidate autocomplete="off">
                        <div class="row mb-3">
                            <div class="col-6"><div class="form-floating">
                                <select class="form-select" :class="{'is-invalid': titleInvalid, 'is-valid': titleValid}" id="anrede" name="anrede" placeholder="Anrede" v-model="newUser.title">
                                    <option>Frau</option>
                                    <option>Frau Dr.</option>
                                    <option>Frau Prof.</option>
                                    <option>Herr</option>
                                    <option>Herr Dr.</option>
                                    <option>Herr Prof.</option>
                                </select>
                                <label class="form-label" for="anrede">Wählen Sie eine Anrede</label>
                                <div class="invalid-feedback">
                                    {{titleInvalidMsg}}
                                </div>
                            </div></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': firstNameInvalid, 'is-valid': firstNameValid}" id="vorname" name="vorname" placeholder="Vorname" type="text" required v-model="newUser.firstName" />
                                <label class="form-label" for="vorname">Vorname</label>
                                <div class="invalid-feedback">
                                    {{firstNameInvalidMsg}}
                                </div>
                            </div></div>
                            <div class="col"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': lastNameInvalid, 'is-valid': lastNameValid}" id="nachname" name="nachname" placeholder="Nachname" type="text" v-model="newUser.lastName" />
                                <label for="nachname">Nachname</label>
                                <div class="invalid-feedback">
                                    {{lastNameInvalidMsg}}
                                </div>
                            </div></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': emailInvalid, 'is-valid': emailValid}" id="email" name="emailadresse" type="email" placeholder="Emailadresse" v-model="newUser.email" required />
                                <label for="emailadresse">Emailadresse</label>
                                <div class="invalid-feedback">
                                    {{emailInvalidMsg}}
                                </div>
                            </div></div>
                            <div class="col"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': emailWdhInvalid, 'is-valid': emailWdhValid}" id="emailwdh" name="emailadressewdh" type="email" placeholder="Email wiederholen" v-model="newUser.emailWdh" required />
                                <label for="emailadressewdh">Email wiederholen</label>
                                <div class="invalid-feedback">
                                    {{emailWdhInvalidMsg}}
                                </div>
                            </div></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': pwdInvalid, 'is-valid': pwdValid}" id="pwd" name="password" type="password" placeholder="Passwort" v-model="newUser.pwd" required />
                                <label for="password">Passwort</label>
                                <div class="invalid-feedback">
                                    {{pwdInvalidMsg}}
                                </div>
                            </div></div>
                            <div class="col"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': pwdWdhInvalid, 'is-valid': pwdWdhValid}" id="pwdwdh" name="passwordwdh" type="password" placeholder="Passwort wiederholen" v-model="newUser.pwdWdh" required />
                                <label for="passwordwdh">Passwort wiederholen</label>
                                <div class="invalid-feedback">
                                    {{pwdWdhInvalidMsg}}
                                </div>
                            </div></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6"><div class="form-floating">
                                <input class="form-control" :class="{'is-invalid': birthdayInvalid, 'is-valid': birthdayValid}" id="geburtstag" type="date" name="geburtstag" max="2010-01-01" min="1900-01-01" v-model="newUser.birthday" />
                                <label for="geburtstag">Geburtstag</label>
                                <div class="invalid-feedback">
                                    {{birthdayInvalidMsg}}
                                </div>
                            </div></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="form-check">
                                    <input class="form-check-input" :class="{'is-invalid': genderInvalid, 'is-valid': genderValid}" type="radio" name="geschlecht" value="w" id="gridRadios1" v-model="newUser.gender">
                                    <label class="form-check-label" for="gridRadios1">Weiblich</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" :class="{'is-invalid': genderInvalid, 'is-valid': genderValid}" type="radio" name="geschlecht" value="d" id="gridRadios3" v-model="newUser.gender">
                                    <label class="form-check-label" for="gridRadios3">Divers</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" :class="{'is-invalid': genderInvalid, 'is-valid': genderValid}" type="radio" name="geschlecht" value="m" id="gridRadios2" v-model="newUser.gender">
                                    <label class="form-check-label" for="gridRadios2">Männlich</label>
                                    <div class="invalid-feedback">
                                        {{genderInvalidMsg}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <p class="col-12" id="disclaimer">Indem Du auf „Registrieren“ klickst, erklärst Du Dich mit unseren Nutzungsbedingungen einverstanden und bestätigst, dass Du unsere Datenrichtlinie einschließlich unserer Cookie-Richtlinie gelesen hast.</p>
                        </div>
                        <div class="row">
                            <div class="form-group col-12">
                                <button type="button" @click="$emit('signup', this.newUser)" class="btn btn-primary">Registrieren</button>
                            </div>
                        </div>
                    </form>
            </section>
        </div>

    </main>
 
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

        /* Computed Propteries für die Validierung der Eingaben */
        titleValid() {
            return this.newUser.title!="";
        },
        titleInvalid() {
            return this.registryButton && this.newUser.title=="";
        },
        titleInvalidMsg() {
            if (this.newUser.title=="") {
                return "Wählen Sie eine Anrede aus der Liste aus."
            }
            return "";
        },
        firstNameValid() {
            return this.namePattern.test(this.newUser.firstName);
        },
        firstNameInvalid() {
            return (this.registryButton || !this.newUser.firstName=="") && !this.namePattern.test(this.newUser.firstName);
        },
        firstNameInvalidMsg() {
            if (!this.namePattern.test(this.newUser.firstName)) {
                return "Ein gültiger Vorname bsteht aus zwei bis fünfzehn Zeichen, Klein- und Großbuchstaben sowie den Umlauten und ß."
            }    
            return "";
        },
        lastNameValid() {
            return this.namePattern.test(this.newUser.lastName);
        },
        lastNameInvalid() {
            return (this.registryButton || !this.newUser.lastName=="") && !this.namePattern.test(this.newUser.lastName)
        },
        lastNameInvalidMsg() {
            if (!this.namePattern.test(this.newUser.lastName)) {
                return "Ein gültiger Nachname bsteht aus zwei bis fünfzehn Zeichen, Klein- und Großbuchstaben sowie den Umlauten und ß."
            }
            return "";
        },
        emailValid() {
            return  this.emailPattern.test(this.newUser.email) && (this.emailPattern.test(this.newUser.emailWdh) && !this.newUser.email.localeCompare(this.newUser.emailWdh));
        },
        emailInvalid() {
            var substring=this.newUser.emailWdh.startsWith(this.newUser.email);
            var focus=document.getElementById('email')===document.activeElement;
            var correctOther=this.emailPattern.test(this.newUser.emailWdh);
            var match=this.emailPattern.test(this.newUser.email);
            var empty=this.newUser.email=="";
            var equal=this.newUser.email.localeCompare(this.newUser.emailWdh);
            return ((!correctOther && !match && (!empty || this.registryButton)) || (correctOther && focus && !substring)) || equal;
        },
        emailWdhValid() {
           return (this.emailPattern.test(this.newUser.emailWdh)) && (this.emailPattern.test(this.newUser.email) && !this.newUser.email.localeCompare(this.newUser.emailWdh));
        },
        emailWdhInvalid() {
            var substring=this.newUser.email.startsWith(this.newUser.emailWdh);
            var focus=(document.getElementById('emailwdh')===document.activeElement);
            var correctOther=this.emailPattern.test(this.newUser.email);
            var match=this.emailPattern.test(this.newUser.emailWdh);
            var empty=this.newUser.emailWdh=="";
            var equal=this.newUser.email.localeCompare(this.newUser.emailWdh);
            return ((!correctOther && !match && (!empty || this.registryButton)) || (correctOther && focus && !substring)) || equal;
        },
        emailInvalidMsg() {
            if (!this.emailPattern.test(this.newUser.email) && (this.newUser.email!="" || this.registryButton)) {
                return "Bitte geben Sie eine gültige Emailadresse ein."
            }
            if (this.newUser.email.localeCompare(this.newUser.emailWdh)) {
                return "Die Eingabe der Emailadresse in beiden Feldern muss identisch sein."
            }
            return "";
        },
        emailWdhInvalidMsg() {
            if (!this.emailPattern.test(this.newUser.emailWdh) && (this.newUser.emailWdh!="" || this.registryButton)) {
                return "Bitte geben Sie eine gültige Emailadresse ein."
            }
            if (this.newUser.email.localeCompare(this.newUser.emailWdh)) {
                return "Die Eingabe der Emailadresse in beiden Feldern muss identisch sein."
            }
            return "";
        },
        pwdValid() {
            return  this.passwordPattern.test(this.newUser.pwd) && (this.passwordPattern.test(this.newUser.pwdWdh) && !this.newUser.pwd.localeCompare(this.newUser.pwdWdh));
        },
        pwdInvalid() {
            var substring=this.newUser.pwdWdh.startsWith(this.newUser.pwd);
            var focus=document.getElementById('pwd')===document.activeElement;
            var correctOther=this.passwordPattern.test(this.newUser.pwdWdh);
            var match=this.passwordPattern.test(this.newUser.pwd);
            var empty=this.newUser.pwd=="";
            var equal=this.newUser.pwd.localeCompare(this.newUser.pwdWdh);
            return ((!correctOther && !match && (!empty || this.registryButton)) || (correctOther && focus && !substring)) || equal;
        },
        pwdWdhValid() {
           return (this.passwordPattern.test(this.newUser.pwdWdh)) && (this.passwordPattern.test(this.newUser.pwd) && !this.newUser.pwd.localeCompare(this.newUser.pwdWdh));
        },
        pwdWdhInvalid() {
            var substring=this.newUser.pwd.startsWith(this.newUser.pwdWdh);
            var focus=(document.getElementById('pwdwdh')===document.activeElement);
            var correctOther=this.passwordPattern.test(this.newUser.pwd);
            var match=this.passwordPattern.test(this.newUser.pwdWdh);
            var empty=this.newUser.pwdWdh=="";
            var equal=this.newUser.pwd.localeCompare(this.newUser.pwdWdh);
            return ((!correctOther && !match && (!empty || this.registryButton)) || (correctOther && focus && !substring)) || equal;
        },
        pwdInvalidMsg() {
            if (!this.passwordPattern.test(this.newUser.pwd) && (this.newUser.pwd!="" || this.registryButton)) {
                return "Bitte geben Sie ein gültiges Passwort ein mit mindestens acht Zeichen, mindestens einer Zahl sowie mindestens einem Groß- und einem Kleinbuchstaben."   
            } 
            if (this.newUser.pwd.localeCompare(this.newUser.pwdWdh)) {
                return "Das Passwort muss in beiden Feldern identisch sein."
            }
            return "";
        },
        pwdWdhInvalidMsg() {
            if (!this.passwordPattern.test(this.newUser.pwdWdh) && (this.newUser.pwdWdh!="" || this.registryButton)) {
                return "Bitte geben Sie ein gültiges Passwort ein mit mindestens acht Zeichen, mindestens einer Zahl sowie mindestens einem Groß- und einem Kleinbuchstaben."
            }
            if (this.newUser.pwd.localeCompare(this.newUser.pwdWdh)) {
                return "Das Passwort muss in beiden Feldern identisch sein."
            }
            return "";
        },
        birthdayValid() {
            return this.datePattern.test(this.newUser.birthday);
        },
        birthdayInvalid() {
            return (this.registryButton || !this.newUser.birthday=="") && !this.datePattern.test(this.newUser.birthday);
        },
        birthdayInvalidMsg() {
            if (!this.datePattern.test(this.newUser.birthday)) {
                return "Bitte geben Sie ein gültiges Datum ein."
            }    
            return "";
        },
        genderValid() {
            return (this.newUser.gender=="m" || this.newUser.gender=="d" || this.newUser.gender=="w");
        },
        genderInvalid() {
            return this.registryButton && !(this.newUser.gender=="m" || this.newUser.gender=="d" || this.newUser.gender=="w");
        },
        genderInvalidMsg() {
            if (!(this.newUser.gender=="m" || this.newUser.gender=="d" || this.newUser.gender=="w")) {
                return "Wählen Sie Ihr Geschlecht.";
            }
            return "";
        }
    },
    data: function() {
        return {

            /*Reguläre ausdrücke zur Validierung der verschiedenen Benutzereingaben */ 
            namePattern: /^[a-zA-ZäöüßÄÖÜ-]{2,15}$/,
            emailPattern: /^\S+@\S+\.\S+$/,
            passwordPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            datePattern: /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
 
            registryButton: false,
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
            },
            newUser: {
                title: '',
                firstName: '',
                lastName: '',
                email: '',
                emailWdh: '',
                pwd: '',
                pwdWdh: '',
                birthday: '',
                gender: ''
            }
        }
    }
}
</script>