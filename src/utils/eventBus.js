// Minimal in-app event bus replacing the abandoned `react-native-event-listeners`
// package (last published 2022, unmaintained, declares outdated React peer deps).
// Keeps the exact API the app already uses:
//   EventRegister.addEventListener(name, cb)  -> listener id
//   EventRegister.removeEventListener(id)     -> remove by id
//   EventRegister.removeEventListener(name)   -> remove all listeners of an event
//   EventRegister.emit(name, data)
const listenersByEvent = new Map();
let nextId = 1;

export const EventRegister = {
  addEventListener(event, callback) {
    const id = `evt_${nextId++}`;
    if (!listenersByEvent.has(event)) listenersByEvent.set(event, new Map());
    listenersByEvent.get(event).set(id, callback);
    return id;
  },
  removeEventListener(idOrEvent) {
    if (listenersByEvent.delete(idOrEvent)) return true;
    for (const listeners of listenersByEvent.values()) {
      if (listeners.delete(idOrEvent)) return true;
    }
    return false;
  },
  removeAllListeners() {
    listenersByEvent.clear();
  },
  emit(event, data) {
    const listeners = listenersByEvent.get(event);
    if (!listeners) return;
    for (const callback of [...listeners.values()]) {
      callback(data);
    }
  },
};

export default EventRegister;
