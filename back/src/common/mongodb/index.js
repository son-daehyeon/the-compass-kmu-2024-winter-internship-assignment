import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_AUTH_SOURCE } =
  process.env;

function generateMongoUri() {
  let uri = 'mongodb://';

  if (MONGODB_USERNAME && MONGODB_PASSWORD) {
    uri += `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`;
  }

  uri += `${MONGODB_HOST}:${MONGODB_PORT}`;

  if (MONGODB_AUTH_SOURCE) {
    uri += `?authSource=${MONGODB_AUTH_SOURCE}`;
  }

  return uri;
}

mongoose
  .connect(generateMongoUri(), {
    dbName: MONGODB_DATABASE,
  })
  .then(() => {
    mongoose.plugin((schema) => {
      schema.set('versionKey', false);
    });

    mongoose.set('toJSON', {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    });

    mongoose.set('toObject', {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  });

export default mongoose.connection;
