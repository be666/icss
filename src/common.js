'use strict';
let Vue = require('vue');
let VueViewComponents = require('vue-view-components');

//layout
VueViewComponents.register('rolling-panel', require('./components/rollingPanel.vue'));
Vue.use(VueViewComponents());
//component

//directive


//filter
export {Vue};

