import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projects } from '../interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
}
