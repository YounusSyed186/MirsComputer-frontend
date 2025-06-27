import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Effective Date: <span className="font-medium">[Insert Date]</span>
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Use at Your Own Risk</h2>
        <p>
          You use this application at your own risk. While we strive to provide a
          smooth and secure experience, we do not guarantee the safety, integrity,
          or confidentiality of any data you share, store, or transmit through our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. No Responsibility for Data or Privacy
        </h2>
        <p>
          We are <strong>not responsible for any data loss, breaches, or misuse of personal information</strong>.
          Users are solely responsible for protecting their own data and privacy. Use of this app
          means you accept these risks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Data Storage and Access</h2>
        <p>
          The app may collect or store certain data to support its functionality,
          but <strong>we do not guarantee the security of that information</strong>. All data provided is at your own discretion.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the app after such updates
          will indicate your acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Contact</h2>
        <p>
          If you have any questions about these Terms and Conditions, you can contact us at:{" "}
          <a href="mailto:youremail@example.com" className="text-blue-600 dark:text-blue-400 underline">
            youremail@example.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;