<template>
    <div class="warp">
       <a href="./list.html">跳转到list页面</a>
       <tree :list="list"></tree>
    </div>
</template>
<script>
import tree from "../../components/tree"
export default {
    name:'index',
    components:{tree},
    data() {
        return {
            list:[
                {
                    'name':"超巨",
                    'child':[
                        {'name':"巨星",
                        'child':[
                            {'name':"球星",}
                        ]}
                    ]    
                },
                {
                    'name':"大神",
                    'child':[
                        {'name':"牛人",
                        'child':[
                            {'name':"高手",
                            'child':[
                                {'name': "菜鸟",}
                            ]}
                        ]}
                    ]    
                }
            ]
        }
    },
}
</script>
<style lang="less">

</style>

