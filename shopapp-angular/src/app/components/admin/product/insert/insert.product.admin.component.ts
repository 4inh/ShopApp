import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { InsertProductDTO } from '../../../../dtos/product/insert.product.dto';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../../responses/api.response';

@Component({
  selector: 'app-insert.product.admin',
  templateUrl: './insert.product.admin.component.html',
  styleUrls: ['./insert.product.admin.component.scss'],
  standalone: true,
  imports: [   
    CommonModule,
    FormsModule,
  ]
})
export class InsertProductAdminComponent implements OnInit {
  
  insertProductDTO: InsertProductDTO = {
    name: '',
    price: 0,
    description: '',
    category_id: 1,
    images: []
  };
  categories: Category[] = [];
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,    
    private productService: ProductService,    
  ) {
    
  } 

  ngOnInit() {
    this.getCategories(1, 100)
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
        console.error('Lỗi khi tìm danh mục:', error);
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 5) {
      alert('Vui lòng chọn tối đa 5 hình ảnh.');
      return;
    }
    this.insertProductDTO.images = files;
  }

  insertProduct() {    
    this.productService.insertProduct(this.insertProductDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger
        if (this.insertProductDTO.images.length > 0) {
          const productId = apiResponse.data.id; 
          this.productService.uploadImages(productId, this.insertProductDTO.images).subscribe({
            next: (imageResponse:ApiResponse) => {
              debugger
              console.log('Thêm hình ảnh thành công:', imageResponse.data);
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (error) => {
              alert(error.error)
              console.error('Lỗi khi thêm ảnh:', error);
            }
          })          
        }
      },
      error: (error) => {
        debugger
        alert(error.error)
        console.error('Lỗi khi thêm sản phẩm:', error);
      }
    });    
  }
}
