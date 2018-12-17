import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    public requestHTTP(body: any, serviceURL: string): Observable<any> {

        let headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : '');

        const options = {
            headers: headers,
            withCredentials: false,
            responseType: 'json' as 'json',
            reportProgress: false,
            observe: 'response' as 'response'
        };

        return this.http.post(serviceURL, body, options);
    }

    public requestHTTPGet(serviceURL: string): Observable<any> {

        let headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : '');

        const options = {
            headers: headers,
            withCredentials: false,
            responseType: 'json' as 'json',
            reportProgress: false,
            observe: 'response' as 'response'
        };

        return this.http.get(serviceURL, options);
    }

}