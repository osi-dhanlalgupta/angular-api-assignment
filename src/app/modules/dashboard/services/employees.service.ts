import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../interfaces/employees';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
}
