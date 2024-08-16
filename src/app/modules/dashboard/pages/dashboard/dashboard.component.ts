import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerService } from '../../services/customer.service';
import { CardModule } from 'primeng/card';
import { SearchComponent } from '../../components/search/search.component';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";

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
  customers!: any[];

  searchValue!: string;
  customerOptions: { name: string, code: number }[] = [{ name: 'Alpha', code: 1 }, { name: 'Beta Industries', code: 2 }];
  projectOptions: { name: string, code: number }[] = [{ name: 'Project 1', code: 2 }, { name: 'Project 2', code: 2 }];
  selectedCustomer!: { name: string, code: number };
  selectedProject!: { name: string, code: number };

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(
      item => {
        this.customers = item;
      }
    )
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
