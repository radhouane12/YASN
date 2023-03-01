<template>

    <!-- Template für alle Tabs wenn eingeloggt -->
    <div>
        <!-- Navigation -->
        <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #3b5998;">
        <div class="container-fluid">

            <!-- YASN Logo -->
            <a class="navbar-brand" href="#">
                <img style="height: 30px;" v-bind:src="logoURL" alt="YASN">
            </a>
            <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#bs-example-navbar-collapse-1">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <!-- Menu Items -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" :class="{'active': currentTabComponent=='y-timeline'}" @click="currentTab='Timeline'">Timeline</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{'active': currentTabComponent=='y-network'}" @click="currentTab='Network'">Netzwerk</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            Einstellungen
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" :class="{'active': currentTabComponent=='y-privacy'}" @click="currentTab='Privacy'">Privatspähre</a></li>
                            <li><a class="dropdown-item" href="#" :class="{'active': currentTabComponent=='y-settings'}" @click="currentTab='Settings'">Nutzeprofil</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" @click="$emit('signout')">Logout</a></li>
                        </ul>
                    </li>
                </ul>
                <span class="navbar-text">
                    Hallo {{user.firstname}} {{user.lastname}}    
                </span>
            </div>
        </div>
        </nav>
        
        <!-- Main Tab with content -->
        <component class="mt-4" v-bind:user="user" :is="currentTabComponent" v-on:notLoggedIn="$emit('changeView', 'notLoggedIn')"></component>
        
        <!-- Footer -->
        <footer class="container-fluid" style="background-color: #3b5998;">
            <a class="link-light" href="impressum.html">Impressum</a>
        </footer>
    </div>
</template>

<script>
import YasnTimeline from './YasnTimeline.vue';
import YasnNetwork from './YasnNetwork.vue';
import YasnSettings from './YasnSettings.vue';
import YasnPrivacy from './YasnPrivacy.vue'
    
export default {
    components: {
        'y-timeline': YasnTimeline,
        'y-network': YasnNetwork,
        'y-settings': YasnSettings,
        'y-privacy': YasnPrivacy
    },
    props: ['user'],
    data: function() {
        return {
            currentTab: 'Timeline',
            tabs: ['Timeline', 'Network', 'Settings', 'Privacy'],
            logoURL: require('@/assets/yasn-logo.png')
        }
    },
    computed: {
        currentTabComponent: function() {
            return 'y-'+this.currentTab.toLowerCase()
        }
    }
}

</script>