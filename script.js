const form = document.getElementById("signup-form");
const feedback = document.getElementById("form-feedback");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (form && feedback) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      feedback.textContent = "Please complete all fields before submitting.";
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    feedback.textContent = "";

    try {
      const response = await fetch("https://formspree.io/f/mqejejrj", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        feedback.textContent = "Application sent. I will be in touch within 24 hours.";
        submitBtn.textContent = "Sent";
      } else {
        feedback.style.color = "#c0392b";
        feedback.textContent = "Something went wrong. Please try again or email me directly.";
        submitBtn.disabled = false;
        submitBtn.textContent = "Send my application";
      }
    } catch {
      feedback.style.color = "#c0392b";
      feedback.textContent = "Could not send. Please check your connection and try again.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Send my application";
    }
  });
}
