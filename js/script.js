// Celan Content 
const cleanContent = fieldId => {
    const clearDiv = document.getElementById(fieldId);
    const clear = clearDiv.textContent = '';
    return clear;
}

// Display Hide 
const displayHide = (id, style) => {
    const displayHideStyle = document.getElementById(id)
    const stylePorperty = displayHideStyle.style.display = style;
    return stylePorperty;

}
//load all phone
const loadPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value.toLowerCase();
    const notifyMsg = document.getElementById('notify-msg')
    if (searchValue === '' || isNaN(searchValue) === false) {
        notifyMsg.innerText = 'Please type phone name...';
        displayHide('phone-main-container', 'none');
        displayHide('phone-details-container', 'none');
    }
    else {
        notifyMsg.innerText = '';
        displayHide('search-input', 'block');
        displayHide('container-hide', 'none');

        // displayHide('phone-details-container', 'none');
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                const allPhone = data.data;
                const res = allPhone.filter((phoneName) => {
                    return phoneName.phone_name.toLowerCase().includes([])
                })
                console.log(res)
                if (res == '') {
                    displayHide('search-input', 'none');
                    displayHide('phone-details-container', 'none');
                    displayHide('phone-main-container', 'none');
                    displayHide('container-hide', 'block');
                    displayHide('all-phone', 'none');

                    notifyMsg.innerText = 'Not Found';

                } else {
                    displayPhone(res)
                }

            });
    }
    searchField.value = '';
}
//display phone card
const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container')
    cleanContent('phone-container');
    cleanContent('phone-details');
    let allPhone = phones;
    const phone22 = phones.slice(0, 20);
    phone22.forEach(phone => {
        const div = document.createElement('div');
        div.className = 'col-lg-4 col-md-6 col-12'
        div.innerHTML = `
            <div class="phone-card">
                <img src="${phone.image}" class="w-100" alt="...">
                <div class="card-body">
                    <h5><b>Brand:</b> ${phone.brand}</h5>
                    <h5 class="card-title"><b>Name:</b> ${phone.phone_name}</h5>
                    <p>${phone.slug.releaseDate ? phone.slug.releaseDate : ''}</p>
                </div>
                <div class="text-center">
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="details-btn">See Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);
    })
    displayHide('search-input', 'none');
    displayHide('container-hide', 'block');
    displayHide('phone-main-container', 'block');
    displayHide('all-phone', 'block');


    // Show All Phone Handler
    document.getElementById('all-phone').addEventListener('click', function () {
        cleanContent('phone-container');
        allPhone.forEach(phone => {
            const div = document.createElement('div');
            div.className = 'col-lg-4 col-md-6 col-12'
            div.innerHTML = `
            <div class="phone-card">
                <img src="${phone.image}" class="w-100" alt="...">
                <div class="card-body">
                    <h5><b>Brand:</b> ${phone.brand}</h5>
                    <h5 class="card-title"><b>Name:</b> ${phone.phone_name}</h5>
                    <p>${phone.slug.releaseDate ? phone.slug.releaseDate : ''}</p>
                </div>
                <div class="text-center">
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="details-btn">See Details</button>
                </div>
            </div>
        `
            phoneContainer.appendChild(div);
            displayHide('all-phone', 'none');
        })
    })
}