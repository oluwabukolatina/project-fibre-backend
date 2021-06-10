import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

const EmailTemplates = {
  generateInvoice(
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
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs.readFileSync(path.join(__dirname, '/invoice.html')).toString('utf-8'),
      {
        invoiceId,
        invoiceCreated,
        clientName,
        clientEmail,
        invoiceName,
        invoiceDescription,
        invoiceAmount,
        vat,
        total,
      },
    );
  },
};
export default EmailTemplates;
