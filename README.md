# React Force

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/alexjoverm/typescript-library-starter.svg)](https://travis-ci.org/nareshbhatia/react-force)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Foundational components for React applications

**Live demo:** https://nareshbhatia.github.io/react-force/

## Build Process

### Typical commits
Always do commits in conventional commit format. This step can be repeated any
number of times during the development process.


```bash
git status
git add --all
yarn cz-commit # interactive conventional commit
git push
```


### Release to NPM

```Bash
# Make sure local build runs successfully
yarn ci:build

# Detemine which packages have changed
yarn changed

# 1. Go to each changed package.

# 2. Manually change its version number in the package.json file. Use semver.

# 3. Commit and push (see above)

# 4. Rebuild the package
yarn ci:build

# 5. Release to npm
npm publish
```
