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
import { ClasseJsonldRead } from './classeJsonldRead';
import { AnneeScolaireJsonldItemReadContext } from './anneeScolaireJsonldItemReadContext';


/**
 * 
 */
export interface NiveauJsonldRead { 
    context?: AnneeScolaireJsonldItemReadContext;
    readonly id?: string;
    readonly type?: string;
    libelle: string;
    classes?: Array<ClasseJsonldRead>;
}

