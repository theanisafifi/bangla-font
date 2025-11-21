# Hixbe Font Publisher

This CLI is used to publish the Hixbe packages to NPM. It is not intended for use by end users.

Commonly used publishers cannot publish the sheer quantity of packages that Hixbe has, thus a custom solution is required. This package does not take feature requests unless it directly relates to Hixbe.

## Getting Started

```bash
# Install dependencies
npm install @hixbe/font-publisher

# Run the CLI and generate initial config
npx @hixbe/font-publisher init
```

# How It Works

1. Use folder hashes (recursive filehashes) to determine if a package has changed.
2. Bump packages and validate they are publishable by comparing versions on the NPM registry.
3. Use pacote and libnpmpublish to pack and publish the packages.
