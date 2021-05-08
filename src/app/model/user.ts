export class User {
    id: number;
    name: string;
    email: string;
    confirmPassword: string;
    hashedPassword : string;
    role : string;
   
    salt : string;
    facebook : string;
    google : string;
    device : {
        device_type : string;
        device_token : string
        
    };
    is_deleted : boolean
    photo: string;

    create_date: Date;
    last_updated: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

