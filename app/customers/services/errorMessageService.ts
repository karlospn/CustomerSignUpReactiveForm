import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map';


@Injectable()
export class errorMessageService 
{
    constructor(private http: Http) { }
    public load()
    {
        return this.http.request('./resources/error.message.json').map(res => res.json());
    }
}


