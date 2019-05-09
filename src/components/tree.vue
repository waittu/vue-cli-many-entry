<template>
    <div>
        <li class="item" v-for="(item,index) in list" :key="index">
            <span>{{item.name}}</span>
            <template v-if="item.child&&item.child.length>0">
                <tree :list="item.child"></tree>
            </template>
        </li>
    </div>
</template>
<script>
export default {
    name:'tree',
    props:{
        list:{
            type:Array,
            default:()=>{return []}
        }
    }
}
</script>
<style lang="less" scoped>
.item{
    padding-left: 10px;
}
</style>


