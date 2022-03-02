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

// phone detail card add 
const loadPhoneDetails = loadDetails => {
    displayHide('search-input', 'block');
    displayHide('container-hide', 'none');
    displayHide('all-phone', 'none');

    fetch(`https://openapi.programming-hero.com/api/phone/${loadDetails}`)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));

}
// phoner display card 
const displayPhoneDetails = details => {
    // console.log(details)
    const phoneDetails = document.getElementById('phone-details')
    cleanContent('phone-container');
    phoneDetails.innerHTML = `
            <div class="col-12 col-lg-6 col-md-12">
                <div>
                    <img src="${details.image}" class="w-100 rounded-3" alt="">
                </div>
            </div>
            <div class="col-12 col-lg-6 col-md-12">
                <div>
                    <table class="table">
                        <tbody>
                          <tr>
                            <td>Brand:</td>
                            <td><b>${details?.brand}</b></td>
                          </tr>
                          <tr>
                            <td>Name:</td>
                            <td><b>${details?.name}</b></td>
                          </tr>
                          <tr>
                            <td>ReleaseDate:</td>
                            <td><b>${details?.releaseDate ? details?.releaseDate : "Comming Soon"}</b></td>
                          </tr>
                          <tr>
                            <td>ChipSet:</td>
                            <td><b>${details?.mainFeatures?.chipSet ? details.mainFeatures.chipSet : ""}</b></td>
                          </tr>
                          <tr>
                            <td>Display Size:</td>
                            <td><b>${details?.mainFeatures?.displaySize ? details.mainFeatures.displaySize : ""}</b></td>
                          </tr>
                          <tr>
                            <td>Memory:</td>
                            <td><b>${details?.mainFeatures?.memory ? details.mainFeatures.memory : ""}</b></td>
                          </tr>
                          <tr>
                            <td>Storage:</td>
                            <td><b>${details?.mainFeatures?.storage ? details.mainFeatures.storage : ""}</b></td>
                          </tr>
                          <tr>
                          <td>Bluetooth</td>
                          <td><b>${details?.others?.Bluetooth ? details.others.Bluetooth : ""}</b></td>
                          </tr>
                          <tr>
                            <td>GPS</td>
                            <td><b>${details?.others?.GPS ? details.others.GPS : ""}</b></td>
                          </tr>
                          <tr>
                            <td>NFC</td>
                            <td><b>${details?.others?.NFC ? details.others.NFC : ""}</b></td>
                          </tr>
                          <tr>
                            <td>Radio</td>
                            <td><b>${details?.others?.Radio ? details.others.Radio : ""}</b></td>
                          </tr>
                          <tr>
                            <td>USB</td>
                            <td><b>${details?.others?.USB ? details.others.USB : ""}</b></td>
                          </tr>
                          <tr>
                            <td>WLAN</td>
                            <td><b>${details?.others?.WLAN ? details.others.WLAN : ""}</b></td>
                          </tr>
                          <tr>
                            <td>Sensors</td>
                            <td>
                                 <b>
                                    <ul  class="list-unstyled">
                                        <li>${details?.mainFeatures?.sensors[0] ? details.mainFeatures.sensors[0] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[1] ? details.mainFeatures.sensors[1] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[2] ? details.mainFeatures.sensors[2] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[3] ? details.mainFeatures.sensors[3] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[4] ? details.mainFeatures.sensors[4] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[5] ? details?.mainFeatures.sensors[5] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[6] ? details.mainFeatures.sensors[6] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[7] ? details.mainFeatures.sensors[7] : ""}</li>
                                        <li>${details?.mainFeatures?.sensors[8] ? details.mainFeatures.sensors[8] : ""}</li>
                                    </ul>
                                </b>
                            </td>
                        </tr>
                        </tbody>
                      </table>
                </div>
            </div>
    `
    displayHide('search-input', 'none');
    displayHide('container-hide', 'block');
    displayHide('phone-details-container', 'block');
}