import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class GitHubService {
    private userName : string;
    private clientId: string ='c91bc36eb32c008980b2';
    private clientSecret: string ='a5b4592bca22af899331ec598a53a6fc04cbe585';

    constructor(private _http:Http){
        this.userName = '';
    }

    getUser(){
        if(this.userName){
            return this._http.get('http://api.github.com/search/users/' + this.userName
        + '?client_id=' + this.clientId 
        + ' &client_secret=' + this.clientSecret).map(res => res.json().catch(this.handleError))
        }
    }

    getRepos(){
        if(this.userName){
            return this._http.get('http://api.github.com/users/' + this.userName
        +'/repos?client_id=' + this.clientId
        + '&client_secret=' + this.clientSecret)
        .map(res => res.json())
        .catch(this.handleError)
        }
    }

    updateUser(userName:string){
           this.userName = userName
    }

    private handleError(error:any){
        if (error.status === 401) {
            return Observable.throw(error.status);
        } else {
            return Observable.throw(error.status || 'Server error');
        }
    }
}
