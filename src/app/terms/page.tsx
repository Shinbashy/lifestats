export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: February 6, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Acceptance of Terms</h2>
          <p>By accessing and using LifeStats (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Description of Service</h2>
          <p>LifeStats is an entertainment and educational tool that calculates approximate life statistics based on your birthday and other optional information. All statistics are <strong>estimates based on averages</strong> and should not be taken as medical, scientific, or professional advice.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Not Medical Advice</h2>
          <p>The statistics, life expectancy estimates, and health-related information provided by LifeStats are for <strong>entertainment purposes only</strong>. They are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for health-related decisions.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Accuracy</h2>
          <p>While we strive for accuracy, all calculations are based on statistical averages and estimates. Individual results may vary significantly. We make no guarantees about the accuracy or completeness of any statistics provided.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">User Content</h2>
          <p>Any images or content you generate through the Service (share cards, stats images) are yours to use and share freely. By generating content, you grant us permission to display it within the Service.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Limitation of Liability</h2>
          <p>LifeStats is provided &quot;as is&quot; without warranty of any kind. We are not liable for any damages arising from your use of the Service.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
          <p>Questions? Email us at <a href="mailto:hello@getlifestats.com" className="text-indigo-400 hover:underline">hello@getlifestats.com</a></p>
        </section>
      </div>

      <div className="mt-12">
        <a href="/" className="text-indigo-400 hover:underline">← Back to LifeStats</a>
      </div>
    </div>
  );
}
