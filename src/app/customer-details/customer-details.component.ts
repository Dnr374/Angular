import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CustomerModal } from '../customer_service/customer-model';
import { CustomerServiceService } from '../customer_service/customer-service.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
   
  formValue!:FormGroup;
  customerModal:CustomerModal=new CustomerModal();
  empData!:any;
  constructor(private formbuilder:FormBuilder,private api:CustomerServiceService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      customerId:[''],
      customerName:['',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      phoneNumber:['',[Validators.required,Validators.pattern("[6-9]{1}[0-9 ]{9}")]],
      address1:['',Validators.required],
      address2:[''],
      city:[''],
      state:[''],
      pincode:['']
    })
  }
  postCustomerDetails(){
    this.customerModal.id=this.formValue.value.customerId;
    this.customerModal.customerName=this.formValue.value.customerName;
    this.customerModal.phoneNumber=this.formValue.value.phoneNumber;
    this.customerModal.address1=this.formValue.value.address1;
    this.customerModal.address2=this.formValue.value.address2;
    this.customerModal.city=this.formValue.value.city;
    this.customerModal.state=this.formValue.value.state;
    this.customerModal.pincode=this.formValue.value.pincode;

    this.api.postCustomer(this.customerModal).subscribe(res=>{
      console.log(res);
      alert("Customer added successfully");
     
      this.formValue.reset();
      let ref=document.getElementById('close')
      ref?.click();
      this.getCustomerDetails();
    }
    )
  }
  
  getCustomerDetails(){
  return this.api.getCustomer().subscribe(res=>{
    this.empData=res;
  });
  }

  deleteCustomer(data:any){
    const tt=confirm("are you sure?")

    if(tt){
    this.api.deleteCustomer(data.id).subscribe(res=>{
      alert("Customer deleted successfully");
      this.getCustomerDetails();
    })
  }}

close(){
  this.formValue.reset();
}

onEdit(data:any){
this.customerModal.id=data.id;
this.formValue.controls['customerId'].setValue(data.id);
this.formValue.controls['customerName'].setValue(data.customerName);
this.formValue.controls['phoneNumber'].setValue(data.phoneNumber);
this.formValue.controls['address1'].setValue(data.address1);
this.formValue.controls['address2'].setValue(data.address2);
this.formValue.controls['city'].setValue(data.city);
this.formValue.controls['state'].setValue(data.state);
this.formValue.controls['pincode'].setValue(data.pincode);
}

updateCustomerDetails(){
    this.customerModal.customerName=this.formValue.value.customerName;
    this.customerModal.phoneNumber=this.formValue.value.phoneNumber;
    this.customerModal.address1=this.formValue.value.address1;
    this.customerModal.address2=this.formValue.value.address2;
    this.customerModal.city=this.formValue.value.city;
    this.customerModal.state=this.formValue.value.state;
    this.customerModal.pincode=this.formValue.value.pincode;
    this.api.updateCustomer(this.customerModal,this.customerModal.id).subscribe
    (res=>{
      alert("Customer updated successfully");
      let ref=document.getElementById('close')
      ref?.click();
      this.getCustomerDetails();
})
}

}
