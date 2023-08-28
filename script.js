function search(){
    const searchText = document.getElementById("search-text").value;
    phoneLode(searchText)
}

const phoneLode = (searchText) =>{
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
        <button class="bg-[#0D6EFD] text-white text-xl py-3 px-8 rounded">Show Details</button>
        </div>
     `
      phoneArea.appendChild(phoneDiv);
    } 
}
