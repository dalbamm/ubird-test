module.exports=class Account{
  
  constructor(obj){
    this.email=obj["email"]
    this.password=obj["password"]
    this.id=obj["id"]
  }
  toObj(){
    return {email:this.email, id: this.id, password: this.password}
  }
}


