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
import { ApiProfesseursGetCollection200Response } from '../model/apiProfesseursGetCollection200Response';
// @ts-ignore
import { ProfesseurJsonldRead } from '../model/professeurJsonldRead';
// @ts-ignore
import { ProfesseurJsonldWrite } from '../model/professeurJsonldWrite';
// @ts-ignore
import { ProfesseurRead } from '../model/professeurRead';
// @ts-ignore
import { ProfesseurWrite } from '../model/professeurWrite';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

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
     * Retrieves the collection of Professeur resources.
     * Retrieves the collection of Professeur resources.
     * @param page The collection page number
     * @param email 
     * @param email2 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiProfesseursGetCollection(page?: number, email?: string, email2?: Array<string>, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<ApiProfesseursGetCollection200Response>;
    public apiProfesseursGetCollection(page?: number, email?: string, email2?: Array<string>, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<HttpResponse<ApiProfesseursGetCollection200Response>>;
    public apiProfesseursGetCollection(page?: number, email?: string, email2?: Array<string>, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<HttpEvent<ApiProfesseursGetCollection200Response>>;
    public apiProfesseursGetCollection(page?: number, email?: string, email2?: Array<string>, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (email !== undefined && email !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>email, 'email');
        }
        if (email2) {
            email2.forEach((element) => {
                localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                  <any>element, 'email[]');
            })
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (JWT) required
        localVarCredential = this.configuration.lookupCredential('JWT');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json'
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

        let localVarPath = `/professeurs`;
        return this.httpClient.request<ApiProfesseursGetCollection200Response>('get', `${this.configuration.basePath}${localVarPath}`,
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
     * Retrieves a Professeur resource.
     * Retrieves a Professeur resource.
     * @param id Professeur identifier
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiProfesseursIdGet(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<ProfesseurJsonldRead>;
    public apiProfesseursIdGet(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<HttpResponse<ProfesseurJsonldRead>>;
    public apiProfesseursIdGet(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<HttpEvent<ProfesseurJsonldRead>>;
    public apiProfesseursIdGet(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiProfesseursIdGet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (JWT) required
        localVarCredential = this.configuration.lookupCredential('JWT');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json'
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

        let localVarPath = `/professeurs/${this.configuration.encodeParam({name: "id", value: id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<ProfesseurJsonldRead>('get', `${this.configuration.basePath}${localVarPath}`,
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
     * Creates a Professeur resource.
     * Creates a Professeur resource.
     * @param professeurJsonldWrite The new Professeur resource
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiProfesseursPost(professeurJsonldWrite: ProfesseurJsonldWrite, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<ProfesseurJsonldRead>;
    public apiProfesseursPost(professeurJsonldWrite: ProfesseurJsonldWrite, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<HttpResponse<ProfesseurJsonldRead>>;
    public apiProfesseursPost(professeurJsonldWrite: ProfesseurJsonldWrite, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<HttpEvent<ProfesseurJsonldRead>>;
    public apiProfesseursPost(professeurJsonldWrite: ProfesseurJsonldWrite, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/ld+json' | 'application/json', context?: HttpContext}): Observable<any> {
        if (professeurJsonldWrite === null || professeurJsonldWrite === undefined) {
            throw new Error('Required parameter professeurJsonldWrite was null or undefined when calling apiProfesseursPost.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (JWT) required
        localVarCredential = this.configuration.lookupCredential('JWT');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/ld+json',
                'application/json'
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
            'application/json'
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

        let localVarPath = `/professeurs`;
        return this.httpClient.request<ProfesseurJsonldRead>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: professeurJsonldWrite,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
