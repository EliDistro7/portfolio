import {DocumentTextIcon} from '@sanity/icons'
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
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
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

    // Media Type (choose between image, video, or audio)
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

    // Conditional media fields
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      ],
      hidden: ({document}) => document?.mediaType !== 'image',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.mediaType === 'image' && !value) {
          return 'Cover image is required when media type is image'
        }
        return true
      }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({document}) => document?.mediaType !== 'video',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.mediaType === 'video' && !value) {
          return 'Video file is required when media type is video'
        }
        return true
      }),
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      hidden: ({document}) => document?.mediaType !== 'audio',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.mediaType === 'audio' && !value) {
          return 'Audio file is required when media type is audio'
        }
        return true
      }),
    }),

    // Post date
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
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
      mediaType: 'mediaType',
      coverImage: 'coverImage',
      video: 'video',
      audio: 'audio',
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
        coverImage,
        video,
        audio,
        authorFirstName,
        authorLastName,
        date,
        hasTranslation
      } = selection

      // Determine media icon based on type
      let media
      if (mediaType === 'image') {
        media = coverImage
      } else if (mediaType === 'video') {
        media = {_type: 'image', icon: DocumentTextIcon}
      } else if (mediaType === 'audio') {
        media = {_type: 'image', icon: DocumentTextIcon}
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