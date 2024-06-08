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
      //{ email: process.env.STQ_EMAIL },
      // { email: process.env.EA_EMAIL },
      { email: process.env.NO_REPLY_EMAIL },
      //{ email: process.env.SALES_EMAIL },
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
          <h2>Announcement: 2nd Merit List for IPM Course!</h2>
          <p>Dear Prospective Students,</p>
          <p>We are glad to announce our 2nd Merit List for the "Integrated Pest Management (IPM) course at Serampore College".</p>
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

    sendSmtpEmail.subject = "2nd Merit List for IPM Course - Serampore College";

    const heghey = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(heghey);
    return true;
  } catch (error) {
    console.error(`Error sending email to: ${emailAddress}`, error);
    return false;
  }
};

export const reminderEmail = async (emailAddress, code, id) => {
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
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #333;
              background-color: #f8f9fa;
              padding: 20px;
            }
            h2 {
              color: #007bff;
              font-size: 28px;
              margin-bottom: 20px;
              text-align: center;
            }
            ol {
              margin-left: 30px;
              list-style-type: decimal;
            }
            li {
              margin-bottom: 15px;
            }
            a {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
            a:hover {
              text-decoration: underline;
            }
            .passcode {
              font-weight: bold;
              color: #dc3545;
              font-size: 18px;
            }
            hr {
              border: none;
              border-top: 2px solid #ccc;
              margin: 30px 0;
            }
            .contact {
              background-color: #f1f1f1;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
        <h2>Reminder: Complete Your Admission Process</h2>
          <p>Dear Student,</p>
          <p>We hope this email finds you well. This is a reminder regarding the pending payment for securing your admission to the "Integrated Pest Management (IPM) course" at our esteemed institution.</p>
          <p>We understand that this course presents a valuable opportunity for your personal and professional growth, and we encourage you to take advantage of it. As communicated earlier, the benefits of this course include:</p>
          <ol>
            <li>Open up avenues for social upliftment.</li>
            <li>Bring more interest in vocational formats, which are increasingly in demand.</li>
            <li>Further skill development, equipping you with practical knowledge and expertise.</li>
            <li>Open up new horizons for new generations, providing a platform for personal and professional growth.</li>
            <li>Improve employability, increasing your chances of securing rewarding job opportunities.</li>
            <li>Allow better acceptance in overseas employment, broadening your career prospects globally.</li>
            <li>Offer recession-proof employment opportunities, ensuring a stable and secure future.</li>
          </ol>
          <p>To proceed with the admission process, please follow these steps:</p>
          <ol>
            <li><strong>Verification of Details</strong>: Visit the Verification Portal <a href="${
              "https://www.ipm.in-smark.com/meritList/" + id
            }">Verification Portal</a> to verify your details.</li>
            <li>
              <strong>Payment</strong>: Complete the payment via bank transfer using the following details:
              <br />
              <strong>Bank Name</strong> – Bank of Baroda
              <br />
              <strong>IFSC Code</strong> – BARB0VJSERA
              <br />
              <strong>Bank Account Number</strong> - 779101000000654
            </li>
            <li><strong>Payment Proof</strong>: Upload the proof of payment to <a href="#">Link</a> to finalize your admission.</li>
          </ol>
          <p>We strongly encourage you to seize this valuable opportunity and complete the payment process at your earliest convenience. By doing so, you will not only secure your admission but also take a significant step towards a promising future in the field of Integrated Pest Management.</p>
          <p>We are providing you with a secure key passcode which you may need if you wish to access to update the payments from the website directly.</p>
          <p><span class="passcode">Passcode: ${code}</span></p>
          <hr>
          <div class="contact">
            <p><strong>For any queries, please contact the college on the following details:</strong></p>
            <p><strong>Dr. Sanjay Sarkar – 9836689926</strong><br>
            <a href="mailto:sanjay@seramporecollege.ac.in">sanjay@seramporecollege.ac.in</a></p>
            <p><strong>Dr. Subarna Ghosh – 8910434568</strong><br>
            <a href="mailto:Subarnag86@gmail.com">Subarnag86@gmail.com</a></p>
          </div>
        </body>
      </html>
    `;

    sendSmtpEmail.subject = "Reminder for IPM course";

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return true;
  } catch (error) {
    console.error(`Error sending email to: ${emailAddress}`, error);
    return false;
  }
};

export const reFillThePaymentForm = async (emailAddress, code, id) => {
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
  <head>
  <style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
    padding: 20px;
  }
  h2 {
    color: #007bff;
    font-size: 28px;
    margin-bottom: 20px;
    text-align: center;
  }
  ol {
    margin-left: 30px;
    list-style-type: decimal;
  }
  li {
    margin-bottom: 15px;
  }
  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
  .passcode {
    font-weight: bold;
    color: #dc3545;
    font-size: 18px;
  }
  hr {
    border: none;
    border-top: 2px solid #ccc;
    margin: 30px 0;
  }
  .contact {
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
  </head>
  <body>
    <h2>Important: Upload Payment Proof for Admission</h2>
    <p>Dear Student,</p>
    <p>It has come to our attention that you have not yet uploaded the payment proof for securing your admission to the "Integrated Pest Management (IPM) course" at our institution.</p>
    <p>To complete the admission process, please follow these steps:</p>
    <ol>
      <li>
        <strong>Payment Proof</strong>: Upload the proof of payment (UTR or Bank Receipt/Screenshot) to
        <a href="${
          "https://www.ipm.in-smark.com/meritList/" + id
        }">Payment Portal</a>.
      </li>
    </ol>
    <p>Providing the payment proof is mandatory to finalize your admission. We kindly request you to complete this step at your earliest convenience.</p>
    <p>If you have already uploaded the payment proof, please disregard this message.</p>
    <p>We are providing you with a secure key passcode which you may need if you wish to access to update the payments from the website directly.</p>
    <p><span class="passcode">Passcode: ${code}</span></p>
    <hr />
    <div class="contact">
      <p><strong>For any queries, please contact the college on the following details:</strong></p>
      <p>
        <strong>Dr. Sanjay Sarkar – 9836689926</strong
        ><br />
        <a href="mailto:sanjay@seramporecollege.ac.in">sanjay@seramporecollege.ac.in</a>
      </p>
      <p>
        <strong>Dr. Subarna Ghosh – 8910434568</strong><br />
        <a href="mailto:Subarnag86@gmail.com">Subarnag86@gmail.com</a>
      </p>
    </div>
  </body>
</html>
    `;

    sendSmtpEmail.subject = "Upload Payment Proof for Admission";

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
