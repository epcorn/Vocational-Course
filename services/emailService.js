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
      //email: process.env.NO_REPLY_EMAIL,
      email: process.env.EA_EMAIL,
    };
    sendSmtpEmail.to = [
      { email: process.env.STQ_EMAIL },
      // { email: process.env.EA_EMAIL },
      { email: process.env.NO_REPLY_EMAIL },
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
    sendSmtpEmail.to = [{ email: emailAddress }];
    sendSmtpEmail.htmlContent = `<h1>${otp}</h1>`; // Set HTML content with OTP value
    sendSmtpEmail.subject = "Your One-Time Password";

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Failed to send email
  }
};

export const sendEmailWithCode = async (emailAddress, code, id) => {
  try {
    let defaultClient = brevo.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_KEY;

    let apiInstance = new brevo.TransactionalEmailsApi();

    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "EPCORN",
      email: process.env.EA_EMAIL,
    };

    sendSmtpEmail.to = [{ email: emailAddress }];

    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>Announcement: 1st Merit List for IPM Course!</h2>
          <p>Dear Prospective Students,</p>
          <p>We are glad to announce our 1st Merit List for the "Integrated Pest Management (IPM) course at Serampore College".</p>
          <p>Congratulations to you, we request you to complete the payment of your fees & secure you admission.</p>
          <p>To proceed with the admission process, please follow the steps below:</p>
          <ol>
            <li><strong>Verification of Details</strong>: Visit the following link to verify your details: <a href=${
              "https://www.ipm.in-smark.com/meritList/" + id
            }>Verification Portal</a></li>
            <li>
              <strong>Payment</strong>: Complete the payment via bank transfer using the details provided below.
              <br />
              <strong>Bank Name</strong> – Bank of Baroda
              <br />
              <strong>IFSC Code</strong> – BARB0VJSERA
              <br />
              <strong>Bank Account Number</strong> - 779101000000654
            </li>
            <li><strong>Payment Proof</strong>: Upload the proof of payment to finalise your admission.</li>
          </ol>
          <p>We are providing you with a secure key passcode which you may need if you wish to access to update the payments from the website directly.</p>
          <p><strong>Passcode:</strong> ${code}</p>
          <p><em>Hurry and don't miss out the opportunity.</em></p>
          <hr>
          <p><strong>For any queries contact college on below details:</strong></p>
          <p><strong>Dr. Sanjay Sarkar – 9836689926</strong><br>
          <a href="mailto:sanjay@seramporecollege.ac.in">sanjay@seramporecollege.ac.in</a></p>
          <p><strong>Dr. Subarna Ghosh – 8910434568</strong><br>
          <a href="mailto:Subarnag86@gmail.com">Subarnag86@gmail.com</a></p>
        </body>
      </html>
    `;

    sendSmtpEmail.subject = "1st Merit List for IPM Course - Serampore College";

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true;
  } catch (error) {
    console.error(`Error sending email to: ${emailAddress}`, error);
    return false;
  }
};

export const sendEmailWithLogin = async (obj) => {
  const { email, phone } = obj;
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
    sendSmtpEmail.to = [{ email: email }];
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

export const sendEmailForRegistration = async (
  emailAddress,
  firstName,
  lastName,
  phone
) => {
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
    sendSmtpEmail.to = [{ email: emailAddress }];
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
                    
                                    `;
    sendSmtpEmail.subject = "Welcome to “Integrated Pest Management” Course.";

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Failed to send email
  }
};
