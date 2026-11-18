# Changing the words on rewardsworld.in (no developer needed)

All the words on the website live in one file: **content.json**.

1. On GitHub, open the repository **rewardsworld-in/rewardsworld** and click **content.json**.
2. Click the pencil icon (Edit this file).
3. Change only the words between the quote marks on the right-hand side. Keep every quote mark, comma and bracket.
   - To start a new line inside the contact email text, type `\n`.
4. Scroll down, write a short note such as "Updated the Health Check wording", and click **Commit changes**.
5. The site updates within a few minutes.

If you make a mistake in content.json, the website keeps showing the last safe version, so visitors never see a broken page. Undo the change on GitHub (History, then the earlier version) or fix the quote or comma.

What you can change in content.json:
- **meta**: the browser tab title and the short description used by search engines
- **nav** and **ui**: the menu, buttons such as Sign in, and "Open menu"
- **hero**: the opening headline, supporting text, and the "eight services" panel title
- **trust**: the four short points about data in India, reviews, sources and making changes yourselves
- **problems**: the everyday problems
- **journey**: the eight services, what each one covers, and the "Then ..." line that shows what comes next (leave "then" blank on the last service if you do not want a next step)
- **how**: the four steps of working with us
- **learning**: the path from someone new to pay through to the board
- **contact**: the Talk to us wording and the email subject and body
- **legal** and **footer**: the legal link names and the closing note

Do not add prices, client names, logos, testimonials or numbers that are not real. Do not compare Rewards World with other firms, and do not use words such as first, only, or best in the market.

Rules for the words: no prices (use "Contact for pricing"), ™ not ®, British spelling, no long dashes, no claims about other firms, legal pages stay marked draft until the legal adviser approves them.

Links: the Sign in and Start your free assessment buttons go to https://app.rewardsworld.in. Each service links to its page in the app, and Talk to us opens an email to totalrewardsworld@gmail.com.

Optional (technical): `node build.mjs` refreshes the safe fallback copy inside index.html from content.json.
