# Security

This repository builds a static site: no accounts, no stored form data, no
server code. What there is to attack is the build, its dependencies, the CI
workflow, and whatever the pages render.

## Reporting a vulnerability

Please report it privately through
[GitHub's private vulnerability reporting](https://github.com/farulivan/farulivan.com/security/advisories/new),
not in a public issue. A report there is visible only to me until a fix ships.

Worth reporting:

- markup or script injection through anything the site renders
- a way to make the CI workflow run untrusted code or expose its token
- a dependency that is compromised or malicious, not merely out of date

Only the current `main` branch and the live site are supported.
