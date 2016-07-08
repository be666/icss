let {Vue} = require("./common");
let VueResource = require('vue-resource');

let VueRouter = require('vue-router');
//main
let icss = require('./less/main.less');

Vue.use(VueRouter);
Vue.use(VueResource);

let App = Vue.extend({
  events: {
    link: function (pathName, params) {
      router.go({
        name: pathName,
        params: params || {}
      })
    }
  }
});

let router = new VueRouter();
router.map({
  '/': {
    name: "root",
    component: require("./layout/root.vue"),
    subRoutes: {
      "/": {
        component: require("./layout/app.vue"),
        subRoutes: {
          "home": {
            name: "home",
            component: require("./pages/home.vue")
          },
          "table-server": {
            name: "table-server",
            component: require("./pages/server-table.vue")
          },
          "form": {
            name: "form",
            component: require("./pages/form.vue")
          },
          "avatar": {
            name: "avatar",
            component: require("./pages/avatar.vue")
          }
        }
      }
    }
  }
});

router.redirect({
  "/": "/home"
});

router.beforeEach(function (transition) {
  transition.next();
});

router.start(App, 'body');
