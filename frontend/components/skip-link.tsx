export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
      absolute 
      inset-bs-[calc(-1000px)] 
      focus-visible:inset-bs-0 
      p-2 m-1 
      rounded-lg
      focus-visible:outline-accent-orange
      focus-visible:outline-solid
      focus-visible:outline-2
      bg-accent-orange
      text-white
      text-center
      font-serif
      text-fluid-md"
    >
      Till sidans innehåll
    </a>
  );
}
