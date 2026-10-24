import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Note: a
    .model({
      title: a.string().required(),
      subject: a.string().required(),
      year: a.integer().required(),
      fileType: a.string().required(), // 'PDF' or 'PPT'
      filePath: a.string().required(), // S3 file location
      uploader: a.string(),
      downloads: a.integer().default(0),
    })
    .authorization((allow) => [
      // Anyone visiting the site can view the notes list
      allow.guest().to(['read']),
      // Logged-in students can view, upload, update downloads, and delete
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});