import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Task from "./views/Task.vue";
import UserLogin from "./views/UserLogin.vue";
import NewTask from "./views/NewTask.vue";
import NewTaskDetail from "./views/NewTaskDetail.vue";
import Project from "./views/Project.vue";
import NewProject from "./views/NewProject.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/task",
      name: "task",
      component: Task
    },
    {
      path: "/newtask",
      name: "newtask",
      component: NewTask
    },
    {
      path: "/newtaskdetail",
      name: "newtaskdetail",
      component: NewTaskDetail
    },
    {
      path: "/project",
      name: "project",
      component: Project
    },
    {
      path: "/project/new",
      name: "newproject",
      component: NewProject
    },
    {
      path: "/login",
      name: "login",
      component: UserLogin
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
});
