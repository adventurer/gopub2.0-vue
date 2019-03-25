<template>
        <Row style="margin-bottom:60px;">
            <Col span="22" offset="1">
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        新建项目
                    </p>
                    <Row>
                        <Form ref="formInline" :model="formInline" :rules="ruleInline">
                            <Col span="6">
                                <FormItem label="名称">
                                <Input v-model="formInline.Name"></Input>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="环境">
                                    <Input v-model="formInline.Level"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="git地址">
                                    <Input v-model="formInline.RepoUrl"></Input>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="本地仓库">
                                <Input v-model="formInline.DeployFrom"></Input>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="远程仓库">
                                    <Input v-model="formInline.ReleaseLibrary"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="远程部署">
                                    <Input v-model="formInline.ReleaseTo"></Input>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="发布用户">
                                <Input v-model="formInline.ReleaseUser"></Input>
                                </FormItem>
                            </Col>
                            <Col span="2" offset="1">
                                <FormItem label="审核">
                                    <i-switch size="large">
                                        <span slot="open">ON</span>
                                        <span slot="close">OFF</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span="2">
                                <FormItem label="状态">
                                    <i-switch size="large">
                                        <span slot="open">ON</span>
                                        <span slot="close">OFF</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span="2">
                                <FormItem label="ssh">
                                    <Button type="primary">测试</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="机器列表">
                                    <Input type="textarea" v-model="formInline.input3"></Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="发布后任务">
                                    <Input type="textarea" :rows="8" v-model="formInline.input3"></Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem>
                                    <Button type="primary">提交</Button>
                                    <Button style="margin-left: 8px">取消</Button>
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </Card>
            </Col>
        </Row>
</template>
<style>
#form .ivu-col{
    padding: 0 2px;
}
</style>


<script>
export default {
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    },
}
</script>