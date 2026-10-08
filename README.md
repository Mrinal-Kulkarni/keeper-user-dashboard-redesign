# Keeper user dashboard redesign

Independent responsive dashboard concept based on the supplied screenshot and [Keeper](https://www.keeper.ai/), reviewed October 7, 2026.

## Run

`npm install` then `npm run dev -- --port 5173`.

`npm run build` produces the static site in `dist/`.

## Experience

- Icon navigation within the match panel: My info, Preferences, Rate photos, best-photo testing, website menu, and Settings. The wordmark returns to Dashboard.
- Match availability leads; completed modules have no reminder. Only unfinished module flags produce a reminder. Profile edits do not silently mark questionnaires complete.
- Equal-width desktop columns with compact outer gutters; the overview fills the available height.
- A star-and-cloud match panel with one large waiting status and the matching-time FAQ aligned right.
- My info includes demo OCEAN values, family plans, and social life. Natural-language preference chips open the relevant editing field. All four right-side cards share a soft ivory-sage color and consistent heading arrows.
- Two simple photo widgets link to Keeper: Rate photos and What’s your best photo? Rate photos has a generated classical portrait illustration; neither widget has local rating controls. Sample attraction findings and photo strengths/weaknesses demonstrate the results state; underlined guidance links explain the tools. The best-photo card supports missing-image and pending-feedback states.
- Notifications live in Settings; paused searches offer a resume action.
- Profile, search preferences, and notification settings save on this device using localStorage.
- Search pause/resume requires confirmation and changes the overview state.
- Three local photo previews with type, size, and quantity validation; no uploads or ranking.
- Responsive layout, visible keyboard focus, and labeled native dialogs.

The desktop overview fills one screen. Mobile stacks the expanded photo feedback and may scroll. The production build and 13 checks pass.

This is an interactive front-end concept, not a production integration. Counts come from the supplied screenshot. No live account, matchmaking service, or real notifications are connected. Photos are not persisted. Browser-local profile data can be cleared through browser storage settings.

## Design

A sage background, star-and-cloud match panel, soft ivory-sage information cards, and conversational copy carry the brand. DM Sans is used consistently for headings, copy and controls. The official wordmark is sourced from Keeper’s public website and retains its original #E5D2B8 fill inside a translucent brand bar.

See [DESIGN.md](DESIGN.md) for marketplace references, the reason for each element, and critical next improvements.

## Module status

The supplied screenshot shows completed questions, so the default sample modules are complete. `state.modules` holds authoritative completion flags; the overview counts records whose `completed` value is not `true`. The fixture checks cover both completed and unfinished states. A production integration must load these records from Keeper’s module service and route unfinished records to their actual questionnaire; profile/preference edits do not change completion flags.

`node --test overview.test.js` checks conditional reminders, field navigation targets, notification wording, and saved-text escaping.
