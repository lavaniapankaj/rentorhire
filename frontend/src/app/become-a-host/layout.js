export default function OnboardingLayout({ children }) {
  return (
    <>
      <div style={{ maxWidth: 800, margin:"100px auto", padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>Host Onboarding</h1>
        <p>Follow the steps to list your vehicle</p>
      </div>

      <main>{children}</main>
    </div>
    
    </>
  );
}
