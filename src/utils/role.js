export default {
  'admin': ['/teacher', '/student', '/class', '/company', '/internship', '*'],
  'teacher': ['/student', '/internship', '/teaInternship', '*'],
  'student': ['/stuinternship', '/journal', '*'],
  'parent': ['/parentPortInternshipList'],
  'company': ['/companyPortInternshipList', '/companyPortInternshipListed',
    '/companyPortInternshipListIng']
}
