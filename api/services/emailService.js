import brevo from "@getbrevo/brevo";

const sendEmailWithAttachment = async (attachmentUrl) => {
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
            { email: process.env.SALES_EMAIL },
            { email: process.env.COLLEGE_EMAIL },
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

export default sendEmailWithAttachment;
