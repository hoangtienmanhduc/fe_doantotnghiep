import EventEmitter from 'eventemitter3';

export const notificationEvent = new EventEmitter();

export function showNotification(severity, summary, detail) {
    notificationEvent.emit('NOTIFY', { severity, summary, detail });
}

export function hideNotification() {
    notificationEvent.emit('HIDE-NOTIFICATION');
}

export function showUserNotification(message) {
    notificationEvent.emit('USER_NOTIFICATION', message);
}
