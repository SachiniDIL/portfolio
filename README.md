# Sachini Dilrangi — Portfolio

[![CI/CD](https://github.com/SachiniDIL/portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/SachiniDIL/portfolio/actions/workflows/ci-cd.yml)

Personal portfolio site. Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · statically generated, deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## CI/CD

Every push and pull request runs lint + build via GitHub Actions
([.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml)). Pushes to
`main` that pass CI deploy to Vercel production automatically. The
workflow needs three repository secrets: `VERCEL_TOKEN`,
`VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
