import { Injectable } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { CommonService } from '../services/common.service';
import { config } from '../constant';
import {MessageService} from 'primeng/components/common/messageservice';




@Injectable()
export class UserService {
    public subcategoryArray: any = [];
    public userArray: any = [];
    constructor(
        public apiService: ApiServiceService,
        public common: CommonService,
        private messageService: MessageService,
    ) { }
/*get user by id */
async getUserbyId(id){
    const response = await this.apiService.get(config.API_URL + config.QUERY + config.US + id);
    const result = JSON.parse(JSON.stringify(response));
    if(!result.is_error){
        return result.data;
    } else {
        this.common.showError(result.message);
        return null;
    }
}

    /* get User List */
    async GetUserData() {
        const users = await this.apiService.get(config.API_URL + config.QUERY + config.USER);
        const result = JSON.parse(JSON.stringify(users));
        if(!result.is_error){
            return result.data;
        }
        else{
            return null;
        }
    }
/* block and unblock user */
async blockUnblockUser(data,id)
{    const response = await this.apiService.post(config.API_URL + config.QUERY + config.US + id ,data);
       return response;      
}
/*delete User */
async deleteuser(id){
    const response = await this.apiService.delete(config.API_URL + config.QUERY + config.SOFT + config.US + id);
    const result =JSON.parse(JSON.stringify(response));
    if(!result.is_error){
        this.common.showSuccess("User Deleted");
       return result.data;
    }else{
        this.common.showError("User Not deleted");
        return null
    }
}
    /*set Login Data*/
    setLoginData(userData) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('username', userData.foundUser.name);
        localStorage.setItem('email', userData.foundUser.email);
        localStorage.setItem('userId', userData.foundUser.id);
        return;
    }
    /* Change Password*/
    async changePassword(data) {
        const Data = JSON.stringify(data);
        const response = await this.apiService.changepassword(config.API_URL + config.COMMON + config.CHANGE_PWD, Data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            
           this.common.showSuccess("Password Changed");
            return result.data;
        }
     else if(result.message === "Please enter correct old password.") {
        
         this.common.showError(result.message);
            return null;
        }
        else {
              this.common.showError("Password Not Changed");
            return null;
        }

    }
    /*Login */
    async login(loginData) {
        this.common.showLoader();
        const response = await this.apiService.post_without_cache(config.API_URL + config.COMMON + config.LOGIN, loginData);
        const result = JSON.parse(JSON.stringify(response));
        this.common.dismissLoader();
        if (result.data === 'Login Failed') {
            this.common.showError("Please Enter Valid Email id or Password");
            return null;
        }
        if(result.is_error){
            this.common.showError(result.message);
            return null;
        }
        if (!result.is_error) {
            if(result.data && result.data.token && result.data.foundUser){
                this.setLoginData(result.data);
                const objUser = result.data.foundUser;
                this.common.showSuccess(result.message);
                return objUser;
            }else{
                this.common.showError(result.data);
                return null;
            }           
        } else {
            this.common.showError("Please Enter Valid Email and Password");
            return null;
        }
    }

    /* Forgot password */
    async ForgotPassword(changePwdData) {
        const response = await this.apiService.forgotpwd(config.API_URL + config.COMMON + config.RESETPWD, changePwdData);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {   
            this.common.showSuccess(result.message);
           return result.data;
        }else{
            this.common.showError(result.message);
            return null;
        }
    }
    /* get session List by Type*/
    async GetSessionDatabyType(Data) {
      const sessions = await this.apiService.post(config.API_URL + config.QUERYEXE + config.SESSION, Data);
      const result = JSON.parse(JSON.stringify(sessions));
        if(!result.is_error){
            return result.data;
        }else{
         
            return null;
        }
        
    }

    /* get POP list */
    async GetPopData(data) {
        const pops = await this.apiService.post(config.API_URL + config.QUERYEXE + config.POP,data);
        const result = JSON.parse(JSON.stringify(pops));
       if(!result.is_error){
        return result.data;
       }else{
     
           return null;
       }
    }

/* get Announcement List */
async getAnnouncment(data){
    const response = await this.apiService.post(config.API_URL + config.QUERYEXE + config.ANNOUNCE,data);
    const result = JSON.parse(JSON.stringify(response));
    if(!result.is_error){
        return result.data;
    }else{
        return null;
    }
}
/*get favourite Pop */
async getFavPop(data){
    const response = await this.apiService.post(config.API_URL + config.QUERYEXE + config.FAV_POP,data);
    const result = JSON.parse(JSON.stringify(response));
    if(!result.is_error){
        return result.data;
    }else{
        return null;
    }
}
/*get favourite session */
async getFavSession(data){
    const response = await this.apiService.post(config.API_URL + config.QUERYEXE + config.FAV_SESSION,data);
    const result = JSON.parse(JSON.stringify(response));
    if(!result.is_error){
        return result.data;
    }else{
        return null;
    }
}
}