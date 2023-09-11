import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from '@angular/core';

import { SessionLoggerService } from "../providers/session-logger-service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private logger: SessionLoggerService) {

    }

    canActivate(): boolean {
        if (!this.logger.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}