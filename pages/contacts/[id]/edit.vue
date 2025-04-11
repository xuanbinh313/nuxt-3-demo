<template>
  <form id="contact-form" @submit.prevent="submit">
    <p>
      <span>Name</span>
      <input
        aria-label="First name"
        v-model="first"
        placeholder="First"
        type="text"
      />
      <input
        aria-label="Last name"
        v-model="last"
        placeholder="Last"
        type="text"
      />
    </p>
    <label>
      <span>Twitter</span>
      <input v-model="twitter" placeholder="@jack" type="text" />
    </label>
    <label>
      <span>Avatar URL</span>
      <input
        aria-label="Avatar URL"
        v-model="avatar"
        placeholder="https://example.com/avatar.jpg"
        type="text"
      />
    </label>
    <label>
      <span>Notes</span>
      <textarea v-model="notes" rows="{6}" />
    </label>
    <p>
      <button type="submit">Save</button>
      <button @click="$router.back()" type="button">Cancel</button>
    </p>
  </form>
</template>
<script setup>
import { ref } from "vue";
const first = ref("");
const last = ref("");
const twitter = ref("");
const avatar = ref("");
const notes = ref("");
const route = useRoute();
const contacts = useState("contacts");
const { data } = await useFetch(`/api/contacts/${route.params.id}`);
if (data.value) {
  first.value = data.value.first;
  last.value = data.value.last;
  twitter.value = data.value.twitter;
  avatar.value = data.value.avatar;
  notes.value = data.value.notes;
}

async function submit(e) {
  const res = await $fetch(`/api/contacts/${route.params.id}`, {
    method: "put",
    body: {
      first: first.value,
      last: last.value,
      twitter: twitter.value,
      avatar: avatar.value,
      notes: notes.value,
    },
  });
  const responseContacts = await $fetch(`/api/contacts`);
  contacts.value = responseContacts;
}
</script>
