import { Toast } from 'primereact/toast';
import { useCallback, useEffect, useRef } from 'react';
import { notificationEvent } from './NotificationService';

const Notification = () => {
    const toastRef = useRef(null);
    const showNotification = useCallback(({ severity, summary, detail }) => {
        toastRef?.current?.show({ severity, summary, detail });
    }, []);

    const hideNotification = useCallback(() => {
        toastRef?.current?.clear();
    }, []);

    useEffect(() => {
        notificationEvent.on('NOTIFY', (severity, summary, detail) => showNotification(severity, summary, detail));
        notificationEvent.on('HIDE-NOTIFICATION', hideNotification);

        return () => {
            notificationEvent.removeListener('NOTIFY', hideNotification);
            notificationEvent.removeListener('HIDE-NOTIFICATION', hideNotification);
        };
    }, [hideNotification, showNotification]);

    return <Toast ref={toastRef} baseZIndex={4070} className="p-3" />;
};

export default Notification;
