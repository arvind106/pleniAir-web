import { Injectable, Optional } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { CommonService } from '../services/common.service';
import { config } from '../constant';

@Injectable()
export class CrudService {

    constructor(public common: CommonService, public app: ApiServiceService) {

    }

    async add(data, modelName) {

        const response = await this.app.post(config.API_URL + config.CONTACT, data);
        const result = JSON.parse(JSON.stringify(response));
        this.common.dismissLoader();
        if (!result.is_error) {
            const health = result;
            return health;
        } else {
            this.common.showError(result.message);
            return null;
        }
    }

    // async getList(modelName) {
    //     this.common.showLoader();
    //     const response = await this.app.getWithoutHeaderAPI(config.API_URL_COMMON + modelName);
    //     const result = JSON.parse(JSON.stringify(response));
    //     this.common.dismissLoader();
    //     if (!result.is_error) {
    //             return result.data;
    //     } else {
    //         this.common.showError(result.message);
    //         return null;
    //     }
    // }
    // async getListById(modelName, HealthId) {
    //     this.common.showLoader();
    //     const response = await this.app.getWitHeaderAPI(config.API_URL_COMMON + modelName + '/' + HealthId);
    //     const result = JSON.parse(JSON.stringify(response));
    //     this.common.dismissLoader();
    //     if (!result.is_error) {
    //         return result.data;
    //     } else {
    //         this.common.showError(result.message);
    //         return null;
    //     }
    // }
    // async Update(data, modelName, HealthId) {
    //     this.common.showLoader();
    //     const response = await this.app.postAPI(config.API_URL_COMMON + modelName + '/' + HealthId, data);
    //     const result = JSON.parse(JSON.stringify(response));
    //     this.common.dismissLoader();
    //     if (!result.is_error) {
    //         const health = new HealthCare(result);
    //         return health;
    //     } else {
    //         this.common.showError(result.message);
    //         return null;
    //     }
    // }
    // async Delete(modelName, HealthId) {
    //     this.common.showLoader();
    //     const response = await this.app.deleteAPI(config.API_URL_COMMON_DELETE + modelName + '/' + HealthId);
    //     const result = JSON.parse(JSON.stringify(response));
    //     this.common.showLoader();
    //     if (!result.is_error) {
    //         const health = new HealthCare(result);
    //         return health;
    //     } else {
    //         this.common.showError(result.message);
    //         return null ;
    //     }
    // }
}