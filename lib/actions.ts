"use server"

export async function sendContactForm(formData: FormData) {
  try {
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    console.log("Contact form submission:", { name, email, subject, message })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error sending contact form:", error)
    return { success: false, error: "Failed to send message. Please try again." }
  }
}

