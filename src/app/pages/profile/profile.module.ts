// Remova a importação duplicada do AngularFireAuthModule
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    // Não é necessário importar o AngularFireAuthModule aqui, já está no AppModule
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule { }
