import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { BookingComponent } from './components/booking/booking.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { CenterComponent } from './components/center/center.component';
import { SlotbookingComponent } from './components/slotbooking/slotbooking.component';
import { BookingSlotComponent } from './components/booking-slot/booking-slot.component';
import { AboutCenterComponent } from './components/about-center/about-center.component';
export const routes: Routes = [
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    /* {
        path:'book/:id/:name',
        component:BookingComponent,canActivate:[authGuard]
    }, */
    {
        path:'admin',
        component:AdminComponent,canActivate:[authGuard]
    },
    {
        path:'history',
        component:BookingHistoryComponent,canActivate:[authGuard]
    },
    {
        path:'center',
        component:CenterComponent,canActivate:[authGuard]
    },
    {
        path:'slot',
        component:SlotbookingComponent,canActivate:[authGuard]
    },
    {
        path:'booking/:timeslot/:date/:name',
        component:BookingSlotComponent,canActivate:[authGuard]
    },
    {
        path:'about/:id/:name',
        component:AboutCenterComponent
    }
];
