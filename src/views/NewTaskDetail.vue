<template>
    <Row style="margin-bottom:60px;">
        <Col span="22" offset="1">
            <Card>
                <p slot="title">
                    <Icon type="ios-paper-outline"></Icon>
                    创建上线单
                </p>
                <template>
                    <Form :model="formTop" label-position="top">
                        <FormItem label="上线单类型">
                            <RadioGroup v-model="formTop.type">
                                <Radio label="2">
                                    <span>列表</span>
                                </Radio>
                                <Radio label="1">
                                    <span>全量</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="选择分支">
                            <Select v-model="branch">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>                         
                        </FormItem>
                        <FormItem label="选择版本">
                            <Select v-model="versionModel">
                                <Option v-for="item in versionList" :value="item" :key="item" >{{ item }}</Option>
                            </Select>   
                        </FormItem>
                        <FormItem label="上线单标题">
                            <Input v-model="formTop.title"></Input>                            
                        </FormItem>
                        <FormItem label="待上线文件列表">
                            <Input type="textarea" :rows="15" v-model="formTop.files"></Input>
                        </FormItem>
                        <FormItem label="提交信息">
                            <Input type="textarea" disabled :rows="6" v-model="formTop.desc"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="commitVervion()">提交</Button>
                        </FormItem>
                    </Form>
                </template>
            </Card>
        </Col>
    </Row>
</template>
<script>
export default {
    mounted: function () {
        // console.log(this.$route)
        let projectId = this.$route.query.project
        console.log(projectId)
        this.projectId = projectId
        this.getVersionList(projectId)
    },
    methods: {
        getVersion(){

        },
        getVersionList(id){
            let that = this
            this.jQuery.ajax({
                type: "get",
                url: location.origin+"/version/list",
                data: {id:id},
                dataType: "json",
                withCredentials:true,
                success: function(data){
                    that.versionList = data
                }
            });
        },
        getVersionInfo(version){
            let that = this
            this.jQuery.ajax({
                type: "get",
                url: location.origin+"/version/info",
                data: {commit:version,project:that.projectId},
                dataType: "json",
                withCredentials:true,
                success: function(data){
                    that.formTop.title = data[1].trim()
                    that.formTop.files = data[2].trim()
                    that.formTop.desc = data[0]
                }
            });
        },
        commitVervion(){
            if (confirm("填好了么？")) {
                let that = this
                this.jQuery.ajax({
                    type: "post",
                    url: location.origin+"/task/commit",
                    data: {
                        ProjectId:that.projectId,
                        Audit:0,
                        Title:that.formTop.title,
                        FileTransmissionMode:that.formTop.type,
                        FileList:that.formTop.files,
                        CommitId:that.versionModel
                        },
                    dataType: "json",
                    withCredentials:true,
                    success: function(data){
                        that.$router.push({
                            name:'task',
                            params:{
                                orderNum:"sfsd"
                            }
                        });
                    }
                });
            }
        },
        test(id){
            console.log(id)
        }
    },
    watch: {
        versionModel: function (val, oldVal) {
            this.getVersionInfo(val)
        }
    },
    data () {
        return {
            phone: 'apple',
            
            formTop: {
                title:'',
                files:'',
                desc:'',
                type:'2'
            },
            cityList: [
                {
                    value: 'MASTER',
                    label: 'MASTER'
                }
            ],
            branch: 'MASTER',
            versionModel: 'version',
            versionList:[],
            projectId:''
        }
    }
}
</script>
