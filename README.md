# Catholic Companion UI

A daily Catholic companion built with Angular 18, NgRx, and a .NET 10 API in the sibling `CatholicCompanionApi` repository.

## Run locally

Use Node 22.23.3 for this existing Angular 18 workspace (`.nvmrc` is included). With nvm-windows: `nvm install 22.23.3`, then `nvm use 22.23.3`.

Start the API in a separate terminal:

```powershell
cd C:\Repos\CatholicCompanionApi
dotnet restore --configfile NuGet.Config
dotnet run --launch-profile http
```

Start the UI:

```powershell
cd C:\Repos\CatholicCompanion
npm ci
npm start
```

Open http://127.0.0.1:4200. The UI proxies `/api` to http://localhost:5067 using `proxy.conf.json`. No development HTTPS certificate is required. Production continues to use the existing Azure API URL. Stop either terminal with Ctrl+C.

For the initial local setup, a compatible portable Node runtime is also available at `C:\Repos\.tmp\node-upgrade\node-v22.23.3-win-x64\node.exe`. You can invoke the Angular CLI directly with that executable and `node_modules/@angular/cli/bin/ng.js`.

## Features

- Today dashboard with a daily prayer, reading, and charity rhythm. Progress resets by the browser's local calendar date.
- Live USCCB Mass readings with previous/next/today navigation, a calendar date picker, source links, and loading/error/retry states. Selected dates stay in the URL for refreshes and sharing. Rapid navigation waits 250 ms before fetching the final selected day to reduce unnecessary source requests. In-app choices support alternate readings and linked Mass sets (such as Christmas vigil, night, dawn, and day). Extra Easter Vigil readings, psalms, and sequences stay in source order. Source selection notes remain visible; only published readings are shown.
- Seven-day US liturgical calendar, keeping dates aligned when upstream data is unavailable.
- Automatic saint-of-the-day card on the home page, sourced from Vatican News. Loads the browser's current date and checks for a new local day every minute while mounted, with loading and retry states. Supports multiple saints and entries without biographies; Vatican News commemorations may differ from the local liturgical calendar.
- Guided Rosary with all four mystery sets, introductory and concluding prayers, and a bead-by-bead guide. Weekday suggestions can be changed; Sunday customs may vary with the season.
- Quiet prayer timer with pause, resume, reset, and completion feedback.
- Intention notebook with prayer/gratitude views. Saving on this browser is optional and can be disabled.
- Searchable examination of conscience with separate mortal sins and venial sins/imperfections categories following [Fr. Robert Altier’s examination hosted by Divine Mercy](https://www.divinemercy.cc/documents/2021/5/Examination%20of%20Conscience.pdf). Existing definitions and prompts are preserved, with each category grouped by commandment. Categories do not determine personal guilt, and imperfections are not sins. Optional personal sins or notes have add, edit, and remove controls.
- Confession review guide and a clear-all action. Optional “Remember my confession on this browser” saves selections, added personal items, and the time since the last confession in localStorage across refreshes. Saving is off by default. Data is not encrypted or sent to the API; anyone using the same browser profile can access it. Turning saving off removes the saved copy while preserving the current guide; clearing the guide removes both.
- Shared responsive navigation, keyboard focus indicators, labelled inputs, and reduced-motion support.

## Privacy and sources

Confession selections and personal items never enter localStorage or the API. Intentions are only saved when the user enables browser saving. Browser storage is not encrypted and is visible to other users of the same browser profile. There are no accounts, cloud sync, AI spiritual advice, or background notifications.

Readings and calendar celebrations come from USCCB. Rosary guidance links to https://www.usccb.org/how-to-pray-the-rosary. The Mass finder opens https://masstimes.org; this app does not invent parish schedules. External sources and Google Fonts require network access; typography has local fallbacks. Existing examination prompts are preserved as reflection aids, without assigning an automatic classification to a person's actions.

The API prefers USCCB's official RSS feed for available dates and falls back to reading pages for dates outside the feed. The feed snapshot refreshes on demand every 15 minutes. RSS reading sets preserve full text, alternate readings, source links, and USCCB's copyright notice, displayed beneath the readings. Future dates and linked Mass pages still depend on USCCB website availability.

## Validate

```powershell
npm run build
npm test -- --watch=false --browsers=ChromeHeadless --code-coverage
```

Tests use the existing Jasmine/Karma conventions and cover personal confession items, storage choices, daily progress, reading states, Rosary structure, and timer lifecycle. Production component CSS budgets allow 4 KB before warning and 6 KB before failure; the initial bundle budgets remain unchanged.

The framework versions have been preserved. A supported-framework upgrade should be planned separately from this UI and behavior refactor.

## Automatic Azure deployments

The `Deploy UI to Azure` GitHub Actions workflow tests and builds the UI, then deploys to the existing `CatholicCompanion` App Service whenever code reaches `master` (the repository's default branch). It can also be run manually from the Actions tab on `master`. Failed tests or builds prevent deployment; overlapping deployments run in order.

Authentication uses OpenID Connect with a dedicated user-assigned identity. Trust is limited to `CalebWalls/CatholicCompanion` on `master`, and its Website Contributor role is limited to this UI App Service in the personal Azure subscription. The IDs in the workflow identify that identity and subscription; they are not passwords. No publish-profile secret is stored. Standard hosted runners are free for this public repository, and the existing Azure F1 plan is unchanged.

The workflow packages `dist/apm` with the root `web.config`, and verifies the deployed commit using `deployment.json`. Check the Actions tab for deployment status. To deploy an older version, revert the relevant commit on `master` and push the revert.
