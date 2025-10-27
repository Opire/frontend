import { EVENT_NAMES } from '../_types/EventNames';

export interface BaseEventPrimitives {
  eventId: string;
  eventName: EVENT_NAMES;
  occurredOn: number;
  attributes: unknown;
  entityId: string | undefined;
}
