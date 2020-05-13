<template>
    <div>
        <the-navbar/>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TheNavbar from '@/components/layout/TheNavbar.vue';

@Component({
    components: {
        TheNavbar
    }
})
export default class NavbarLayout extends Vue {
    
}
</script>

<style>

</style>