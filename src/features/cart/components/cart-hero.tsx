interface CartHeroProps {
  initialCount?: number;
}

export function CartHero({}: CartHeroProps) {
  return (
    <div className="container mt-8 text-foreground hidden lg:block mb-8">
      <h1 className="text-4xl font-normal tracking-[0] leading-[100%] max-w-[36em]">
        عربة التسوق
      </h1>
    </div>
  );
}
