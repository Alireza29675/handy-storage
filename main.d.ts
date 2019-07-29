declare class HandyStoragePromise<T> {
    then: (state: T) => void;
    catch: (error: string) => void;
}

declare class HandyStorage<T = any> {
    new (path: string, options?: {beautify?: boolean, autoSave?: boolean}): HandyStorage;
    connect (path: string): HandyStorage;
    beautify: boolean;
    autoSave: boolean;
    setState (changes: T): HandyStoragePromise<T>;
    save (options?: {sync?: boolean}): HandyStoragePromise<T>;
}

declare module 'handy-storage' {
    export default HandyStorage;
}