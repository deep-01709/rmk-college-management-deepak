// Basic front-end logic: saves to localStorage (demo only)
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('admissionForm');
const msg = document.getElementById('message');
const saveBtn = document.getElementById('saveDraft');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    program: form.program.value,
    address: form.address.value.trim(),
    timestamp: new Date().toISOString()
  };
  // Save demo submission in localStorage for review
  const submissions = JSON.parse(localStorage.getItem('rmk_submissions') || '[]');
  submissions.push(data);
  localStorage.setItem('rmk_submissions', JSON.stringify(submissions));
  msg.textContent = "Application saved (demo). We'll contact you at " + data.email;
  form.reset();
});

saveBtn.addEventListener('click', () => {
  // Save a draft
  const draft = {
    name: form.name.value,
    email: form.email.value,
    program: form.program.value,
    phone: form.phone.value,
    address: form.address.value,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem('rmk_draft', JSON.stringify(draft));
  msg.textContent = "Draft saved locally.";
});

// Optionally load draft on page load
window.addEventListener('load', () => {
  const draft = JSON.parse(localStorage.getItem('rmk_draft') || 'null');
  if (draft) {
    // Small hint to user
    msg.textContent = "A draft was found. Fields were prefilled.";
    form.name.value = draft.name || '';
    form.email.value = draft.email || '';
    form.program.value = draft.program || '';
    form.phone.value = draft.phone || '';
    form.address.value = draft.address || '';
  }
});
