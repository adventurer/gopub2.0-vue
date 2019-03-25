<template>
  <div class="body">
    <Row>
        <Menu mode="horizontal" active-name="" width="auto">
            <MenuItem name="1" to="/">
                <Icon type="md-desktop" />
                首页
            </MenuItem>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-list" />
                    上线单
                </template>
                <MenuGroup title="上线单">
                    <MenuItem name="2-0" to="/newtask">新建上线单</MenuItem>
                    <MenuItem name="2-1" to="/task">我的上线单</MenuItem>
                    <MenuItem name="2-2">上线单管理</MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-list" />
                    项目
                </template>
                <MenuGroup title="项目">
                    <MenuItem name="3-0" to="/project">项目列表</MenuItem>
                    <MenuItem name="3-1" to="/project/new">新建项目</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="4" to="/about">
                <Icon type="ios-paper-outline" />
                文件检查
            </MenuItem>
            <MenuItem name="5" to="/about">
                <Icon type="ios-people-outline" />
                人员管理
            </MenuItem>
            <MenuItem name="6" to="/login">
                <Icon type="ios-people-outline" />
                人员管理
            </MenuItem>
        </Menu>
    </Row>
    <router-view/>
    <template v-if="this.$route.name=='task'">
    </template>
  </div>
</template>
<style>
.body{
    height: 100vh;
}
</style>
<script>

export default {
  name: 'root',
  components: {

  }
}
</script>

