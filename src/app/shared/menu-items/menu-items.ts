import {Injectable} from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    target?: boolean;
    name: string;
    type?: string;
    children?: ChildrenItems[];
}

export interface MainMenuItems {
    state: string;
    main_state?: string;
    target?: boolean;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

export interface Menu {
    label: string;
    main: MainMenuItems[];
}

const MENUITEMS = [
    {
        label: 'Pleinair Painting',
        main: [
            {
                state: 'dashboard',
                name: 'Dashboard',
                type: 'link',
                icon: 'ti-home'
            },
           
              {
                state: 'sessions',
                name: 'New PleinAir session',
                type: 'link',
                icon: 'ti-layout-grid2-alt',
              },
              {
                state: 'pop',
                name: 'New PleinAir Location',
                type: 'link',
                icon: 'fa fa-list',
                
              },
              {
                state: 'users',
                name: 'Users',
                type: 'link',
                icon: 'fa fa-users',
               
              },
              {
                state: 'announcement',
                name: 'Public Announcement',
                type: 'link',
                icon: 'fa fa-bullhorn'
              },
              {
                state: 'favourite',
                name: 'Favourites',
                type: 'sub',
                icon: 'fa fa-heart',
                children: [
                    
                    {
                        state: 'fav-session',
                        name: 'New PleinAir session',
                    },
                    {
                        state: 'fav-pop',
                        name: 'New PleinAir Location',
                    },
                  ]
                },
              {
                state: 'booking',
                name: 'Bookings',
                type: 'sub',
                icon: 'fa fa-newspaper-o',
                children: [
                    
                    {
                        state: 'booking',
                        name: 'Booking',
                    }
                  ]
                },
              {
                state: 'manage',
                short_label: 'D',
                name: 'Manage',
                type: 'sub',
                icon: 'ti-list',
                children: [
                    
                    {
                        state: 'about-us',
                        name: 'About Us',
                    },
                    {
                        state: 'privacy-policy',
                        name: 'Privacy Policy',
                    },
                    {
                        state: 'terms-conditions',
                        name: 'Terms & Conditions',
                    },
                    {
                      state: 'faq',
                      name: 'FAQ',
                  },
                  {
                    state: 'contact-us',
                    name: 'Contact Us',
                  }
                ]
            },
            

              
           
             
        ]
    }
];

@Injectable()
export class MenuItems {
    getAll(): Menu[] {
        return MENUITEMS;
    }

    /*add(menu: Menu) {
      MENUITEMS.push(menu);
    }*/
}
