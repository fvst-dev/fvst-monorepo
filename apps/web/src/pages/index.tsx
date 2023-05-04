import { type NextPage } from 'next';
import Layout from './Layout';
import {
  RocketLaunchIcon,
  LockClosedIcon,
  CodeBracketIcon,
  CircleStackIcon,
  SwatchIcon,
  CloudIcon,
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

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="bg-white py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Speed up your ideas!</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to deploy your app
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The team at FVST has experience with various development environments and every caveat that they come
              with. As such, we have combined the best into one easy to develop, build and deploy solution.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-8">
              {features.map((feature) => (
                <a key={feature.name} href={feature.href} className="relative rounded-lg p-2 pl-16 hover:bg-gray-100">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </a>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
