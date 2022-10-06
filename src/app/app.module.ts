import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {DataTablesModule} from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalConfigModule} from '@modules/dialog/modal-config.module';
import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {GoodsManageComponent} from './pages/goods-manage/goods-manage.component';
import {GoodsAddComponent} from './pages/goods-manage/goods-add/goods-add.component';
import {GoodsEditComponent} from './pages/goods-manage/goods-edit/goods-edit.component';
import {GoodsTypeManageComponent} from './pages/goods-type-manage/goods-type-manage.component';
import {GoodsTypeAddComponent} from './pages/goods-type-manage/goods-type-add/goods-type-add.component';
import {GoodsTypeEditComponent} from './pages/goods-type-manage/goods-type-edit/goods-type-edit.component';
import {JobManageComponent} from './pages/job-manage/job-manage.component';
import {JobAddComponent} from './pages/job-manage/job-add/job-add.component';
import {JobEditComponent} from './pages/job-manage/job-edit/job-edit.component';
import {WorkItemManageComponent} from './pages/work-item-manage/work-item-manage.component';

defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        GoodsManageComponent,
        GoodsTypeManageComponent,
        JobManageComponent,
        WorkItemManageComponent,
        GoodsAddComponent,
        GoodsEditComponent,
        GoodsTypeAddComponent,
        GoodsTypeEditComponent,
        JobAddComponent,
        JobEditComponent,
        WorkItemManageComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DataTablesModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,
        NgbModule,
        NgbdModalConfigModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
