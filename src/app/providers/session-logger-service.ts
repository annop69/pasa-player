import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionLoggerService implements OnInit{
  constructor() { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean{
    // let data = localStorage.getItem('token');
    // if(data == null) return false
    return !!localStorage.getItem('token');
  }

  currentUser!: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    is_pending: string;
    rating1: string;
    rating2: string;
    rating3: string;
    rating4: string;
    rating5: string;
    rating6: string;
    rating7: string;
  }
}
