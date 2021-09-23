# Octopus Take Home Test

This is the Octopus Deploy Take Home Test, or DevOps Deploy Code Puzzle.

## Setup

Install yarn and dependencies.
```
npm install yarn
yarn
```
Run the app in the development mode.
```
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

As per instructions, no UI has been built for this project.

## Release Retention Algorithm

This has been implemented as a React Hook; `useReleaseRetention`.

This hook can be found under `src/hooks`.

Some utility functions have been abstracted to `src/utils.ts`.

## Type Definitions

Type definitions can be found under `src/types`.

## Tests

This project uses Jest test runner.

You will find tests under `src/tests`.

```
yarn test
``` 
Launches the test runner in the interactive watch mode.

## Notes/Improvements

- For the sake of the excercise, console.log and console.error are used in lieu of proper logging and error handling.
- Add a `projectId` field to `deployments` for easier data management.
- Add `projectId` as a parameter to `useReleaseRetention` so that it can be actioned on a per project basis.
- Add an optional `releaseRetentionReason` field to releases for logging.
- What happens when a release is kept for multiple reasons (environments), is each reason logged or only the most recent?
- The rule states that only deployed releases are kept, what about new releases that have not been deployed yet?
