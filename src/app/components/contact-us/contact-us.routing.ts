import { Routes } from '@angular/router';

import { ContactUsComponent } from '../../components/contact-us/contact-us.component';
export const ContactUsRoutes: Routes = [
    {
        path: '',
        component :ContactUsComponent,
        data: {
            breadcrumb: 'Contact Us',
            status: true
        },
        // children: [
        //     {
        //         path: 'add-contact-us',
        //         component: AddContactUsComponent,
        //         data: {
        //             breadcrumb: ' Contact',
        //             status: true
        //         }
        //     },
            
        // ]
    }
];
