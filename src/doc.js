let {Vue} = require("./common");
let VueRouter = require('vue-router');
//main
let icss=require('./less/main.less');

Vue.use(VueRouter);


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
          "form": {
            name: "form",
            component: require("./pages/form.vue")
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
  let $this = transition.to.router.app;
  return transition.next();
  if ($this.$tools.inArray($this.$auth.ignore, transition.to.path)) {
    transition.next()
  } else {
    $this.$auth.valid($this, function () {
      transition.next();
    }, function () {
      transition.redirect("/login")
    });
  }
});

router.start(App, 'body');
