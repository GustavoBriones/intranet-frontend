import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean {
    const login = this.authService.isLoggedOn;
    if(login){
      return true;
    }else{
      this.router.navigate(['auth/login']);
      return false;
    }
  }
  
}
