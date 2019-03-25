<template>
    <Row style="margin-bottom:60px;">
        <Col span="24" offset="0">
            <Card>
                <Row>
                    <Table border :columns="projectTitle" :data="projectList"></Table>
                </Row>
            </Card>
        </Col>
    </Row>
</template>

<script>
    export default {
         methods: {
             infoWindow (content) {
                this.$Modal.confirm({
                    width: "60%",
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: content,
                                autofocus: true,
                                type:"textarea",
                                autosize:true,
                                readonly:true,
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    }
                })
            },
            getProject(){
                let that = this
                this.jQuery.ajax({
                    type: "get",
                    url: location.origin+"/project/index",
                    data: {},
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        that.projectList = data
                    }
                });
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        },
        mounted: function () {
            this.getProject()
        },
        data () {
            return {

                projectTitle: [
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
                        title: 'Hosts',
                        key: 'Hosts'
                    },
                    {
                        title: '本地仓库',
                        key: 'DeployFrom'
                    },
                    {
                        title: '仓库地址',
                        key: 'RepoUrl',
                        render:(h,params)=>{
                            return h('Tooltip',{
                                    props:{
                                        placement:"right",
                                        maxWidth:800
                                    }
                                },[
                                    h('Input',{
                                        props:{
                                            rows:1,
                                            type:"text",
                                            value:params.row.RepoUrl,
                                            readonly:true
                                        },
                                    }),
                                    h('div',{
                                            slot:"content",
                                            
                                    },[
                                        h('p',params.row.RepoUrl)
                                    ])

                                ]
                            )
                        }
                    },
                    {
                        title: '远程仓库',
                        key: 'ReleaseLibrary'
                    },
                    {
                        title: '远程部署',
                        key: 'ReleaseTo'
                    },
                    {
                        title: '远程用户',
                        key: 'ReleaseUser'
                    },
                    {
                        title: '部署后命令',
                        key: 'PostRelease',
                        render:(h,params)=>{
                            return h('Input',{
                                props:{
                                    rows:1,
                                    type:"text",
                                    value:params.row.PostRelease,
                                    icon:"ios-albums-outline",
                                    readonly:true
                                },
                                on: {
                                    'on-click': () => {
                                        this.infoWindow(params.row.PostRelease)
                                    }
                                },
                            }
                            )
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'CreatedAt'
                    },
                    {
                        title: '审核',
                        key: 'Audit',
                        align: 'center',
                        render: (h, params) => {
                            return h('i-switch', {
                                props:{
                                    value:params.row.Audit?true:false,
                                    'size':'large'
                                },
                                on:{
                                    'on-change': () => {
                                        let audit = (params.row.Audit+1)%2
                                        let id = params.row.Id
                                        let that = this
                                        this.jQuery.ajax({
                                            type: "get",
                                            url: location.origin+"/project/audit",
                                            data: {id:id,audit:audit},
                                            dataType: "json",
                                            withCredentials:true,
                                            success: function(data){
                                                console.log(data)
                                                if (data.Sta == 1) {
                                                    that.$Message.info('修改成功');
                                                    return
                                                }
                                                    that.$Message.info('修改失败:'+data.Msg);

                                            }
                                        });
                                    }
                                }
                            },[
                                h('span',{slot:"open"},'on'),
                                h('span',{slot:"close"},'off')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '初始化'),
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '复制'),
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '版本'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                projectList: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                ]
            }
        }
       
    }
</script>

<style>
.ivu-tooltip-inner{
    max-width:500px;
}
</style>