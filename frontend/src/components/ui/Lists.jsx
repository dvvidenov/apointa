import '../../css/Lists.css'

function Lists({ title, info }) {
  return (
    <div className="list">
      <h4 className="title">
        {title}
      </h4>
      <div className="info-section">
        {info}
      </div>
    </div>
  );
}

export default Lists;