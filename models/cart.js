module.exports = function Carts(initItems){
  this.items = initItems.items ||{};
  this.totalQ = initItems.totalQ || 0;
  this.totalPrice = initItems.totalPrice || 0;
  this.dvdDiscount = initItems.dvdDiscount || 0;
  this.blueRayDiscount = initItems.blueRayDiscount || 0;
  this.totalDiscountedPrice = initItems.totalDiscountedPrice || 0;
  this.actualPrice = initItems.actualPrice || 0;
  this.add = function(item,identifier, amount){
    console.log(amount);
      var storedItem = this.items[identifier];
      if(!storedItem){
          storedItem = this.items[identifier] = {item: item, qty: 0, price:0};
      }
      this.totalPrice += (storedItem.item.price*parseInt(amount));
      storedItem.qty=storedItem.qty + parseInt(amount);
      storedItem.price = storedItem.item.price*storedItem.qty;
      this.totalQ += parseInt(amount);
      if(this.items['1']&&this.items['2']&&this.items['3']){

          this.dvdDiscount = (this.items['1'].price + this.items['2'].price + this.items['3'].price)*0.1;
      }
      else{
          this.dvdDiscount = 0;
      }

      if((this.items['4'])&& (this.items['5']) && (this.items['6'])){
          this.blueRayDiscount = (this.items['4'].price + this.items['5'].price + this.items['6'].price)*0.15;
      }
      else{
          this.blueRayDiscount = 0;
      }
      if(this.totalQ >99){
          this.totalDiscountedPrice = (this.totalPrice - (this.blueRayDiscount + this.dvdDiscount))*0.05;
      }
      else{
          this.totalDiscountedPrice = 0;
      }
      this.actualPrice = this.totalPrice - (this.dvdDiscount + this.blueRayDiscount + this.totalDiscountedPrice);
  };

  this.changeAmount = function(id, amount){
      if(this.items[id].qty < parseInt(amount)){
          this.totalQ += (parseInt(amount) - this.items[id].qty);
          this.items[id].price += (this.items[id].item.price * (parseInt(amount) - this.items[id].qty));
          this.totalPrice += (this.items[id].item.price * (parseInt(amount) - this.items[id].qty))
          this.items[id].qty = parseInt(amount);
      }
      else{
          this.totalQ -= (this.items[id].qty - parseInt(amount));
          this.items[id].price -= (this.items[id].item.price * (this.items[id].qty - parseInt(amount)));
          this.totalPrice -= (this.items[id].item.price * (this.items[id].qty - parseInt(amount)));
          this.items[id].qty = parseInt(amount);
      }
        if(this.items['1']&&this.items['2']&&this.items['3']){

            this.dvdDiscount = (this.items['1'].price + this.items['2'].price + this.items['3'].price)*0.1;
        }
        else{
            this.dvdDiscount = 0;
        }

        if((this.items['4'])&& (this.items['5']) && (this.items['6'])){
            this.blueRayDiscount = (this.items['4'].price + this.items['5'].price + this.items['6'].price)*0.15;
        }
        else{
            this.blueRayDiscount = 0;
        }
        if(this.totalQ >99){
            this.totalDiscountedPrice = (this.totalPrice - (this.blueRayDiscount + this.dvdDiscount))*0.05;
        }
        else{
            this.totalDiscountedPrice = 0;
        }
      this.actualPrice = this.totalPrice - (this.dvdDiscount + this.blueRayDiscount + this.totalDiscountedPrice);
    };

  this.removeItem = function(id){
      this.totalQ -= this.items[id].qty;
      this.totalPrice -= this.items[id].price;
      delete this.items[id];
      if(this.items['1']&&this.items['2']&&this.items['3']){

          this.dvdDiscount = (this.items['1'].price + this.items['2'].price + this.items['3'].price)*0.1;
      }
      else{
          this.dvdDiscount = 0;
      }

      if((this.items['4'])&& (this.items['5']) && (this.items['6'])){
          this.blueRayDiscount = (this.items['4'].price + this.items['5'].price + this.items['6'].price)*0.15;
      }
      else{
          this.blueRayDiscount = 0;
      }
      if(this.totalQ >99){
          this.totalDiscountedPrice = (this.totalPrice - (this.blueRayDiscount + this.dvdDiscount))*0.05;
      }
      else{
          this.totalDiscountedPrice = 0;
      }
      this.actualPrice = this.totalPrice - (this.dvdDiscount + this.blueRayDiscount + this.totalDiscountedPrice);
  };
  this.generateArray = function(){
      var arr = [];
      for(var identifier in this.items){
          arr.push(this.items[identifier]);
      }
      return arr;
  };
};