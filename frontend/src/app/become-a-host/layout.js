export default function OnboardingLayout({ children }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>Host Onboarding</h1>
        <p>Follow the steps to list your vehicle</p>
      </header>

      <main>{children}</main>
    </div>
  );
}
