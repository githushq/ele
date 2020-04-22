<template>
    <div class="forgetContainer">
         <head-top goback="true" head-title="重置密码"></head-top>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
export default {
    data(){
        return{
            cityId: null, // 城市id
        }
    },
    components:{
        headTop
    },
    created(){
        this.cityId = this.$route.params.cityId;
    }
}
</script>
<style lang="less" scoped>

</style>
