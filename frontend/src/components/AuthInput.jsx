function AuthInput({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-11 shrink-0 items-center justify-center text-muted/50"
        aria-hidden
      >
        <Icon size={18} strokeWidth={2} />
      </span>
      <input
        {...props}
        className={`input-field block w-full py-3 pl-11 pr-4 ${className}`.trim()}
      />
    </div>
  );
}

export default AuthInput;
