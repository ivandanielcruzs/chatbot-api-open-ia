export class Message {
  constructor(
    public readonly sender: 'user' | 'bot',
    public readonly content: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
