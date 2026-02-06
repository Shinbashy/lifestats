export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: February 6, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">What We Collect</h2>
          <p>LifeStats collects the following information when you use our calculator:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Birthday</strong> — to calculate your life statistics</li>
            <li><strong>Biological sex</strong> (optional) — to provide gender-specific stats</li>
            <li><strong>Country</strong> — to adjust lifestyle statistics to your region</li>
            <li><strong>Personalization data</strong> (optional) — height, weight, sleep, lifestyle habits for personalized comparisons</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">How We Store Your Data</h2>
          <p>Your data is primarily stored <strong>locally in your browser</strong> (localStorage). We do not sell, share, or transfer your personal data to third parties.</p>
          <p className="mt-2">If you create an account, your profile data is stored securely in our database to enable features like saving your stats and accessing them across devices.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Cookies & Analytics</h2>
          <p>We may use basic analytics to understand how our site is used (page views, feature usage). We do not use advertising cookies or tracking pixels.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Third-Party Services</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Vercel</strong> — hosting and deployment</li>
            <li><strong>Supabase</strong> — database for account data (if you create an account)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Your Rights</h2>
          <p>You can delete your data at any time by clearing your browser&apos;s localStorage or deleting your account. We respect your privacy and will honor any data deletion requests.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
          <p>Questions about this policy? Email us at <a href="mailto:hello@getlifestats.com" className="text-indigo-400 hover:underline">hello@getlifestats.com</a></p>
        </section>
      </div>

      <div className="mt-12">
        <a href="/" className="text-indigo-400 hover:underline">← Back to LifeStats</a>
      </div>
    </div>
  );
}
