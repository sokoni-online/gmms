import { Document, Schema } from 'mongoose';
import { field } from './utils';
import { PUBLISH_STATUSES } from './constants';
interface ICommonFields {
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
}

export interface IForum {
  title?: string;
  description?: string;
  brandId?: string;
  languageCode?: string;
}

export interface IForumDocument extends ICommonFields, IForum, Document {
  _id: string;
}

export interface ITopic {
  title?: string;
  description?: string;
  forumId: string;
}

export interface ITopicDocument extends ICommonFields, ITopic, Document {
  _id: string;
}

export interface IDiscussion {
  title?: string;
  description?: string;
  tagId?: string;
  topicId: string;
  forumId: string;
  content: string;
}

export interface IDiscussionDocument
  extends ICommonFields,
    IDiscussion,
    Document {
  _id: string;
}

export interface IComment {
  title?: string;
  content?: string;
  discussionId: string;
}

export interface ICommentDocument extends ICommonFields, IComment, Document {
  _id: string;
}

// Mongoose schemas ==================

// Schema for common fields

const commonFields = {
  createdBy: field({ type: String, label: 'Created by' }),
  createdDate: field({ type: Date, label: 'Created at' }),
  modifiedBy: field({ type: String, label: 'Modified by' }),
  modifiedDate: field({ type: Date, label: 'Modified at' })
};

export const forumSchema = new Schema({
  _id: field({ pkey: true }),
  title: field({ type: String, optional: true, label: 'Title' }),
  description: field({ type: String, optional: true, label: 'Description' }),
  brandId: field({ type: String, optional: true, label: 'Brand' }),
  languageCode: field({
    type: String,
    optional: true,
    label: 'Language codes'
  }),
  ...commonFields
});

export const topicSchema = new Schema({
  _id: field({ pkey: true }),
  title: field({ type: String, optional: true, label: 'Title' }),
  description: field({ type: String, optional: true, label: 'Description' }),
  forumId: field({ type: String, label: 'Forum' }),
  ...commonFields
});

export const discussionSchema = new Schema({
  _id: field({ pkey: true }),
  title: field({ type: String, optional: true, label: 'Title' }),
  description: field({ type: String, optional: true, label: 'Description' }),
  tagId: field({ type: String, optional: true, label: 'Tag' }),
  topicId: field({ type: String, label: 'Topic' }),
  forumId: field({ type: String, label: 'Forum' }),
  content: field({ type: String, label: 'Content' }),
  status: field({
    type: String,
    enum: PUBLISH_STATUSES.ALL,
    default: PUBLISH_STATUSES.DRAFT,
    label: 'Status'
  }),
  startDate: field({ type: Date, label: 'Start Date' }),
  closeDate: field({ type: Date, label: 'Close Date' }),
  isComplete: field({ type: Boolean, label: 'Complete' }),
  ...commonFields
});

export const commentSchema = new Schema({
  _id: field({ pkey: true }),
  title: field({ type: String, label: 'Title' }),
  content: field({ type: String, label: 'Content' }),
  discussionId: field({ type: String, label: 'Discussion' }),
  ...commonFields
});