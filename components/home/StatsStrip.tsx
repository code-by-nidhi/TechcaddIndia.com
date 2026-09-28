import CountUp from '@/components/fx/CountUp'
import { STATS } from '@/data/site'

export default function StatsStrip() {
  return (
    <section className="stats" aria-label="techcadd in numbers">
      <div className="shell">
        <div className="stats__card glass" data-aos="fade-up">
          {STATS.map((s, i) => (
            <div className="stats__item" key={s.label} data-aos="fade-up" data-aos-delay={i * 100}>
              <strong>
                <CountUp value={s.value} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
