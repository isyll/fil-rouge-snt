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


export interface AnneeScolaireJsonldReadContextOneOf { 
  [key: string]: any | any;


    vocab: string;
    hydra: AnneeScolaireJsonldReadContextOneOf.HydraEnum;
}
export namespace AnneeScolaireJsonldReadContextOneOf {
    export type HydraEnum = 'http://www.w3.org/ns/hydra/core#';
    export const HydraEnum = {
        HttpWwwW3OrgNsHydraCore: 'http://www.w3.org/ns/hydra/core#' as HydraEnum
    };
}


