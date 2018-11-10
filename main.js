// Common patterns
const EMIAL_PATTERN = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
const NAME_PATTERT = /\w{2,}/i;

// Input fields
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const emailField = document.getElementById("email");

// Validator creators
function createPatternValidator(pattern) {
  return function(value) {
    return pattern.test(value);
  };
}

function createRequiredValidator() {
	return function(value) {
		return value !== '';
	}
}

function createError(message, field, value) {
	return { message, field, value };
}

// Concrete validators
const validateEmail = createPatternValidator(EMIAL_PATTERN);
const validateName = createPatternValidator(NAME_PATTERT);
const validateRequired = createRequiredValidator();

function isEmailValid(value) {
	if (!validateRequired(value)) {
		return createError('Email is required', 'email', value);
	}
	
	if (!validateEmail(value)) {
		return createError('Email is invalid', 'email', value);
	}
	
	return true;
}

function isNameValid(field, value) {
	if (!validateRequired(value)) {
		return createError('Name is required', field, value);
	}
	
	if (!validateName(value)) {
		return createError('Name is invalid', field, value);
	}
	
	return true;
}

function onValidation(field, result) {
  console.trace('onValidationFailed', field, result);
  const invalidEl = document.getElementById(field + 'Invalid');

  if (typeof result === 'object') {
    
    invalidEl.style.display = 'block';
    invalidEl.innerText = result.message;
    return ;
  }

  invalidEl.style.display = 'none';
}

// Bind actions for validate

emailField.addEventListener('blur', function() {
	onValidation('email', isEmailValid(this.value));
});

firstNameField.addEventListener('blur', function() {
	onValidation('firstName', isNameValid('firstName', this.value));
});

lastNameField.addEventListener('blur', function() {
	onValidation('lastName', isNameValid('lastName', this.value));
});


function isAllValid() {
	return isEmailValid(emailField.value) === true
		&& isNameValid(firstNameField.value) === true
		&& isNameValid(lastNameField.value) === true;
}

function onSubmit() {
	if (isAllValid()) {
		return alert('All Valid');
	}
	
  onValidation('firstName', isNameValid('firstName', firstNameField.value));
  onValidation('lastName', isNameValid('lastName', lastNameField.value));
	onValidation('email', isEmailValid('email', emailField.value));
	
	return false;
}