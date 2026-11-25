# Changing the words on rewardsworld.in (no developer needed)

All the words on the website live in one file: **content.json**.

1. On GitHub, open the repository **rewardsworld-in/rewardsworld** and click **content.json**.
2. Click the pencil icon (Edit this file).
3. Change only the words between the quote marks on the right-hand side. Keep every quote mark, comma and bracket.
   - To start a new line inside the contact email text, type `\n`.
4. Scroll down, write a short note such as "Updated the Health Check wording", and click **Commit changes**.
5. The site updates within a few minutes.

If you make a mistake in content.json, the website keeps showing the last safe version, so visitors never see a broken page. Undo the change on GitHub (History, then the earlier version) or fix the quote or comma.

What you can change in content.json (in page order):
- **meta**, **ui**, **nav**: the browser tab title, small labels such as Sample data, and the menu (keep the menu to six items)
- **hero**: the one-line promise, the opening paragraph, the two buttons and the four questions
- **journey**: the eight services, a one-line description of each, and the "feeds" line that shows what carries into the next one
- **who**: Founder, CHRO, CFO, Board and NRC in their own words, and the kinds of organisation
- **samples**: the three sample pages (board pack, pay band grid, compliance check). Every figure is made up and labelled Sample data. Never replace them with a real client's numbers without written permission
- **tool**: the five steps, the tool points and the learning path from fresher to board
- **trust**: data in India, audit-ready, and Sunil's background (taken only from the existing site and Substack)
- **insights**: the Substack links
- **contact**, **legal** and **footer**

Do not add prices, client names, logos, testimonials or numbers that are not real. Do not compare Rewards World with other firms, and do not use words such as first, only, or best in the market.

Rules for the words: no prices (use "Contact for pricing"), ™ not ®, British spelling, no long dashes, no claims about other firms, legal pages stay marked draft until the legal adviser approves them.

Links: Sign in goes to https://app.rewardsworld.in/app (the tool sits behind this site). Each service links to its page in the app, and the Email us button opens an email to totalrewardsworld@gmail.com.

Optional (technical): `node build.mjs` refreshes the safe fallback copy inside index.html from content.json.
