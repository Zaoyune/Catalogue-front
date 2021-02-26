import {Category} from './category.model';

export class Product{
  public id:number;
  public designation:string;
  public price:number;
  public quantite:number;
  /*_links:{
    self:{
      href:string;
    },
    product:{
      href:string;
    },
    category:{
      href:string
    }
  }*/
  category = new Category();
}
