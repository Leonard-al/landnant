document.getElementById("deleteForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const emailInput = document.getElementById("email");
    const messageDiv = document.getElementById("message");

    const email = emailInput.value.trim();
    if (!email) {
        messageDiv.innerHTML = "Please enter your email.";
        messageDiv.style.color = "red";
        return;
    }

    messageDiv.innerHTML = "Processing...";
    messageDiv.style.color = "#00796b";

    try {
        const response = await fetch("https://us-central1-landnant-4f311.cloudfunctions.net/confirmAccountDeletion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        const responseData = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = "Confirmation email sent! Check your inbox.";
            messageDiv.style.color = "green";
        } else {
            messageDiv.innerHTML = responseData.error || "Something went wrong.";
            messageDiv.style.color = "red";
        }
    } catch (error) {
        console.log(error);
        
        messageDiv.innerHTML = "Error connecting to server.";
        messageDiv.style.color = "red";
    }
});
