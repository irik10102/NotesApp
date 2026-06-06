
interface Props{
    title:string,
    content:string
}

const EachNote = (prop:Props) => {
    const {title, content} = prop;
    return (
        <div className="note-card" style={styles.card}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.content}>{content}</p>
        </div>
    );
};

const styles = {
  card: {
    background: "#fff",
    padding: "16px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "300px"
  },
  title: {
    margin: "0 0 10px",
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  content: {
    margin: 0,
    fontSize: "1rem",
    color: "#555"
  }
};

export default EachNote;