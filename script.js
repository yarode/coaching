const form = document.getElementById("signup-form");
const feedback = document.getElementById("form-feedback");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      feedback.textContent = "Please complete all fields before submitting.";
      return;
    }

    const formData = new FormData(form);
    const entry = {
      name: formData.get("name"),
      email: formData.get("email"),
      focus: formData.get("focus"),
      goal: formData.get("goal"),
      submittedAt: new Date().toISOString(),
    };

    const existingEntries = JSON.parse(localStorage.getItem("coachingLeads") || "[]");
    existingEntries.push(entry);
    localStorage.setItem("coachingLeads", JSON.stringify(existingEntries));

    form.reset();
    feedback.textContent =
      "Thanks. Your application has been saved and you can now follow up with your preferred backend or CRM integration.";
  });
}
