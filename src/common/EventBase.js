export default class EventBase {
  constructor() {
    this.handlers = {};
  }

  on(eventName, handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  emit(eventName, ...args) {
    const handlers = this.handlers[eventName];
    if (!handlers || !Array.isArray(handlers)) {
      return;
    }

    handlers.forEach((handler) => {
      handler(...args);
    });
  }
}
