const form = document.querySelector('.account-registration-form')
const checkbox = document.querySelector("#policy-agreement");
const submitBtn = document.querySelector("#submit-btn");
const telInput = document.querySelector('#tel-input')
const phoneErrorMsg = document.querySelector('.phone-error-msg')
const pwInput = document.querySelector('#password')
const pwErrorMsg = document.querySelector('.password-error-msg')
const pwConfirmInput = document.querySelector('#confirm-password')
const pwConfirmErrorMsg = document.querySelector('.password-confirmation-error-msg')

checkbox.addEventListener('change', function() {
  if (this.checked) {
    submitBtn.disabled = false 
  } else {
    submitBtn.disabled = true
  }
});

const showErrorMsg = (errorMsgElement, elementToView) => {
  errorMsgElement.classList.remove('hidden')
  elementToView.scrollIntoView();

  setTimeout(() => {
    errorMsgElement.classList.add('hidden')
  }, 5000);
}

const checkTel = () => {
  const userTelLength = telInput.value.length
  const validation =  userTelLength == 10 ? true : false

  if (!validation) {
    showErrorMsg(phoneErrorMsg, telInput)
  }

  return validation
}

const checkPassword = () => {
  const userPwLength = pwInput.value.length
  const validation =  userPwLength >= 5 ? true : false

  if (!validation) {
    showErrorMsg(pwErrorMsg, pwInput)
  }

  return validation
}

const checkConfirmPassword = () => {
  const userPw = pwInput.value
  const userConfirmPw = pwConfirmInput.value
  const validation =  userPw === userConfirmPw ? true : false

  if (!validation) {
    showErrorMsg(pwConfirmErrorMsg, pwConfirmInput)
  }

  return validation
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const telValidation = checkTel()
  if (!telValidation) {
    return
  }

  const passwordValidation = checkPassword()
  if (!passwordValidation) {
    return
  }

  const confirmPasswordValidation = checkConfirmPassword()
  if (!confirmPasswordValidation) {
    return
  }

  if (telValidation && passwordValidation && confirmPasswordValidation) {
    form.submit();
  }
});