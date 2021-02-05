import { UploadedFile } from 'express-fileupload';
import { Document } from '../../../types';

export type Options = {
  collection: string
  id: string
  data: Record<string, unknown>
  depth?: number
  locale?: string
  fallbackLocale?: string
  user?: Document
  overrideAccess?: boolean
  showHiddenFields?: boolean
  file?: UploadedFile
}

export default async function update(options: Options): Promise<Document> {
  const {
    collection: collectionSlug,
    depth,
    locale,
    fallbackLocale,
    data,
    id,
    user,
    overrideAccess = true,
    showHiddenFields,
    file,
  } = options;

  const collection = this.collections[collectionSlug];

  const args = {
    depth,
    data,
    collection,
    overrideAccess,
    id,
    showHiddenFields,
    req: {
      user,
      payloadAPI: 'local',
      locale,
      fallbackLocale,
      payload: this,
      file,
    },
  };

  return this.operations.collections.update(args);
}
