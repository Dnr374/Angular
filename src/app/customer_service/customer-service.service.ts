import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http:HttpClient) { }

  postCustomer(data:any){
    return this.http.post("http://localhost:3000/posts",data)
  }

  getCustomer(){
    return this.http.get("http://localhost:3000/posts")
  }

  updateCustomer(data:any,customerId:number){
    return this.http.put<any>("http://localhost:3000/posts/"+customerId,data)
  }

  deleteCustomer(customerId:number){
    return this.http.delete("http://localhost:3000/posts/"+customerId)
  }

}

