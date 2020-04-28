<template>
    <div class="cart_module">
        <section v-if="!foods.specifications.length" class='cart_button'>
            <transition name='showReduce'>
                <span @click = removeOutCart(foods.category_id,foods.item_id,foods.specfoods[0].food_id,foods.specfoods[0].name,foods_specfoods[0].price,'',foods.specfoods[0].packing_fee,foods.specfoods.sku_id,foods.speachoods[0].stock v-if="foodNum"></span>
            </transition>
        </section>
    </div>
</template>

<script>
    export default {
        props: ['shopId','foods'],
        data(){
            return{

            }
        }
    }

</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    
    
   
</style>
