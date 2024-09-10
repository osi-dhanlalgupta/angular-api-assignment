import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerService } from '../../services/customer.service';
import { CardModule } from 'primeng/card';
import { SearchComponent } from '../../components/search/search.component';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    CardModule,
    SearchComponent,
    DropdownComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  customers: any[]=[];

  searchValue!: string;
  customerOptions: { name: string, code: number }[] = [{ name: 'Alpha', code: 1 }, { name: 'Beta Industries', code: 2 }];
  projectOptions: { name: string, code: number }[] = [{ name: 'Project 1', code: 2 }, { name: 'Project 2', code: 2 }];
  selectedCustomer!: { name: string, code: number };
  selectedProject!: { name: string, code: number };
  data: any;

  constructor(
    private customerService: CustomerService, private projectsService: ProjectsService
  ) { }
  // https://my-json-server.typicode.com/praveencastelino/demo/projects/1
  ngOnInit() {
    this.customerService.getAllCustomers().pipe(
      mergeMap((customers) => {
       
        const customerDetailsRequests = customers.map((customer) =>
          
          this.fetchProjectDetailsForCustomer(customer)
        );
        
        return forkJoin(customerDetailsRequests);
      })
    
    ).subscribe(
      item => {
        
        this.customers = item;
        console.log(this.customers)
      }

    )
    
  }
  fetchProjectDetailsForCustomer(customer: any) {
    if (customer.projects && customer.projects.length > 0) {
     
      const projectRequests = customer.projects.map((projectId: number) =>
      this.projectsService.getProject(projectId)
          .pipe(
            catchError((error) => {
              console.error(`Error fetching project with ID ${projectId}:`, error);
              
              return of({ id: projectId, name: 'Unknown Project', employees: [] });
            })
          )
      );
      
      return forkJoin(projectRequests).pipe(
        map((projects:any) => ({
          ...customer,
          projectName: projects?.map((proj: { name: any; }) => proj.name).join(', '),
        }))
      );
    } else {
      
      return of({ ...customer, projects: [] });
    }
  }
  onSearch(searchTerm: string) {
    console.log('Searched value: ', searchTerm)
  }

  onSelectCustomer(id: number) {
    console.log('Selected Customer ID: ', id)
  }

  onSelectProject(id: number) {
    console.log('Selected Project ID: ', id)
  }

  onSort(event: {field: 'string', order: number}) {
    console.log('Sorted by:', event.field)
    console.log('Ordered by:', event.order)
  }

}
