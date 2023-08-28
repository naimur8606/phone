function search(){
  document.getElementById("load").classList.remove("hidden");
  const searchText = document.getElementById("search-text").value;
  phoneLode(searchText)
}

const phoneLode = (searchText = "iphone") =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
      .then(res => res.json())
      .then(data => displayPhone(data.data))
}

const displayPhone = (phones) => {
    phones = phones.slice(0,5);
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