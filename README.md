# Catholic Companion UI

A daily Catholic companion built with Angular 14, NgRx, and a .NET 8 API in the sibling `CatholicCompanionApi` repository.

## Run locally

Use Node 16.20.2 for this existing Angular 14 workspace (`.nvmrc` is included). With nvm-windows: `nvm install 16.20.2`, then `nvm use 16.20.2`.

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

For the initial local setup, a compatible portable Node runtime is also available at `C:\Repos\.tmp\node16\node-v16.20.2-win-x64\node.exe`. You can invoke the Angular CLI directly with that executable and `node_modules/@angular/cli/bin/ng.js`.

## Features

- Today dashboard with a daily prayer, reading, and charity rhythm. Progress resets by the browser's local calendar date.
- Live USCCB Mass readings with date navigation, source links, and loading/error/retry states.
- Seven-day US liturgical calendar, keeping dates aligned when upstream data is unavailable.
- Guided Rosary with all four mystery sets, introductory and concluding prayers, and a bead-by-bead guide. Weekday suggestions can be changed; Sunday customs may vary with the season.
- Quiet prayer timer with pause, resume, reset, and completion feedback.
- Intention notebook with prayer/gratitude views. Saving on this browser is optional and can be disabled.
- Searchable examination of conscience using the existing prompts, plus optional personal sins or notes with add, edit, and remove controls.
- Confession review guide and a clear-all action. Confession items are held only in memory and disappear on reload.
- Shared responsive navigation, keyboard focus indicators, labelled inputs, and reduced-motion support.

## Privacy and sources

Confession selections and personal items never enter localStorage or the API. Intentions are only saved when the user enables browser saving. Browser storage is not encrypted and is visible to other users of the same browser profile. There are no accounts, cloud sync, AI spiritual advice, or background notifications.

Readings and calendar celebrations come from USCCB. Rosary guidance links to https://www.usccb.org/how-to-pray-the-rosary. The Mass finder opens https://masstimes.org; this app does not invent parish schedules. External sources and Google Fonts require network access; typography has local fallbacks. Existing examination prompts are preserved as reflection aids, without assigning an automatic classification to a person's actions.

## Validate

```powershell
npm run build
npm test -- --watch=false --browsers=ChromeHeadless --code-coverage
```

Tests use the existing Jasmine/Karma conventions and cover personal confession items, storage choices, daily progress, reading states, Rosary structure, and timer lifecycle. Production component CSS budgets allow 4 KB before warning and 6 KB before failure; the initial bundle budgets remain unchanged.

The framework versions have been preserved. A supported-framework upgrade should be planned separately from this UI and behavior refactor.
