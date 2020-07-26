import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Advertise {
  
  adName: string,
  cpi: number,
  adUrl: string,
  id: number,
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  urls;
  advertiserApi = "http://localhost:3000/advertiserApi/";
  
  constructor(private http: HttpClient) { }

getAdvertises(){
  return this.http.get(this.advertiserApi)
}

incAdCount(adDetails){
  return new Observable((observer) => {
    
    this.http.get(this.advertiserApi + adDetails.id).
    subscribe((data:Advertise) => {
      data.count++; 
      this.http.put(this.advertiserApi + adDetails.id,data).
      subscribe((data:Advertise) => { 
        observer.next(data)
      },error=>{
        observer.error(error)
      })
    },error=>{
      observer.error(error)
    })
  })
}
  
}
