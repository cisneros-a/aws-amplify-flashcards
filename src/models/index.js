// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Cards, Stacks, User } = initSchema(schema);

export {
  Cards,
  Stacks,
  User
};