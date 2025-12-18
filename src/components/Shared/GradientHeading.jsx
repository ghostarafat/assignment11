const GradientHeading = ({
  text = { text },
  from = "var(--color-primary)",
  to = "var(--color-secondary)",
  className,
}) => {
  return (
    <h1
      className={`${className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight`}
    >
      <span className="relative inline-block mt-1 sm:mt-0">
        <span
          className="text-transparent ml-2 bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
          }}
        >
          {text}
        </span>
      </span>
    </h1>
  );
};

export default GradientHeading;
