import React from "react";
import Modal from "../../../components/ui/Modal";

const TermsModal = ({ isOpen, onClose }) => {
  const termsContent = `AUTOSAAS INITIATIVE TERMS AND CONDITIONS

Eligibility
• Applicants must possess a valid undergraduate degree from a recognized institution.
• Applicants must be citizens or legal residents of Nigeria.
• Applicants must meet the academic, examination, and documentation requirements specified by the scholarship committee.
• Applicants must be aged minimum 18.

Application Fee
• A non-refundable application fee of 10,000 naira is required to process each submission.
• Payment must be made through approved channels listed on the application portal.
• Multiple applications from the same individual will require separate fees.

Selection Process
• Selection is strictly merit-based and includes performance in qualifying exams, interviews, and/or submitted materials.
• The scholarship committee reserves the right to verify academic records and conduct background checks.
• Decisions are final and not subject to appeal or external influence.
• Applicants will undergo a timed online examination designed to assess general knowledge, logical reasoning, and cognitive agility.
• The test will be administered under strict time constraints: 15 minutes total.
• The number of questions will not be disclosed to applicants prior to or during the exam.
• Questions will be randomly shuffled for each applicant to minimize the risk of cheating or collusion.
• The test interface will be monitored for suspicious activity, and any attempt to manipulate or bypass the system will result in disqualification.
• Scores will be calculated based on accuracy and speed, with priority given to applicants who demonstrate exceptional performance.
• The top-performing candidates will be shortlisted for scholarship consideration.
• The organization reserves the right to conduct follow-up interviews or request additional documentation from shortlisted candidates.
• All decisions made by the scholarship committee regarding test results and selection are final and binding.

Scholarship Bond or Obligations
"Recipients of the Autosaas Scholarship are not obligated to work for Autosaas following the award. However, Autosaas may extend optional opportunities to selected recipients, including but not limited to employments, internships, research collaborations, mentorship programs, or other forms of engagement. These opportunities will be offered only if relevant positions or projects are available, and participation will be entirely voluntary and based on the recipient's interest. No aspect of the scholarship implies or requires future service or commitment to Autosaas."

Anonymity Assurance
"This examination is conducted anonymously. No personal data is collected before, during, or after the test. All responses are evaluated solely on performance metrics. Applicants are advised not to include any identifying information in their answers."

Program Scope
• The scholarship aims to sponsor successful candidates for postgraduate study in the United States.
• A minimum of 10 candidates will be selected, subject to funding availability.
• The scholarship will cover tuition, travel, living expenses, or a combination thereof, depending on final funding.

Contingency Clause
• In the event that full funding for international study is not secured, selected winners will receive significant monetary awards as recognition of their achievement.
• These awards will be disbursed transparently and equitably, and recipients will be notified in advance.

Funding Transparency
• The scholarship is funded through application fees and other fundraising efforts.
• All proceeds are directed toward supporting scholarship recipients and program operations.

Refund Policy
• Application fees are non-refundable under any circumstances, including disqualification or program cancellation.
• Exceptions may be considered only in cases of duplicate payments or technical errors, subject to review.

Disbursement of Awards
• Awards will be disbursed directly to recipients or their designated institutions, subject to verification.
• Disbursement timelines will be communicated via email and the official portal.
• Recipients must provide valid bank or institutional details for payment processing.

Data Protection & Privacy
• All personal data collected will be stored securely and used solely for scholarship-related purposes.
• The organization complies with applicable data protection laws and will not share applicant data with third parties without consent.
• Applicants may request deletion of their data after the program concludes.

Fraud, Misrepresentation & Disqualification
• Any false information or forged documents will result in immediate disqualification.
• The organization reserves the right to pursue legal action against individuals found to be engaging in fraudulent activity.
• Applicants found to be using unfair means during exams or interviews will be banned from future programs.

Program Modification or Cancellation
• The organization reserves the right to modify, suspend, or cancel the scholarship program due to unforeseen circumstances.
• In such cases, applicants will be notified promptly, and alternative awards may be offered.

Communication
• All official communication will be conducted via the email address provided during application.
• Applicants are responsible for checking their email and the portal regularly for updates.
• The organization is not responsible for missed communications due to incorrect contact details.

Intellectual Property
• Materials submitted (e.g., essays, portfolios) remain the intellectual property of the applicant.
• The organization may use submitted content for promotional or educational purposes with prior consent.

Media & Publicity
• Selected applicants may be featured in promotional materials, press releases, or social media campaigns.
• Participation in media activities is voluntary but encouraged to promote the program's impact.
• Consent will be obtained before using names, photos, or personal stories.

Conflict of Interest
• Applicants with direct family ties to members of the scholarship committee must disclose this during application.
• Such applicants may be subject to additional review to ensure fairness.

Code of Conduct
• Applicants must adhere to ethical standards throughout the process.
• Disrespectful behavior, harassment, or abuse toward staff or other applicants will result in disqualification.
• Selected scholars are expected to represent the program honorably during and after their studies.

Limitation of Liability
• The organization is not liable for any loss, damage, or delay resulting from technical issues, third-party services, or external factors beyond its control.
• Participation in the program is at the applicant's own risk.

Governing Law
• These terms and conditions are governed by the laws of [insert country/state].
• Any disputes arising from the scholarship program will be resolved under the jurisdiction of [insert appropriate court or authority].

Acceptance of Terms
• By submitting an application, the applicant agrees to abide by all terms and conditions outlined herein.
• Failure to comply may result in disqualification or forfeiture of any awarded benefits.`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms and Conditions">
      <div className="max-h-[60vh] overflow-y-auto">
        <div className="prose max-w-none text-sm">
          <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
            {termsContent}
          </pre>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
