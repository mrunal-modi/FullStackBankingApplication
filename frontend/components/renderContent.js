import content from "./contentData";
import styles from "../styles/renderContent.module.css";

export function RenderContent(props) {
  let instructions = content[props.instruction_type];
  return (
    <div className={styles.Instructions}>
          <h1>{instructions.title}</h1>
          {instructions.steps.map ((el, i) =>
          <p key={i}>{el}</p>
          )}
    </div>
  );
}
