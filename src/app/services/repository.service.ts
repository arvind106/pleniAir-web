import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { config } from '../constant';
import { CommonService } from './common.service';
import { ConfirmationService } from '../../../node_modules/primeng/components/common/api';
import { async } from 'q';





@Injectable()
export class RepositoryService {


    constructor(public apiService: ApiServiceService, public common: CommonService, public confirmationService: ConfirmationService) { }


    /*get dashboard data */
    async getDashboardData (){
        const response = await this.apiService.get(config.API_URL + config.COMMON + config.GET_PIE_CHART);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {
            return null;
        }
    }
    /* get all faqs*/
    async getFaq(data) {
        const faqs = await this.apiService.post(config.API_URL + config.QUERYEXE + config.FAQ,data);
        const result = JSON.parse(JSON.stringify(faqs));
        if (!result.is_error) {
            return result.data;
        } else {
            return null;
        }
    }

    /* add faq*/
    async addFaq(data) {
        const response = await this.apiService.put(config.API_URL + config.QUERY + config.FAQ, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess(" FAQ Added successfully.");
            return result.data;
        }
        else {
            this.common.showError("FAQ not Added");
            return null;
        }

    }
    /* get Faq by Id */
    async getFaqbyId(id) {
        const response = await this.apiService.get(config.API_URL + config.QUERY + config.FAQ + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {
            return null;
        }

    }
    /* Update FAQ */
    async editFaq(data, id) {
        const response = await this.apiService.post(config.API_URL + config.QUERY + config.FAQ + id, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess(" FAQ Updated.");
            return result.data;
        } else {
            this.common.showError("FAQ not Updated");
            return null;
        }

    }

    /* Delete FAQ */

    async deleteFaq(id) {
        const response = await this.apiService.delete(config.API_URL + config.QUERY + config.DELETEFAQ + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("Faq Deleted");
            return result.data;
        } else {
            this.common.showError("Faq Not Deleted");
            return null;
        }
    }
    /* get admin data by Id */
    async GetDataByID(ID) {
        const response = await this.apiService.get(config.API_URL + config.COMMON + config.GET_BY_ID + '?id=' + ID);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data.existingUser;
        } else {            
            return null;
        }
    }

    /* Update Admin*/
    async UpdateData(formdata) {
        const response = await this.apiService.post1(config.API_URL + config.COMMON + config.UPDATE, formdata);
        const result = JSON.parse(JSON.stringify(response));
        if (result.is_error) {
            this.common.showError("Profile Not updated");
            return null;
        } else {
            this.common.showSuccess("Profile Updated");
            return result.data;
        }
    }
    /* Add About Us*/
    async SaveAboutUs(data) {
        const response = await this.apiService.post(config.API_URL + config.COMMON + config.ADD_ABOUT, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("About Us Updated");
            return result.data;
        }
        else {
            this.common.showError("About Us Not Updated");
            return null;
        }
    }
    /* Add Privacy Policy */
    async SavePrivacyPolicy(data) {
        const response = await this.apiService.post(config.API_URL + config.COMMON + config.ADD_PRIVACY, data)
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("Privacy Policy Updated");
            return result.data;
        } else {
            this.common.showError("Privacy Policy Not Updated");
            return null;
        }
    }

    /* Add terms And condition*/
    async SaveTerms(data) {
        const response = await this.apiService.post(config.API_URL + config.COMMON + config.ADD_TERMS, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("Terms & Conditions Updated");
            return result.data;
        } else {
            this.common.showError("Terms & Conditions Not Updated");
            return null;
        }
    }

    /* get About us , Privacy Policy and Terms & Condition */
    async getQueryData(data) {
        const response = await this.apiService.post(config.API_URL + config.QUERYEXE + config.ABOUT, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            const objData = result.data;
            return objData;
        } else {
            return null;
        }
    }
    /*get Contact list */
    async getContacts(data) {
        const response = await this.apiService.post(config.API_URL + config.QUERYEXE + config.CONTACT,data);
        const result = JSON.parse(JSON.stringify(response));
        const Data = result.data;
        if (!result.is_error)
            return Data;
        else {            
            return null;
        }
    }
    /*get Pop by ID */
    async GetPopbyId(id) {
        const response = await this.apiService.get(config.API_URL + config.QUERY + config.POP + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {
            return null;
        }
    }

    /* get Session by Id */
    async GetSessionbyId(id) {
        const response = await this.apiService.get(config.API_URL + config.QUERY + config.SESSION + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }

    }

    /*add announcement */
    async addAnnouncement(data) {
        const resposne = await this.apiService.addannouncement(config.API_URL + config.QUERY + config.IMAGE + config.ANNOUNCE, data);
        const result = JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            this.common.showSuccess("Announcement Added");
            return result.data;
        }
        else {
            this.common.showError("Announcement Not Added");
            return null;
        }

    }
    /* get announcement byId */
    async getAnnoucement(id) {
        const response = await this.apiService.get(config.API_URL + config.QUERY + config.ANNOUNCE + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }

    }
    /*delete Announcement */
    async deleteAnnouncement(id) {
        const resposne = await this.apiService.delete(config.API_URL + config.QUERY + config.SOFT + config.ANNOUNCE + id);
        const result = JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            this.common.showSuccess("Announcement Deleted");
            return result.data;
        }else {            
            return null;
        }
    }
    /*Update Announcement */
    async editAnnouncement(data, id) {
        const response = await this.apiService.post1(config.API_URL + config.QUERY + config.UPDATES + config.ANNOUNCE+id, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("Announcement Updated.");
            return result.data;
        } else {
            this.common.showError("Announcement Not Updated.");
            return null;
        }
    }

    /*delete session */

    async deletesession(id) {
        const resposne = await this.apiService.delete(config.API_URL + config.SESSIONS + config.DELETE + id);
        const result = JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            return result;
        } else {
            this.common.showError(result.message);
            return null;
        }

    }
    /*delete POP */
    async deletePop(id) {
        const response = await this.apiService.delete(config.API_URL + config.POPS + config.DELETE + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result
        } else {
         
            return null;
        }
    }

    /*update Session */
    async updateSession(id, data) {
    const response = await this.apiService.post1(config.API_URL +config.SESSIONS + config.UPDATES + id, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("New PleinAir session Updated");
            return result.data;
        } else {
            this.common.showError("New PleinAir session Not Updated");
            return null;
        }

    }
    /* update pop */
    async updatePop(id, data) {
        const response = await this.apiService.post1(config.API_URL + config.POPS + config.UPDATES + id, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("New PleinAir Location Updated");
            return result.data;
        } else {
            this.common.showError("New PleinAir Location Not Updated");
            return null;
        }
    }
    /*get currency */
    async getAllCurrency() {
        const response = await this.apiService.get(config.API_URL + config.QUERY + config.CURRENCY);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {
        
            return null;
        }
    }
    /*add cuurency */
    async addCurrency(data) {
        const response = await this.apiService.put(config.API_URL + config.QUERY + config.CURRENCY, data);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            this.common.showSuccess("Currency Added");
            return result.data;
        } else {            
            return null;
        }
    }
    /*delete currency */
    async deleteCurrency(id) {
        const response = await this.apiService.delete(config.API_URL + config.QUERY + config.SOFT + config.CURRENCY + id);
        const result = JSON.parse(JSON.stringify(response));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }

    }
    /*get user for favourite session */
    async getUserforFavSession(data){
        const resposne = await this.apiService.get(config.API_URL + config.SESSIONS + config.USER_FAV_SESSION);
        const result= JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }

    }
    async GetUserFavPOP(){
        const resposne = await this.apiService.get(config.API_URL + config.POPS + config.USER_FAV_POP);
        const result= JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }

    }
    /*get user for booking and cancel booking*/
    async getBookingUser(data){
        const resposne = await this.apiService.post(config.API_URL + config.SESSIONS + config.USER_BOOK,data);
        const result= JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }
    }
    /*get booking details */
    async getBookings(data){
        const resposne = await this.apiService.post(config.API_URL + config.QUERYEXE + config.BOOK,data);
        const result= JSON.parse(JSON.stringify(resposne));
        if (!result.is_error) {
            return result.data;
        } else {            
            return null;
        }
    }
        /* get payment details */
        async getpayment (data){
            const response = await this.apiService.post(config.API_URL + config.QUERYEXE + config.PAYMENT,data);
            const result = JSON.parse(JSON.stringify(response));
            if (!result.is_error) {
                return result.data;
            } else {            
                return null;
            }
        }
    }
   


