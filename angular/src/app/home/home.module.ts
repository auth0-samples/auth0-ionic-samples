import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginButtonComponent } from './login-button.component';
import { LogoutButtonComponent } from './logout-button.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    LoginButtonComponent,
    LogoutButtonComponent,
    ProfileComponent,
  ],
})
export class HomePageModule {}
