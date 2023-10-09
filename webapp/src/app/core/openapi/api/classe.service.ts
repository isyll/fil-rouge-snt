/**
 * Fil rouge SNT
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { ApiClassesGetCollection200Response } from '../model/apiClassesGetCollection200Response';
// @ts-ignore
import { ClasseJsonldRead } from '../model/classeJsonldRead';
// @ts-ignore
import { ClasseJsonldWrite } from '../model/classeJsonldWrite';
// @ts-ignore
import { ClasseRead } from '../model/classeRead';
// @ts-ignore
import { ClasseWrite } from '../model/classeWrite';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class ClasseService {

    protected basePath = 'http://fil-rouge-snt';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substring(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Retrieves the collection of Classe resources.
     * Retrieves the collection of Classe resources.
     * @param page The collection page number
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClassesGetCollection(page?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<ApiClassesGetCollection200Response>;
    public apiClassesGetCollection(page?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpResponse<ApiClassesGetCollection200Response>>;
    public apiClassesGetCollection(page?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpEvent<ApiClassesGetCollection200Response>>;
    public apiClassesGetCollection(page?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json',
                'text/html'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/classes`;
        return this.httpClient.request<ApiClassesGetCollection200Response>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves a Classe resource.
     * Retrieves a Classe resource.
     * @param id Classe identifier
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClassesIdGet(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<ClasseJsonldRead>;
    public apiClassesIdGet(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpResponse<ClasseJsonldRead>>;
    public apiClassesIdGet(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpEvent<ClasseJsonldRead>>;
    public apiClassesIdGet(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiClassesIdGet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json',
                'text/html'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/classes/${this.configuration.encodeParam({name: "id", value: id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<ClasseJsonldRead>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Replaces the Classe resource.
     * Replaces the Classe resource.
     * @param id Classe identifier
     * @param classeJsonldWrite The updated Classe resource
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClassesIdPut(id: string, classeJsonldWrite: ClasseJsonldWrite, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<ClasseJsonldRead>;
    public apiClassesIdPut(id: string, classeJsonldWrite: ClasseJsonldWrite, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpResponse<ClasseJsonldRead>>;
    public apiClassesIdPut(id: string, classeJsonldWrite: ClasseJsonldWrite, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpEvent<ClasseJsonldRead>>;
    public apiClassesIdPut(id: string, classeJsonldWrite: ClasseJsonldWrite, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiClassesIdPut.');
        }
        if (classeJsonldWrite === null || classeJsonldWrite === undefined) {
            throw new Error('Required parameter classeJsonldWrite was null or undefined when calling apiClassesIdPut.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json',
                'text/html'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/ld+json',
            'application/json',
            'text/html'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/classes/${this.configuration.encodeParam({name: "id", value: id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<ClasseJsonldRead>('put', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: classeJsonldWrite,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a Classe resource.
     * Creates a Classe resource.
     * @param classeJsonldWrite The new Classe resource
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClassesPost(classeJsonldWrite: ClasseJsonldWrite, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<ClasseJsonldRead>;
    public apiClassesPost(classeJsonldWrite: ClasseJsonldWrite, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpResponse<ClasseJsonldRead>>;
    public apiClassesPost(classeJsonldWrite: ClasseJsonldWrite, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<HttpEvent<ClasseJsonldRead>>;
    public apiClassesPost(classeJsonldWrite: ClasseJsonldWrite, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json' | 'text/html', context?: HttpContext}): Observable<any> {
        if (classeJsonldWrite === null || classeJsonldWrite === undefined) {
            throw new Error('Required parameter classeJsonldWrite was null or undefined when calling apiClassesPost.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json',
                'text/html'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/ld+json',
            'application/json',
            'text/html'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/classes`;
        return this.httpClient.request<ClasseJsonldRead>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: classeJsonldWrite,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}