import { Injectable } from '@angular/core';
import { SessionLoggerService } from '../providers/session-logger-service';
import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private sl: SessionLoggerService,
              private userService: UsersService) { }

  initializeApp():Promise<any>{
    return new Promise((resolve, reject) => {
      let data: any = localStorage.getItem('token');
      let email = localStorage.getItem('currentUser')!
      if(data != null){
        this.userService.getCurrentUser(email).subscribe((res: any) => {
          for(let x of res.details){
            this.sl.currentUser = x;
          }
        },
        (err) => {
            resolve(1);
        },
        () => {
            resolve(1);
        })
      }

      else resolve(1);
    })
  }
}
