declare class HandyStoragePromise<T> {
    then: (state: T) => void;
    catch: (error: string) => void;
}

declare class HandyStorage<T = any> {
    new (path: string, options?: {beautify?: boolean, autoSave?: boolean});
    connect (path: string): HandyStorage;
    setState (changes: T): HandyStoragePromise<T>;
    save (options?: {sync?: boolean}): HandyStoragePromise<T>;
}

declare module 'handy-storage' {
    export default HandyStorage;
}