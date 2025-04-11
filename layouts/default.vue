<template>
  <div style="display: flex">
    <div id="sidebar">
      <h1>React Router Contacts</h1>
      <div>
        <form id="search-form" role="search">
          <input
            id="q"
            v-model="q"
            @input="handleChangeSearch"
            placeholder="Search"
          />
          <div id="search-spinner" aria-hidden hidden="true" />
          <div className="sr-only" aria-live="polite"></div>
        </form>
        <button @click="handleNew">New</button>
      </div>
      <header>
        <nav>
          <ul v-if="contacts?.length">
            <li v-for="contact in contacts" :key="contact.id">
              <NuxtLink
                v-if="contact.first || contact.last"
                :to="`/contacts/${contact.id}`"
              >
                {{ contact.first }} {{ contact.last }}
                <span v-if="contact.favorite">★</span>
              </NuxtLink>
              <NuxtLink v-else :to="`/contacts/${contact.id}`">
                <i>No Name</i>
              </NuxtLink>
            </li>
          </ul>
          <p v-else>
            <i>No contacts</i>
          </p>
        </nav>
      </header>
    </div>
    <div style="flex: 1">
      <slot />
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const router = useRouter();
const contacts = useState("contacts", () => []);
const q = ref(route.query.q || "");
const handleChangeSearch = (e) => {
  const { value } = e.target;
  if (value) {
    router.replace(`?q=${value}`);
  } else {
    router.push("/");
  }
};

await callOnce(async () => {
  contacts.value = await $fetch("/api/contacts", {
    query: {
      q: q.value,
    },
  });
});

const handleNew = async () => {
  const res = await $fetch(`/api/contacts`, {
    method: "POST",
  });
  await navigateTo(`/contacts/${res.id}/edit`);
};

watch(
  () => route.query.q,
  async (path) => {
    const res = await $fetch("/api/contacts", {
      query: {
        q: path,
      },
    });
    contacts.value = res || [];
  }
);
</script>
