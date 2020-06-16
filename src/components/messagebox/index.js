import { assign } from 'lodash-es';
import msgboxVue from './index.vue';

const WMessageBox = {};
WMessageBox.install = (Vue) => {
  const WMessageBoxInstance = Vue.extend(msgboxVue);
  let currentMsg;
  const initInstance = () => {
    currentMsg = new WMessageBoxInstance();
    const msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$msgBox = {
    showMsgBox(options) {
      if (!currentMsg) {
        initInstance();
      }
      if (typeof options === 'string') {
        currentMsg.content = options;
      } else if (typeof options === 'object') {
        assign(currentMsg, options);
      }
      return currentMsg
        .showMsgBox()
        .then((val) => {
          currentMsg = null;
          return Promise.resolve(val);
        })
        .catch((err) => {
          currentMsg = null;
          return Promise.reject(err);
        });
    },
  };
};
export default WMessageBox;
