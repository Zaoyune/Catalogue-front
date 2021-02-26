import {Component, Input, OnInit} from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';
import {Category} from '../model/category.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public currentProduct: Product;
  public mode: number=1;
  public Listcategories:any;
  product = new Product();




  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit() {
    this.onSelectCateg();
  }




  onSaveProduct(data: any) {
    this.catService.saveResource(this.catService.host+"/produits",data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/products");
        this.currentProduct=res;
        //this.currentProduct.category=this.categ.id;
        this.mode=2;
      },err=>{
        console.log(err);
      })
  }



  onSelectCateg(){
    //this.catService.getCateg().subscribe(data=>{
    this.catService.getCateg().subscribe(data=>{
     this.Listcategories=data
      console.log("http://localhost:8080/categories/"+this.Listcategories.id)
    },err=>{
      console.log(err);
    })
  }


  onNewProduct() {
    this.mode=1;
  }


}
