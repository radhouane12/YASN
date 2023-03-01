<template>
    <div id="app">
        <component v-bind:user="user" v-bind:is="currentTabComponent" v-on:signup="signUp" v-on:signin="signIn" v-on:signout="signOut" v-on:changeView="signIn"></component>
    </div>
</template>

<script>
import YasnSignedIn from './components/YasnSignedIn.vue';
import YasnSignedOut from './components/YasnSignedOut.vue';
import YasnFailedLogin from './components/YasnFailedLogin.vue'

export default {
    name: 'app',
	components: {
		'y-signedin': YasnSignedIn,
        'y-signedout': YasnSignedOut,
        'y-failedlogin': YasnFailedLogin
	},
    data: function() {
        return {
            currentTabComponent: 'y-signedout',
            user: {}
        }
    },
    methods: {
        signUp(newUser) {
            console.log('Inside signUp');
            this.user="";
            var xhr=new XMLHttpRequest();
            var thisapp=this;
            xhr.open("POST", "/users", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    if (xhr.status==200) {
                        thisapp.user=JSON.parse(xhr.responseText);
                        thisapp.currentTabComponent='y-signedin';
                    }
                } else {
                    thisapp.currentTabComponent='y-signedout';
                }
            };
            xhr.send(JSON.stringify({
                title: newUser.title,
                firstname: newUser.firstName,
                lastname: newUser.lastName,
                email: newUser.email,
                sex: newUser.gender,
                dateOfBirth: newUser.birthday,
                username: newUser.firstName.toLowerCase()+newUser.lastName.toLowerCase(),
                password: newUser.pwd
            }));
        },
        signIn(existingUser) {
            console.log('Inside signIn');
            this.user="";
            var xhr=new XMLHttpRequest();
            var thisapp=this;
            xhr.open("POST", "/signin", true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    if (xhr.status==200) {
                        thisapp.user=JSON.parse(xhr.responseText);
                        thisapp.currentTabComponent='y-signedin';
                    } else {
                        thisapp.currentTabComponent='y-failedlogin';
                    }
                }
            }
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({username: existingUser.username, password: existingUser.password}));
        },
        signOut() {
            console.log('Inside ignOut');
            var xhr=new XMLHttpRequest();
            var thisapp=this;
            xhr.open("GET", "/users/"+this.user.username+"/signout", true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {
                    thisapp.user={};
                    thisapp.currentTabComponent='y-signedout';
                }
            }
            xhr.send();
        }
    },
    mounted: function() {
        var xhr=new XMLHttpRequest();
        var thisapp=this;
        xhr.open("GET", "/currentUser", true);
        xhr.onreadystatechange=function() {
            if (xhr.readyState==4) {
                if (xhr.status==200) {
                    thisapp.user=JSON.parse(xhr.responseText);
                    thisapp.currentTabComponent='y-signedin';
                } else {
                    thisapp.currentTabComponent='y-signedout';
                }
            }
        }
        xhr.send();
    }
}
</script>
