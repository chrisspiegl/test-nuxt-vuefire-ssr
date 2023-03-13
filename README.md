# Test Repository for Nuxt-VueFire on Vercel / Firebase / Local

[Discussion on the VueFire repo](https://github.com/vuejs/vuefire/issues/1297) made me try to test and see how to achieve SSR on Vercel, Firebase, and localhost.

This repo is a demonstration of how to do this and how to configure the Google `serviceAccount` without having the file in your repositroy and the private key exposed.

Please note that I am not a security researcher and I do not guarantee that the PRIVATE KEY does not show up in any public facing files.

From what I can tell, the way the deploy works the server side `serviceAccount` is not available in the frontend javascript files.

Additional learnings about the login methods for social logins (Google Auth tested) are blow.

## Setup / Learnings

Generally, the workaround is that we have to set `GOOGLE_APPLICATION_CREDENTIALS` to something. This is, because, there is a check in the vuefire codebase for the service account credentials based on this environment variable.

When the variable is present, other checks are performed and thus the env variables like `FIREBASE_PRIVATE_KEY` are used (only if the `GOOGLE_APPLICATION_CREDENTIALS` is present).

The other thing to note is that we have to link a few `FIREBASE_API_ID` variables in the `nuxt.config.ts` file. This is so they are configurable via environment variables but at the same time are available at build time for the frontend.

My understanding is that the frontend keys are not so "valuable" / "secret" since they are exposed to the browser anyways.

### Vercel

You provide all the firebase serviceAccount and front end api keys in the environment variable. See `.env.vercel` for all the necessary env variables.

Note that the `.env.vercel` or any `.env` for that matter has to be deployed to Github for this to work! All the `.env*` stuff can be setup in the Vercel UI.

In Vercel the `Environment Variables` section I setup all of these:

- GOOGLE_APPLICATION_CREDENTIALS
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID


In Vercel the `Build & Development Settings` are setup as follows for my env:

- Build Command: `pnpm build:vercel`
- Output Directory: `.vercel`
- Install Command: `pnpm install`

### Firebase

Firebase deploy is a bit different since we have to build locally (unless you are using some github action setup but then the deploy would be more like the one on vercel).

You should also create your own `.firebaserc` file. I included an example file.

So, I got it workign via:

- Run Locally: `pnpm build:firebase`
- Settings in `firebase.json` and `.firebaserc` (have a look into the files for pointers).
- Deploy via; `pnpm deploy`

### Local Development

For local development I was able to set it up by creating a `.env.local` file which includes basically all the things the env needs to run like Vercel.

Then I have the `pnpm dev` and `pnpm build:local` use the `.env.local` via the `--dotenv .env.local` flag.

This leads to the local development connecting to the live auth / firestore for everything.

The setup with local emulators can then also be achieved, though this is not something I tested at this time.

## Learnigns about SignIn by Redirect / PopUp

The redirect method works fine in chrome. But there aer some issues with the login when using other browsers that are more strict with their cookies and policies? Not exactly sure.

But `signInWithPopup` works fine in Safari, Firefox, and Chrome.

Whereas `signInWithRedirect` works in Chrome and the others probably would work with a strict setup following the best practices from [Firebase Auth layed out here](https://firebase.google.com/docs/auth/web/redirect-best-practices).

Long story short: the easiest method is to use `signInWithPopup` and not worry about the redirect method when deploying on Vercel.

On Firebase, you can easily use the redirect method since you can set the `FIREBASE_AUTH_DOMAIN` in your environemnt varaible and the whole `/__auth/` redirects are handled transparently by firebase.
