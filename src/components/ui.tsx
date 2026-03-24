interface ToggleProps {
  on: boolean;
  onToggle: () => void;
  label?: string;
}

export function Toggle({ on, onToggle, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
        on ? "bg-teal-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
          on ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  );
}

interface AvatarProps {
  size?: string;
  src?: string;
  alt?: string;
}

export function Avatar({ size = "w-8 h-8", src, alt = "User avatar" }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`${size} rounded-full object-cover flex-shrink-0`} />
    );
  }
  return (
    <div className={`${size} rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0`}>
      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 px-2 mb-8">
      <img 
        src="/images/logo.png" 
        alt="LumieraMed Logo" 
        className="w-24 h-24 flex-shrink-0 object-contain"
      />

    </div>
  );
}

interface BadgeProps {
  status: "Approved" | "Rejected" | "Pending";
}

export function StatusBadge({ status }: BadgeProps) {
  const styles = {
    Approved: "bg-teal-100 text-teal-700 border border-teal-200",
    Rejected: "bg-red-50 text-red-600 border border-red-200",
    Pending: "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}
