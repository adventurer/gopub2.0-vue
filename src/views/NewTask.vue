<template>
    <Row style="margin:5px 0;">
        <Col span="22" offset="1">
            <Table border :columns="columns1" :data="data1"></Table>
        </Col>
    </Row>
</template>
<script>
    export default {
        mounted: function () {
            this.getDate()
        },
        methods: {
            getDate(){
                let that = this
                this.jQuery.ajax({
                    type: "get",
                    url: location.origin+"/task/choose",
                    data: {},
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        if (data.Expired <= 0 ) {
                            that.$router.push({
                                name:'login',
                                params:{
                                    orderNum:"sfsd"
                                }
                            });
                        }else{
                            that.data1 = data
                        }
                    }
                });
            },
            choose(id){
                // this.$router.push({
                //     name:'newtaskdetail',
                //     params:{
                //         project:safasfas
                //     }
                // });

                this.$router.push({
                    path: '/newtaskdetail',
                    query: {
                        project: id
                    }
                })
            }
        },
        data () {
            return {
                columns1: [
                    {
                        title: '环境',
                        key: 'Level',
                        width:150,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.Level==1) {
                                return h('Tag',{
                                    props:{
                                        color:"green"
                                    },
                                },
                                "开发环境"
                                )
                            }else if(params.row.Level==2){
                                return h('Tag',{
                                    props:{
                                        color:"blue"
                                    },
                                },
                                "测试环境"
                                )
                            }else{
                                return h('Tag',{
                                    props:{
                                        color:"red"
                                    },
                                },
                                "线上环境"
                                )
                            }
                        }
                    },
                    {
                        title: '项目',
                        key: 'Name'
                    },
                    {
                        title: 'HOSTS',
                        key: 'Hosts'
                    },
                    {
                        title: '选择',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.choose(params.row.Id)
                                        }
                                    }
                                }, '选择')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        Id:4,
                        Level:"1",
                        Name: 'John Brown',
                        Host: 18
                    }
                ]
            }
        }
    }
</script>
