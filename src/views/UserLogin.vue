<template>
    <Row>
        <Col span="4" offset="9">
        <Card style="width:350px;margin-top:300px;">
            <p slot="title">
                <Icon type="ios-body-outline"></Icon>
                登陆
            </p>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
        </Card>
        </Col>
    </Row>
</template>
<style>

</style>

<script>
import $ from 'jquery'

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
        methods: {
            handleSubmit(name) {
                let that = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: "post",
                            url: location.origin+"/user/login",
                            // url: "http://127.0.0.1:8088"+"/user/login",
                            data: {Username:"吴洋", PasswordHash:"w123123"},
                            dataType: "json",
                            withCredentials:true,
                            success: function(data){
                                console.log(data)
                                that.$router.push({
                                    name:'task',
                                    params:{
                                        orderNum:"sfsd"
                                    }
                                });
                            }
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
