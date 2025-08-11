export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} RentOrHire. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#222",
    color: "#fff",
    padding: "15px",
    textAlign: "center",
    marginTop: "50px",
  },
};
