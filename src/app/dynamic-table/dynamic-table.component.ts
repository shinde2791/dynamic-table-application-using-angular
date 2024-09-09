import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  sortKey: string = ''; // Store the current sort key

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://randomuser.me/api/?results=20').subscribe((data: any) => {
      this.users = data.results;
      this.filteredUsers = this.users; // Initialize filteredUsers with all users
    });
  }

  search(): void {
    if (this.searchQuery) {
      this.filteredUsers = this.users.filter(user =>
        user.name.first.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.name.last.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.gender.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users; // Reset the filtered list if searchQuery is empty
    }
    this.sort(this.sortKey); // Reapply sorting after filtering
  }

  sort(key: string): void {
    this.sortKey = key; // Update the current sort key
    this.filteredUsers.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  }
}