# Libs

This directory contains shared code that can be used across different applications and services within the project. Each folder inside the `libs` directory holds the code related to a specific functionality or feature.

## Structure

````libs/
├── prisma/
│ ├── src/
│ │ └── prisma.service.ts
│ └── package.json
├── another-lib/
│ ├── src/
│ │ └── another-lib.service.ts
│ └── package.json
└── README.md```

For example, to use the `prisma` library in your application, you can import the `PrismaService` like this:

```typescript
import { PrismaService } from '../libs/prisma/dist/prisma.service';
````
