async function work() {
  const response = await fetch('data.json');
  const data = await response.json(); // <-- await here is important
  const images=document.querySelectorAll('.container .item .img img');
  const category=document.querySelectorAll('.category');
  const name=document.querySelectorAll('.name');
  const price=document.querySelectorAll('.price')
  for (const [index, value] of Object.entries(data)) {
    images[index].src=`${value.image.desktop}`;
    name[index].innerText=`${value.name}`
    price[index].innerHTML=`$<span class="ori-price">${value.price}</span>`
    category[index].innerText=`${value.category}`
  }
}
work();

const additembtns=document.querySelectorAll('.btn .additem');
const cartstart=document.querySelector('.cart .start')
const cartlist=document.querySelector('.cart-box')

additembtns.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
    btn.classList.add('hide')
    cartstart.classList.add('hide')
    cartlist.classList.remove('hide')
    const item=e.target.parentNode.parentNode;
    renderCart(item);
    // console.log(item.querySelector('.price .ori-price').innerText);

  });
});

const subbtns=document.querySelectorAll('.btn .sub');
const addbtns=document.querySelectorAll('.btn .add');
const values=document.querySelectorAll('.btn .value');


// console.log(values);

subbtns.forEach((btn,index)=>{
  btn.addEventListener('click',(e)=>{
    if (values[index].innerText==='1') {
      additembtns[index].classList.remove('hide');
    }else{
      values[index].innerText=`${Number(values[index].innerText)-1}`;
    }
  });
});
addbtns.forEach((btn,index)=>{
  btn.addEventListener('click',(e)=>{
    values[index].innerText=`${Number(values[index].innerText)+1}`;
    // console.log(values[index].innerText);
    const target_itemName=values[index].parentNode.parentNode.querySelector('.name');
    const cartitem=document.querySelectorAll('.list');
    cartitem.forEach((item)=>{
      const list_itemName=item.querySelector('.item-info .name'); 
      if (list_itemName.innerText===target_itemName.innerText) {
        list_itemName.parentNode.querySelector('div .quantity').innerText=`${values[index].innerText}x`;
        totalcart();
        
        
      }
    })
    
  });
});

function renderCart(item){
  const cartList = document.querySelector('.cart-items');
  let qty=Number(item.querySelector('.value').innerText);
  let price=Number(item.querySelector('.price .ori-price').innerText);
  let total=(qty*price).toFixed(2);
  const li = document.createElement('li');
  li.classList.add('list')
  li.innerHTML = `
    <div class="item-info">
      <p class="name">${item.querySelector('.name').innerText}</p>
        <div>
          <span class="quantity">1x</span>
          <span class="per-price">@${price}</span>
          <span class="qty-price">$${total}</span>
        </div>
    </div>
    <div class="removeItem">
      <button class="remove-btn"><img src="assets/images/icon-remove-item.svg" alt=""></button>
    </div>`;
  cartList.appendChild(li);
  totalcart();
  const removebtns=document.querySelectorAll('.removeItem .remove-btn');
  removebtns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      let item=e.target.parentNode.parentNode.parentNode;
      (item).remove();
      totalcart();
      removeValue(e.target.parentNode.parentNode.parentNode);
    })
  });
}


function removeValue(item){
  const itemname=item.querySelector('.item-info .name').innerText;
  const names=document.querySelectorAll('.item .name');
  names.forEach((naam)=>{
    const name=naam.innerHTML;
    if (name===itemname) {  
      let value=naam.parentNode.querySelector('.btn .value');
      let btn=naam.parentNode.querySelector('.btn .additem');
      value.innerText=1;
      btn.classList.remove('hide')
    }
  });
}



























function totalcart(){
  const cartitem=document.querySelectorAll('.cart-items .qty-price');
  let total=0;
  cartitem.forEach((item)=>{
    let curr=Number((item.innerText).substring(1));
    let quantity=item.parentNode.querySelector('.quantity').innerText.substring(0,1);
    total+=curr*quantity;
  });
  const carttotal=document.querySelector('.cart-total');
  if (total===0) {
    cartlist.classList.add('hide');
    cartstart.classList.remove('hide')
  }
  carttotal.innerText=`$${total}`;
  
}




