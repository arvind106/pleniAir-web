import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
@Injectable()
export class AuthServiceService {

  constructor( public route :Router) { }
  setToekn (token:string){
    localStorage.setItem("token",token)
  }
  getToken(){
    return localStorage.getItem("token")
  }

  isLoggednIn(){
    return this.getToken() !== null
  }
}
