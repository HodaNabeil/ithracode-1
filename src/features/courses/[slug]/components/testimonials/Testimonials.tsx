'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TestimonialCard, type Testimonial } from './TestimonialCard';

function TestimonialsStaticGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((testimonial) => (
        <div key={testimonial.id} className="pl-0 md:pl-4 lg:pl-4">
          <TestimonialCard testimonial={testimonial} />
        </div>
      ))}
    </div>
  );
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mousa A.',
    initial: 'M',
    avatar: 'https://github.com/shadcn.png', // Placeholder
    rating: 5,
    text: 'مجهود وتوصيل معلومة بطريقة بسيطة وسلسة , جزيت الخير وربنا يزيدك علم وفهم وينفع بيك الناس',
  },
  {
    id: 2,
    name: 'Tamer A.',
    initial: 'T',
    avatar: '',
    rating: 5,
    text: "Incredible work! Kareem's explanation is succinct and straightforward. Much appreciated!",
  },
  {
    id: 3,
    name: 'Omar B.',
    initial: 'O',
    avatar: '',
    rating: 5,
    text: 'yes it is simple and amazing for more colmplex topics with easy way to understand',
  },
];

export function Testimonials() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="section-gap pb-10 lg:pb-20">
      <div className="container px-4">
        <div className="my-12  text-center mb-20  ">
          <h3 className="text-sidebar-ring text-sm font-bold mb-4 tracking-wider uppercase">
            التوصيات
          </h3>
          <h2 className="text-4xl font-extrabold  text-foreground">
            ما يقوله طلابي
          </h2>
        </div>

        <div className="relative">
          {!mounted ? (
            <TestimonialsStaticGrid items={testimonials} />
          ) : (
            <Carousel
              opts={{
                align: 'start',
                direction: 'rtl',
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                className="hidden md:flex -left-6 bg-sidebar-ring! cursor-pointer!1
             hover:bg-sidebar-ring/90 
            text-background border-none w-10 h-10 rounded-full
             transition-none"
              />

              <CarouselNext
                className="hidden md:flex -right-6 bg-sidebar-ring! 
            cursor-pointer! hover:bg-sidebar-ring/90 text-background border-none
             w-10 h-10 rounded-full transition-none"
              />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}
