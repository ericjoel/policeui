import { IAddresResponse } from "./IAddressResponse";

export interface IPoliceResponse {
    Id: string;
    Address: IAddresResponse;
    StartDate: Date;
    EndDate: Date;
}