const form = document.querySelector('.account-registration-form')
const telInput = document.querySelector("#tel-input");
const checkbox = document.querySelector("#policy-agreement");
const submitBtn = document.querySelector("#submit-btn");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    submitBtn.disabled = false 
  } else {
    submitBtn.disabled = true
  }
});

const checkTel = () => {
  const userTel = telInput.value
  
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reportValidity()

  // checkTel()
  // checkPassword()

  form.submit();
});