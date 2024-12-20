import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  currentCategoryId?: number;
  searchMode: boolean=false;

  constructor(private productService: ProductService,  
                      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProduct();
    });
  }


  listProduct() {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

  }


  handleSearchProducts() {

      const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;

      // now search for the products using keyword
      this.productService.searchProducts(theKeyWord).subscribe(
        data=>{
          this.products=data;
        }
      )
  }


  handleListProducts(){
      // check if "id" parametr is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId= +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId=1;
    }

    // now get the products for the given category
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products=data;
      }
    )
  }

}
