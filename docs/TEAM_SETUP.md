# Team setup: working on 247digitalpro.com

How a second person gets set up to change pages, review designs, and deploy the site from their own computer with their own Claude Code.

## How the pieces fit

```
your computer ──push branch──▶ GitHub (agathale79/247DigitalPro_new)
                                   │
                    open PR ───────┼──▶ GitHub Actions: lint, type-check, build
                                   └──▶ Netlify: deploy preview link on the PR
                                   │
                    merge PR ──────▶ main ──▶ Netlify publishes 247digitalpro.com
```

- **GitHub is the only access you need to deploy.** Merging a PR into `main` publishes the live site within about a minute.
- **Netlify dashboard access is optional.** You only need it to change environment variables (such as the SMTP settings that send lead emails), view deploy logs, or roll back from the dashboard.
- **Claude Code reads `CLAUDE.md`** in this repo automatically. It holds the commands, architecture, team workflow, and content rules (for example, keeping the JobFlow client anonymous), so both people's Claude follows the same rules.

## Access checklist (one time)

| What | Who does it | Status |
|---|---|---|
| GitHub account `saathale`, with `saathale@gmail.com` added and verified under GitHub **Settings → Emails** | Partner | Check the email is verified, so commits are linked to your account |
| Write access to `agathale79/247DigitalPro_new` | Repo owner | Done: `saathale` is a collaborator with **write** access |
| Claude account (Pro or Max) with Claude Code | Partner | Sign in with your own login |
| Netlify team member (optional) | Repo owner invites from Netlify → **Team settings → Members** | Optional; extra members may need a paid Netlify plan |

## One-time setup on a Mac

Run these in Terminal, or ask Claude Code to run them for you.

### 1. Install the tools

```bash
# Homebrew (skip if `brew --version` already works)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Git, GitHub CLI, and Node 22 (matches CI)
brew install git gh node@22
brew link --overwrite node@22
node -v   # should print v22.x
```

Install Claude Code using the desktop app (claude.ai/download → Code tab) or the terminal version, then sign in with your own Claude account.

### 2. Connect to GitHub

```bash
gh auth login          # choose GitHub.com → HTTPS → "Login with a web browser", sign in as saathale
gh auth setup-git      # lets git push using your gh login
git config --global user.name "Your Name"
git config --global user.email "saathale@gmail.com"
```

### 3. Get the code and run it

```bash
mkdir -p ~/Projects && cd ~/Projects
gh repo clone agathale79/247DigitalPro_new
cd 247DigitalPro_new
npm ci
npm run dev            # open http://localhost:3000
```

### 4. Open it in Claude Code

Open the `247DigitalPro_new` folder in Claude Code. Ask it: *"Read CLAUDE.md and summarize how this project is deployed."* If the answer mentions Netlify, deploy previews, and "never push directly to main", you're ready.

## Everyday workflow

### With Claude (recommended)

Describe the change. Claude creates a branch, makes the edit, runs the checks, and opens a PR. For example:

- *"Change the JobFlow hero headline to '…'. Open a PR."*
- *"Add a new service page for Local SEO, like the existing SEO page. Open a PR."*
- *"Here's a screenshot of the design I want for the contact page. Build it on a branch and open a PR."*

Then:

1. **Review the deploy preview.** Netlify comments a link on the PR (`https://deploy-preview-<PR#>--roaring-genie-fd0bfe.netlify.app`). Check it on desktop and on your phone.
2. **Ask for changes** in Claude. It pushes to the same branch, and the preview updates at the same link.
3. **Deploy:** when the checks are green and the preview looks right, say *"merge PR #N and deploy to prod"*, or click **Squash and merge** on GitHub.

### By hand

```bash
git checkout main && git pull                 # always start from the latest main
git checkout -b content/update-jobflow-faq    # name it for the change
# …edit files…
npm run lint && npx tsc --noEmit && npm run build
git add -A && git commit -m "Update JobFlow FAQ answers"
git push -u origin HEAD
gh pr create --fill                           # opens the PR; CI and the Netlify preview start
gh pr checks --watch                          # wait for green
gh pr merge --squash --delete-branch          # deploys to production
```

## Working as a two-person team

- **Pull `main` before starting anything new.** The other person may have merged changes since your last pull.
- **One change per PR**, with a clear title. Small PRs are easier to review and roll back.
- **Say who's on what** if you're both touching the same page, so you don't edit the same file at the same time.
- **Review each other's PRs** when the change is visible to customers, such as copy, pricing, or design. The preview link is the easiest way to review.
- **Don't push directly to `main`.** It skips review and CI and deploys immediately.

## If something goes wrong

| Problem | Fix |
|---|---|
| `Permission denied` or `403` on push | Check the GitHub invite was accepted, and that `gh auth status` shows `saathale` |
| CI check fails on the PR | Open the failed check on the PR, or ask Claude: *"CI failed on PR #N, fix it"* |
| Merge conflict | `git checkout main && git pull && git checkout <your-branch> && git merge main`, resolve, push; or ask Claude to resolve it |
| Something broke on the live site | Ask Claude to *"revert PR #N"* (it opens a revert PR you merge), or in Netlify → **Deploys**, pick the last good deploy → **Publish deploy** |
| Demo or contact form test sends a real email | Expected: the form sends real lead emails, including from deploy previews. Only submit test entries you're happy to receive |

## Where things live

| Want to change… | Look in |
|---|---|
| Page text (services, case studies, blog, FAQ, JobFlow) | `src/data/*.ts` |
| Menu | `src/config/navigation.ts` |
| Brand colors, fonts, buttons | `docs/brand/README.md` (rules), `src/app/globals.css`, `src/components/ui/Button.tsx` |
| A page's layout | `src/app/<route>/page.tsx` and `src/components/sections/<page>/` |
| Lead email delivery | `netlify/functions/send-lead.ts` (SMTP settings are in the Netlify dashboard) |
