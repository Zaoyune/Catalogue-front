import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../service/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  private currentKeyword: string="";
  private prod: Object;

  constructor(private catService:CatalogueService,private router:Router) { }
  public produits:any=undefined;
  public size: number=5;
  public currentPage: number=0;
  public totalPage: number;
  public pages: Array<number>;
  ngOnInit() {
    //this.getProduct();
    //this.onGetProducts()
    this.ChercherProduits();
  }

  onGetProducts() {
    this.catService.getProduct(this.currentPage,this.size)
      .subscribe(data=>{
        this.totalPage=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPage);
        this.produits=data;

        console.log(data)
      },err=>{
        console.log(err);
      });
  }


  onPageProduct(i: number) {
    this.currentPage=i;
    this.ChercherProduits();
  }

  onChercher(form : any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.ChercherProduits();
  }

  ChercherProduits() {
    this.catService.getProductByKeyWord(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data=>{
        this.totalPage=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPage);
        this.produits=data;
      },err=>{
        console.log(err);
      });
  }

  getProduct(){
    this.catService.getProd().subscribe(data =>{
      this.prod=data;
    },err=>{
      console.log(err);
    })
  }

  onDeleteProduct(p){
    let conf=confirm("Etes vous sur de vouloir supprimer ce produit ?");
    if(conf){
      this.catService.deleteResource(p._links.self.href)
        .subscribe(data=>{
            //this.ChercherProduits();
          this.ChercherProduits()
        },err=>{
          console.log(err);
        })
    }

  }

  onEditProduct(p) {
    let url = p._links.self.href;

    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }
}
