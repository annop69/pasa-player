import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

import { SessionLoggerService } from "../providers/session-logger-service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private logger: SessionLoggerService) {

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.logger.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

}