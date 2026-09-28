/** Marks a region of a skeleton page still to be designed/built. */
export default function Placeholder({ title, items }: { title: string; items?: string[] }) {
  return (
    <div className="placeholder-block" data-aos="fade-up">
      <div>
        <strong>{title}</strong>
        {items && (
          <ul>
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
