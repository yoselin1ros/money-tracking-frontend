import { TransactionResponse } from './transaction.model';

export interface TemplateResponse {
  templateId: number;
  templateName: string;
  draft: TransactionResponse;
}
