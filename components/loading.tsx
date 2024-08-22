interface ActivityIndicatorProps {
  description?: string;
}

export default function Loading({ description }: ActivityIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`size-7 animate-loading rounded-full border-4 border-transparent border-t-yelowDescription`}
      />
      {description && (
        <h1 className="text-base font-semibold">{description}</h1>
      )}
    </div>
  );
}
