import React from 'react';
import {
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Google Cloud',
    description:
      'Best-in-class cloud platform with low costs, easy management and little to no vendor locking, giving the ability to easily swap out platforms according to future needs.',
    icon: CloudIcon,
    href: 'https://cloud.google.com/',
  },
  {
    name: 'Turborepo',
    description:
      'Using a monorepository considerably speeds up development and release time. Share your components rather than rewrite them constantly.',
    icon: RocketLaunchIcon,
    href: 'https://turbo.build/repo',
  },
  {
    name: 'Next.js',
    description:
      'Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.',
    icon: CodeBracketIcon,
    href: 'https://nextjs.org/',
  },
  {
    name: 'Prisma',
    description:
      'Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.',
    icon: CircleStackIcon,
    href: 'https://www.prisma.io/',
  },
  {
    name: 'Clerk',
    description: 'Plug-and-play authentication set up in less than 5 minutes.',
    icon: LockClosedIcon,
    href: 'https://clerk.com/',
  },
  {
    name: 'Tailwind',
    description: 'Tailwind is a utility-first approach to building stylized websites. Ship only the styles you need.',
    icon: SwatchIcon,
    href: 'https://tailwindcss.com/',
  },
];

const Pillar = () => {
  return (
    <svg className="" xmlns="http://www.w3.org/2000/svg" width="32" height="108" viewBox="0 0 32 108" fill="none">
      <path d="M32 92.0006L0 108.001V0.000320435H32V92.0006Z" fill="#FFAA4D"></path>
    </svg>
  );
};

export default async function Home() {
  return (
    <main className="font-light text-white">
      <div className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6 lg:text-center">
            <h1 className="text-4xl font-semibold md:text-7xl">Speed up your ideas</h1>
            <p className="text-2xl font-light">Everthing you need to deploy an application.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid grid-cols-1 justify-stretch gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <a
                  key={feature.name}
                  href={feature.href}
                  rel="noreferrer"
                  target="_blank"
                  className=" font-lighth-full flex flex-col items-center justify-center space-y-12 bg-fvst-lilac shadow-xl"
                >
                  <div className="flex w-full items-center justify-start gap-6">
                    <Pillar />
                    <p className="text-lg font-light text-fvst-orange">{feature.name}</p>
                  </div>
                  <p className="h-full w-full px-8 pb-8">{feature.description}</p>
                </a>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
