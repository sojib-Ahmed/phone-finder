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
