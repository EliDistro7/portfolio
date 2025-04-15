import {DocumentTextIcon, ImageIcon, PlayIcon, PlayIcon as SpeakerLoudIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    // Title in both languages
    defineField({
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      // Validation removed to make optional
    }),
    defineField({
      name: 'titleSw',
      title: 'Title (Swahili)',
      type: 'string',
    }),

    // Slug (auto-generated from English title)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the post URL (generated from English title)',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      // Validation removed to make optional
    }),

    // Content in both languages
    defineField({
      name: 'content',
      title: 'Content (English)',
      type: 'blockContent',
    }),
    defineField({
      name: 'contentSw',
      title: 'Content (Swahili)',
      type: 'blockContent',
    }),

    // Excerpt in both languages
    defineField({
      name: 'excerpt',
      title: 'Excerpt (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'excerptSw',
      title: 'Excerpt (Swahili)',
      type: 'text',
      rows: 3,
    }),

    // Featured Media Section
    defineField({
      name: 'featuredMedia',
      title: 'Featured Media',
      type: 'object',
      description: 'The main media displayed prominently for this post',
      fields: [
        defineField({
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
              {title: 'Audio', value: 'audio'},
            ],
            layout: 'radio',
          },
          initialValue: 'image',
        }),
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          hidden: ({parent}) => parent?.mediaType !== 'image',
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'object',
          hidden: ({parent}) => parent?.mediaType !== 'video',
          fields: [
            {
              name: 'file',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/*',
              },
            },
            {
              name: 'externalUrl',
              title: 'or External URL (YouTube, Vimeo, etc.)',
              type: 'url',
              description: 'Link to YouTube, Vimeo, or other video platforms',
            },
            {
              name: 'poster',
              title: 'Video Poster Image',
              type: 'image',
              description: 'Image shown before video plays',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          // Validation removed to make optional
        }),
        defineField({
          name: 'audio',
          title: 'Audio',
          type: 'object',
          hidden: ({parent}) => parent?.mediaType !== 'audio',
          fields: [
            {
              name: 'file',
              title: 'Audio File',
              type: 'file',
              options: {
                accept: 'audio/*',
              },
            },
            {
              name: 'externalUrl',
              title: 'or External URL (SoundCloud, etc.)',
              type: 'url',
              description: 'Link to audio hosting platforms',
            },
            {
              name: 'coverImage',
              title: 'Cover Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          // Validation removed to make optional
        }),
      ],
    }),

    // Gallery for multiple images
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      description: 'Add multiple images to create a gallery for this post',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
              // Already removed validation
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          preview: {
            select: {
              image: 'image',
              caption: 'caption',
            },
            prepare(selection) {
              const {image, caption} = selection
              return {
                title: caption || 'Image',
                media: image || ImageIcon,
              }
            },
          },
        },
      ],
    }),

    // Additional videos section
    defineField({
      name: 'additionalVideos',
      title: 'Additional Videos',
      description: 'Add supplementary videos to this post',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'additionalVideo',
          title: 'Video',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Video Title',
            },
            {
              name: 'file',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/*',
              },
            },
            {
              name: 'externalUrl',
              title: 'or External URL (YouTube, Vimeo, etc.)',
              type: 'url',
              description: 'Link to YouTube, Vimeo, or other video platforms',
            },
            {
              name: 'poster',
              title: 'Video Poster Image',
              type: 'image',
              description: 'Image shown before video plays',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
            },
          ],
          // Already removed validation
          preview: {
            select: {
              title: 'title',
              poster: 'poster',
            },
            prepare(selection) {
              const {title, poster} = selection
              return {
                title: title || 'Video',
                media: poster ? poster : PlayIcon,
              }
            },
          },
        },
      ],
    }),

    // Post date
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      // Validation removed to make optional
    }),

    // Author reference
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),

    // Language indicator
    defineField({
      name: 'hasTranslation',
      title: 'Has Swahili Translation',
      type: 'boolean',
      description: 'Check if this post has Swahili content',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      titleSw: 'titleSw',
      mediaType: 'featuredMedia.mediaType',
      featuredImage: 'featuredMedia.image',
      featuredVideo: 'featuredMedia.video',
      featuredAudio: 'featuredMedia.audio',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      hasTranslation: 'hasTranslation',
    },
    prepare(selection) {
      const {
        title,
        titleSw,
        mediaType,
        featuredImage,
        featuredVideo,
        featuredAudio,
        authorFirstName,
        authorLastName,
        date,
        hasTranslation
      } = selection

      // Determine media icon based on type
      let media
      if (mediaType === 'image') {
        media = featuredImage
      } else if (mediaType === 'video') {
        media = featuredVideo?.poster || PlayIcon
      } else if (mediaType === 'audio') {
        media = featuredAudio?.coverImage || SpeakerLoudIcon
      }

      // Build subtitle with translation indicator
      const subtitles = [
        authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
        hasTranslation && '(Swahili available)'
      ].filter(Boolean)

      // Show both titles if Swahili version exists
      const displayTitle = hasTranslation 
        ? `${title} / ${titleSw || 'No Swahili title'}`
        : title

      return {
        title: displayTitle,
        media,
        subtitle: subtitles.join(' ')
      }
    }
  }
})