import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, pluck, take } from 'rxjs/operators';

import { FeaturedFlags } from '@dotcms/dotcms-models';

@Injectable({
    providedIn: 'root'
})
export class DotPropertiesService {
    featureConfig: Record<string, string> | null = null;

    constructor(private readonly http: HttpClient) {}
    /**
     * Get the value of specific key
     * from the dotmarketing-config.properties
     *
     * @param string key
     * @returns {Observable<string>}
     * @memberof DotPropertiesService
     */
    getKey(key: string): Observable<string> {
        if (this.featureConfig?.[key]) {
            return of(this.featureConfig[key]);
        }

        return this.http
            .get('/api/v1/configuration/config', { params: { keys: key } })
            .pipe(take(1), pluck('entity', key));
    }

    /**
     * Get the values of specific keys
     * from the dotmarketing-config.properties
     *
     * @param string[] keys
     * @returns {Observable<Record<string, string>>}
     * @memberof DotPropertiesService
     */
    getKeys(keys: string[]): Observable<Record<string, string>> {
        if (this.featureConfig) {
            const missingKeys = keys.filter((key) => !(key in (this.featureConfig || {})));
            if (missingKeys.length === 0) {
                return of(this.featureConfig);
            }
        }

        return this.http
            .get('/api/v1/configuration/config', { params: { keys: keys.join() } })
            .pipe(take(1), pluck('entity'));
    }

    /**
     * Get the value of specific key as a list
     * from the dotmarketing-config.properties
     *
     * @param string key
     * @returns {Observable<string[]>}
     * @memberof DotPropertiesService
     */
    getKeyAsList(key: string): Observable<string[]> {
        return this.http
            .get('/api/v1/configuration/config', { params: { keys: `list:${key}` } })
            .pipe(take(1), pluck('entity', key));
    }

    /**
     * Get the value of specific feature flag
     *
     * @param {string} key
     * @return {*}  {Observable<boolean>}
     * @memberof DotPropertiesService
     */
    getFeatureFlag(key: string): Observable<boolean> {
        return this.getKey(key).pipe(map((value) => value === 'true'));
    }

    /**
     * Get the values of specific feature flags
     *
     * @param {string[]} keys
     * @return {*}  {Observable<Record<string, boolean>>}
     * @memberof DotPropertiesService
     */
    getFeatureFlags(keys: string[]): Observable<Record<string, boolean>> {
        return this.getKeys(keys).pipe(
            map((flags) => {
                return Object.keys(flags).reduce((acc, key) => {
                    acc[key] = flags[key] === 'true';

                    return acc;
                }, {} as Record<string, boolean>);
            })
        );
    }

    /**
     * Loads the configuration for the feature flags by calling the `getKeys` method and subscribing to the result.
     * @returns An observable that emits the feature configuration object.
     */
    loadConfig() {
        this.getKeys(Object.values(FeaturedFlags)).subscribe({
            next: (res) => {
                this.featureConfig = res;
            }
        });
    }
}
