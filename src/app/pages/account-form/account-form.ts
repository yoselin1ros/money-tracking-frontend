import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from '../../services/account.service';
import { RefItemService } from '../../services/ref-item.service';
import { RefItemResponse } from '../../models/ref-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './account-form.html',
  styleUrl: './account-form.css',
})
export class AccountFormPage implements OnInit {

  accountForm: FormGroup;

  accountTypes: RefItemResponse[] = [];

  loading = signal<boolean>(true);

  constructor(
    private fb: FormBuilder, private accountService: AccountService,
    private refItemService: RefItemService
  ) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      typeId: ['', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  get f() {
    return this.accountForm.controls;
  }

  getData(): void {
    this.refItemService.getItems(1).subscribe({
      next: (itemsResponse) => {
        this.accountTypes = itemsResponse.data!;
        this.loading.set(false);
      },
      error: () => { 
        console.log('Failed to retrieve items.'); 
        this.loading.set(false); 
      }
    });
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    const formValue = this.accountForm.value;

    this.accountService.createAccount(formValue).subscribe({
      next: (newItem) => {
        this.accountForm.reset();
      },
      error: () => console.log('Failed creating a new account.')
    });
  }

}
