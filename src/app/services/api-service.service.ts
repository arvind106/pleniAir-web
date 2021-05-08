import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiServiceService {
    image: any;
    token = localStorage.getItem('token');

    constructor(private http: HttpClient) {
    }

    createAuthorizationHeader() {
        this.token = localStorage.getItem('token');
        let Headers = new HttpHeaders();
        Headers = Headers.append('Content-Type', 'application/json');
        Headers = Headers.append('Authorization', this.token);
        return Headers;
    }
    public async get1(url) {
        this.token = localStorage.getItem('token');
        const headers = new HttpHeaders();
        headers.append('Authorization', this.token);
        const request = await this.http.get(url, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }
    public async get(url) {
        const header = this.createAuthorizationHeader();
        const request = await this.http.get(url, { headers: header }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async put(url, data) {
        const headers = this.createAuthorizationHeader();
        const request = await this.http.put(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }
  
    public async addannouncement(url, data) {
        this.token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);
        const request = await this.http.put(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async post(url, data) {
        const headers = this.createAuthorizationHeader();
        const request = await this.http.post(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }
    public async forgotpwd (url,data){
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const request = await this.http.post(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }
    public async post1(url, data) {
        this.token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);
        const request = await this.http.post(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async delete(url) {
        this.token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', this.token);
        const request = await this.http.delete(url, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    handleErrorObservable(error: Response | any) {
        var response = error.message || error;
        let responseJson = { is_error: true, message: response };
        return responseJson;
    }
    /* create header for change password */
    creatHeader() {
        let token = localStorage.getItem('token');
        let header: HttpHeaders = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        header = header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        return header;
    }
    /* change password API call */
    public async changepassword(url, data) {
        const headers = this.createAuthorizationHeader();
        const Data = data;
        const request = await this.http.post(url, Data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }
    /* update admin  */
    public async updateAdmin(url, data) {
        const request = await this.http.post(url, data).toPromise().catch(this.handleErrorObservable);
        return request;
    }

    public async post_without_cache(url, data) {
        const headers = this.creatHeader();
        const request = await this.http.post(url, data, { headers: headers }).toPromise().catch(this.handleErrorObservable);
        return request;
    }
}