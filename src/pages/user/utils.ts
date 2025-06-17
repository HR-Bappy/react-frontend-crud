import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Today } from "../../helper/generatePdf";

export const fetchBase64Image = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const generatePdfContent = async (data: any[]) => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: "Employee List Report", style: "header", alignment: "center" },
      {
        columns: [
          { text: "Total Employee: "+data.length, alignment: "left", fontSize: 10 },
          { text: "Date: "+Today, alignment: "right", fontSize: 10 },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: [20, 120, 70, 100, 40, "*"],
          body: [
            [
              { text: "#", style: "tableHeader" },
              { text: "Name & Profile", style: "tableHeader" },
              { text: "Phone", style: "tableHeader" },
              { text: "Email", style: "tableHeader" },
              { text: "Gender", style: "tableHeader" },
              { text: "Address", style: "tableHeader" },
            ],
            ...(await Promise.all(
              data.map(async (user: any, i: number) => {
                const imageBase64 = await fetchBase64Image(
                  `https://reqres.in/img/faces/${i + 1}-image.jpg`
                );
                return [
                  i + 1,
                  {
                    columns: [
                      {
                        image: imageBase64,
                        width: 30,
                        height: 30,
                        margin: [0, 0, 5, 0],
                      },
                      {
                        text: `${user.firstname} ${user.lastname} \n${user?.birthday}`,
                        fontSize: 10,
                        margin: [5, 0, 0, 0],
                      },
                    ],
                  },
                  user.phone,
                  user.email,
                  user.gender,
                  `${user.address.street}, ${user.address.city}, ${user.address.country}`,
                ];
              })
            )),
          ],
        },
        layout: "lightHorizontalLines",
        style: "table",
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        fillColor: "#eeeeee",
        margin: [0, 5, 0, 5],
      },
      table: {
        margin: [0, 5, 0, 15],
        fontSize: 10,
      },
    },
  };

  return docDefinition;
};
