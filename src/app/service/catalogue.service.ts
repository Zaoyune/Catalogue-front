import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {Category} from '../model/category.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8080";
  constructor(private httpClient:HttpClient) { }

  public getProduct(page: number,size: number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);
  
  }

  public getProductByKeyWord(mc:string,page: number,size: number){
    return this.httpClient.get(this.host+"/produits/search/ByDesignationPage?des="+mc+"&page="+page+"&size="+size+"&projection=P1");
  }

  public deleteResource(url) {
    return this.httpClient.delete(url);
  }

  getCateg(){
    return this.httpClient.get(this.host+"/categories");
  }
  getCategories():Observable<Category[]>{
    return this.httpClient.get<any>(this.host+"/categories")
      .pipe(
        map(data => data._embedded.categories)
      );
  }


  getProd(){
    return this.httpClient.get(this.host+"/produits?projection=P1/");
  }

  public saveResource(url,data):Observable<Product>{
    return this.httpClient.post<Product>(url,data);
  }

  public getResource(url):Observable<Product>{
    return this.httpClient.get<Product>(url);
  }
  public updateResource(url,data){
    console.log(url)
    return this.httpClient.patch(url,data);
  }


  public loadCategories(): Observable<Category[]>{
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.httpClient.get<Category[]>('http://localhost:8080/categories', {headers: headers});
  }
}
