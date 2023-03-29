1.  ecommerce

features

user
username: {type:String, required:true},
email : {type:String, required:true,unique },
password : {type:String, required:true},
gender : {type:String, required:true }

product
name : {type:String, required:true}
description : {type:String }
quantity : {type:Number, required:true, min:1}
price : {type:Number, required:true}

cart
productId : {type:String, required:true, }
userId : {type:String, required:true, }
quantity : {type:Number, required:true, min:1 ,max : 10}


// TODO : single item quantity, total cost, cart and product deletion