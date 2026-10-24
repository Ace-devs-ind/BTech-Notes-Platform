import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'noteshareStorage',
  access: (allow) => ({
    'notes/*': [
      // Anyone can download notes
      allow.guest.to(['read']),
      // Logged-in students can upload, download, and delete files
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  }),
});