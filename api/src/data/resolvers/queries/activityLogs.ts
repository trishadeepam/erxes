import { isArray } from 'underscore';
import {
  Conformities,
  Conversations,
  EmailDeliveries,
  InternalNotes,
  Tasks
} from '../../../db/models';
import { IActivityLogDocument } from '../../../db/models/definitions/activityLogs';
import { ACTIVITY_CONTENT_TYPES } from '../../../db/models/definitions/constants';
import { debugExternalApi } from '../../../debuggers';
import { collectPluginContent } from '../../../pluginUtils';
import { fetchLogs } from '../../logUtils';
import { moduleRequireLogin } from '../../permissions/wrappers';
import { IContext } from '../../types';

export interface IListArgs {
  contentType: string;
  contentId: string;
  activityType: string;
}

const activityLogQueries = {
  /**
   * Get activity log list
   */
  async activityLogs(_root, doc: IListArgs, { dataSources, user }: IContext) {
    const { contentType, contentId, activityType } = doc;

    let activities: IActivityLogDocument[] = [];

    const relatedItemIds = await Conformities.savedConformity({
      mainType: contentType,
      mainTypeId: contentId,
      relTypes:
        contentType !== 'task' ? ['deal', 'ticket'] : ['deal', 'ticket', 'task']
    });

    const relatedTaskIds = await Conformities.savedConformity({
      mainType: contentType,
      mainTypeId: contentId,
      relTypes: ['task']
    });

    const collectItems = (items: any, type?: string) => {
      if (!isArray(items)) {
        items = [items];
      }
      if (items) {
        items.map(item => {
          let result: IActivityLogDocument = {} as any;

          if (!type) {
            result = item;
          }

          if (type && type !== 'taskDetail') {
            result._id = item._id;
            result.contentType = type;
            result.contentId = contentId;
            result.createdAt = item.createdAt;
          }

          if (type === 'taskDetail') {
            result._id = item._id;
            result.contentType = type;
            result.createdAt = item.closeDate || item.createdAt;
          }

          activities.push(result);
        });
      }
    };

    const collectConversations = async () => {
      collectItems(
        await Conversations.find({
          $or: [{ customerId: contentId }, { participatedUserIds: contentId }]
        }),
        'conversation'
      );

      if (contentType === 'customer') {
        let conversationIds;

        try {
          conversationIds = await dataSources.IntegrationsAPI.fetchApi(
            '/facebook/get-customer-posts',
            {
              customerId: contentId
            }
          );
          collectItems(
            await Conversations.find({ _id: { $in: conversationIds } }),
            'comment'
          );
        } catch (e) {
          debugExternalApi(e);
        }
      }
    };

    // this also fetches campaign & sms logs, don't fetch them in default switch case
    const collectActivityLogs = async () => {
      collectItems(
        await fetchLogs(
          {
            contentId: { $in: [...relatedItemIds, contentId] }
          },
          'activityLogs'
        )
      );
    };

    const collectInternalNotes = async () => {
      collectItems(
        await InternalNotes.find({ contentTypeId: contentId }).sort({
          createdAt: -1
        }),
        'note'
      );
    };

    const collectCampaigns = async () => {
      collectItems(
        await fetchLogs(
          {
            contentId,
            contentType: ACTIVITY_CONTENT_TYPES.CAMPAIGN
          },
          'activityLogs'
        )
      );
    };

    const collectSms = async () => {
      collectItems(
        await fetchLogs(
          {
            contentId,
            contentType: ACTIVITY_CONTENT_TYPES.SMS
          },
          'activityLogs'
        )
      );
    };

    const collectTasks = async () => {
      if (contentType !== 'task') {
        collectItems(
          await Tasks.find({
            $and: [
              { _id: { $in: relatedTaskIds } },
              { status: { $ne: 'archived' } }
            ]
          }).sort({
            closeDate: 1
          }),
          'taskDetail'
        );
      }

      const contentIds = activities
        .filter(activity => activity.action === 'convert')
        .map(activity => activity.content);

      if (Array.isArray(contentIds)) {
        collectItems(
          await Conversations.find({ _id: { $in: contentIds } }),
          'conversation'
        );
      }
    };

    const collectEmailDeliveries = async () => {
      await collectItems(
        await EmailDeliveries.find({ customerId: contentId }),
        'email'
      );
    };

    if (activityType && activityType.startsWith('plugin')) {
      const pluginResponse = await collectPluginContent(
        doc,
        user,
        activities,
        collectItems
      );
      if (pluginResponse) {
        activities = activities.concat(pluginResponse);
      }
    } else {
      switch (activityType) {
        case ACTIVITY_CONTENT_TYPES.CONVERSATION:
          await collectConversations();
          break;

        case ACTIVITY_CONTENT_TYPES.INTERNAL_NOTE:
          await collectInternalNotes();
          break;

        case ACTIVITY_CONTENT_TYPES.TASK:
          await collectTasks();
          break;

        case ACTIVITY_CONTENT_TYPES.EMAIL:
          await collectEmailDeliveries();
          break;

        case ACTIVITY_CONTENT_TYPES.SMS:
          await collectSms();
          break;

        case ACTIVITY_CONTENT_TYPES.CAMPAIGN:
          await collectCampaigns();
          break;

        default:
          await collectConversations();
          await collectActivityLogs();
          await collectInternalNotes();
          await collectTasks();
          await collectEmailDeliveries();

          break;
      }
    }

    activities.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return activities;
  }
};

moduleRequireLogin(activityLogQueries);

export default activityLogQueries;
