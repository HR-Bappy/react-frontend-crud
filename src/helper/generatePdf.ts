import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

// ✅ Correct way to register vfs and fonts
(pdfMake as any).vfs = pdfFonts.vfs;
(pdfMake as any).fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

type IOptions = {
  action?: "open" | "print" | "download" | "data-url" | "base64" | "blob";
  progressCallback?: (progress: number | string) => void;
  fileName?: string;
  getValue?: (value: string | Blob | ArrayBuffer) => void;
};

export const Today = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});;

export const generatePDF = (
  docDefinition: TDocumentDefinitions,
  options?: IOptions
) => {
  const fileName = options?.fileName || `রিপোর্ট-${Today}.pdf`;
  const progressCallback = options?.progressCallback;

  const finalDefinition = {
    ...docDefinition,
    defaultStyle: {
      font: "Roboto",
    },
  };

  const pdf = pdfMake.createPdf(finalDefinition);

  switch (options?.action) {
    case "print":
      pdf.print({ progressCallback });
      break;
    case "download":
      pdf.download(fileName, undefined, { progressCallback });
      break;
    case "data-url":
      pdf.getDataUrl(
        (res) => options?.getValue && options?.getValue(res),
        { progressCallback }
      );
      break;
    case "base64":
      pdf.getBase64(
        (res) => options?.getValue && options?.getValue(res),
        { progressCallback }
      );
      break;
    case "blob":
      pdf.getBlob(
        (res) => options?.getValue && options?.getValue(res),
        { progressCallback }
      );
      break;
    default:
      pdf.open({ progressCallback });
  }
};
