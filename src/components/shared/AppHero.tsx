type AppHeroProps = {
  title: string;
  description: string;
};

export function AppHero({ title, description }: AppHeroProps) {
  return (
    <section>
      <div className="container">
        <div className="text-center flex flex-col items-center my-10">
          <h1
            className="mb-8 text-3xl font-semibold text-primary 
          md:text-4xl xl:text-5xl"
          >
            {title}
          </h1>
          <p className="max-w-prose text-lg text-foreground/60 xl:text-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
