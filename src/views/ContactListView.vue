<script setup>
import { useContactStore } from "../stores/contactStore";
import { ref, computed } from 'vue';
import ContactForm from '../components/ContactForm.vue';

const contactStore = useContactStore();
const contacts = computed(() => contactStore.contacts);
const selectedContact = ref(null)

const saveContact = (contact) => {
  if (contact.id) {
    // El contacto ya existe → estamos editando
    contactStore.updateContact(contact)
  } else {
    // Es un contacto nuevo → estamos creando
    const newId = Date.now()
    contactStore.addContact({ ...contact, id: newId })
  }
  selectedContact.value = null
}

const editContact = (contact) => {
    selectedContact.value = { ...contact }
}

const deleteContact = (id) => {
    contactStore.removeContact(id)
}


</script>

<template>
  <div>
    <h1>Contact List</h1>
    
    <ContactForm :contact="selectedContact" @save="saveContact" />
    
    <ul>
      <li v-for="contact in contacts" :key="contact.id">
        {{ contact.firstName }} {{ contact.lastName }} - {{ contact.phone }} - {{ contact.email }}
        <button @click="editContact(contact)">Edit</button>
        <button @click="deleteContact(contact.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>


<style scoped></style>
