<template>
  <button @click="onUpdateFavorite">
    {{ favorite ? "★" : "☆" }}
  </button>
</template>
<script setup>
const favorite = ref(false);
const props = defineProps(["contact"]);
watch(props.contact.favorite, (newVal) => {
  console.log(newVal)
  favorite.value = newVal;
});
const onUpdateFavorite = async () => {
  const body = { ...props.contact, favorite: !favorite };
  const res = await $fetch(`/api/contacts/${props.contact.id}`, {
    method:"PUT",
    body,
  });
  await refreshNuxtData('contact')
};
</script>
