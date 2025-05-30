import { defineStore } from "pinia";
import { ref } from "vue";

export const useContactStore = defineStore("contact", () => {
    // States
    const contacts = ref([
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '123456789', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '987654321', email: 'jane@example.com' },
  ])

   // Actions
  const addContact = (contact) => {
    contacts.value.push(contact);
  }

  const updateContact = (updatedContact) => {
  const index = contacts.value.findIndex(c => c.id === updatedContact.id)
  if (index !== -1) {
    contacts.value[index] = { ...contacts.value[index], ...updatedContact }
  }
}

  const removeContact = (id) =>{
    contacts.value = contacts.value.filter(c => c.id !== id)
  }

  return { contacts, addContact, removeContact, updateContact };
});
