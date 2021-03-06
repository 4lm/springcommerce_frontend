import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../common/product";
import { ProductCategory } from "../common/product-category";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api";
  private productListUrl = `${this.baseUrl}/products`;
  private productCategoryUrl = `${this.baseUrl}/product-category`;

  constructor(private httpClient: HttpClient) {}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }

  getProductList(categoryId: number): Observable<Product[]> {
    // Build URL based on category id
    const searchUrl = `${this.productListUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    // Build URL based on keyword
    const searchUrl = `${this.productListUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.productCategoryUrl)
      .pipe(map(response => response._embedded.productCategory));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
