import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { mediaSlug } from '../Media'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  slug: postsSlug,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'associatedMedia',
      type: 'upload',
      relationTo: mediaSlug,
      access: {
        create: () => true,
        update: () => false,
      },
    },
    {
      label: 'Alternative Content',
      type: 'collapsible',
      fields: [
        {
          name: 'alternative',
          type: 'group',
          admin: {
            description:
              'The alternative content of the feature. Will show below the call to action. Can either be a card or text.',
          },
          fields: [
            {
              name: 'variant',
              type: 'select',
              admin: {
                isClearable: true,
              },
              options: [
                {
                  label: 'Card',
                  value: 'card',
                },

                {
                  label: 'Text',
                  value: 'text',
                },
              ],
            },

            {
              validate: (value, { siblingData }) => {
                if (!value && siblingData?.variant) {
                  return 'Relative Link URL (start with /) is required when a variant is selected'
                }

                return true
              },
              name: 'href',
              label: 'href',
              type: 'text',
            },

            {
              name: 'linkText',
              type: 'text',
            },

            {
              name: 'detailText',
              type: 'text',
            },

            {
              name: 'image',
              type: 'group',
              admin: {
                condition: (data) => {
                  return data.alternative?.variant === 'card'
                },
              },
              fields: [
                {
                  name: 'src',
                  type: 'text',
                  required: true,
                },

                {
                  name: 'alt',
                  type: 'text',
                },

                {
                  name: 'width',
                  type: 'number',
                  required: true,
                },

                {
                  name: 'height',
                  type: 'number',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
