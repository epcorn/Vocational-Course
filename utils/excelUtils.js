import exceljs from "exceljs";

const generateExcelFile = async (
  uniqueEmailIdStudents,
  studentDoneTillUpload,
  visitors,
  meritList
) => {
  try {
    const workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("All Students");

    worksheet.columns = [
      { header: "Created At", key: "createdAt" },
      { header: "First Name", key: "firstName" },
      { header: "Middle Name", key: "middleName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Alternate Phone", key: "alternatePhone" },
      { header: "Date Of Birth", key: "dob" },
      { header: "Gender", key: "gender" },
      { header: "Blood Group", key: "blood" },
      { header: "Disability", key: "disability" },
      { header: "Nationality", key: "nationality" },
      { header: "Religion", key: "religion" },
      { header: "Caste", key: "caste" },
      { header: "Father Name", key: "fatherName" },
      { header: "Mother Name", key: "motherName" },
      { header: "Income", key: "income" },
      { header: "Guardian Name", key: "guardianName" },
      { header: "Relation Guardian", key: "relationGuardian" },
      { header: "Income Guardian", key: "incomeGuardian" },
      { header: "Address", key: "address" },
      { header: "City", key: "city" },
      { header: "Pincode", key: "pincode" },
      { header: "10th Percentage", key: "percentage10" },
      { header: "10th board", key: "board10" },
      { header: "12th Percentage", key: "percentage12" },
      { header: "12th board", key: "board12" },
      { header: "Last University", key: "lastUniversity" },
      { header: "Passing Year", key: "passingYear" },
      { header: "Roll No", key: "rollNo" },
      { header: "Reg No", key: "regNo" },
      { header: "Best Of 4", key: "best4" },
      { header: "Extra Course", key: "extraCourse" },
      { header: "Passport Size Images", key: "passportPics" },
      { header: "Aadhar Card", key: "aadharCard" },
      { header: "Cast Certificate", key: "castCertificate" },
      { header: "10th marksheet", key: "marksheet10" },
      { header: "12th marksheet", key: "marksheet12" },
      { header: "Vocational Certification", key: "vocationalCerti" },
      { header: "Payment Image", key: "paymentSS" },
    ];

    uniqueEmailIdStudents.forEach((student) => {
      worksheet.addRow({
        createdAt: student.createdAt,
        firstName: student.details.firstName,
        middleName: student.details.middleName,
        lastName: student.details.lastName,
        email: student.details.email,
        phone: student.details.phone,
        alternatePhone: student.details.alternatePhone,
        dob: student.details.dob,
        gender: student.details.gender,
        blood: student.details.blood,
        disability: student.details.disability,
        nationality: student.details.nationality,
        religion: student.details.religion,
        caste: student.details.caste,
        fatherName: student.details.fatherName,
        motherName: student.details.motherName,
        income: student.details.income,
        guardianName: student.details.guardianName,
        relationGuardian: student.details.relationGuardian,
        incomeGuardian: student.details.incomeGuardian,
        address: student.details.address,
        city: student.details.city,
        pincode: student.details.pincode,
        percentage10: student.details.percentage10,
        percentage12: student.details.percentage12,
        board12: student.details.board12,
        lastUniversity: student.details.lastUniversity,
        passingYear: student.details.passingYear,
        rollNo: student.details.rollNo,
        regNo: student.details.regNo,
        best4: student.details.best4,
        extraCourse: student.details.extraCourse,
        passportPics: student.details.passportPics[0],
        aadharCard: student.details.aadharCard[0],
        castCertificate: student.details.castCertificate[0],
        marksheet10: student.details.marksheet10[0],
        marksheet12: student.details.marksheet12[0],
        vocationalCerti: student.details.vocationalCerti[0],
        paymentSS: student.details.paymentSS,
      });
    });

    let finishedApplication = workbook.addWorksheet("Finished Application");
    finishedApplication.columns = [
      { header: "Id", key: "_id" },
      { header: "Created At", key: "createdAt" },
      { header: "First Name", key: "firstName" },
      { header: "Middle Name", key: "middleName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Alternate Phone", key: "alternatePhone" },
      { header: "Date Of Birth", key: "dob" },
      { header: "Gender", key: "gender" },
      { header: "Blood Group", key: "blood" },
      { header: "Disability", key: "disability" },
      { header: "Nationality", key: "nationality" },
      { header: "Religion", key: "religion" },
      { header: "Caste", key: "caste" },
      { header: "Father Name", key: "fatherName" },
      { header: "Mother Name", key: "motherName" },
      { header: "Income", key: "income" },
      { header: "Guardian Name", key: "guardianName" },
      { header: "Relation Guardian", key: "relationGuardian" },
      { header: "Income Guardian", key: "incomeGuardian" },
      { header: "Address", key: "address" },
      { header: "City", key: "city" },
      { header: "Pincode", key: "pincode" },
      { header: "10th Percentage", key: "percentage10" },
      { header: "10th board", key: "board10" },
      { header: "12th Percentage", key: "percentage12" },
      { header: "12th board", key: "board12" },
      { header: "Last University", key: "lastUniversity" },
      { header: "Passing Year", key: "passingYear" },
      { header: "Roll No", key: "rollNo" },
      { header: "Reg No", key: "regNo" },
      { header: "Best Of 4", key: "best4" },
      { header: "Extra Course", key: "extraCourse" },
      { header: "Passport Size Images", key: "passportPics" },
      { header: "Aadhar Card", key: "aadharCard" },
      { header: "Cast Certificate", key: "castCertificate" },
      { header: "10th marksheet", key: "marksheet10" },
      { header: "12th marksheet", key: "marksheet12" },
      { header: "Vocational Certification", key: "vocationalCerti" },
      { header: "Payment Image", key: "paymentSS" },
    ];

    studentDoneTillUpload.forEach((student) => {
      finishedApplication.addRow({
        _id: student._id,
        createdAt: student.createdAt,
        firstName: student.details.firstName,
        middleName: student.details.middleName,
        lastName: student.details.lastName,
        email: student.details.email,
        phone: student.details.phone,
        alternatePhone: student.details.alternatePhone,
        dob: student.details.dob,
        gender: student.details.gender,
        blood: student.details.blood,
        disability: student.details.disability,
        nationality: student.details.nationality,
        religion: student.details.religion,
        caste: student.details.caste,
        fatherName: student.details.fatherName,
        motherName: student.details.motherName,
        income: student.details.income,
        guardianName: student.details.guardianName,
        relationGuardian: student.details.relationGuardian,
        incomeGuardian: student.details.incomeGuardian,
        address: student.details.address,
        city: student.details.city,
        pincode: student.details.pincode,
        percentage10: student.details.percentage10,
        percentage12: student.details.percentage12,
        board12: student.details.board12,
        lastUniversity: student.details.lastUniversity,
        passingYear: student.details.passingYear,
        rollNo: student.details.rollNo,
        regNo: student.details.regNo,
        best4: student.details.best4,
        extraCourse: student.details.extraCourse,
        passportPics: student.details.passportPics[0],
        aadharCard: student.details.aadharCard[0],
        castCertificate: student.details.castCertificate[0],
        marksheet10: student.details.marksheet10[0],
        marksheet12: student.details.marksheet12[0],
        vocationalCerti: student.details.vocationalCerti[0],
        paymentSS: student.details.paymentSS,
      });
    });

    let visitorWorksheet = workbook.addWorksheet("Visitors");

    visitorWorksheet.columns = [
      { header: "Created At", key: "createdAt" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
    ];

    visitors.forEach((visitor) => {
      visitorWorksheet.addRow({
        createdAt: visitor.createdAt,
        email: visitor.email,
        phone: visitor.phone,
      });
    });

    let meritListWorksheet = workbook.addWorksheet("Merit List");
    meritListWorksheet.columns = [
      { header: "Email", key: "email" },
      { header: "Payment SS", key: "paymentSS" },
      { header: "UTR", key: "utr" },
      { header: "Passcode", key: "code" },
      { header: "Name", key: "firstName" },
      { header: "Lastname", key: "lastName" },
    ];
    meritList.forEach((student) => {
      meritListWorksheet.addRow({
        email: student.details.email,
        paymentSS: student.details.paymentSS,
        utr: student.utr,
        code: student.code,
        firstName: student.details.firstName,
        lastName: student.details.lastName,
      });
    });

    // Write workbook to a file
    const filePath = "./tmp/Registration.xlsx";
    await workbook.xlsx.writeFile(filePath);

    return filePath; // Return the file path of the generated Excel file
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw new Error("Error generating Excel file");
  }
};

export { generateExcelFile };
