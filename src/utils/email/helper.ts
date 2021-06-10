import * as secrets from '../../config/secrets';
import EmailTemplates from '../../templates/email/helper';

const MailHelpers = {
  createInvoiceEmail(
    invoiceId: string,
    invoiceCreated: string,
    clientName: string,
    clientEmail: string,
    invoiceName: string,
    invoiceDescription: string,
    invoiceAmount: number,
    vat: number,
    total: number,
  ) {
    return {
      to: clientEmail,
      from: { name: 'Tina', email: secrets.EMAIL_FROM },
      subject: 'Here is your invoice',
      text: 'Invoice',
      html: EmailTemplates.generateInvoice(
        invoiceId,
        invoiceCreated,
        clientName,
        clientEmail,
        invoiceName,
        invoiceDescription,
        invoiceAmount,
        vat,
        total,
      ),
    };
  },
};
export default MailHelpers;
