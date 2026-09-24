

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  const fields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    terms: document.getElementById('terms'),
  };

 
  function getErrorEl(input) {
    let wrapper = input.closest('.field') || input.closest('.terms') || input.parentElement;
    let err = wrapper.querySelector('.error-msg');
    if (!err) {
      err = document.createElement('span');
      err.className = 'error-msg';
      err.style.color = '#C0392B';
      err.style.fontSize = '12px';
      err.style.marginTop = '4px';
      err.style.display = 'none';
      wrapper.appendChild(err);
    }
    return err;
  }

  function setError(input, message) {
    const err = getErrorEl(input);
    if (message) {
      err.textContent = message;
      err.style.display = 'block';
      input.style.borderColor = '#C0392B';
    } else {
      err.textContent = '';
      err.style.display = 'none';
      input.style.borderColor = '';
    }
  }

  function validateName(input, label) {
    const value = input.value.trim();
    if (!value) return (setError(input, label + ' is required'), false);
    if (value.length < 2) return (setError(input, label + ' is too short'), false);
    setError(input, '');
    return true;
  }

  function validateEmail(input) {
    const value = input.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return (setError(input, 'Email is required'), false);
    if (!re.test(value)) return (setError(input, 'Enter a valid email address'), false);
    setError(input, '');
    return true;
  }

  function validatePhone(input) {
    const value = input.value.trim();
    const digits = value.replace(/\D/g, '');
    if (!value) return (setError(input, 'Contact number is required'), false);
    if (digits.length < 10 || digits.length > 12) {
      setError(input, 'Enter a valid phone number');
      return false;
    }
    setError(input, '');
    return true;
  }

  function validateAddress(input) {
    const value = input.value.trim();
    if (!value) return (setError(input, 'Property address is required'), false);
    if (value.length < 5) return (setError(input, 'Please enter a complete address'), false);
    setError(input, '');
    return true;
  }

  function validatePassword(input) {
    const value = input.value;
    if (!value) return (setError(input, 'Password is required'), false);
    if (value.length < 8) return (setError(input, 'Password must be at least 8 characters'), false);
    if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
      setError(input, 'Use a mix of letters and numbers');
      return false;
    }
    setError(input, '');
    return true;
  }

  function validateConfirmPassword() {
    const value = fields.confirmPassword.value;
    if (!value) return (setError(fields.confirmPassword, 'Please confirm your password'), false);
    if (value !== fields.password.value) {
      setError(fields.confirmPassword, 'Passwords do not match');
      return false;
    }
    setError(fields.confirmPassword, '');
    return true;
  }

  function validateTerms() {
    if (!fields.terms.checked) {
      setError(fields.terms, 'You must agree to continue');
      return false;
    }
    setError(fields.terms, '');
    return true;
  }

  // Live validation as the user types/blurs
  fields.firstName.addEventListener('blur', () => validateName(fields.firstName, 'First name'));
  fields.lastName.addEventListener('blur', () => validateName(fields.lastName, 'Last name'));
  fields.email.addEventListener('blur', () => validateEmail(fields.email));
  fields.phone.addEventListener('blur', () => validatePhone(fields.phone));
  fields.address.addEventListener('blur', () => validateAddress(fields.address));
  fields.password.addEventListener('input', () => {
    validatePassword(fields.password);
    if (fields.confirmPassword.value) validateConfirmPassword();
  });
  fields.confirmPassword.addEventListener('input', validateConfirmPassword);
  fields.terms.addEventListener('change', validateTerms);

  // Simple password strength hint update
  const hint = document.querySelector('.hint');
  fields.password.addEventListener('input', function () {
    const value = fields.password.value;
    if (!hint) return;
    if (value.length === 0) {
      hint.textContent = 'Use 8+ characters with a mix of letters and numbers.';
      hint.style.color = '';
    } else if (value.length < 8) {
      hint.textContent = 'Too short — needs at least 8 characters.';
      hint.style.color = '#C0392B';
    } else if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
      hint.textContent = 'Add both letters and numbers for a stronger password.';
      hint.style.color = '#C97A2B';
    } else {
      hint.textContent = 'Looks good!';
      hint.style.color = '#1F8A70';
    }
  });

  // Full validation + submit handling
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const validations = [
      validateName(fields.firstName, 'First name'),
      validateName(fields.lastName, 'Last name'),
      validateEmail(fields.email),
      validatePhone(fields.phone),
      validateAddress(fields.address),
      validatePassword(fields.password),
      validateConfirmPassword(),
      validateTerms(),
    ];

    const isValid = validations.every(Boolean);

    if (!isValid) {
      const firstInvalid = form.querySelector('input[style*="border-color"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    // Simulate account creation (replace with a real fetch() call to your backend/API)
    setTimeout(function () {
      submitBtn.textContent = 'Account created ✓';
      submitBtn.style.background = '#1F8A70';

      const successMsg = document.createElement('p');
      successMsg.textContent = 'Welcome to Sun Son Solar! Redirecting you to your dashboard...';
      successMsg.style.color = '#1F8A70';
      successMsg.style.fontSize = '13px';
      successMsg.style.textAlign = 'center';
      successMsg.style.marginTop = '10px';
      form.appendChild(successMsg);

      // Example redirect after "success" — adjust to your real flow
      setTimeout(function () {
        // window.location.href = 'dashboard.html';
      }, 1500);
    }, 1200);
  });
});
