import brevo from "@getbrevo/brevo";

export const sendEmailWithAttachment = async (attachmentUrl) => {
    try {
        let defaultClient = brevo.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_KEY;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "EPCORN",
            email: process.env.NO_REPLY_EMAIL,
        };
        sendSmtpEmail.to = [
            { email: process.env.STQ_EMAIL },
            { email: process.env.EA_EMAIL },
           // {email: process.env.NO_REPLY_EMAIL},
            { email: process.env.SALES_EMAIL },
            // { email: process.env.COLLEGE_EMAIL },
        ];
        sendSmtpEmail.templateId = 9;
        sendSmtpEmail.attachment = [
            { url: attachmentUrl, name: "Registration of IPM Smark Course.xlsx" },
        ];

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return true; // Email sent successfully
    } catch (error) {
        console.error("Error sending email:", error);
        return false; // Failed to send email
    }
};

export const sendEmailWithOtp = async (emailAddress, otp) => {
    try {
        let defaultClient = brevo.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_KEY;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "EPCORN",
            email: process.env.NO_REPLY_EMAIL,
        };
        sendSmtpEmail.to = [
            { email: emailAddress }
        ];
        sendSmtpEmail.htmlContent = `<h1>${otp}</h1>`; // Set HTML content with OTP value
        sendSmtpEmail.subject = "Your One-Time Password";

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return true; // Email sent successfully
    } catch (error) {
        console.error("Error sending email:", error);
        return false; // Failed to send email
    }
};

export const sendEmailWithLogin = async (obj) => {
    const { email, phone } = obj;
    console.log(phone);
    try {
        let defaultClient = brevo.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_KEY;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "EPCORN",
            email: process.env.NO_REPLY_EMAIL,
        };
        sendSmtpEmail.to = [
            { email: email }
        ];
        sendSmtpEmail.htmlContent = `<div><h1>Login Details</h1>
                                    <h2>Email: <span>${email}</span></h2>
                                    <h2>Password: <span>${phone}</span></h2>
                                    </div>`; // Set HTML content with OTP value
        sendSmtpEmail.subject = "Your Login Details";

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return true; // Email sent successfully
    } catch (error) {
        console.error(`Error sending login details: ${error}`);
        return false;
    }
};

export const sendEmailForRegistration = async (emailAddress, firstName, lastName, phone) => {
    try {
        let defaultClient = brevo.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_KEY;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "EPCORN",
            email: process.env.NO_REPLY_EMAIL,
        };
        sendSmtpEmail.to = [
            { email: emailAddress }
        ];
        sendSmtpEmail.htmlContent = `
                            <div>
                                <span>
                                  On completion of your registration, your application for “Integrated Pest Management” course is under verification.
                                </span>
                                <br/>
                                <span>
                                  We shall get back to you as soon as possible with our confirmation.
                                </span>
                                <br/>
                                <span>
                                  The 1st merit list will be out on 15th May 2024.
                                </span>
                                <br/>
                                <span>
                                  Those students who are shortlisted for “IPM course” will further receive a payment link for application form fees of Rs. 100/- which must be paid in order to proceed.
                                </span>
                            </div>
                            <br/>
                            <br/>
                            <p>
                            <b>Thanking you</b>
                            </br>
                            <b>Serampore College & S Mark</b>
                            </p>
                    
                                    `
        sendSmtpEmail.subject = "Welcome to “Integrated Pest Management” Course.";

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return true; // Email sent successfully
    } catch (error) {
        console.error("Error sending email:", error);
        return false; // Failed to send email
    }
};

