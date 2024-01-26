import Info from "./Icons/Info";

interface Message {
  cls: string;
  text: string;
}

function Message({ cls = "info", text }: Message) {
  return (
    <div className={`card-message ${cls}`}>
      <Info cls="me-2" height="16" width="16" />
      {text}
    </div>
  );
}

export default Message;
