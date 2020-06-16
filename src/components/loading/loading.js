import Loading from './Loading.vue';

function install(Vue, options = {}) {
  const LoadingCtor = Vue.extend(Loading);
  const instance = new LoadingCtor({
    propsData: { show: false, color: options.color || '#009bff' },
  });
  const tpl = instance.$mount().$el;
  document.body.appendChild(tpl);

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$loading = {
    show() {
      instance.show = true;
    },
    hide() {
      instance.show = false;
    },
  };
}

export default install;
