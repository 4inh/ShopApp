import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { ApiResponse } from '../../../responses/api.response';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: [
    './category.admin.component.scss',        
  ],
  standalone: true,
  imports: [   
    CommonModule,
    FormsModule,
  ]
})
export class CategoryAdminComponent implements OnInit {
  
  categories: Category[] = [];

  constructor(    
    private categoryService: CategoryService,    
    private router: Router,    
    ) {}
    
    ngOnInit() {      
      this.getCategories(0, 100);
    }

    getCategories(page: number, limit: number) {
      this.categoryService.getCategories(page, limit).subscribe({
        next: (apiResponse: ApiResponse) => {
          debugger;
          this.categories = apiResponse.data;
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          console.error('Lỗi khi lấy danh mục:', error);
        }
      });
    }

    insertCategory() {
      debugger
      this.router.navigate(['/admin/categories/insert']);
    } 

    updateCategory(categoryId: number) {
      debugger      
      this.router.navigate(['/admin/categories/update', categoryId]);
    }  
    
    deleteCategory(category: Category) {      
      const confirmation = window
      .confirm('Bạn có chắc muốn xóa danh mục này?');
      if (confirmation) {
        debugger
        this.categoryService.deleteCategory(category.id).subscribe({
          next: (apiResponse: ApiResponse) => {
            debugger 
            alert('Xóa thành công')
            location.reload();          
          },
          complete: () => {
            debugger;          
          },
          error: (error: any) => {
            debugger;
            alert(error.error)
            console.error('Lỗi khi lấy danh mục:', error);
          }
        });  
      }      
    }
}