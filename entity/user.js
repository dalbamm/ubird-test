module.exports=class User{
  constructor(email, id){
    this.email=email
    this.id=id
  }
  toObj(){
    return {email:this.email, id: this.id}
  }
}


