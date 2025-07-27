export const IProviderIAToken = Symbol('IProviderIA');

export interface IProviderIA {
  generateResponse(prompt: string): Promise<string>;
}
