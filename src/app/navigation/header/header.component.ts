import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
  this.sideNavToggle.emit();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
