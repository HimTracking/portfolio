# Ashish — Creative Portfolio

A cinematic, responsive portfolio built with HTML, CSS and vanilla JavaScript, served by a small Node.js server.

## Run locally

1. Install Node.js 18 or newer.
2. Extract this folder and open it in VS Code.
3. Open the VS Code terminal in this folder.
4. Run `npm.cmd install` once in Windows PowerShell (or `npm install` in Command Prompt / macOS / Linux).
5. Run `npm.cmd start` in Windows PowerShell (or `npm start` in Command Prompt / macOS / Linux).
6. Visit http://localhost:3000.

If PowerShell blocks `npm.ps1`, `npm.cmd start` avoids changing your Windows execution policy.

## Ash Bot

Ash Bot is a small local FAQ assistant. It answers common questions from the portfolio's own information (about Ashish, services, Scalyn experience, tools, education and contact). It does not call an external AI service and does not need an API key. Unknown questions are directed to the Contact form/email rather than inventing answers.

## Enable direct email delivery from the Contact form

The form sends visitor email + message to **ashish.sagu2007@gmail.com** through the Node server. SMTP credentials must be configured before it can send. They are never placed in front-end JavaScript.

1. Copy `.env.example` to a new file named `.env` in this folder.
2. For Gmail, enable 2-Step Verification on the sending Gmail account and create a Google **App Password**. Do not use your normal Gmail password.
3. Fill in `.env`:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-sending-gmail-address@gmail.com
   SMTP_PASS=your-16-character-app-password
   SMTP_FROM=your-sending-gmail-address@gmail.com
   ```

4. Run `npm.cmd install` in Windows PowerShell (installs Nodemailer), then restart the server with `npm.cmd start`.

Messages are delivered to Ashish's address. The visitor's email is set as Reply-To so Ashish can reply directly. A simple per-IP cooldown is enabled to reduce spam. Never upload `.env` to a public repository or share it in screenshots.

If SMTP is not configured, the form will explain that email delivery is not ready and show Ashish's direct email address as a fallback.

## Personalise later

- Replace `+91 XXXXXXXXXX` in `index.html` when the phone number is ready.
- Add selected work to the Visual Archive room in `script.js`.
- Add client/brand names to the Clients room in `script.js`.
- Add the next big opportunity to the fourth room in `script.js`.

## Project files

- `index.html` — page structure and content
- `styles.css` — responsive visual design and interactions
- `script.js` — timeline, doors, rotating role calendar and Ash Bot
- `server.js` — local web server and secure SMTP-backed contact endpoint
- `assets/intro-underwater.mp4` — intro video
- `assets/portrait-suit.png` — updated landing-page portrait
- `.env.example` — SMTP configuration template
