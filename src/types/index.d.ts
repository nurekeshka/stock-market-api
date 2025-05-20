import { Observable } from 'rxjs';

export declare type MaybeAsync<T> = T | Promise<T> | Observable<T>;

export declare type Optional<T> = T | undefined;
