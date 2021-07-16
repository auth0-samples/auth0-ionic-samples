import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.auth.isAuthenticated$.pipe(switchMap(() => this.auth.user$));

  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
