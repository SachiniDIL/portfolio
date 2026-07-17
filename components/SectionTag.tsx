export default function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="display text-[22px] tracking-[0.05em] text-crimson">{num}</span>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
    </div>
  );
}
