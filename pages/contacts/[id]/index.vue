<template>
  <div id="detail" :class="status === 'pending' ? 'loading' : ''">
    <div id="contact" v-if="contact">
      <div>
        <img
          :alt="`${contact.first} ${contact.last} avatar`"
          :key="contact.avatar"
          :src="contact.avatar"
        />
      </div>
      <div>
        <h1 v-if="contact.first || contact.last">
          {{ contact.first }} {{ contact.last }}
        </h1>
        <h1 v-else>
          <i>No Name</i>
        </h1>
        <Favorite :contact="contact" />
        <p v-if="contact.twitter">
          <a target="_blank" :href="`https://twitter.com/${contact.twitter}`">
            {{ contact.twitter }}
          </a>
        </p>

        <p v-if="contact.notes">{{ contact.notes }}</p>
        <p>{{ status }}</p>
        <div>
          <button @click="handleEdit">Edit</button>
          <button @click="handleDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const contacts = useState("contacts");
const route = useRoute();
const contact = ref(null);
const { data, status, error } = await useLazyFetch(
  `/api/contacts/${route.params.id}`,
  { key: `contact` }
);
if (error.value?.statusCode === 404) {
  throw showError({ statusCode: 404, message: "Not found this contact" });
}
watchEffect(() => {
  if (data.value) {
    contact.value = data.value; // Clone object mới để đảm bảo Vue nhận diện thay đổi
  }
});
const handleDelete = async (event) => {
  if (confirm("Please confirm you want to delete this record.")) {
    await $fetch(`/api/contacts/${route.params.id}`, {
      method: "DELETE",
    });
    const resContacts = await $fetch(`/api/contacts`);
    contacts.value = resContacts;
    await navigateTo("/");
  }
};
const handleEdit = async (event) => {
  await navigateTo(`/contacts/${route.params.id}/edit`);
};
</script>
