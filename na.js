class VA extends Array{
  constructor(){
    super();
    this.history=[[]];
  }
  commit(){
    this.history.push(this.slice());
  }
  revert(){
    this.splice(0,this.length,this.history[this.history.length - 1]);
  }
}
