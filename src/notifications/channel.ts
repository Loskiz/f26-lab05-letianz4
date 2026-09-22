/** What a channel reports back after a send attempt. */
export interface NotificationResult {
  channel: string;
  recipient: string;
  delivered: boolean;
  message: string;
}

/** A way to get a message to a person. */
export interface NotificationChannel {
  /** Stable identifier included in the result of a send attempt. */
  readonly name: string;

  /** Delivers one message and reports what happened. */
  send(recipient: string, subject: string, body: string): NotificationResult;
}
