import { ANDROID, IOS, RESULTS } from './constants';
declare type Values<T extends object> = T[keyof T];
export declare type AndroidPermission = Values<typeof ANDROID>;
export declare type IOSPermission = Values<typeof IOS>;
export declare type Permission = AndroidPermission | IOSPermission;
export declare type PermissionStatus = Values<typeof RESULTS>;
export declare type NotificationOption = 'alert' | 'badge' | 'sound' | 'criticalAlert' | 'carPlay' | 'provisional';
export interface NotificationSettings {
    alert?: boolean;
    badge?: boolean;
    sound?: boolean;
    lockScreen?: boolean;
    carPlay?: boolean;
    notificationCenter?: boolean;
    criticalAlert?: boolean;
}
export interface NotificationsResponse {
    status: PermissionStatus;
    settings: NotificationSettings;
}
export {};
