import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Customers } from '../interfaces/customers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAllCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiUrl}/customers`)
  }

}
