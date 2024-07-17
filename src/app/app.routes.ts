import { Routes } from '@angular/router';
import { DefaultComponent } from './shared/components/layouts/default/default.component';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './shared/components/layouts/master/master.component';
import { TodoComponent } from './pages/todo/todo.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // guest
    {
        path: '',
        component: DefaultComponent,
        canActivate: [guestGuard],
        children: [
            {
                path: '', component: LoginComponent
            }
        ]
    },
    // secured
    {
        path: '',
        component: MasterComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'todo', component: TodoComponent
            }
        ]
    },
];
