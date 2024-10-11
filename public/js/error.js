const errorMessage = "<%= errorMessage %>";
if (errorMessage && errorMessage !== 'undefined' && errorMessage !== 'null') {
    const errorMessageElement = document.createElement('p');
    errorMessageElement.innerText = 'Error: ' + errorMessage;
    errorMessageElement.style.color = 'rgb(255, 170, 0)';
    document.body.insertBefore(errorMessageElement, document.body.firstChild);
}