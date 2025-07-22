// Language toggle elements
const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');

langToggle.addEventListener('click', () => {
  langMenu.classList.toggle('show');  // Use class toggle for better CSS control
});

// Close language menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-container')) {
    langMenu.classList.remove('show');
  }
});

// Translations object
const translations = {
  en: {
    welcome: "Welcome to the Cross-Border Seller Center",
    country: "Country/Region of Company Registration",
    email: "Email Address",
    password: "Set up an account password",
    phone: "Bind Phone Number",
    terms1: "I agree to the Cross-border Merchant Unified Warehouse Services Agreement",
    terms2: "I agree to the Consent Letter for Cross-border Transmission and Processing",
    submit: "Registration",
    toggle: "🌐 English ⏷"
  },
  bn: {
    welcome: "ক্রস-বর্ডার বিক্রেতা সেন্টারে স্বাগতম",
    country: "কোম্পানির নিবন্ধন দেশ/অঞ্চল",
    email: "ইমেইল ঠিকানা",
    password: "একটি পাসওয়ার্ড সেট করুন",
    phone: "ফোন নম্বর যুক্ত করুন",
    terms1: "আমি ক্রস-বর্ডার বিক্রেতা ইউনিফাইড ওয়্যারহাউজ পরিষেবা চুক্তিতে সম্মত",
    terms2: "আমি তথ্য প্রক্রিয়াকরণের সম্মতিপত্রে সম্মত",
    submit: "নিবন্ধন",
    toggle: "🌐 বাংলা ⏷"
  }
};

// Update UI texts on language selection
langMenu.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const lang = item.dataset.lang;
    if (!translations[lang]) return;

    document.getElementById('welcome').textContent = translations[lang].welcome;
    document.getElementById('label-country').textContent = translations[lang].country + " *";
    document.getElementById('label-email').textContent = translations[lang].email + " *";
    document.getElementById('label-password').textContent = translations[lang].password + " *";
    document.getElementById('label-phone').textContent = translations[lang].phone + " *";
    document.getElementById('termsText1').textContent = translations[lang].terms1;
    document.getElementById('termsText2').textContent = translations[lang].terms2;
    document.getElementById('submitBtn').textContent = translations[lang].submit;
    langToggle.textContent = translations[lang].toggle;

    langMenu.classList.remove('show');
  });
});

// Validation regex patterns and functions
const validators = {
  email: value => /^\S+@\S+\.\S+$/.test(value),
  phone: value => /^\d{10,15}$/.test(value),
  password: value => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/.test(value),
  confirmPassword: () => 
    document.getElementById('password').value === document.getElementById('confirmPassword').value
};

// Form element
const form = document.getElementById('registrationForm');

// Attach validation event listeners
form.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', () => validateField(input));
  input.addEventListener('blur', () => validateField(input));
});

// Validation logic
function validateField(input) {
  const error = input.nextElementSibling;
  const value = input.value.trim();
  let valid = true;
  let errorMsg = "";

  switch (input.id) {
    case 'email':
      valid = validators.email(value);
      errorMsg = valid ? "" : "Invalid email format";
      break;
    case 'phone':
      valid = validators.phone(value);
      errorMsg = valid ? "" : "Invalid phone number (10-15 digits)";
      break;
    case 'password':
      valid = validators.password(value);
      errorMsg = valid ? "" : "Password must be at least 6 chars, include uppercase, lowercase, digit, and special char";
      break;
    case 'confirmPassword':
      valid = validators.confirmPassword();
      errorMsg = valid ? "" : "Passwords do not match";
      break;
    default:
      valid = value.length > 0;
      errorMsg = valid ? "" : "This field is required";
  }

  error.textContent = errorMsg;
  return valid;
}

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let allValid = true;

  form.querySelectorAll('input, select').forEach(input => {
    if (!validateField(input)) {
      allValid = false;
    }
  });

  // Terms checkboxes validation
  const terms1 = document.getElementById('terms1');
  const terms2 = document.getElementById('terms2');
  const termsError = terms2.parentElement.nextElementSibling; // Assuming error element just after checkbox group

  if (!terms1.checked || !terms2.checked) {
    termsError.textContent = "You must agree to all terms";
    allValid = false;
  } else {
    termsError.textContent = "";
  }

  if (allValid) {
    alert("Form submitted successfully!");
    // TODO: Implement actual submission logic (AJAX/fetch or form submit)
  }
});
