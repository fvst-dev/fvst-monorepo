# Authentication

## Clerk

Authentication is handled by [Clerk](https://clerk.com/).

Start by signing up for their service and reading about one of their excellent quickstarts from
their [documentation](https://clerk.com/docs).

## Demo authentication

TODO:

- Make a reference to the Nest docs where the Passport is explained and explain how it is configured for ours.
- Short explanation how Clark is used as an issuer and where to find the necessary variables to make it work.

## Web authentication

Web authentication is set up via Clerk's Next example and using their built-in components. You can read about it
from [here](https://clerk.com/docs/nextjs/overview).

To set up, just add the .env variables to .env.local and fill them with your keys from their web UI.

To enable the Apollo Client authentication we use `useAuth()` function to get the token and then add it into the context
of the queries.
