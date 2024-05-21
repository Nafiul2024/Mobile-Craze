const loadPhone = async (searchText="iphone",isShowAll) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
        //Step-1
    const phoneContainer = document.getElementById('phone-container');
    // Clear Phone Container Card Before New Search
    phoneContainer.innerHTML='';
    // Display Show All if there are more than 12 Phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }

    // Display Only 12 Phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    

    phones.forEach(phone => {
        // console.log(phone);
        //2.Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card p-8 bg-[#fef9c3] shadow-xl`;
        //3.Set inner HTML
        phoneCard.innerHTML =`<figure><img src="${phone.image}" alt="phone" /></figure>
        <div class="card-body text-center">
          <h2 class="text-xl font-bold text-center">${phone.brand}</h2>
          <p>${phone.phone_name}</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="mt-4 btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>
        `;
        //4.Append Child
        phoneContainer.appendChild(phoneCard);
});
// Hide Loading Spinner
toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
  // console.log('search clicked');
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText,isShowAll);
  
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading===true){
    loadingSpinner.classList.remove('hidden');
  }else{
    loadingSpinner.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handleSearch(true);
}

const handleShowDetails = async (id) => {
  // console.log(id);
  // Load single phone data
  const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  shoe_details_modal.showModal();
  const phoneName = document.getElementById('details-phone-name');
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML =`
            <img class="p-4" src="${phone?.image}" alt="">
            <p class="p-2 font-bold text-xl">${phone.slug}</p>
            <p class="p-2">${phone.mainFeatures?.displaySize}</p>
            <p class="p-2">${phone.mainFeatures?.memory}</p>
            <h1 class="p-2">${phone.mainFeatures?.chipSet}</h1>
  `
}
loadPhone();