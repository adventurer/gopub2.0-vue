<template>
        <Row style="margin-bottom:60px;">
            <Col span="22" offset="1">
                <Card>
                    <Row>
                        <Col span="4">
                            <Select v-model="model1" >
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col span="17">
                            <Input style="padding:0 5px;" placeholder="Enter something..."/>
                        </Col>
                        <Col span="3">
                            <Button type="primary">搜索</Button>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Tag checkable color="blue">上传进度：{{msg}}</Tag>
                    <Progress :percent="percent" :stroke-width="5"></Progress>
                    <Table border :columns="columns7" :data="data6"></Table>
                    <ButtonGroup style="margin-top:5px;">
                        <Button type="primary" v-on:click="pageUp()">
                            <Icon type="ios-arrow-back"></Icon>
                            上一页
                        </Button>
                        <Button type="primary" v-on:click="pageDown()">
                            下一页
                            <Icon type="ios-arrow-forward"></Icon>
                        </Button>
                    </ButtonGroup>
                </Card>
            </Col>
            <Collapse v-model="Collapse" style="position:fixed;bottom:0;width:100%;z-index:999;">
                <Panel name="Collapse">
                    发布细节
                    <p slot="content">
                        <Input v-model="textarea" type="textarea" readonly :autosize="{minRows: 11,maxRows: 11}" placeholder="Enter something..."></Input>
                    </p>
                </Panel>
            </Collapse>
        </Row>
</template>
<style>
.ivu-card{
    margin-top:5px;
}
.info{
    position: fixed;
    bottom: 0px;
}
</style>

<script>

    export default {
        name:"task",
        components: {
        },
        mounted: function () {
            this.getDate()
            this.webSocket()
        },
        methods: {
            filesWindow (files) {
                this.$Modal.confirm({
                    width: "60%",
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: files,
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
            pubProgress(progres_data) {
                this.$Notice.open({
                    // name:"progres_"+progres_data[1],
                    title: "部署单号："+progres_data[1],
                    duration: 3,
                    render: h => {
                        return h('div',[
                            h('p',progres_data[3]),
                            h('Progress',{
                                style: {
                                    "margin-top": '5px',
                                },
                                props:{
                                    percent:Number(progres_data[2]),
                                    "stroke-width":3
                                }
                            })
                        ])
                    }
                });
            },
            webSocket(){
                let that = this

                this.ws.onmessage = function (evt) { 
                    let msg = evt.data;

                    if (msg.indexOf("progress") == 0) {
                        let data = msg.split(":")
                        that.pubProgress(data)

                    } else if (msg.indexOf("upload") == 0) {
                        let data = msg.split(":")
                        that.msg = data[1]
                        that.percent = data[3]/data[4]*100
                    } else {
                        that.textarea += msg + "\n";
                    }

                };
            },
            deploy (index) {
                let that = this
                this.jQuery.ajax({
                    type: "get",
                    url: location.origin+"/task/deploy",
                    data: {id:that.data6[index].Id},
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        console.log(data)
                    }
                });
                
            },
            remove (index) {
                let that = this
                this.jQuery.ajax({
                    type: "get",
                    url: location.origin+"/task/del",
                    data: {id:that.data6[index].Id},
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        that.data6.splice(index, 1);
                    }
                });
            },
            getDate(){
                let url = location.origin+"/task/index"
                // let url = "http://127.0.0.1:8088"+"/task/index"
                let that = this
                this.jQuery.ajax({
                    type: "post",
                    url: url,
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
                            that.data6 = data
                        }
                    }
                });
            },
            pageUp(){
                if (this.page<1) {
                    return
                }
                if(this.page!=1){
                    this.page--
                }

                let that = this
                this.jQuery.ajax({
                    type: "get",
                    url: location.origin+"/task/index",
                    data: {page:that.page},
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        that.data6 = data
                    }
                });
            },
            pageDown(){
                let that = this
                that.page++
                this.jQuery.ajax({
                    type: "get",
                    url: location.origin+"/task/index",
                    data: {page:that.page},
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        that.data6 = data
                    }
                });
            }
        },
        watch: {
        },
        data () {
            return {
                msg:"",
                percent:0,
                progres_data:[],
                progres:[],
                page:1,
                Collapse:"Collapse1",
                textarea:"",
                columns7: [
                    {
                        title:"#",
                        key:"Id",
                        width:100
                    },
                    {
                        title: '项目',
                        key: 'Project'
                    },
                    {
                        title: '上线标题',
                        key: 'Title'
                    },
                    {
                        title: '文件列表',
                        key: 'Files',
                        render:(h,params)=>{
                            return h('Input',{
                                props:{
                                    rows:1,
                                    type:"text",
                                    value:params.row.Files,
                                    icon:"ios-albums-outline",
                                    readonly:true
                                },
                                on: {
                                    'on-click': () => {
                                        this.filesWindow(params.row.Files)
                                    }
                                },
                            }
                            )
                        }
                    },
                    {
                        title: '版本',
                        key: 'Version'
                    },
                    {
                        title: '发布进度',
                        key: 'Status',
                        render:(h,params)=>{
                            if (params.row.Status==3) {
                                return h('Tag',{
                                    props:{
                                        color:"blue"
                                    },
                                },
                                "完成"
                                )
                            }else{
                                return h('Tag',{
                                    props:{
                                        color:"green"
                                    },
                                },
                                "没完成"
                                )
                            }
                            
                        }
                    },
                    {
                        title: 'Action',
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
                                            if (confirm("确定提交？")) {
                                                this.Collapse = "Collapse"
                                                this.deploy(params.index)
                                            } 
                                        }
                                    }
                                }, '发布'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
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
                data6: [
                    {
                        Id: 1,
                        Project: 'John Brown',
                        Title: 18,
                        Files: '1sfsf',
                        Version: 18,
                        Status: 23,
                        Progress:32
                    }
                ],
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''
                
            }
        }
        
    }
</script>
