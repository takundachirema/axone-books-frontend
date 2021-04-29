
<template>
    <div id="app">
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
            };
        },
        mounted(){
            console.log(this.$route.params);
        },
        created(){
            alert('in publish');
            console.log(this.$route.params);
        }
    }
</script> 