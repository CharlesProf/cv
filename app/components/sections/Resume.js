import SectionTitle from "../ui/SectionTitle";
import TimelineColumn from "../ui/TimelineColumn";
import { experiences, education } from "../../data/resume";

export default function Resume() {
  return (
    <section id="resume" className="section-shell resume-block">
      <SectionTitle title="Resume" />
      <div className="resume-grid">
        <TimelineColumn title="Experience" items={experiences} />
        <TimelineColumn title="Education" items={education} />
      </div>
    </section>
  );
}
