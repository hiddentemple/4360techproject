export class ErrorService{
  constructor(){}

  handleError(error): String{
    if(error.includes("already exists")){
      return "Email already exists"
    }
  }
}
