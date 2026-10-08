# Keeper dashboard: design decisions

The overview should answer three questions quickly: Is a match ready? Do I owe anything? What happens next?

## Marketplace research

Reviewed October 7, 2026:

- [Airbnb hosting tools](https://www.airbnb.com/resources/hosting-homes/a/exploring-your-hosting-tools-738): the Today view prioritizes current work.
- [Upwork dashboards](https://www.upwork.com/resources/how-to-use-upwork-dashboards): distinct destinations and relevant work status.
- [Etsy shop dashboard](https://help.etsy.com/hc/en-us/articles/360000343908-How-to-Use-Your-Dashboard-to-Manage-Your-Shop): tasks needing attention have a dedicated place; detail lives in the appropriate section.
- [Fiverr freelancer dashboard](https://help.fiverr.com/hc/en-us/articles/360011653458-Freelancer-dashboard-for-web-and-mobile-app): onboarding and ongoing work have different needs.

The application to Keeper is a design judgment: once questions are complete, completion should stop dominating the screen. Seller revenue charts and activity feeds would serve no purpose here.

## Why each overview element remains

| Element | Purpose |
| --- | --- |
| Keeper wordmark | The official SVG in its original #E5D2B8 color, with no filter or opacity change. The wordmark sits inside a translucent bar over Keeper’s original star-and-cloud artwork. The logo also returns to Dashboard. |
| Navigation beside section headings | The menu bar is removed. Person and preference icons return to the brand bar alongside a heart for Rate photos and a photo-with-spark icon for the best-photo page. Profile and preference headings have no icons; photo headings have external navigation arrows. Settings and a compact website-link disclosure sit inside the green panel. The disclosure includes every page, contact and social destination in the supplied Keeper menu screenshot; URLs are taken from the official homepage. Demo editing pages retain a Dashboard return button. |
| Awaiting their answers | A single large count and label describe the current sample waiting state. The zero-ready count and redundant section title are removed. This is a sample candidate count, not a count of confirmed matches. |
| Inline waiting explanation | Plain text below the count explains that these are potential fits awaiting further evaluation. The status itself is not clickable. A separate “What this means” text button opens the explanation dialog. |
| Waiting message and matching-time FAQ | One sentence says users will hear when a match is ready. A right-aligned link opens Keeper’s exact matching-time FAQ on the same desktop line, without a second empty-state heading. |
| Conditional module reminder | Shows only unfinished module records. Completed modules disappear; editing profile details does not mark questionnaires complete. |
| My info and Preferences | Demo personality, family, and social-life values describe the user. Preference chips describe desired traits in ordinary language. All preferences use the same soft sage tone. All four right-side cards share a soft ivory-sage background and the same forest accent and SVG arrow treatment; light rules separate profile rows and compact chips describe preferences. Heading-aligned right arrows open the actual Keeper traits and preferences pages, while each editable item opens its corresponding demo field. |
| Photo widgets | Rate photos and What’s your best photo? are compact links to Keeper’s existing photo pages. The two photo cards have equal height. Both images have a small inset and rounded corners, with their widths scaled to their original proportions and no cropping. The rate-photo portrait sits on the right; the best-photo artwork sits on the left. Copy aligns with the top of each image. Heading arrows open the actual Keeper photo destinations. Rate photos includes sample attraction insights under “Your type,” without a visible demo badge or divider. Redundant bottom action links and the photo privacy link are removed. A short description explains the best-photo tool. There are no multiple-choice controls or rating simulation on this dashboard. |
| Compact frame and viewport-sized panels | Reduce exterior gaps and the empty area below the dashboard. The match figures and search controls use the available height. |
| Hairline rules | Separate status, next step, and completion within the match panel. |
| Sage canvas, star-and-cloud match panel, ivory-sage information cards | Use color to distinguish match status from search controls. Soft corners and warm accents add personality without decorative imagery. |
| Consistent typography | DM Sans is used for headings, counts, copy, controls and dialogs. Both desktop photo headings use the same size; the best-photo question stays on one line. |

Removed: large decorative artwork, profile avatar, sidebar glyphs, repeated status cards, empty inbox tabs, rejection totals, the dominant “all questions answered” panel, “Search active,” completed-question text, notification controls on the overview, “What happens next,” the extra empty-state heading, and footer help/concept labels.

## Critical next improvements

1. **Test the pending count.** 4,185 is visually impressive but may communicate delay rather than confidence. If it cannot help someone make a decision, replace it with a quieter status such as “Waiting on other members.” Never label these people as confirmed matches.
2. **Provide a truthful update.** A real matching stage and a dated, meaningful update would offer more reassurance than a raw total. This needs reliable service data; avoid fabricated activity, progress percentages, or delivery dates.
3. **Design the first real introduction.** When a profile is ready, replace the empty state with a private profile preview, a concise explanation of the fit, and one primary “Review introduction” action. The existing layout should change with the user’s situation.
4. **Surface only specific missing information.** If Keeper needs another answer, show exactly what is needed and one direct action. Avoid generic profile-strength meters and perpetual completion chores.
5. **Connect authoritative module state.** The screenshot establishes the completed sample state. Real unfinished reminders must use actual questionnaire records and destinations, rather than inferring completion from the profile’s optional fields.
6. **Test comprehension, not just visual preference.** Show the overview briefly and ask users whether anything is ready, whether they owe anything, and what happens next. Watch whether they mistake the candidate total for ready matches or feel compelled to keep checking.

## Verification and limits

The overview fits without page scrolling at 1280 × 720 and 390 × 844. Smaller phones use a responsive layout; one-screen fit cannot be guaranteed at every viewport or enlarged text setting. Keyboard focus, named dialogs, navigation, notification state, preference editing, and pause/resume are supported. This is a front-end concept with browser-local state and sample counts, not a live Keeper integration.

## Photo widget state contract

The behavior is documented next to the renderer in `overview.js`. `uploadedPhotoCount` controls the first-image prompt; supplied `photoFeedback` contains a summary, strengths and weaknesses. Uploaded photos awaiting feedback show a pending message. Illustrative artwork never counts as a personal upload. Local previews update upload presence for the current session, but do not generate analysis. Rate-photo traits remain sample data. Strengths and weaknesses appear only in the best-photo widget. The current demo assumes an existing personal image and displays a sample performance summary, three strengths and three improvement suggestions. “What makes a good photo?” opens concise guidance based on [Keeper’s photo guide](https://www.keeper.ai/photo-testing).

Rate photos includes eight sample attraction findings and an underlined link to Keeper’s changelog, whose “Rate photos to teach us your preferences” section explains how ratings build a taste profile. The example ratio and traits are placeholders supplied for the concept, not measured findings or a claim about the model’s output.
