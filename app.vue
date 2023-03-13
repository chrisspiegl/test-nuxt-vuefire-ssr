<script lang="ts" setup>
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from "firebase/auth"
import { collection } from "firebase/firestore";

const auth = useFirebaseAuth()
const user = useCurrentUser()
const testCollection = useCollection(collection(useFirestore(), "test-collection"))

const loginPopup = () => {
    if (auth) {
        signInWithPopup(auth, new GoogleAuthProvider())
    }
}

const loginRedirect = () => {
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
        <div v-if="user === null">
          <button @click="loginPopup">Login (Popup)</button>
          <button @click="loginRedirect">Login (Redirect)</button>
        </div>
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
