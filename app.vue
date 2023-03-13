<script lang="ts" setup>
import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth"
import { collection } from "firebase/firestore";

console.log('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID)
console.log('FIREBASE_CLIENT_EMAIL', process.env.FIREBASE_CLIENT_EMAIL)
console.log('FIREBASE_PRIVATE_KEY', process.env.FIREBASE_PRIVATE_KEY)
console.log('FIREBASE_API_KEY', process.env.FIREBASE_API_KEY)
console.log('FIREBASE_AUTH_DOMAIN', process.env.FIREBASE_AUTH_DOMAIN)
console.log('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID)
console.log('FIREBASE_STORAGE_BUCKET', process.env.FIREBASE_STORAGE_BUCKET)
console.log('FIREBASE_MESSAGING_SENDER_ID', process.env.FIREBASE_MESSAGING_SENDER_ID)
console.log('FIREBASE_APP_ID', process.env.FIREBASE_APP_ID)

const auth = useFirebaseAuth()
const user = useCurrentUser()
const testCollection = useCollection(collection(useFirestore(), "test-collection"))

const login = () => {
    if (auth) {
        signInWithRedirect(auth, new GoogleAuthProvider())
    }
}

const logout = () => {
    if (auth) {
        signOut(auth)
    }
}
</script>

<template>
    <div>
        <div>hello</div>
        <button v-if="user == null" @click="login">Login</button>
        <button v-else @click="logout">Logout</button>
        <div>
          <h2>Server Info (individual user fields work on server and should SSR):</h2>
          <div v-if="user">{{ user.uid }} | {{ user.email }}</div>
          <div v-else>No user logged in on server</div>
        </div>
        <ClientOnly>
          <h2>Client Info (toJSON / stringify of `user` fails on server):</h2>
          <code><pre>{{ JSON.stringify(user, null, 2) }}</pre></code>
        </ClientOnly>
        <hr>
        <div>
          <h2>SSR Data from Firestore:</h2>
          <div v-for="test in testCollection" :key="test.id">
            <div>hello: "{{ test.hello }}" (between quotes comes from firestore)</div>
          </div>
        </div>
    </div>
</template>
