const btnEl = document.querySelector(".btn");
const inputEl = document.getElementById("input");
const copyIconEl = document.querySelector(".fa-copy");
const alertContainerEl = document.querySelector(".alert-container");

// Password configuration
const config = {
  length: 14,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true
};

btnEl.addEventListener("click", () => {
  createPassword();
});

copyIconEl.addEventListener("click", async () => {
  if (!inputEl.value) {
    showAlert('Generate password first🚫', 'error');
    return;
  }
  
  try {
    await copyPassword();
    showAlert('Password copied✅!', 'success');
  } catch (err) {
    showAlert('Failed to copy', 'error');
    console.error('Failed to copy password: ', err);
  }
});

function createPassword() {
  const charSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+?:{}[]'
  };
  
  let chars = '';
  Object.entries(charSets).forEach(([key, value]) => {
    if (config[key]) chars += value;
  });

  if (!chars) {
    showAlert('Select at least one character type', 'error');
    return;
  }

  let password = '';
  for (let i = 0; i < config.length; i++) {
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % chars.length;
    password += chars[randomIndex];
    showAlert('Password Generated ✅!', 'info');
  }
  
  inputEl.value = password;
}

async function copyPassword() {
  inputEl.select();
  inputEl.setSelectionRange(0, 9999);
  await navigator.clipboard.writeText(inputEl.value);
}

function showAlert(message, type) {
  alertContainerEl.textContent = message;
  alertContainerEl.className = `alert-container ${type}`;
  
  setTimeout(() => {
    alertContainerEl.classList.remove('active');
  }, 10);
  
  setTimeout(() => {
    alertContainerEl.classList.add('active');
  }, 10000);
}