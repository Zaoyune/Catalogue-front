import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../service/catalogue.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public currentProduct: Product;
  private url: string;
  private Listcategories: Object;

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private catService:CatalogueService) { }

  ngOnInit() {
    this.url=atob(this.activatedRoute.snapshot.params.id);
    this.catService.getResource(this.url)
      .subscribe(data=>{
        this.currentProduct=data;
      },err=>{
        console.log(err);
      })

    this.onSelectCateg();
  }

  onSelectCateg(){
    //this.catService.getCateg().subscribe(data=>{
    this.catService.getCateg().subscribe(data=>{
      this.Listcategories=data
    },err=>{
      console.log(err);
    })
  }

  onUpdateProduct(value: any) {
    console.log(value.category)


    this.catService.updateResource(this.url,value)
      .subscribe(data=>{
        alert("Mise à jour effectuée avec succès");
        this.router.navigateByUrl("/products");
      },err=>{
        console.log(err);
      })
  }

}
