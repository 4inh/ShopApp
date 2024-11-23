import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../responses/user/user.response';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ApiResponse } from '../../../responses/api.response';

@Component({
  selector: 'app-user.admin',    
  templateUrl: './user.admin.component.html',
  styleUrl: './user.admin.component.scss',
  standalone: true,
  imports: [   
    CommonModule,
    FormsModule,
  ]
})
export class UserAdminComponent implements OnInit{
 
  userService = inject(UserService);
  router = inject(Router)
  route = inject(ActivatedRoute);
  users: UserResponse[] = [];        
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword:string = "";
  localStorage?:Storage;
  
  constructor(
      @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  ngOnInit(): void {
    this.currentPage = Number(this.localStorage?.getItem('currentUserAdminPage')) || 0;
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }
  
  searchUsers() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getUsers(this.keyword.trim(), this.currentPage, this.itemsPerPage);
  }
  
  getUsers(keyword: string, page: number, limit: number) {
    this.userService.getUsers({ keyword, page, limit }).subscribe({      
      next: (apiResponse: ApiResponse) => {        
        debugger
        const response = apiResponse.data
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Lỗi khi tìm người dùng:', error);
      }
    });
  }
  
  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentUserAdminPage', String(this.currentPage));
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }
  
    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
      const maxVisiblePages = 5;
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    
      let startPage = Math.max(currentPage - halfVisiblePages, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
    
      return new Array(endPage - startPage + 1).fill(0)
        .map((_, index) => startPage + index);
    }
    
    insertUser() {
      debugger
      this.router.navigate(['/admin/users/insert']);
    } 

    updateUser(userId: number) {
      debugger
      this.router.navigate(['/admin/users/update', userId]);
    }  

    resetPassword(userId: number) {
      this.userService.resetPassword(userId).subscribe({
        next: (apiResponse: ApiResponse) => {
          alert('Block/unblock user successfully');
        },
        complete: () => {
        },
        error: (error: any) => {
          alert(error.error);
          console.error('Lỗi khi chuyển đổi trạng thái người dùng:', error);
        }
      });
    }
  
    toggleUserStatus(user: UserResponse) {
      let confirmation: boolean;
      if (user.is_active) {
        confirmation = window.confirm('Bạn có chắc chắn muốn chặn người dùng này?');
      } else {
        confirmation = window.confirm('Bạn có chắc chắn muốn kích hoạt người dùng này không?');
      }
      
      if (confirmation) {
        const params = {
          userId: user.id,
          enable: !user.is_active
        };
    
        this.userService.toggleUserStatus(params).subscribe({
          next: (response: any) => {
            alert('Chặn/Kích hoạt người dùng thành công');
            location.reload();
          },
          complete: () => {
          },
          error: (error: any) => {
            alert(error.error);
            console.error('Lỗi chuyển đổi trạng thái người dùng:', error);
          }
        });
      }      
    }
}
