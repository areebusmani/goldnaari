const submitButton = document.getElementById('submit-button');

const successMessage = 'Successfully registered your account. You will be redirected to your dashboard soon'

const errorMessage = 'Something went wrong. Please try again';

let requestInFlight = false;

function alertHandler(text, type) {
   let alerts = document.getElementById('alert-container');

   if (alerts.childElementCount < 2) {
      // Create alert box
      let alertBox = document.createElement('div');
      alertBox.classList.add('alert-msg', 'slide-in');
      if (type === 'error') {
         alertBox.classList.add('error');
      }
      if (type === 'success') {
         alertBox.classList.add('success');
      }

      // Add message to alert box
      let alertMsg = document.createTextNode(text);
      alertBox.appendChild(alertMsg);

      // Add alert box to parent
      alerts.insertBefore(alertBox, alerts.childNodes[0]);

      // Remove last alert box
      alerts.childNodes[1] && alerts.childNodes[1].classList.add('slide-out');
      setTimeout(function () {
         alerts.removeChild(alerts.lastChild);
      }, 5000);
   }
}

function submitForm() {
   if (requestInFlight) {
      return;
   }
   const ownerName = document.getElementById('name').value;
   const businessName = document.getElementById('business').value;
   const phoneNumber = document.getElementById('phone').value;

   if (!ownerName) {
      alertHandler('Please enter your name', 'error');
      return;
   }
   if (!phoneNumber) {
      alertHandler('Please enter your phone number', 'error');
      return;
   }
   if (!/^\d{10}$/.test(phoneNumber)) {
      return alertHandler('Mobile number should be a 10-digit number', 'error');
   }
   if (!businessName) {
      alertHandler('Please enter business name', 'error');
      return;
   }
   const data = { ownerName, businessName, phoneNumber };
   const requestOptions = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   };
   requestInFlight = true;
   fetch('/api/store', requestOptions).then(function (response) {
      requestInFlight = false;
      if (!response.ok) {
         alertHandler(errorMessage, 'error');
      } else {
         alertHandler(successMessage, 'success');
         resetForm();
         setTimeout(() => {
            document.getElementById('dashboard').click();
         }, 3000);
      }
   }).catch(function () {
      requestInFlight = false;
      alertHandler(errorMessage, 'error');
   });
}

function resetForm() {
   document.getElementById('name').value = '';
   document.getElementById('business').value = '';
   document.getElementById('phone').value = '';
}

submitButton.addEventListener('click', submitForm);