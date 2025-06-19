import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Today } from "../../helper/generatePdf";
import ExcelJS from "exceljs";

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
      { text: "Product List Report", style: "header", alignment: "center" },
      // filter?.label &&
      //   filter?.value && {
      //     text: `${filter.label}: ${filter.value}`,
      //     style: "subHeader",
      //     alignment: "center",
      //   },
      {
        columns: [
          {
            text: "Total Items: " + data.length,
            alignment: "left",
            fontSize: 10,
          },
          { text: "Date: " + Today, alignment: "right", fontSize: 10 },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: [20, 120, "*", 50, 40, 45],
          body: [
            [
              { text: "#", style: "tableHeader" },
              { text: "Name", style: "tableHeader" },
              { text: "Description", style: "tableHeader" },
              { text: "Category", style: "tableHeader" },
              { text: "Price", style: "tableHeader" },
              { text: "Taxable", style: "tableHeader" },
            ],
            ...(await Promise.all(
              data.map(async (user: any, i: number) => {
                const imageBase64 = await fetchBase64Image(
                  `https://reqres.in/img/faces/${getRandomMod13()}-image.jpg`
                );
                return [
                  i + 1,
                  // {
                  //   columns: [
                  //     {
                  //       image: imageBase64,
                  //       width: 30,
                  //       height: 30,
                  //       margin: [0, 0, 5, 0],
                  //     },
                  //     {
                  //       text: `${user.firstname} ${user.lastname} \n${user?.birthday}`,
                  //       fontSize: 10,
                  //       margin: [5, 0, 0, 0],
                  //     },
                  //   ],
                  // },
                  user.name,
                  user.description,
                  user.category,
                  user.price,
                  user.isTaxable,
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
export const generateExcel = async (data: any[], columns: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add Title Rows
  const titleRows = [
    worksheet.addRow(["Product List Report"]),
    worksheet.addRow([]),
  ];

  worksheet.getCell("A3").value = `Total: ${data?.length ?? 0}`;
  worksheet.getCell("A3").alignment = {
    vertical: "middle",
    horizontal: "left",
  };
  console.log("dddd", getColumnLetter(columns.length));

  // Merge Title Cells and Apply Style
  titleRows.forEach((row, index) => {
    worksheet.mergeCells(
      `A${index + 1}:${String.fromCharCode(65 + columns.length)}${index + 1}`
    );
    row.getCell(1).font = {
      size: index === 0 ? 16 : 12,
      bold: true,
      color: { argb: index === 0 ? "FF000000" : "FF666666" },
    };
    row.getCell(1).alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    row.height = index === 0 ? 30 : 20;
  });
  

  worksheet.getCell(`${getColumnLetter(columns.length)}3`).value =
    "Date : " + Today;
  worksheet.getCell(`${getColumnLetter(columns.length)}3`).alignment = {
    vertical: "middle",
    horizontal: "right",
  };
  worksheet.getRow(3).height = 30;

  worksheet.addRow([]);

  // Header Row
  const headerRow = worksheet.addRow(columns.map((col: any) => col?.text));
  headerRow.height = 25;
  headerRow.font = { bold: true };
  headerRow.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };

  // Download and Convert Images to Base64
  const fetchBase64Image = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  // Add Data Rows
  for (let i = 0; i < data.length; i++) {
    const rowData = data[i];
    const rowValues = [
      i + 1,
      // "",
      rowData.name,
      rowData.description,
      rowData.category,
      rowData.price,
      rowData.isTaxable,
    ];
    const row = worksheet.addRow(rowValues);
    row.height = 60;

    // Add Image
    // const base64Image = await fetchBase64Image(
    //   `https://reqres.in/img/faces/${getRandomMod13()}-image.jpg`
    // );
    // const imageId = workbook.addImage({
    //   base64: base64Image,
    //   extension: "jpeg",
    // });

    // worksheet.addImage(imageId, {
    //   tl: { col: 1.5, row: row.number - 0.8 },
    //   ext: { width: 50, height: 50 },
    // });

    // Align text in cells
    row.eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
      }
      else
        cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    });
  }

  // Adjust Column Widths
  worksheet.columns.forEach((col, index) => {
    col.width = [10, 30, 50, 25, 20, 25,][index] || 15;
  });

  // Generate Excel File
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "product-list.xlsx";
  link.click();
  URL.revokeObjectURL(link.href);
};

export const columns = [
  {
    id: 1,
    text: "#",
    width: 50,
    // align: "text-center",
    style: "tableHeader",
  },
  {
    id: 2,
    text: "Name",
    width: 50,
    // align: "text-center",
    style: "tableHeader",
  },
  {
    id: 3,
    text: "Description",
    width: 50,
    // align: "text-center",
    style: "tableHeader",
  },
  {
    id: 4,
    text: "Category",
    width: 50,
    style: "tableHeader",
    // align: "text-center",

  },
  {
    id: 5,
    text: "Price",
    width: 50,
    style: "tableHeader",
    // align: "text-center",

  },
  {
    id: 6,
    text: "Taxable",
    width: 50,
    style: "tableHeader",
    // align: "text-center",

  },
];
const getColumnLetter = (columnIndex: number): string => {
  let columnLetter = "";

  while (columnIndex > 0) {
    const remainder = (columnIndex - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    columnIndex = Math.floor((columnIndex - 1) / 26);
  }
  return columnLetter;
};
export const getRandomMod13 = (): number => {
  return Math.floor(Math.random() * 12) + 1;
};
