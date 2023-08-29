function search(number){
  const searchText = document.getElementById("search-text").value;
  checkValue(searchText);
  phoneLode(searchText, number)
}

const checkValue = (searchText) =>{
  if(searchText.length === 0){
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("load").classList.add("hidden");
  }
  else{
    document.getElementById("error").classList.add("hidden");
    document.getElementById("load").classList.remove("hidden");
  }
}

const phoneLode = (searchText = "iphone", number) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
      .then(res => res.json())
      .then(data => {displayPhone(data.data, number);if(data.data.length === 0){checkValue(data.data)}})
      
}
let nextPreviousNumber = 0
const displayPhone = (phones, number=0) => {
  nextPreviousNumber += number;
  console.log(nextPreviousNumber,phones.length)
  if(nextPreviousNumber >= 8){
    document.getElementById("previous-btn").classList.remove("hidden");
  }
  else{
    document.getElementById("previous-btn").classList.add("hidden");
  }
  if(nextPreviousNumber >= phones.length){
    document.getElementById("next-btn").classList.add("hidden");
  }
  else{
    document.getElementById("next-btn").classList.remove("hidden");
  }
  if(nextPreviousNumber > phones.length){
    document.getElementById("nextPrevious").classList.remove("hidden");
    document.getElementById("load").classList.add("hidden");
  }
  else{
    document.getElementById("nextPrevious").classList.add("hidden");
  }
  phones = phones.slice(0 + nextPreviousNumber, 8 + nextPreviousNumber);
  const phoneArea = document.getElementById("phone-area");
  phoneArea.textContent="";
  for(let phone of phones) {
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
      <div class="text-center p-5 space-y-2 border rounded">
      <img class="p-8 rounded mx-auto bg-[#f3f8ff]" src="${phone.image}" alt="">
      <h3 class="text-[#403F3F] text-2xl font-semibold">${phone.phone_name
      }</h3>
      <p class="text-[#706F6F] text-[18px]">There are many variations of passages of available, but the majority have suffered</p>
      <h3 class="text-[#403F3F] text-2xl font-bold">$999</h3>
      <button id="phone-details" class="bg-[#0D6EFD] text-white text-xl py-3 px-8 rounded" onclick="showDetails('${phone.slug}') ;my_modal.showModal()">Show Details</button>
      </div>
     `
    document.getElementById("load").classList.add("hidden");
    phoneArea.appendChild(phoneDiv);
  } 
}

const nextPrevious = (number) =>{
  search(number)
}

const showDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
      .then(res => res.json())
      .then(data => {
        // document.getElementById("phone-title").innerText=data.data.name;
         console.log(data.data);
        // 
        const detailsPhoneContainer = document.getElementById('details-container');
    detailsPhoneContainer.innerHTML =`
      <div class="bg-[#f3f8ff] py-5">
        <img class="mx-auto" src="${data.data.image}" alt="Shoes" />
      </div>
      <div class=" pt-3">
        <h3 class="font-bold text-2xl">Name: ${data.data.name}</h3>
        <p class="text-[#706F6F] font-semibold py-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <h3 class="font-bold text-[18px] my-2">Brand:<span class="text-[#939090] font-semibold"> ${data.data?.brand}</span></h3>
        <h3 class="font-bold text-[18px] my-2">Storage:<span class="text-[#939090] font-semibold"> ${data.data?.mainFeatures?.storage}</span></h3>
        <h3 class="font-bold text-[18px] my-2">Display:<span class="text-[#939090] font-semibold"> ${data.data?.mainFeatures?.displaySize}</span></h3>
        <h3 class="font-bold text-[18px] my-2">Memory:<span class="text-[#939090] font-semibold"> ${data.data?.mainFeatures?.memory}</span></h3>
        <h3 class="font-bold text-[18px] my-2">Slug:<span class="text-[#939090] font-semibold"> ${data.data?.slug}</span></h3>
        <h3 class="font-bold text-[18px] my-2">GPS:<span class="text-[#939090] font-semibold"> ${data.data?.others?.GPS}</span></h3>
      </div>
    `
        
      })
}
phoneLode()
