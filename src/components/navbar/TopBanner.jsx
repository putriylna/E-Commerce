import { XMarkIcon } from "@heroicons/react/20/solid";
export default function TopBanner({ onDismiss }) {
  return (
    <div className="isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1 sticky top-0 z-50">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-100">
          <strong className="font-semibold">Online Shop</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline size-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          <span className="hidden sm:inline">
            get free delivery on order over 100$
          </span>
          <span className="inline sm:hidden">free delivery over 100$</span>
        </p>
        <a
          href="#"
          className="hidden sm:flex flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-xs inset-ring-white/20 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Register now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:-outline-offset-4"
          onClick={onDismiss}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-100" />
        </button>
      </div>
    </div>
  );
}
