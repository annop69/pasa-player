import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//models
import { Token } from '../models/token';
import { LoginUser } from '../models/login-user';
import { EmployeeMisc } from '../models/employee-misc';
import { AddRating } from '../models/add-rating';
import { UserDetails } from '../models/user-details';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

let auth = {
  'Content-Type': 'application/json',
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://pasa-server.onrender.com';

  constructor(private http:HttpClient) { }

  loginUser(loginUser: LoginUser): Observable<Token>{
    const url = `${this.apiUrl}/emp-login`;
    return this.http.post<Token>(url, loginUser, httpOptions);
  }

  getCurrentUser(email: string): Observable<string>{
    const url = `${this.apiUrl}/employee/current-empuser/`;
    return this.http.get<string>(url,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        params:{
          email: email
        }
      })
  }

  getUsersStats(empID: string, type: number, pageNumber: number, pageSize: number): Observable<EmployeeMisc[]>{
    const url = `${this.apiUrl}/employee/get-empstat`

    return this.http.get<EmployeeMisc[]>(url,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        params:{
          empID,
          type: type.toString(),
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString()
        }
      })
  }

  getEmployeesStats(empID: number, type: number, pageNumber: number, pageSize: number): Observable<EmployeeMisc[]>{
    const url = `${this.apiUrl}/employee/get-empstat`

    return this.http.get<EmployeeMisc[]>(url,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        params:{
          empID: empID.toString(),
          type: type.toString(),
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString()
        }
      })
  }

  getEmployeeStats(query: string, empID: number, type: number, pageNumber: number, pageSize: number): Observable<EmployeeMisc[]>{
    const url = `${this.apiUrl}/employee/get-searchEmpStat`

    return this.http.get<EmployeeMisc[]>(url,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        params:{
          query,
          empID: empID.toString(),
          type: type.toString(),
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString()
        }
      })
  }

  addEmployeeStats(data: EmployeeMisc): Observable<EmployeeMisc>{
    const url = `${this.apiUrl}/employee/add-empstat`;
    return this.http.post<EmployeeMisc>(url, data, auth);
  }

  updateEmployeeStats(data: EmployeeMisc): Observable<EmployeeMisc>{
    const url = `${this.apiUrl}/employee/update-empstat`;
    return this.http.patch<EmployeeMisc>(url, data, auth);
  }

  deleteEmployeeStats(id: string): Observable<string>{
    console.log("id", id);
    const url = `${this.apiUrl}/employee/delete-empstat`
    return this.http.delete<string>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      body: {
        id: id
      }
    });
  }

  updateRating(data: AddRating): Observable<AddRating>{
    const url = `${this.apiUrl}/employee/update-rating`;
    return this.http.patch<AddRating>(url, data, auth);
  }

  getStrAcc(empID: number): Observable<EmployeeMisc[]>{
    const url = `${this.apiUrl}/employee/get-str-acc`

    return this.http.get<EmployeeMisc[]>(url,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        params:{
          empID: empID.toString()
        }
      })
  }

  deleteStrAcc(id: string): Observable<string>{
    const url = `${this.apiUrl}/employee/delete-str-acc`
    return this.http.delete<string>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      body: {
        id: id
      }
    });
  }

  addStrAcc(data: EmployeeMisc): Observable<EmployeeMisc>{
    const url = `${this.apiUrl}/employee/add-str-acc`;
    return this.http.post<EmployeeMisc>(url, data, auth);
  }

  addComFeed(data: EmployeeMisc): Observable<EmployeeMisc>{
    const url = `${this.apiUrl}/employee/add-com-fed`;
    return this.http.post<EmployeeMisc>(url, data, auth);
  }

  getComFeed(empID: number): Observable<EmployeeMisc[]>{
    const url = `${this.apiUrl}/employee/get-com-fed`

    return this.http.get<EmployeeMisc[]>(url,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        params:{
          empID: empID.toString()
        }
      })
  }

  registerUser(userDetails: UserDetails): Observable<UserDetails>{
    const url = `${this.apiUrl}/employee/register`
    return this.http.post<UserDetails>(url, userDetails, httpOptions)
}

  deleteComFeed(id: string): Observable<string>{
    const url = `${this.apiUrl}/employee/delete-com-fed`
    return this.http.delete<string>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      body: {
        id: id
      }
    });
  }
}

