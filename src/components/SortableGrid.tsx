// Simple grid wrapper — drag-to-reorder removed for production
export default function SortableGrid({ className, children }: {
  sectionKey?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${className || ''} [&>*]:h-full`}>
      {children}
    </div>
  );
}
