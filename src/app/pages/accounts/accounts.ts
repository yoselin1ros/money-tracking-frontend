import { Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class AccountsPage implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'initialBalance', 'currentBalance', 'typeName'];

  accounts: AccountResponse[] = [];

  loading = signal<boolean>(true);

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.accounts = response.data;
          console.log('Accounts retrieved successfully:', this.accounts);
        } else {
          console.error('Failed to retrieve accounts:', response.message);
        }
        this.loading.set(false);

      },
      (error) => {
        console.error('Error retrieving accounts:', error);
        this.loading.set(false);
      }
    );
  }
}
