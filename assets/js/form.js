async function handleFormSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    try {
        // Send a POST request to the API
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(formData)) // Convert form data to JSON
        });

        // Get the success and error message elements by their IDs
        const successMessage = document.getElementById("success-message");
        const errorMessage = document.getElementById("error-message");

        // If the status is 200, show success message and reset the form
        if (response.status === 200) {
            successMessage.textContent = "Thank you for your message. We will reply to you shortly!";
            successMessage.classList.remove("d-none"); // Show success message
            errorMessage.classList.add("d-none"); // Hide error message
            document.getElementById("service-form").reset(); // Reset the form
        } else {
            // Log the error response and show an error message
            console.log(response);
            errorMessage.textContent = "Something went wrong! Please try again.";
            errorMessage.classList.remove("d-none"); // Show error message
            successMessage.classList.add("d-none"); // Hide success message
        }
    } catch (error) {
        // Catch and log any errors during form submission
        console.log(error);

        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "An error occurred while submitting the form.";
        errorMessage.classList.remove("d-none"); // Show error message
    }
}
