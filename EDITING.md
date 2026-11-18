# Changing the words on rewardsworld.in (no developer needed)

All the words on the website live in one file: **content.json**.

1. On GitHub, open the repository **rewardsworld-in/rewardsworld** and click **content.json**.
2. Click the pencil icon (Edit this file).
3. Change only the words between the quote marks on the right-hand side. Keep every quote mark, comma and bracket.
   - To start a new line inside the contact email text, type `\n`.
4. Scroll down, write a short note such as "Updated the Health Check wording", and click **Commit changes**.
5. The site updates within a few minutes.

If you make a mistake in content.json, the website keeps showing the last safe version, so visitors never see a broken page. Undo the change on GitHub (History, then the earlier version) or fix the quote or comma.

Rules for the words: no prices (use "Contact for pricing"), ™ not ®, British spelling, no long dashes, no claims about other firms, legal pages stay marked draft until the legal adviser approves them.

Links: the Sign in and Start your free assessment buttons go to https://app.rewardsworld.in. Each service links to its page in the app, and Talk to us opens an email to totalrewardsworld@gmail.com.

Optional (technical): `node build.mjs` refreshes the safe fallback copy inside index.html from content.json.
