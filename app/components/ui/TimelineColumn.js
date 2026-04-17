export default function TimelineColumn({ title, items }) {
  return (
    <article className="timeline-col">
      <h3>{title}</h3>
      <div className="timeline">
        {items.map((item) => (
          <div className="timeline-item" key={`${title}-${item.title}`}>
            <h4>{item.title}</h4>
            <p className="date">{item.date}</p>
            <p className="place">{item.place}</p>
            {"points" in item ? (
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
